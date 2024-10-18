module.exports = function(eleventyConfig) {
  eleventyConfig.setInputDirectory("src");
  eleventyConfig.setIncludesDirectory("layouts");
  eleventyConfig.addPassthroughCopy("./src/images");
  eleventyConfig.addPassthroughCopy("./src/js");
  eleventyConfig.addPassthroughCopy("./src/css");
  eleventyConfig.setBrowserSyncConfig({
      notify: true,
      files: './_site/*.css'
    });
  };