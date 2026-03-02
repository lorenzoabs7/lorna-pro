import { c as createVNode, F as Fragment, _ as __astro_tag_component__ } from './astro/server_9P8XkXq2.mjs';
import { $ as $$Image } from './_astro_assets_DA_eDtcS.mjs';

const frontmatter = {
  "title": "content.work.cicd.title",
  "client": "content.work.cicd.client",
  "problem": "content.work.cicd.problem",
  "constraints": ["content.work.cicd.constraints.devops", "content.work.cicd.constraints.legacy", "content.work.cicd.constraints.cloud", "content.work.cicd.constraints.compliance"],
  "approach": "content.work.cicd.approach",
  "deliverables": ["content.work.cicd.deliverables.pipeline", "content.work.cicd.deliverables.docker", "content.work.cicd.deliverables.iac", "content.work.cicd.deliverables.testing", "content.work.cicd.deliverables.security", "content.work.cicd.deliverables.documentation"],
  "results": ["content.work.cicd.results.speed", "content.work.cicd.results.stability", "content.work.cicd.results.consistency", "content.work.cicd.results.compliance", "content.work.cicd.results.productivity"],
  "stack": ["GitHub Actions", "Docker", "Terraform", "AWS", "Jest", "Cypress", "SonarQube"],
  "timeline": "content.work.cicd.timeline",
  "featured": true,
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

const url = "src/content/work/cicd-modernization.mdx";
const file = "/Users/yooololo/Desktop/Dev/Lorna Dev/lorna-pro/src/content/work/cicd-modernization.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, "astro-image":  props.components?.img ?? $$Image },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/Users/yooololo/Desktop/Dev/Lorna Dev/lorna-pro/src/content/work/cicd-modernization.mdx";
__astro_tag_component__(Content, 'astro:jsx');

export { Content, __usesAstroImage, Content as default, file, frontmatter, getHeadings, url };
