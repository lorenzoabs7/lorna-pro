import type { APIRoute } from 'astro';
import { Resend } from 'resend';
import Database from 'better-sqlite3';
import path from 'path';
import { createTranslator } from '../../i18n/translator';
import type { TranslationKey } from '../../i18n/translator';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

const t = createTranslator('en');

// On Vercel, filesystem is read-only except /tmp; use it for SQLite (ephemeral per instance).
const dbPath =
  typeof process.env.VERCEL !== 'undefined'
    ? path.join('/tmp', 'contact_submissions.db')
    : path.join(process.cwd(), 'contact_submissions.db');

let db: Database.Database | null = null;

function getDb(): Database.Database | null {
  if (db) return db;
  try {
    db = new Database(dbPath);
    db.exec(`
      CREATE TABLE IF NOT EXISTS submissions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        company TEXT,
        project_type TEXT,
        budget TEXT,
        message TEXT NOT NULL,
        honeypot TEXT,
        ip_address TEXT,
        user_agent TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
    return db;
  } catch {
    return null;
  }
}

interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  projectType?: string;
  budget?: string;
  message: string;
  honeypot?: string;
}

const jsonHeaders = { 'Content-Type': 'application/json' };

function errorResponse(errorKey: TranslationKey, status: number): Response {
  return new Response(
    JSON.stringify({
      errorKey,
      error: t.t(errorKey)
    }),
    {
      status,
      headers: jsonHeaders
    }
  );
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const clientIP = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
    const userAgent = request.headers.get('user-agent') || 'unknown';

    const formData: ContactFormData = await request.json();

    if (!formData.name?.trim()) {
      return errorResponse('api.contact.errors.nameRequired', 400);
    }

    if (!formData.email?.trim()) {
      return errorResponse('api.contact.errors.emailRequired', 400);
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      return errorResponse('api.contact.errors.invalidEmail', 400);
    }

    if (!formData.message?.trim()) {
      return errorResponse('api.contact.errors.messageRequired', 400);
    }

    if (formData.honeypot?.trim()) {
      console.log('Honeypot triggered - potential spam submission');
    }

    let lastInsertRowid: number | null = null;
    const database = getDb();
    if (database) {
      const insertStmt = database.prepare(`
        INSERT INTO submissions (name, email, company, project_type, budget, message, honeypot, ip_address, user_agent)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);
      const result = insertStmt.run(
        formData.name.trim(),
        formData.email.trim(),
        formData.company?.trim() || null,
        formData.projectType || null,
        formData.budget || null,
        formData.message.trim(),
        formData.honeypot || null,
        clientIP,
        userAgent
      );
      lastInsertRowid = result.lastInsertRowid as number;
    }

    if (process.env.RESEND_API_KEY) {
      try {
        const projectTypeLabels: Record<string, string> = {
          automation: t.t('contact.form.projectType.automation'),
          architecture: t.t('contact.form.projectType.architecture'),
          performance: t.t('contact.form.projectType.performance'),
          integrations: t.t('contact.form.projectType.integrations'),
          tools: t.t('contact.form.projectType.tools'),
          mvp: t.t('contact.form.projectType.mvp'),
          other: t.t('contact.form.projectType.other')
        };

        const budgetLabels: Record<string, string> = {
          'under-25k': t.t('contact.form.budget.under25'),
          '25k-50k': t.t('contact.form.budget.range25to50'),
          '50k-100k': t.t('contact.form.budget.range50to100'),
          '100k-250k': t.t('contact.form.budget.range100to250'),
          '250k-plus': t.t('contact.form.budget.above250'),
          discuss: t.t('contact.form.budget.discuss')
        };

        const emailHtml = `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <title>${t.t('api.contact.email.title')}</title>
            </head>
            <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
              <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                <h1 style="color: #0a1929; border-bottom: 2px solid #00d4ff; padding-bottom: 10px;">
                  ${t.t('api.contact.email.title')}
                </h1>

                <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                  <h2 style="margin-top: 0; color: #0a1929;">${t.t('api.contact.email.detailsTitle')}</h2>
                  <p><strong>${t.t('api.contact.email.fields.name')}</strong> ${formData.name}</p>
                  <p><strong>${t.t('api.contact.email.fields.email')}</strong> <a href="mailto:${formData.email}">${formData.email}</a></p>
                  ${formData.company ? `<p><strong>${t.t('api.contact.email.fields.company')}</strong> ${formData.company}</p>` : ''}
                  ${formData.projectType ? `<p><strong>${t.t('api.contact.email.fields.projectType')}</strong> ${projectTypeLabels[formData.projectType] || formData.projectType}</p>` : ''}
                  ${formData.budget ? `<p><strong>${t.t('api.contact.email.fields.budgetRange')}</strong> ${budgetLabels[formData.budget] || formData.budget}</p>` : ''}
                </div>

                <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                  <h2 style="margin-top: 0; color: #0a1929;">${t.t('api.contact.email.messageTitle')}</h2>
                  <div style="white-space: pre-wrap;">${formData.message}</div>
                </div>

                <div style="background: #e9ecef; padding: 15px; border-radius: 8px; margin: 20px 0; font-size: 14px;">
                  ${lastInsertRowid != null ? `<p><strong>${t.t('api.contact.email.submissionId')}</strong> ${lastInsertRowid}</p>` : ''}
                  <p><strong>${t.t('api.contact.email.submitted')}</strong> ${new Date().toLocaleString()}</p>
                  <p><strong>${t.t('api.contact.email.ipAddress')}</strong> ${clientIP}</p>
                </div>

                <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #dee2e6;">
                  <a href="mailto:${formData.email}"
                     style="background: #00d4ff; color: #0a1929; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">
                    ${t.t('api.contact.email.reply', { name: formData.name })}
                  </a>
                </div>
              </div>
            </body>
          </html>
        `;

        await resend!.emails.send({
          from: 'Lorna Dev Contact <contact@lornadev.com>',
          to: process.env.CONTACT_EMAIL || 'hello@lornadev.com',
          subject: t.t('api.contact.email.subject', { name: formData.name }),
          html: emailHtml
        });
      } catch (emailError) {
        console.error('Failed to send email:', emailError);
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: t.t('api.contact.success.messageSent'),
        id: lastInsertRowid
      }),
      {
        status: 200,
        headers: jsonHeaders
      }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return errorResponse('api.contact.errors.internal', 500);
  }
};

export const GET: APIRoute = async ({ request }) => {
  const authHeader = request.headers.get('authorization');
  if (!authHeader || authHeader !== `Bearer ${process.env.ADMIN_TOKEN}`) {
    return errorResponse('api.contact.errors.unauthorized', 401);
  }

  const database = getDb();
  if (!database) {
    return new Response(JSON.stringify({ submissions: [] }), {
      status: 200,
      headers: jsonHeaders
    });
  }

  try {
    const submissions = database
      .prepare(`
      SELECT id, name, email, company, project_type, budget, message, created_at
      FROM submissions
      ORDER BY created_at DESC
      LIMIT 100
    `)
      .all();

    return new Response(JSON.stringify({ submissions }), {
      status: 200,
      headers: jsonHeaders
    });
  } catch (error) {
    console.error('Failed to fetch submissions:', error);
    return errorResponse('api.contact.errors.fetchFailed', 500);
  }
};
