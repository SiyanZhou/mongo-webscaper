/// need to finish the changes to the tables 
var path = require("path");
var gdp = require("../models/models.js");
var SavedArticles = require("../models/savedarticles.js");

module.exports = function (app) {


  app.get("/submit/:year/:category", function (req, res) {

    var yearChosen = req.params.year;
    console.log(yearChosen);
    var categoryChosen = req.params.category;
    console.log(categoryChosen);
    // if (categoryChosen = "gdp") {
    //   var table = gdp;
    // }

    gdp.findAll({
      attributes: ['code', 'gdpIdx'],
      where: { year: yearChosen }
    }
    ).then(function (mapData) {
      var Data = {
        "took": 492,
        "timed_out": false,
        "_shards": {
          "total": 5,
          "successful": 3,
          "failed": 0
        },
        "hits": {
          "total": 30111166,
          "max_score": 0,
          "hits": []
        },
        "aggregations": {
          "world_map": {
            "doc_count_error_upper_bound": 0,
            "sum_other_doc_count": 0,
            "buckets": []
          }
        }
      };

      mapData.forEach(function (gdp) {

        var countryInfo = {
          "key": gdp.dataValues.code,
          "doc_count": gdp.dataValues.gdpIdx
        }
        Data.aggregations.world_map.buckets.push(countryInfo);
      });
      res.send(JSON.stringify(Data));

      console.log(Data);
    });
  });

  app.post("/api/savearticle", function (req, res) {

    SavedArticles.create({
      title: req.body.headline,
      date: req.body.publishDate,
      section: req.body.section,
      link: req.body.website

    }).then(function (saveart) {
      res.json(saveart);
    })
  });

  app.get("/api/articles/saved", function (req, res) {

    SavedArticles.findAll({
      attributes: ['title', "date", "section", 'link']

    }).then(function (data) {
    var savedArticles = [];
      data.forEach(function(article){
        savedArticles.push(article.dataValues);
      })

      // console.log(savedArticles);
      res.render("index", {article: savedArticles});
    });
  });

}