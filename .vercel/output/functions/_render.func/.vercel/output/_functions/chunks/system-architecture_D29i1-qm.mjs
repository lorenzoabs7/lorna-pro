import { c as createVNode, F as Fragment, _ as __astro_tag_component__ } from './astro/server_9P8XkXq2.mjs';
import { $ as $$Image } from './_astro_assets_DA_eDtcS.mjs';

const frontmatter = {
  "title": "content.solutions.architecture.title",
  "description": "content.solutions.architecture.description",
  "whoFor": "content.solutions.architecture.whoFor",
  "painPoints": ["content.solutions.architecture.painPoints.legacy", "content.solutions.architecture.painPoints.performance", "content.solutions.architecture.painPoints.inflexible", "content.solutions.architecture.painPoints.debt", "content.solutions.architecture.painPoints.scalability"],
  "deliverables": ["content.solutions.architecture.deliverables.documentation", "content.solutions.architecture.deliverables.refactor", "content.solutions.architecture.deliverables.optimization", "content.solutions.architecture.deliverables.scaling", "content.solutions.architecture.deliverables.migration"],
  "timeline": "content.solutions.architecture.timeline",
  "engagementModel": "fixed",
  "ctaText": "content.solutions.architecture.ctaText",
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

const url = "src/content/solutions/system-architecture.mdx";
const file = "/Users/yooololo/Desktop/Dev/Lorna Dev/lorna-pro/src/content/solutions/system-architecture.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, "astro-image":  props.components?.img ?? $$Image },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/Users/yooololo/Desktop/Dev/Lorna Dev/lorna-pro/src/content/solutions/system-architecture.mdx";
__astro_tag_component__(Content, 'astro:jsx');

export { Content, __usesAstroImage, Content as default, file, frontmatter, getHeadings, url };
