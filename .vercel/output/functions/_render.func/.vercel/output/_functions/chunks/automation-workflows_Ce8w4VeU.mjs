import { c as createVNode, F as Fragment, _ as __astro_tag_component__ } from './astro/server_9P8XkXq2.mjs';
import { $ as $$Image } from './_astro_assets_DA_eDtcS.mjs';

const frontmatter = {
  "title": "content.solutions.automation.title",
  "description": "content.solutions.automation.description",
  "whoFor": "content.solutions.automation.whoFor",
  "painPoints": ["content.solutions.automation.painPoints.manualDeployments", "content.solutions.automation.painPoints.repetitiveTesting", "content.solutions.automation.painPoints.environmentDrift", "content.solutions.automation.painPoints.delayedFeedback", "content.solutions.automation.painPoints.humanError"],
  "deliverables": ["content.solutions.automation.deliverables.pipelines", "content.solutions.automation.deliverables.iac", "content.solutions.automation.deliverables.tests", "content.solutions.automation.deliverables.monitoring", "content.solutions.automation.deliverables.docs"],
  "timeline": "content.solutions.automation.timeline",
  "engagementModel": "fixed",
  "ctaText": "content.solutions.automation.ctaText",
  "order": 1
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

const url = "src/content/solutions/automation-workflows.mdx";
const file = "/Users/yooololo/Desktop/Dev/Lorna Dev/lorna-pro/src/content/solutions/automation-workflows.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, "astro-image":  props.components?.img ?? $$Image },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/Users/yooololo/Desktop/Dev/Lorna Dev/lorna-pro/src/content/solutions/automation-workflows.mdx";
__astro_tag_component__(Content, 'astro:jsx');

export { Content, __usesAstroImage, Content as default, file, frontmatter, getHeadings, url };
