import { d as createAstro, e as createComponent, r as renderComponent, f as renderTemplate, m as maybeRenderHead, F as Fragment } from '../chunks/astro/server_9P8XkXq2.mjs';
import { g as getI18n, $ as $$BaseLayout } from '../chunks/BaseLayout_DR78Hthj.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro("https://lornadev.com");
const $$Terms = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Terms;
  const { t, raw } = getI18n(Astro2);
  const sections = raw("terms.sections") ?? [];
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: t("terms.title"),
    description: t("terms.meta.description"),
    mainEntity: {
      "@type": "Organization",
      name: t("common.brandName")
    }
  };
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": t("terms.meta.title"), "description": t("terms.meta.description"), "structuredData": structuredData }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="py-20 bg-brand-bg-light dark:bg-brand-bg-dark"> <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"> <div class="mb-12"> <h1 class="text-4xl font-bold text-brand-text-primary-light dark:text-brand-text-primary-dark mb-4">${t("terms.title")}</h1> <p class="text-lg text-brand-text-secondary-light dark:text-brand-text-secondary-dark"> ${t("terms.lastUpdated")} </p> </div> <div class="prose prose-lg max-w-none"> <p class="lead"> ${t("terms.lead")} </p> ${sections.map((section) => renderTemplate`${renderComponent($$result2, "Fragment", Fragment, {}, { "default": ($$result3) => renderTemplate` <h2>${section.heading}</h2> ${section.blocks.map((block) => renderTemplate`${renderComponent($$result3, "Fragment", Fragment, {}, { "default": ($$result4) => renderTemplate`${block.type === "subheading" && block.text && renderTemplate`<h3>${block.text}</h3>`}${block.type === "paragraph" && block.text && renderTemplate`<p>${block.text}</p>`}${block.type === "list" && block.items && renderTemplate`<ul> ${block.items.map((item) => renderTemplate`<li>${item}</li>`)} </ul>`}${block.type === "ordered" && block.items && renderTemplate`<ol> ${block.items.map((item) => renderTemplate`<li>${item}</li>`)} </ol>`}` })}`)}` })}`)} <div class="bg-brand-surface-light dark:bg-brand-surface-dark p-6 rounded-lg mt-6"> <p class="mb-2"><strong>${t("terms.contactCard.emailLabel")}</strong> ${t("terms.contactCard.email")}</p> <p><strong>${t("terms.contactCard.responseTimeLabel")}</strong> ${t("terms.contactCard.responseTime")}</p> </div> <h2>${t("terms.acceptance.heading")}</h2> <p class="text-sm text-brand-text-secondary-light dark:text-brand-text-secondary-dark bg-brand-critical-emphasis/10 dark:bg-brand-critical-emphasis/20 p-4 rounded-lg border border-brand-critical-emphasis/25"> <strong>${t("terms.acceptance.title")}</strong> ${t("terms.acceptance.text")} </p> </div> </div> </section> ` })}`;
}, "/Users/yooololo/Desktop/Dev/Lorna Dev/lorna-pro/src/pages/terms.astro", void 0);

const $$file = "/Users/yooololo/Desktop/Dev/Lorna Dev/lorna-pro/src/pages/terms.astro";
const $$url = "/terms";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Terms,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
