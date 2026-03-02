import { d as createAstro, e as createComponent, m as maybeRenderHead, f as renderTemplate, g as addAttribute, r as renderComponent, F as Fragment } from '../chunks/astro/server_9P8XkXq2.mjs';
import { g as getI18n, $ as $$BaseLayout } from '../chunks/BaseLayout_DR78Hthj.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro$8 = createAstro("https://lornadev.com");
const $$HeroSection = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$8, $$props, $$slots);
  Astro2.self = $$HeroSection;
  const { t } = getI18n(Astro2);
  const checks = [
    t("home.hero.checks.first"),
    t("home.hero.checks.second"),
    t("home.hero.checks.third")
  ];
  return renderTemplate`${maybeRenderHead()}<section class="bg-brand-bg-light dark:bg-brand-bg-dark py-20 lg:py-32"> <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> <div class="text-center"> <h1 class="text-4xl sm:text-5xl lg:text-6xl font-semibold text-brand-text-primary-light dark:text-brand-text-primary-dark mb-6 leading-tight font-serif"> ${t("home.hero.titlePrefix")} <span class="text-brand-primary dark:text-brand-technical-accent-dark">${t("home.hero.titleHighlight")}</span> </h1> <p class="text-xl sm:text-2xl text-brand-text-secondary-light dark:text-brand-text-secondary-dark mb-8 max-w-3xl mx-auto leading-relaxed"> ${t("home.hero.description")} </p> <div class="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"> <a href="/contact" class="inline-flex items-center px-8 py-4 bg-brand-primary dark:bg-brand-technical-accent-dark text-brand-bg-light font-semibold rounded-lg hover:opacity-90 transition-all duration-200"> ${t("home.hero.ctaPrimary")} <svg class="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path> </svg> </a> <a href="/solutions" class="inline-flex items-center px-8 py-4 border-2 border-brand-primary dark:border-brand-technical-accent-dark text-brand-primary dark:text-brand-technical-accent-dark font-semibold rounded-lg hover:bg-brand-primary dark:hover:bg-brand-technical-accent-dark hover:text-brand-bg-light transition-all duration-200"> ${t("home.hero.ctaSecondary")} </a> </div> <div class="flex flex-wrap justify-center items-center gap-8 text-sm text-brand-text-secondary-light dark:text-brand-text-secondary-dark"> ${checks.map((check) => renderTemplate`<div class="flex items-center"> <svg class="w-5 h-5 text-brand-positive-signal-light dark:text-brand-positive-signal-dark mr-2" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true"> <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path> </svg> ${check} </div>`)} </div> </div> </div> </section>`;
}, "/Users/yooololo/Desktop/Dev/Lorna Dev/lorna-pro/src/components/sections/HeroSection.astro", void 0);

const $$Astro$7 = createAstro("https://lornadev.com");
const $$ProofSection = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$7, $$props, $$slots);
  Astro2.self = $$ProofSection;
  const { t } = getI18n(Astro2);
  const cards = [
    {
      title: t("home.proof.cards.delivery.title"),
      description: t("home.proof.cards.delivery.description"),
      tone: "positive"
    },
    {
      title: t("home.proof.cards.reliability.title"),
      description: t("home.proof.cards.reliability.description"),
      tone: "accent"
    },
    {
      title: t("home.proof.cards.scaling.title"),
      description: t("home.proof.cards.scaling.description"),
      tone: "primary"
    }
  ];
  return renderTemplate`${maybeRenderHead()}<section class="py-16 bg-brand-text-secondary-light/5 dark:bg-brand-text-secondary-dark/5 border-t-2 border-t-brand-primary"> <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> <div class="text-center mb-12"> <h2 class="text-3xl font-bold text-brand-text-primary-light dark:text-brand-text-primary-dark mb-4">${t("home.proof.title")}</h2> <p class="text-lg text-brand-text-secondary-light dark:text-brand-text-secondary-dark max-w-2xl mx-auto"> ${t("home.proof.description")} </p> </div> <div class="grid grid-cols-1 md:grid-cols-3 gap-8"> ${cards.map((card) => renderTemplate`<div class="text-center p-6 bg-brand-bg-light dark:bg-brand-surface-dark rounded-lg shadow-sm border border-brand-text-secondary-light/20 dark:border-brand-text-secondary-dark/20"> <div${addAttribute(`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${card.tone === "positive" ? "bg-brand-positive-signal-light/10 dark:bg-brand-positive-signal-dark/10" : card.tone === "accent" ? "bg-brand-technical-accent-light/10 dark:bg-brand-technical-accent-dark/10" : "bg-brand-primary/10 dark:bg-brand-primary/20"}`, "class")}> ${card.tone === "positive" && renderTemplate`<svg class="w-8 h-8 text-brand-positive-signal-light dark:text-brand-positive-signal-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path> </svg>`} ${card.tone === "accent" && renderTemplate`<svg class="w-8 h-8 text-brand-technical-accent-light dark:text-brand-technical-accent-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path> </svg>`} ${card.tone === "primary" && renderTemplate`<svg class="w-8 h-8 text-brand-primary dark:text-brand-technical-accent-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path> </svg>`} </div> <h3 class="text-xl font-semibold text-brand-text-primary-light dark:text-brand-text-primary-dark mb-2">${card.title}</h3> <p class="text-brand-text-secondary-light dark:text-brand-text-secondary-dark">${card.description}</p> </div>`)} </div> </div> </section>`;
}, "/Users/yooololo/Desktop/Dev/Lorna Dev/lorna-pro/src/components/sections/ProofSection.astro", void 0);

const $$Astro$6 = createAstro("https://lornadev.com");
const $$SolutionsTeaser = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$6, $$props, $$slots);
  Astro2.self = $$SolutionsTeaser;
  const { t } = getI18n(Astro2);
  const cards = [
    { id: "automation", href: "/solutions#automation" },
    { id: "architecture", href: "/solutions#architecture" },
    { id: "performance", href: "/solutions#performance" },
    { id: "integrations", href: "/solutions#integrations" },
    { id: "tools", href: "/solutions#tools" },
    { id: "mvp", href: "/solutions#mvp" }
  ];
  return renderTemplate`${maybeRenderHead()}<section class="py-20 bg-brand-bg-light dark:bg-brand-bg-dark border-t-2 border-t-brand-primary"> <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> <div class="text-center mb-16"> <h2 class="text-3xl font-bold text-brand-text-primary-light dark:text-brand-text-primary-dark mb-4">${t("home.solutionsTeaser.title")}</h2> <p class="text-lg text-brand-text-secondary-light dark:text-brand-text-secondary-dark max-w-2xl mx-auto"> ${t("home.solutionsTeaser.description")} </p> </div> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"> ${cards.map((card) => renderTemplate`<div class="group p-6 bg-brand-surface-light dark:bg-brand-surface-dark rounded-lg border border-brand-text-secondary-light/20 dark:border-brand-text-secondary-dark/20 hover:border-brand-primary/40 dark:hover:border-brand-technical-accent-dark/50 transition-all duration-200"> <div class="w-12 h-12 bg-brand-primary/10 dark:bg-brand-primary/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-brand-primary/15 dark:group-hover:bg-brand-primary/25 transition-colors"> <svg class="w-6 h-6 text-brand-primary dark:text-brand-technical-accent-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"> ${card.id === "automation" && renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate` <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path> ` })}`} ${card.id === "architecture" && renderTemplate`<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>`} ${card.id === "performance" && renderTemplate`<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>`} ${card.id === "integrations" && renderTemplate`<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>`} ${card.id === "tools" && renderTemplate`<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>`} ${card.id === "mvp" && renderTemplate`<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>`} </svg> </div> <h3 class="text-xl font-semibold text-brand-text-primary-light dark:text-brand-text-primary-dark mb-3"> ${t(`home.solutionsTeaser.cards.${card.id}.title`)} </h3> <p class="text-brand-text-secondary-light dark:text-brand-text-secondary-dark mb-4"> ${t(`home.solutionsTeaser.cards.${card.id}.description`)} </p> <a${addAttribute(card.href, "href")} class="text-brand-primary dark:text-brand-technical-accent-dark font-medium hover:underline transition-colors"> ${t(`home.solutionsTeaser.cards.${card.id}.link`)} →
</a> </div>`)} </div> <div class="text-center"> <a href="/solutions" class="inline-flex items-center px-8 py-4 bg-brand-primary dark:bg-brand-technical-accent-dark text-brand-bg-light font-semibold rounded-lg hover:opacity-90 transition-all duration-200"> ${t("home.solutionsTeaser.cta")} <svg class="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path> </svg> </a> </div> </div> </section>`;
}, "/Users/yooololo/Desktop/Dev/Lorna Dev/lorna-pro/src/components/sections/SolutionsTeaser.astro", void 0);

const $$Astro$5 = createAstro("https://lornadev.com");
const $$OnlineBusinessSection = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$OnlineBusinessSection;
  const { t } = getI18n(Astro2);
  const cards = [
    { id: "products", tone: "primary" },
    { id: "solutions", tone: "accent" },
    { id: "fulfillment", tone: "positive" }
  ];
  const checks = [
    t("home.onlineBusiness.checks.first"),
    t("home.onlineBusiness.checks.second"),
    t("home.onlineBusiness.checks.third")
  ];
  return renderTemplate`${maybeRenderHead()}<section id="online-business" class="py-20 bg-brand-bg-light dark:bg-brand-bg-dark border-t-2 border-t-brand-primary"> <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> <div class="text-center mb-12"> <span class="inline-flex items-center px-4 py-1.5 rounded-full bg-brand-primary/10 dark:bg-brand-primary/20 text-sm font-semibold text-brand-primary dark:text-brand-technical-accent-dark mb-4"> ${t("home.onlineBusiness.eyebrow")} </span> <h2 class="text-3xl font-bold text-brand-text-primary-light dark:text-brand-text-primary-dark mb-4"> ${t("home.onlineBusiness.title")} </h2> <p class="text-lg text-brand-text-secondary-light dark:text-brand-text-secondary-dark max-w-3xl mx-auto leading-relaxed"> ${t("home.onlineBusiness.description")} </p> </div> <div class="mb-12 bg-brand-surface-light dark:bg-brand-surface-dark rounded-lg border border-brand-text-secondary-light/20 dark:border-brand-text-secondary-dark/20 p-6 sm:p-8"> <p class="text-brand-text-primary-light dark:text-brand-text-primary-dark text-lg leading-relaxed"> ${t("home.onlineBusiness.statement")} </p> </div> <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"> ${cards.map((card) => renderTemplate`<div class="p-6 bg-brand-surface-light dark:bg-brand-surface-dark rounded-lg border border-brand-text-secondary-light/20 dark:border-brand-text-secondary-dark/20"> <div${addAttribute(`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${card.tone === "primary" ? "bg-brand-primary/10 dark:bg-brand-primary/20" : card.tone === "accent" ? "bg-brand-technical-accent-light/10 dark:bg-brand-technical-accent-dark/10" : "bg-brand-positive-signal-light/10 dark:bg-brand-positive-signal-dark/10"}`, "class")}> ${card.id === "products" && renderTemplate`<svg class="w-6 h-6 text-brand-primary dark:text-brand-technical-accent-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path> </svg>`} ${card.id === "solutions" && renderTemplate`<svg class="w-6 h-6 text-brand-technical-accent-light dark:text-brand-technical-accent-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a5 5 0 015 5m-5-5a5 5 0 00-5 5m0 0H5m2 0a5 5 0 005 5m0 0v2m0-2a5 5 0 005-5m-5 5a5 5 0 01-5-5m5 5a5 5 0 005-5"></path> </svg>`} ${card.id === "fulfillment" && renderTemplate`<svg class="w-6 h-6 text-brand-positive-signal-light dark:text-brand-positive-signal-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path> </svg>`} </div> <h3 class="text-xl font-semibold text-brand-text-primary-light dark:text-brand-text-primary-dark mb-3"> ${t(`home.onlineBusiness.cards.${card.id}.title`)} </h3> <p class="text-brand-text-secondary-light dark:text-brand-text-secondary-dark leading-relaxed"> ${t(`home.onlineBusiness.cards.${card.id}.description`)} </p> </div>`)} </div> <div class="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10"> <a href="/solutions" class="inline-flex items-center px-8 py-4 bg-brand-primary dark:bg-brand-technical-accent-dark text-brand-bg-light font-semibold rounded-lg hover:opacity-90 transition-all duration-200"> ${t("home.onlineBusiness.ctaPrimary")} </a> <a href="/contact" class="inline-flex items-center px-8 py-4 border-2 border-brand-primary dark:border-brand-technical-accent-dark text-brand-primary dark:text-brand-technical-accent-dark font-semibold rounded-lg hover:bg-brand-primary dark:hover:bg-brand-technical-accent-dark hover:text-brand-bg-light transition-all duration-200"> ${t("home.onlineBusiness.ctaSecondary")} </a> </div> <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-brand-text-secondary-light dark:text-brand-text-secondary-dark"> ${checks.map((check) => renderTemplate`<div class="flex items-center justify-center"> <svg class="w-5 h-5 text-brand-positive-signal-light dark:text-brand-positive-signal-dark mr-2" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true"> <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path> </svg> ${check} </div>`)} </div> </div> </section>`;
}, "/Users/yooololo/Desktop/Dev/Lorna Dev/lorna-pro/src/components/sections/OnlineBusinessSection.astro", void 0);

const $$Astro$4 = createAstro("https://lornadev.com");
const $$ProcessSection = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$ProcessSection;
  const { t } = getI18n(Astro2);
  const steps = [
    { id: "discovery", number: "1" },
    { id: "architecture", number: "2" },
    { id: "implementation", number: "3" },
    { id: "support", number: "4" }
  ];
  return renderTemplate`${maybeRenderHead()}<section class="py-20 bg-brand-surface-light dark:bg-brand-surface-dark border-t-4 border-t-brand-primary border-b border-b-brand-primary/20 dark:border-b-brand-primary/30"> <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> <div class="text-center mb-16"> <h2 class="text-3xl font-bold text-brand-text-primary-light dark:text-brand-text-primary-dark mb-4">${t("home.process.title")}</h2> <p class="text-lg text-brand-text-secondary-light dark:text-brand-text-secondary-dark max-w-2xl mx-auto"> ${t("home.process.description")} </p> </div> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"> ${steps.map((step) => renderTemplate`<div class="text-center"> <div class="w-16 h-16 bg-brand-primary/10 dark:bg-brand-primary/20 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold text-brand-primary dark:text-brand-technical-accent-dark"> ${step.number} </div> <h3 class="text-xl font-semibold text-brand-text-primary-light dark:text-brand-text-primary-dark mb-4"> ${t(`home.process.steps.${step.id}.title`)} </h3> <p class="text-brand-text-secondary-light dark:text-brand-text-secondary-dark leading-relaxed"> ${t(`home.process.steps.${step.id}.description`)} </p> <div class="mt-4 text-sm text-brand-text-secondary-light dark:text-brand-text-secondary-dark"> ${t(`home.process.steps.${step.id}.duration`)} </div> </div>`)} </div> <div class="text-center mt-16"> <p class="text-brand-text-secondary-light dark:text-brand-text-secondary-dark mb-6"> ${t("home.process.ctaLead")} </p> <a href="/contact" class="inline-flex items-center px-8 py-4 bg-brand-primary dark:bg-brand-technical-accent-dark text-brand-bg-light font-semibold rounded-lg hover:opacity-90 transition-all duration-200"> ${t("home.process.cta")} <svg class="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path> </svg> </a> </div> </div> </section>`;
}, "/Users/yooololo/Desktop/Dev/Lorna Dev/lorna-pro/src/components/sections/ProcessSection.astro", void 0);

const $$Astro$3 = createAstro("https://lornadev.com");
const $$OutcomesSection = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$OutcomesSection;
  const { t } = getI18n(Astro2);
  const outcomeItems = [
    { key: "release", number: "01" },
    { key: "reliability", number: "02" },
    { key: "throughput", number: "03" },
    { key: "cost", number: "04" }
  ];
  const statusItems = [
    { label: t("home.outcomes.statusLabels.architecture"), value: t("home.outcomes.status.architecture") },
    { label: t("home.outcomes.statusLabels.cicd"), value: t("home.outcomes.status.cicd") },
    { label: t("home.outcomes.statusLabels.monitoring"), value: t("home.outcomes.status.monitoring") },
    { label: t("home.outcomes.statusLabels.documentation"), value: t("home.outcomes.status.documentation") }
  ];
  return renderTemplate`${maybeRenderHead()}<section class="py-20 bg-brand-text-secondary-light/5 dark:bg-brand-text-secondary-dark/5 border-t-2 border-t-brand-primary"> <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> <div class="text-center mb-16"> <h2 class="text-3xl font-bold text-brand-text-primary-light dark:text-brand-text-primary-dark mb-4">${t("home.outcomes.title")}</h2> <p class="text-lg text-brand-text-secondary-light dark:text-brand-text-secondary-dark max-w-2xl mx-auto"> ${t("home.outcomes.description")} </p> </div> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"> ${outcomeItems.map((item) => renderTemplate`<div class="text-center p-6 bg-brand-bg-light dark:bg-brand-surface-dark rounded-lg shadow-sm border border-brand-text-secondary-light/20 dark:border-brand-text-secondary-dark/20"> <div class="text-4xl font-bold text-brand-technical-accent-light dark:text-brand-technical-accent-dark mb-2">${item.number}</div> <div class="text-sm font-medium text-brand-text-primary-light dark:text-brand-text-primary-dark mb-1">${t(`home.outcomes.items.${item.key}.label`)}</div> <div class="text-brand-text-secondary-light dark:text-brand-text-secondary-dark text-sm"> ${t(`home.outcomes.items.${item.key}.description`)} </div> </div>`)} </div> <div class="bg-brand-bg-light dark:bg-brand-surface-dark rounded-lg shadow-sm border border-brand-text-secondary-light/20 dark:border-brand-text-secondary-dark/20 p-8"> <div class="flex flex-col lg:flex-row items-start lg:items-center gap-8"> <div class="flex-1"> <h3 class="text-2xl font-bold text-brand-text-primary-light dark:text-brand-text-primary-dark mb-4">${t("home.outcomes.example.title")}</h3> <p class="text-brand-text-secondary-light dark:text-brand-text-secondary-dark mb-6 leading-relaxed"> ${t("home.outcomes.example.description")} </p> <div class="grid grid-cols-2 gap-4 text-sm"> <div> <span class="font-medium text-brand-text-primary-light dark:text-brand-text-primary-dark">${t("common.labels.before")}:</span> <span class="text-brand-text-secondary-light dark:text-brand-text-secondary-dark ml-2">${t("home.outcomes.example.before")}</span> </div> <div> <span class="font-medium text-brand-text-primary-light dark:text-brand-text-primary-dark">${t("common.labels.after")}:</span> <span class="text-brand-text-secondary-light dark:text-brand-text-secondary-dark ml-2">${t("home.outcomes.example.after")}</span> </div> </div> </div> <div class="lg:w-80"> <div class="bg-brand-text-secondary-light/10 dark:bg-brand-text-secondary-dark/10 rounded-lg p-6"> <div class="space-y-4"> ${statusItems.map((item) => renderTemplate`<div class="flex justify-between items-center"> <span class="text-sm font-medium text-brand-text-primary-light dark:text-brand-text-primary-dark">${item.label}</span> <span class="text-sm text-brand-positive-signal-light dark:text-brand-positive-signal-dark font-medium">${item.value}</span> </div>`)} </div> </div> </div> </div> </div> </div> </section>`;
}, "/Users/yooololo/Desktop/Dev/Lorna Dev/lorna-pro/src/components/sections/OutcomesSection.astro", void 0);

const $$Astro$2 = createAstro("https://lornadev.com");
const $$FAQSection = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$FAQSection;
  const { t } = getI18n(Astro2);
  const faqItems = ["quality", "engagement", "team", "stack", "timeline", "scope"];
  return renderTemplate`${maybeRenderHead()}<section class="py-20 bg-brand-bg-light dark:bg-brand-bg-dark border-t-2 border-t-brand-primary"> <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"> <div class="text-center mb-16"> <h2 class="text-3xl font-bold text-brand-text-primary-light dark:text-brand-text-primary-dark mb-4">${t("home.faq.title")}</h2> <p class="text-lg text-brand-text-secondary-light dark:text-brand-text-secondary-dark"> ${t("home.faq.description")} </p> </div> <div class="space-y-6"> ${faqItems.map((item) => renderTemplate`<div class="bg-brand-surface-light dark:bg-brand-surface-dark rounded-lg border border-brand-text-secondary-light/20 dark:border-brand-text-secondary-dark/20 p-6"> <h3 class="text-lg font-semibold text-brand-text-primary-light dark:text-brand-text-primary-dark mb-3"> ${t(`home.faq.items.${item}.question`)} </h3> <p class="text-brand-text-secondary-light dark:text-brand-text-secondary-dark leading-relaxed"> ${t(`home.faq.items.${item}.answer`)} </p> </div>`)} </div> <div class="text-center mt-12"> <p class="text-brand-text-secondary-light dark:text-brand-text-secondary-dark mb-6"> ${t("home.faq.ctaLead")} </p> <a href="/contact" class="inline-flex items-center px-8 py-4 bg-brand-primary text-brand-bg-light font-semibold rounded-lg hover:bg-brand-primary/90 transition-all duration-200"> ${t("home.faq.cta")} <svg class="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path> </svg> </a> </div> </div> </section>`;
}, "/Users/yooololo/Desktop/Dev/Lorna Dev/lorna-pro/src/components/sections/FAQSection.astro", void 0);

const $$Astro$1 = createAstro("https://lornadev.com");
const $$FinalCTA = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$FinalCTA;
  const { t } = getI18n(Astro2);
  const checks = [
    t("home.finalCta.checks.first"),
    t("home.finalCta.checks.second"),
    t("home.finalCta.checks.third")
  ];
  return renderTemplate`${maybeRenderHead()}<section class="py-20 bg-brand-surface-light dark:bg-brand-surface-dark border-t-4 border-t-brand-primary"> <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"> <h2 class="text-3xl sm:text-4xl font-bold text-brand-text-primary-light dark:text-brand-text-primary-dark mb-6"> ${t("home.finalCta.title")} </h2> <p class="text-xl text-brand-text-secondary-light dark:text-brand-text-secondary-dark mb-8 leading-relaxed"> ${t("home.finalCta.description")} </p> <div class="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"> <a href="/contact" class="inline-flex items-center px-8 py-4 bg-brand-primary dark:bg-brand-technical-accent-dark text-brand-bg-light font-semibold rounded-lg hover:opacity-90 transition-all duration-200"> ${t("home.finalCta.primary")} <svg class="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path> </svg> </a> <a href="/solutions" class="inline-flex items-center px-8 py-4 border-2 border-brand-primary dark:border-brand-technical-accent-dark text-brand-primary dark:text-brand-technical-accent-dark font-semibold rounded-lg hover:bg-brand-primary dark:hover:bg-brand-technical-accent-dark hover:text-brand-bg-light transition-all duration-200"> ${t("home.finalCta.secondary")} </a> </div> <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm text-brand-text-secondary-light dark:text-brand-text-secondary-dark"> ${checks.map((check) => renderTemplate`<div class="flex items-center justify-center"> <svg class="w-5 h-5 text-brand-positive-signal-light dark:text-brand-positive-signal-dark mr-2" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true"> <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path> </svg> ${check} </div>`)} </div> </div> </section>`;
}, "/Users/yooololo/Desktop/Dev/Lorna Dev/lorna-pro/src/components/sections/FinalCTA.astro", void 0);

const $$Astro = createAstro("https://lornadev.com");
const $$Index = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const { t } = getI18n(Astro2);
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: t("common.brandName"),
    description: t("home.meta.description"),
    url: "https://lornadev.com",
    sameAs: [],
    serviceType: [
      t("footer.services.automation"),
      t("footer.services.architecture"),
      t("footer.services.performance"),
      t("footer.services.integrations")
    ],
    areaServed: "Worldwide",
    provider: {
      "@type": "Organization",
      name: t("common.brandName")
    }
  };
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": t("home.meta.title"), "description": t("home.meta.description"), "structuredData": structuredData }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "HeroSection", $$HeroSection, {})} ${renderComponent($$result2, "ProofSection", $$ProofSection, {})} ${renderComponent($$result2, "SolutionsTeaser", $$SolutionsTeaser, {})} ${renderComponent($$result2, "OnlineBusinessSection", $$OnlineBusinessSection, {})} ${renderComponent($$result2, "ProcessSection", $$ProcessSection, {})} ${renderComponent($$result2, "OutcomesSection", $$OutcomesSection, {})} ${renderComponent($$result2, "FAQSection", $$FAQSection, {})} ${renderComponent($$result2, "FinalCTA", $$FinalCTA, {})} ` })}`;
}, "/Users/yooololo/Desktop/Dev/Lorna Dev/lorna-pro/src/pages/index.astro", void 0);

const $$file = "/Users/yooololo/Desktop/Dev/Lorna Dev/lorna-pro/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
