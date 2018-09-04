// SETUP FOR APIFY>COM CRAWLER
function pageFunction(context) {
  var $ = context.jQuery;
  if (context.request.label === "EVENT") {
    function pageFunction(context) {
      var $ = context.jQuery;
      if (context.request.label === "EVENT") {
        var result = {
          name: $("#sectionHead > h1").text(),
          date: $("#detail > ul > li:nth-child(1) > a").text(),
          venue: $("#detail > ul > li.wide > a.cat-rev").html(),
          address: $("#detail > ul > li.wide").text(),
          url: window.location.href
        };
        return result;
      }
    }
    return result;
  }
}

let startHTML = `https://api.apify.com/v1/5EyWPb2cncNhD7hhm/crawlers/mJNiod6QQFmhSBLio/execute?token=Pu5WZ7o5t3PdfsTPCSuwXb55Z`
let lastExec = `https://api.apify.com/v1/5EyWPb2cncNhD7hhm/crawlers/mJNiod6QQFmhSBLio/execs?token=iXiFD2vg3SKvnHs9NEY3bPz9M`
let resultsHTML = `https://api.apify.com/v1/5EyWPb2cncNhD7hhm/crawlers/mJNiod6QQFmhSBLio/lastExec/results?token=iXiFD2vg3SKvnHs9NEY3bPz9M`

module.exports.startHTML = startHTML
module.exports.resultsHTML = resultsHTML
module.exports.lastExec= lastExec