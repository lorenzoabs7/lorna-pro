import { d as createAstro, e as createComponent, r as renderComponent, f as renderTemplate, m as maybeRenderHead, g as addAttribute } from '../chunks/astro/server_9P8XkXq2.mjs';
import { g as getI18n, $ as $$BaseLayout } from '../chunks/BaseLayout_DR78Hthj.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro("https://lornadev.com");
const $$Store = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Store;
  const { t } = getI18n(Astro2);
  const linkIds = ["etsy", "gumroad", "internal"];
  const comingSoonIds = ["gumroad", "internal"];
  const links = linkIds.map((id) => {
    const href = t(`storePage.links.${id}.url`);
    const comingSoon = comingSoonIds.includes(id);
    return {
      id,
      href,
      external: href.startsWith("http"),
      comingSoon
    };
  });
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Store",
    name: `${t("common.brandName")} Store`,
    description: t("storePage.meta.description"),
    url: "https://lornadev.com/store",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Digital Products and Services",
      itemListElement: linkIds.map((id) => ({
        "@type": "Offer",
        name: t(`storePage.links.${id}.label`),
        description: t(`storePage.links.${id}.description`)
      }))
    }
  };
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": t("storePage.meta.title"), "description": t("storePage.meta.description"), "structuredData": structuredData }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="bg-brand-bg-light dark:bg-brand-bg-dark py-20 lg:py-28 border-b border-brand-primary/15 dark:border-brand-primary/20"> <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center"> <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-brand-text-primary-light dark:text-brand-text-primary-dark mb-6 leading-tight"> ${t("storePage.hero.title")} <span class="text-brand-primary dark:text-brand-technical-accent-dark"> ${" "} ${t("storePage.hero.highlight")} </span> </h1> <p class="text-xl text-brand-text-secondary-light dark:text-brand-text-secondary-dark leading-relaxed max-w-3xl mx-auto"> ${t("storePage.hero.description")} </p> </div> </section> <section class="py-12 bg-brand-surface-light dark:bg-brand-surface-dark"> <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"> <div class="rounded-xl border border-brand-text-secondary-light/20 dark:border-brand-text-secondary-dark/20 bg-brand-bg-light dark:bg-brand-bg-dark p-6 sm:p-8"> <h2 class="text-2xl font-semibold text-brand-text-primary-light dark:text-brand-text-primary-dark mb-3"> ${t("storePage.verification.title")} </h2> <p class="text-brand-text-secondary-light dark:text-brand-text-secondary-dark leading-relaxed"> ${t("storePage.verification.description")} </p> </div> </div> </section> <section class="py-20 bg-brand-bg-light dark:bg-brand-bg-dark border-y border-brand-primary/10 dark:border-brand-primary/20"> <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> <div class="grid grid-cols-1 md:grid-cols-3 gap-8"> ${links.map((link) => renderTemplate`<article class="h-full bg-brand-surface-light dark:bg-brand-surface-dark rounded-lg border border-brand-text-secondary-light/20 dark:border-brand-text-secondary-dark/20 p-6 flex flex-col"> <div class="flex items-center gap-2 flex-wrap mb-3"> <h3 class="text-xl font-semibold text-brand-text-primary-light dark:text-brand-text-primary-dark"> ${t(`storePage.links.${link.id}.label`)} </h3> ${link.comingSoon && renderTemplate`<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-brand-text-secondary-light/20 dark:bg-brand-text-secondary-dark/20 text-brand-text-secondary-light dark:text-brand-text-secondary-dark"${addAttribute(t("storePage.comingSoon"), "aria-label")}> ${t("storePage.comingSoon")} </span>`} </div> <p class="text-brand-text-secondary-light dark:text-brand-text-secondary-dark leading-relaxed mb-6 flex-1"> ${t(`storePage.links.${link.id}.description`)} </p> ${link.comingSoon ? renderTemplate`<span class="inline-flex items-center justify-center px-5 py-3 bg-brand-text-secondary-light/30 dark:bg-brand-text-secondary-dark/30 text-brand-text-secondary-light dark:text-brand-text-secondary-dark font-semibold rounded-lg cursor-not-allowed opacity-75" aria-disabled="true"> ${t(`storePage.links.${link.id}.cta`)} </span>` : renderTemplate`<a${addAttribute(link.href, "href")}${addAttribute(link.external ? "_blank" : void 0, "target")}${addAttribute(link.external ? "noopener noreferrer" : void 0, "rel")} class="inline-flex items-center justify-center px-5 py-3 bg-brand-primary dark:bg-brand-technical-accent-dark text-brand-bg-light font-semibold rounded-lg hover:opacity-90 transition-all duration-200"> ${t(`storePage.links.${link.id}.cta`)} </a>`} </article>`)} </div> </div> </section> <section id="internal-store" class="py-16 bg-brand-surface-light dark:bg-brand-surface-dark"> <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"> <h2 class="text-3xl font-bold text-brand-text-primary-light dark:text-brand-text-primary-dark mb-4"> ${t("storePage.future.title")} </h2> <p class="text-lg text-brand-text-secondary-light dark:text-brand-text-secondary-dark leading-relaxed"> ${t("storePage.future.description")} </p> </div> </section> ` })}`;
}, "/Users/yooololo/Desktop/Dev/Lorna Dev/lorna-pro/src/pages/store.astro", void 0);

const $$file = "/Users/yooololo/Desktop/Dev/Lorna Dev/lorna-pro/src/pages/store.astro";
const $$url = "/store";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Store,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
