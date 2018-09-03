// SETUP FOR APIFY>COM CRAWLER
function pageFunction(context) {
  var $ = context.jQuery;
  if (context.request.label === "EVENT") {
    var result = {
      title: $("#sectionHead > h1").text(),
      date2: $("TODO").text(),
      date: $("#detail > ul > li:nth-child(1) > a").text(),
      venue: $("#detail > ul > li.wide").text(),
      venue2: $(".cat-rev").text()
    };
    return result;
  }
}

let startHTML = `https://api.apify.com/v1/5EyWPb2cncNhD7hhm/crawlers/mJNiod6QQFmhSBLio/execute?token=Pu5WZ7o5t3PdfsTPCSuwXb55Z`
let lastExec = `https://api.apify.com/v1/5EyWPb2cncNhD7hhm/crawlers/mJNiod6QQFmhSBLio/execs?token=iXiFD2vg3SKvnHs9NEY3bPz9M`
let results = `https://api.apify.com/v1/5EyWPb2cncNhD7hhm/crawlers/mJNiod6QQFmhSBLio/lastExec/results?token=iXiFD2vg3SKvnHs9NEY3bPz9M`