import { c as createVNode, F as Fragment, _ as __astro_tag_component__ } from './astro/server_9P8XkXq2.mjs';
import { $ as $$Image } from './_astro_assets_DA_eDtcS.mjs';

const frontmatter = {
  "title": "content.work.apiPerformance.title",
  "client": "content.work.apiPerformance.client",
  "problem": "content.work.apiPerformance.problem",
  "constraints": ["content.work.apiPerformance.constraints.contracts", "content.work.apiPerformance.constraints.schema", "content.work.apiPerformance.constraints.uptime", "content.work.apiPerformance.constraints.maintenance"],
  "approach": "content.work.apiPerformance.approach",
  "deliverables": ["content.work.apiPerformance.deliverables.audit", "content.work.apiPerformance.deliverables.caching", "content.work.apiPerformance.deliverables.query", "content.work.apiPerformance.deliverables.load", "content.work.apiPerformance.deliverables.dashboard", "content.work.apiPerformance.deliverables.testing"],
  "results": ["content.work.apiPerformance.results.latency", "content.work.apiPerformance.results.db", "content.work.apiPerformance.results.uptime", "content.work.apiPerformance.results.cost", "content.work.apiPerformance.results.ux"],
  "stack": ["Node.js", "PostgreSQL", "Redis", "AWS ELB", "DataDog", "k6"],
  "timeline": "content.work.apiPerformance.timeline",
  "featured": true,
  "order": 2
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

const url = "src/content/work/api-performance-optimization.mdx";
const file = "/Users/yooololo/Desktop/Dev/Lorna Dev/lorna-pro/src/content/work/api-performance-optimization.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, "astro-image":  props.components?.img ?? $$Image },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/Users/yooololo/Desktop/Dev/Lorna Dev/lorna-pro/src/content/work/api-performance-optimization.mdx";
__astro_tag_component__(Content, 'astro:jsx');

export { Content, __usesAstroImage, Content as default, file, frontmatter, getHeadings, url };
