import { b as createAstro, c as createComponent, d as addAttribute, e as renderHead, f as renderSlot, a as renderTemplate } from "./astro/server.COULYAGe.js";
import "piccolore";
import "html-escaper";
import "clsx";
/* empty css                                          */
const $$Astro = createAstro("https://shuhuNB515.github.io");
const $$BaseLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro = $$result.createAstro($$Astro, $$props, $$slots);
  Astro.self = $$BaseLayout;
  const { title = "Project", description = "Built with Astro" } = Astro.props;
  return renderTemplate`<html data-source-file="src/layouts/BaseLayout.astro" data-source-line-start="11" data-source-line-end="21" lang="en">
  <head data-source-file="src/layouts/BaseLayout.astro" data-source-line-start="12" data-source-line-end="17">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description"${addAttribute(description, "content")}>
    <title data-source-file="src/layouts/BaseLayout.astro" data-source-line-start="16" data-source-line-end="16">${title}</title>
  ${renderHead()}</head>
  <body data-source-file="src/layouts/BaseLayout.astro" data-source-line-start="18" data-source-line-end="20">
    ${renderSlot($$result, $$slots.default)}
  </body></html>`;
}, "/home/han/桌面/智取未来（Vue）/code/src/layouts/BaseLayout.astro", void 0);
export {
  $$BaseLayout as $
};
