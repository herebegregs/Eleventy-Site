const Image = require("@11ty/eleventy-img");

module.exports = function(eleventyConfig) {

  eleventyConfig.setInputDirectory("src");
  eleventyConfig.setIncludesDirectory("layouts");
  eleventyConfig.setDataDirectory("data")
  eleventyConfig.addPassthroughCopy("./src/docs");
  eleventyConfig.addPassthroughCopy("./src/images");
  eleventyConfig.addPassthroughCopy("./src/content");
  eleventyConfig.addPassthroughCopy("./src/fonts");
  eleventyConfig.addPassthroughCopy("./src/js");
  eleventyConfig.addPassthroughCopy("./src/css");
  eleventyConfig.addNunjucksAsyncShortcode('svgIcon', async (src, alt, sizes) => {
    let metadata = await Image(src, {
      formats: ['svg'],
      dryRun: true,
    })
    return metadata.svg[0].buffer.toString()
  });
  eleventyConfig.setBrowserSyncConfig({
      notify: true,
      files: ['./_site/*.css', '/_site/*.js' ]
    });
  };