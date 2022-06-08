//Var declarations
var dictionaryBox = $("#search-result");
var gifBox = $("#gif");
var inputForm = $("#word-search-form");
var input = $("#q");
var submitBtn = $("#submit-btn");

inputForm.on("submit", function (event) {
    event.preventDefault();
    //Oxford API info
    var dictionaryURL = "https://oxford-proxy-20220607.herokuapp.com/entries/en-us/" + input.val();
    //GIPHY API info
    var giphyURL = "https://api.giphy.com/v1/gifs/translate?api_key=f9Sfzf5olgyAfmNjLmdk5iCZob04128e&s=" + input.val();
    console.log(input.val());

    // dictionary request
    $.ajax(dictionaryURL).done(function (data) {
        console.log(data);
        $(dictionaryBox).empty();
        $(dictionaryBox).removeClass("d-none");
        $(dictionaryBox).addClass("d-block");

        var h2El = $("<h2>");
        $(h2El).text("Your Word!");
        dictionaryBox.append(h2El);
        // For loop goes here
        for (var result of data.results) {
            console.log(result);
            var dictContainer = $("<article>");
            dictContainer.addClass("card p-3 my-2 bg-light text-dark");
            dictionaryBox.append(dictContainer);

            var wordEl = $("<p>");
            $(wordEl).text(result.id);
            dictContainer.append(wordEl);

            var defEl = $("<p>");
            // defEl.addClass("card p-3 bg-light text-dark");
            $(defEl).text(result.lexicalEntries[0].entries[0].senses[0].definitions);
            dictContainer.append(defEl);

            var etyEl = $("<p>");
            $(etyEl).text(result.lexicalEntries[0].entries[0].etymologies);
            if ($(etyEl).text.length > 0) {
                // etyEl.addClass("card p-3 bg-light text-dark");
                dictContainer.append(etyEl);
            }
        }
    });

    //giphy request
    $.ajax(giphyURL).done(function (data) {
        console.log(data);
        $(gifBox).empty();
        $(gifBox).removeClass("d-none");
        $(gifBox).addClass("d-block");

        //Create image element
        console.log(data.data.url);
        var headEl = $("<h2>");
        $(headEl).text("Your Word as a Fun GIF!");
        gifBox.append(headEl);

        var imgEl = $("<iframe>");
        $(imgEl).attr("src", data.data.embed_url);
        imgEl.addClass("card p-3 bg-light text-dark");
        gifBox.append(imgEl);
    });
});