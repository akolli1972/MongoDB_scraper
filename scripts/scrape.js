var axios = require("axios");
var cheerio = require("cheerio");

var scrape = function(cb) {
  let results = [];
  axios
    .get("https://www.ajc.com/")
    .then(function(response) {
      // Then, we load that into cheerio and save it to $ for a shorthand selector
      var $ = cheerio.load(response.data);
      // Now, we grab every h2 within an article tag, and do the following:
      $(".tease__heading__link").each(function(i, element) {
        // Save an empty result object
        var result = {};

        // Add the text and href of every link, and save them as properties of the result object
        result.headline = $(this)
          // .children(".thumb-desc")
          .text()
          .trim();
        result.summary = $(this)
          // .find(".bold")
          .attr("href");

        results.push(result);
        // // Create a new Article using the `result` object built from scraping
      });

      cb(results);
    })
    .catch(err => console.error(err));
};
module.exports = scrape;
