import { c as createVNode, F as Fragment, _ as __astro_tag_component__ } from './astro/server_9P8XkXq2.mjs';
import { $ as $$Image } from './_astro_assets_DA_eDtcS.mjs';

const frontmatter = {
  "title": "content.solutions.performance.title",
  "description": "content.solutions.performance.description",
  "whoFor": "content.solutions.performance.whoFor",
  "painPoints": ["content.solutions.performance.painPoints.cost", "content.solutions.performance.painPoints.latency", "content.solutions.performance.painPoints.inefficiency", "content.solutions.performance.painPoints.degradation", "content.solutions.performance.painPoints.ux"],
  "deliverables": ["content.solutions.performance.deliverables.audit", "content.solutions.performance.deliverables.infra", "content.solutions.performance.deliverables.app", "content.solutions.performance.deliverables.monitoring", "content.solutions.performance.deliverables.docs"],
  "timeline": "content.solutions.performance.timeline",
  "engagementModel": "fixed",
  "ctaText": "content.solutions.performance.ctaText",
  "order": 3
};
function getHeadings() {
  return [];
}
const __usesAstroImage = true;
function _createMdxContent(props) {
  return createVNode(Fragment, {});
}
function MDXContent(props = {}) {
  const {wrapper: MDXLayout} = props.components || ({});
  return MDXLayout ? createVNode(MDXLayout, {
    ...props,
    children: createVNode(_createMdxContent, {
      ...props
    })
  }) : _createMdxContent();
}

const url = "src/content/solutions/performance-optimization.mdx";
const file = "/Users/yooololo/Desktop/Dev/Lorna Dev/lorna-pro/src/content/solutions/performance-optimization.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, "astro-image":  props.components?.img ?? $$Image },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/Users/yooololo/Desktop/Dev/Lorna Dev/lorna-pro/src/content/solutions/performance-optimization.mdx";
__astro_tag_component__(Content, 'astro:jsx');

export { Content, __usesAstroImage, Content as default, file, frontmatter, getHeadings, url };
