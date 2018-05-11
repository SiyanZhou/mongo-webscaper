/// need to finish the changes to the tables 
var path = require("path");
var mongoose = require("mongoose");
var db = require("../models");
var axios = require("axios");
var cheerio = require("cheerio");

module.exports = function (app) {

  app.get("/scrape", function (req, res) {
    // First, we grab the body of the html with request
    axios.get("http://www.echojs.com/").then(function (response) {
      // Then, we load that into cheerio and save it to $ for a shorthand selector
      var $ = cheerio.load(response.data);

      // Now, we grab every h2 within an article tag, and do the following:
      $("article h2").each(function (i, element) {
        // Save an empty result object
        var result = {};

        // Add the text and href of every link, and save them as properties of the result object
        result.title = $(this)
          .children("a")
          .text();
        result.link = $(this)
          .children("a")
          .attr("href");

        // Create a new Article using the `result` object built from scraping
        db.Article.create(result)
          .then(function (dbArticle) {
            // View the added result in the console
            // console.log(dbArticle);
          })
          .catch(function (err) {
            // If an error occurred, send it to the client
            return res.json(err);
          });
      });

      // If we were able to successfully scrape and save an Article, send a message to the client
      db.Article.find({})
        .then(function (data) {

          var savedArticles = [];
          data.forEach(function (article) {
            var articleObject = {
              title: article.title,
              link: article.link,
              id: article._id
            }
            // console.log(articleObject.id); 
            savedArticles.push(articleObject);
          })


          res.render("index", { article: savedArticles });
        })
        .catch(function (err) {
          // If an error occurred, send it to the client
          res.json(err);
        });
    });
  });

  
  app.post("/api/savearticle", function (req, res) {
    db.Article.update(
      { _id: req },
      { $set: { Saved: true } },
      function (err, updatedA) {
        console.log(updatedA);


      });
  });

  app.get("/saved", function (req, res) {
    db.Article.find({ Saved: true })
      .then(function (data) {

        var savedArticles = [];
        data.forEach(function (article) {
          var articleObject = {
            title: article.title,
            link: article.link,
            id: article._id
          }
          // console.log(articleObject.id); 
          savedArticles.push(articleObject);
        })


        res.render("saved", { article: savedArticles });
      })
      .catch(function (err) {
        // If an error occurred, send it to the client
        res.json(err);
      });

    });

  }