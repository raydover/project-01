//Var declarations
var dictionaryBox = $("#search-result");
var gifBox = $("#gif");
var inputForm = $("#word-search-form");
var resultsEl = $("#results");
var input = $("#q");
var submitBtn = $("#submit-btn");

function search(value) {
    //Oxford API info
    var dictionaryURL = "https://oxford-proxy-20220607.herokuapp.com/entries/en-us/" + value;
    //GIPHY API info
    var giphyURL = "https://api.giphy.com/v1/gifs/translate?api_key=f9Sfzf5olgyAfmNjLmdk5iCZob04128e&s=" + value;

    //Dictionary request
    $.ajax(dictionaryURL).done(function (data) {
        console.log(data);
        $(dictionaryBox).empty();
        $(dictionaryBox).removeClass("d-none");
        $(dictionaryBox).addClass("d-block");

        //Create title for dictionary card
        var h2El = $("<h2>");
        $(h2El).text("Your Word!");
        dictionaryBox.append(h2El);

        for (var result of data.results) {
            //Create container for dictionary results
            var dictContainer = $("<article>");
            dictContainer.addClass("card p-3 my-2 bg-light text-dark");
            dictionaryBox.append(dictContainer);

            //Display dictionary word
            var wordEl = $("<p>");
            $(wordEl).text(result.id);
            dictContainer.append(wordEl);

            //Display dictionary definiton
            var defEl = $("<p>");
            $(defEl).text(result.lexicalEntries[0].entries[0].senses[0].definitions);
            dictContainer.append(defEl);

            //Display etymology
            var etyEl = $("<p>");
            $(etyEl).text(result.lexicalEntries[0].entries[0].etymologies);
            if ($(etyEl).text.length > 0) dictContainer.append(etyEl);
        }

        //pushes searched items to local storage
        var searchedItems = JSON.parse(localStorage.getItem("searchTerm")) || [];

        if (!searchedItems.includes(value)) {
            searchedItems.push(value);
            localStorage.setItem("searchTerm", JSON.stringify(searchedItems));
        }
        displaySearchHistory();
    });

    //Giphy request
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

        //Display image element
        var imgEl = $("<iframe>");
        $(imgEl).attr("src", data.data.embed_url);
        imgEl.addClass("card p-3 bg-light text-dark");
        gifBox.append(imgEl);
    });
}

//adds previously searched terms to the list below the search button
function displaySearchHistory() {
    var searchedItems = JSON.parse(localStorage.getItem("searchTerm")) || [];
    resultsEl.empty();
    for (var item of searchedItems) {
        var inputTextEl = $("<h2>");
        console.log(item);
        inputTextEl.text(item);
        resultsEl.append(inputTextEl);
        inputTextEl.attr("data-term", item);
    }
}

//init
function init() {
    displaySearchHistory();
}

//listens for submit on the input form
inputForm.on("submit", function (event) {
    event.preventDefault();
    search(input.val());
});

//listens for clicks on the results text
resultsEl.on("click", "h2", function () {
    var term = $(this).data("term");
    search(term);
})

//Runs the whole thing
init();