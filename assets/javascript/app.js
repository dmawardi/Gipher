// Variable Declaration
// 
var games = ['Cyber Punk', 'Apex Legends', 'Fortnite', 'Devil May Cry', 'StarCraft', 'Diablo', 'Grand Theft Auto', 'Red Dead Redemption', 'Tomb Raider', 'Mario Kart', 'Super Mario', 'Final Fantasy'];
var results = {};
var gifImageURLs = [];
var gifImageStills = [];

var apiKey = 'api_key=wqxHRPOli6qO50YxXqMbQ1wYnC3FPGhJ';
var searchSyntax = 'https://api.giphy.com/v1/gifs/search?';

// Function List
// 
// Takes in an array (ex. games) and outputs each item as a button in the btnArea
function RenderButtonsFrom(array) {
    // Prepare container div for button appending
    var container = $('<div>');
    container.addClass('container  col-12');

    // Iterate through array producing a button for each item
    for (var i = 0; i < array.length; i++) {
        var button = $('<button>');
        button.addClass('btn btn-info');
        button.attr('id', 'topicButtons');
        // Create custom text and data attribute
        button.attr('data-game', array[i]);
        button.text(array[i]);
        // Append button to container
        container.append(button);
    }

    var buttonArea = $('#btnArea');

    // Empty and reappend the buttons to the button area
    buttonArea.empty();
    buttonArea.append(container);
}

// Render results from results array. Display to results area div
function RenderResultsFrom(array) {

    var resultsArea = $('#resultsArea');
    resultsArea.empty();
    // Declare variables
    var embedURLs = [];
    var embedStills = [];
    var titles = [];
    var ids = [];
    var ratings = [];

    // Extract required information from response
    [embedURLs, embedStills] = ExtractEmbedURLs(array);
    titles = ExtractTitles(array);
    ids = ExtractIDs(array);
    ratings = ExtractRatings(array);

    // Iterate through embed urls, appending images to results area
    for (var i = 0; i < embedURLs.length; i++) {
        var container = $('<div>');
        var gifImage = $('<img>');
        var stillImage = $('<img>');
        var ratingsText = $('<p>');

        // Build gif image attributes
        gifImage.addClass('img-thumbnail');
        // Suffix the id with -gif to denote the gif version of image
        gifImage.attr('id', ids[i] + '-gif');
        gifImage.attr('src', embedURLs[i]);
        gifImage.attr('alt', titles[i]);
        gifImage.attr('data-GIF', titles[i]);

        // Build still image attributes
        stillImage.addClass('img-thumbnail');
        // Suffix the id with -gif to denote the still version of image
        stillImage.attr('id', ids[i] + '-still');
        stillImage.attr('src', embedStills[i]);
        stillImage.attr('alt', titles[i]);
        stillImage.attr('data-still', titles[i]);

        // Build ratings text
        ratingsText.text('Rating: ' + ratings[i].toUpperCase());

        // Add container attributes
        container.addClass('container');
        container.attr('id', 'imageBox');
        // Append images to container
        container.append(gifImage);
        container.append(stillImage);
        container.append(ratingsText);

        // Append container to results
        resultsArea.append(container);
    }

}

// Function to convert titles for API Calls
function TitleConverter(gameName) {
    var searchTerm = '';

    // Iterate through game name
    for (var i = 0; i < gameName.length; i++) {
        // If there's a space, replace with a + for API query
        if (gameName[i] === ' ') {
            searchTerm += '+';

            // Else, use letter
        } else {
            searchTerm += gameName[i];
        }
    }
    return searchTerm
}

// Search GIPHY API using search syntax
function SearchAPICall(searchTerm) {
    $.ajax({
        // Build search query using components
        url: searchSyntax + apiKey + '&q=' + searchTerm,
        method: "GET"

    }).then(function (response) {
        // Assign response to results for future manipulation
        results = response;
        // Extract embed urls
        RenderResultsFrom(results);
    });
}

// Extract titles from results
function ExtractTitles(results) {
    var titles = [];

    // For each item returned in result, append to embedURLs array
    for (var i = 0; i < results.data.length; i++) {
        titles.push(results.data[i].title);
    }
    return titles
}

// Extract ratings from results
function ExtractRatings(results) {
    var ratings = [];

    // For each item returned in result, append to embedURLs array
    for (var i = 0; i < results.data.length; i++) {
        ratings.push(results.data[i].rating);
    }
    return ratings
}

// Extract IDS from results
function ExtractIDs(results) {
    var ids = [];

    // For each item returned in result, append to embedURLs array
    for (var i = 0; i < results.data.length; i++) {
        ids.push(results.data[i].id);
    }
    return ids
}

// Accepts GIPHY Object response to extract embed urls for resulting gifs and stills
function ExtractEmbedURLs(results) {
    var embedURLs = [];
    var embedStills = [];

    // For each item returned in result, append to embedURLs array
    for (var i = 0; i < results.data.length; i++) {
        // Append urls info for stills and urls
        embedURLs.push(results.data[i].images.downsized.url);
        embedStills.push(results.data[i].images.downsized_still.url);

    }

    return [embedURLs, embedStills]
}

// Event Handlers
// 
// Event handler for Game (topic) buttons being clicked
$('#btnArea').on('click', '#topicButtons', function () {
    // Use title converter to convert attribute into search term
    var searchTerm = TitleConverter($(this).attr('data-game'));

    // Use function to Send Search API call to GIPHY and display to user results
    SearchAPICall(searchTerm);
});

// Event handler for adding value to button list using form
$('#addGame').on('click', function (event) {
    // Stops page refresh from input form submission
    event.preventDefault();
    // Take new game user input value submitted by user and assign: newGameName
    var newGameName = $('#gameInput').val();

    // Push new game to games array and store stringified array to sessionstorage
    games.push(newGameName);
    sessionStorage.setItem('games', JSON.stringify(games));
    // re-render buttons from games
    RenderButtonsFrom(games);
});

// Event handler for clicked images in result area
$('#resultsArea').on('click', 'img', function () {
    var imageKey = $(this).attr('id');
    var gifImageResult = imageKey.split('-', 2);

    // Split result into portions
    var imageType = gifImageResult[1];
    var imageName = gifImageResult[0];

    // if clicked item gif
    if (imageType === 'gif') {
        imageName = imageName + '-still';
        // Hide clicked image
        $(this).hide();
        // Show related image
        $('#' + imageName).show();

    } else if (imageType === 'still') {

        imageName = imageName + '-gif';
        // Hide clicked image
        $(this).hide();
        // Show related image
        $('#' + imageName).show();
    }

})

// Arguments begin here
// 
$(document).ready(function () {
    // Use JSON parse to interpret games array in session storage
    var gamesCheck = JSON.parse(sessionStorage.getItem('games'));

    if (gamesCheck != null) {
        games = gamesCheck;
    }

    // Render buttons
    RenderButtonsFrom(games);
})