import { defineCollection, z } from 'astro:content';

const solutions = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    whoFor: z.string(),
    painPoints: z.array(z.string()),
    deliverables: z.array(z.string()),
    timeline: z.string(),
    engagementModel: z.enum(['fixed', 'retainer', 'advisory']),
    ctaText: z.string().optional(),
    order: z.number().default(0)
  })
});

const work = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    client: z.string().optional(),
    problem: z.string(),
    constraints: z.array(z.string()),
    approach: z.string(),
    deliverables: z.array(z.string()),
    results: z.array(z.string()),
    stack: z.array(z.string()),
    timeline: z.string(),
    featured: z.boolean().default(false),
    order: z.number().default(0),
    publishedAt: z.date().optional()
  })
});

const insights = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    author: z.string().default('Lorna Dev'),
    publishedAt: z.date(),
    updatedAt: z.date().optional(),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false)
  })
});

export const collections = {
  solutions,
  work,
  insights
};