var newsDocs = [];



function loadNewsAPI() {
    var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
    url += '?' + $.param({
        'api-key': "1fb146a3913f44919d26b45822fa57ae",
        'q': "China",
        'begin_date': "2014" + "0101",
        'end_date': "2014" + "1231"
    });

    $.ajax({
        url: url,
        method: 'GET',
    }).done(function (result) {
        console.log(result);
        let docs = result.response.docs
        //   console.log(docs)
        updateArticles(docs);
        return result;

    }).fail(function (err) {
        throw err;
    });
};

$(document).ready(function () {
    $("#scrape").on("click", function () {
        loadNewsAPI();

    })


});



$(document).on("click", ".saveArticle", function () {
    event.preventDefault();
    var article = newsDocs[Number($(this).attr("id"))];

    var data = {
        headline: article.headline.main,
        publishDate: article.pub_date,
        section: article.section_name,
        website: article.web_url
    }
    console.log(data);

    $.ajax({
        url: "/api/savearticle",
        method: "POST",
        data: data
    });

});

//Update articles based on search criteria 
function updateArticles(docs) {
    newsDocs = docs;

    var numberArticles = 10;
    $('#articles').html("")
    for (var i = 0; i < newsDocs.length; i++) {
        console.log("repeating");
        var article = newsDocs[i];
        var articleCount = i + 1;

        var $articleSelection = $("<article>");
        $articleSelection.addClass("selection");
        $articleSelection.append("<button class='btn black saveArticle' id='" + i + "' type='save' name='action'>Save Article</button>");
        $articleSelection.attr("id", "article-selection-" + articleCount);

        $("#articles").append($articleSelection);

        var headline = article.headline.main;
        if (headline) {
            $articleSelection.append("<h5 class='articleHead'>" + headline + "</h5>");
        }

        var publishDate = article.pub_date;
        if (publishDate) {
            $articleSelection.append("<h5 class='pubDate'> Publication Date: " + publishDate + "</h5>");
        }

        var byline = article.byline && article.byline.person ? article.byline.person
            .map(function (person) {
                return person.firstname + " " + person.lastname;
            }).join(", ") : false;
        if (byline) {
            $articleSelection.append("<h5>Writer: " + byline + "</h5>");
        }

        var section = article.section_name;
        if (section) {
            $articleSelection.append("<h5>Section: " + section + "</h5>");
        }

        var website = article.web_url;
        if (website) {
            $articleSelection.append("<a href= '" + website + "' class='website'>" + website + "</a>")
        }
    }


};

