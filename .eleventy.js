module.exports = function(eleventyConfig) {
    // Set custom directories for input, output, includes, and data
    eleventyConfig.addPassthroughCopy("src/styles.css");
    eleventyConfig.setBrowserSyncConfig({
      files: './_site/css/**/*.css'
    });
  
    return {
      dir: {
        input: "src",
        includes: "_includes",
        data: "_data",
        output: "_site"
      }
    };
  };