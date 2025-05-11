import markdownIt from "markdown-it";
import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";

export default async function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("assets");

  const md = markdownIt({
    html: true,
    linkify: true,
    typographer: true,
  });
  eleventyConfig.setLibrary("md", md);

  eleventyConfig.addFilter("readableDate", (dateObj) => {
    return new Intl.DateTimeFormat("es", { dateStyle: "long" }).format(dateObj);
  });

  eleventyConfig.addCollection("blog", function (collectionApi) {
    return collectionApi
      .getFilteredByGlob("content/blog/**/index.md")
      .reverse();
  });

  eleventyConfig.addLayoutAlias("post", "single.html");

  eleventyConfig.addLayoutAlias("homepage", "index.html");

  eleventyConfig.addLayoutAlias("blog_home", "blog-home.html");

  eleventyConfig.addLayoutAlias("about", "about.html");

  eleventyConfig.addPlugin(syntaxHighlight);

  eleventyConfig.addPairedShortcode("quote", async function (content) {
    return `<div class="quote"> ${content} </div>`;
  });

  return {
    dir: {
      input: "content",
      includes: "../_templates",
      data: "_data",
      output: "_site",
    },
    templateFormats: ["md", "njk", "html"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
}
