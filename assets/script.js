//Var declarations
var dictionaryBox = $("#search-result");
var gifBox = $("#gif");
var inputForm = $("#word-search-form");
var input = $("#q");
var submitBtn = $("#submit-btn");

//init function
// function init() {    
// }

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

        // For loop goes here
        for (var result of data.results) {
            console.log(result);
            var h2El = $("<h2>");
            h2El.addClass("card p-3 bg-light text-dark");
            $(h2El).text(result.id);
            dictionaryBox.append(h2El);

            var defEl = $("<p>");
            defEl.addClass("card p-3 bg-light text-dark");
            $(defEl).text(result.lexicalEntries[0].entries[0].senses[0].definitions);
            dictionaryBox.append(defEl);

            var etyEl = $("<p>");
            $(etyEl).text(result.lexicalEntries[0].entries[0].etymologies);
            if ($(etyEl).text.length > 2 ){
                etyEl.addClass("card p-3 bg-light text-dark");
                dictionaryBox.append(etyEl);
            } 
        }
    });

    //giphy request
    $.ajax(giphyURL).done(function (data) {
        console.log(data);
        $(gifBox).empty();

        // For loop goes here
            console.log(data.data.url);
            var imgEl = $("<iframe>");
            $(imgEl).attr("src", data.data.embed_url);
            imgEl.addClass("card p-3 bg-light text-dark");
            gifBox.append(imgEl);

            // var defEl = $("<p>");
            // defEl.addClass("card p-3 bg-light text-dark");
            // $(defEl).text(result.lexicalEntries[0].entries[0].senses[0].definitions);
            // gifBox.append(defEl);

            // var etyEl = $("<p>");
            // etyEl.addClass("card p-3 bg-light text-dark");
            // $(etyEl).text(result.lexicalEntries[0].entries[0].etymologies);
            // gifBox.append(etyEl);
    });
})

//Runs the functions
// init();