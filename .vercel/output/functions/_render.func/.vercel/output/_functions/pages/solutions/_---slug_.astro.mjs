import { d as createAstro, e as createComponent, r as renderComponent, f as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_9P8XkXq2.mjs';
import { g as getI18n, $ as $$BaseLayout } from '../../chunks/BaseLayout_DR78Hthj.mjs';
import { g as getCollection } from '../../chunks/_astro_content_B1O02SQD.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro("https://lornadev.com");
const prerender = false;
async function getStaticPaths() {
  const solutions = await getCollection("solutions");
  return solutions.map((solution) => ({
    params: { slug: solution.slug },
    props: { solution }
  }));
}
const $$ = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$;
  const { solution } = Astro2.props;
  const { t } = getI18n(Astro2);
  const translateMaybeKey = (value) => {
    if (!value) return "";
    if (!value.includes(".")) return value;
    return t(value);
  };
  const title = translateMaybeKey(solution.data.title);
  const description = translateMaybeKey(solution.data.description);
  const actionText = translateMaybeKey(solution.data.ctaText || t("solutionDetail.cta.fallbackAction"));
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: title,
    description,
    provider: {
      "@type": "Organization",
      name: t("common.brandName")
    },
    serviceType: title,
    areaServed: "Worldwide"
  };
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": `${title} | ${t("common.brandName")}`, "description": description, "structuredData": structuredData }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="bg-gradient-to-br from-brand-primary via-brand-technical-accent-dark to-brand-primary py-20"> <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"> <div class="text-center"> <h1 class="text-4xl sm:text-5xl font-bold text-brand-bg-light mb-6 leading-tight"> ${title} </h1> <p class="text-xl text-brand-text-secondary-dark mb-8 leading-relaxed"> ${description} </p> <div class="flex flex-col sm:flex-row gap-4 justify-center items-center"> <a href="/contact" class="inline-flex items-center px-8 py-4 bg-brand-technical-accent-light dark:bg-brand-technical-accent-dark text-brand-bg-light font-semibold rounded-lg hover:opacity-90 transition-all duration-200"> ${actionText} <svg class="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path> </svg> </a> <a href="/solutions" class="inline-flex items-center px-8 py-4 border-2 border-brand-bg-light text-brand-bg-light font-semibold rounded-lg hover:bg-brand-bg-light hover:text-brand-primary transition-all duration-200"> ${t("solutionDetail.viewAll")} </a> </div> </div> </div> </section> <section class="py-16 bg-brand-bg-light dark:bg-brand-bg-dark"> <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"> <div class="grid grid-cols-1 lg:grid-cols-2 gap-10"> <div> <h2 class="text-2xl font-bold text-brand-text-primary-light dark:text-brand-text-primary-dark mb-4"> ${t("solutionDetail.sections.whoFor")} </h2> <p class="text-brand-text-secondary-light dark:text-brand-text-secondary-dark leading-relaxed mb-8"> ${translateMaybeKey(solution.data.whoFor)} </p> <h3 class="text-xl font-semibold text-brand-text-primary-light dark:text-brand-text-primary-dark mb-4"> ${t("solutionDetail.sections.painPoints")} </h3> <ul class="space-y-3"> ${solution.data.painPoints.map((point) => renderTemplate`<li class="flex items-start text-brand-text-secondary-light dark:text-brand-text-secondary-dark"> <svg class="w-5 h-5 text-brand-critical-emphasis mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true"> <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path> </svg> ${translateMaybeKey(point)} </li>`)} </ul> </div> <div> <h3 class="text-xl font-semibold text-brand-text-primary-light dark:text-brand-text-primary-dark mb-4"> ${t("solutionDetail.sections.deliverables")} </h3> <ul class="space-y-3 mb-10"> ${solution.data.deliverables.map((deliverable) => renderTemplate`<li class="flex items-start text-brand-text-secondary-light dark:text-brand-text-secondary-dark"> <svg class="w-5 h-5 text-brand-positive-signal-light dark:text-brand-positive-signal-dark mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true"> <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path> </svg> ${translateMaybeKey(deliverable)} </li>`)} </ul> <div class="rounded-lg border border-brand-text-secondary-light/20 dark:border-brand-text-secondary-dark/25 bg-brand-surface-light dark:bg-brand-surface-dark p-6 space-y-4"> <div class="flex justify-between items-center"> <span class="text-sm font-medium text-brand-text-primary-light dark:text-brand-text-primary-dark">${t("solutionDetail.stats.timeline")}</span> <span class="text-sm text-brand-text-secondary-light dark:text-brand-text-secondary-dark">${translateMaybeKey(solution.data.timeline)}</span> </div> <div class="flex justify-between items-center"> <span class="text-sm font-medium text-brand-text-primary-light dark:text-brand-text-primary-dark">${t("solutionDetail.stats.model")}</span> <span class="text-sm text-brand-text-secondary-light dark:text-brand-text-secondary-dark">${t(`common.engagementModel.${solution.data.engagementModel}`)}</span> </div> <div class="flex justify-between items-center"> <span class="text-sm font-medium text-brand-text-primary-light dark:text-brand-text-primary-dark">${t("common.labels.productionReady")}</span> <span class="text-sm text-brand-text-secondary-light dark:text-brand-text-secondary-dark">${t("common.labels.readyCode")}</span> </div> </div> </div> </div> </div> </section> <section class="py-20 bg-brand-primary"> <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"> <h2 class="text-3xl font-bold text-brand-bg-light mb-6"> ${t("solutionDetail.cta.title", { action: actionText.toLowerCase() })} </h2> <p class="text-xl text-brand-text-secondary-dark mb-8 leading-relaxed"> ${t("solutionDetail.cta.description")} </p> <a href="/contact" class="inline-flex items-center px-8 py-4 bg-brand-technical-accent-light dark:bg-brand-technical-accent-dark text-brand-bg-light font-semibold rounded-lg hover:opacity-90 transition-all duration-200"> ${t("common.actions.startProject")} <svg class="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path> </svg> </a> </div> </section> ` })}`;
}, "/Users/yooololo/Desktop/Dev/Lorna Dev/lorna-pro/src/pages/solutions/[...slug].astro", void 0);

const $$file = "/Users/yooololo/Desktop/Dev/Lorna Dev/lorna-pro/src/pages/solutions/[...slug].astro";
const $$url = "/solutions/[...slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$,
  file: $$file,
  getStaticPaths,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
