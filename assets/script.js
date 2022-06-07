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
        $(gifBox).empty();

        // For loop goes here
        for (var result of data.results) {
            var h3El = $("<h3>");
            $(h3El).addClass("card p-3 bg-light text-dark");
            $(h3El).text(result.examples);
            $(gifBox).append(h3El);
        }
    });

    //giphy request
    $.ajax(giphyURL).then(function (response) {
        console.log(response);
    });
})

//Runs the functions
// init();