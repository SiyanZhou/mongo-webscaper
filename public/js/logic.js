

$(document).ready(function () {

    $(document).on("click",".saveArticle", function () {
        event.preventDefault();
        var id = $(this).attr("id");
      
        $.ajax({
            url: "/api/savearticle",
            method: "POST",
            data: id
        });

    });

});


