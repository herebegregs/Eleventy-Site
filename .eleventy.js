module.exports = function(eleventyConfig) {
  eleventyConfig.setInputDirectory("src");
  eleventyConfig.setIncludesDirectory("layouts");
  eleventyConfig.addPassthroughCopy("images");
  eleventyConfig.addPassthroughCopy("js");
  eleventyConfig.addPassthroughCopy("styles");
  eleventyConfig.setBrowserSyncConfig({
      notify: true,
      files: './_site/*.css'
    });
  };