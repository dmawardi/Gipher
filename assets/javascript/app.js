var games = ['Cyber Punk', 'Apex Legends', 'Fortnite', 'Devil May Cry', 'StarCraft', 'Diablo', 'Grand Theft Auto', 'Red Dead Redemption', 'Tomb Raider', 'Mario Kart', 'Super Mario', 'Final Fantasy'];
var results = {};
var gifImageURLs = [];
var gifImageStills = [];

var apiKey = 'api_key=wqxHRPOli6qO50YxXqMbQ1wYnC3FPGhJ';
var searchSyntax = 'https://api.giphy.com/v1/gifs/search?';


// Takes in an array (ex. games) and outputs each item as a button in the btnArea
function RenderButtonsFrom(array) {
    var container = $('<div>');
    container.addClass('container  col-12');

    for (var i = 0; i < array.length; i++) {
        var button = $('<button>');
        button.addClass('btn btn-info');
        button.attr('id', 'topicButtons');
        button.attr('data-game', array[i]);
        button.text(array[i]);
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

    [embedURLs, embedStills] = ExtractEmbedURLs(array);
    titles = ExtractTitles(array);

    // Iterate through embed urls, appending images to results area
    for (var i = 0; i < embedURLs.length; i++) {
        var container = $('<div>');
        var gifImage = $('<img>');
        var stillImage = $('<img>');

        gifImage.addClass('img-thumbnail gif');
        // Pass through Title converter to ensure no spaces for id name
        gifImage.attr('id', IDConverter(titles[i])+'-gif');
        gifImage.attr('src', embedURLs[i]);
        gifImage.attr('alt', titles[i]);
        gifImage.attr('data-GIF', titles[i]);


        stillImage.addClass('img-thumbnail still');
        // Pass through Title converter to ensure no spaces for id name
        stillImage.attr('id', IDConverter(titles[i])+'-still');
        stillImage.attr('src', embedStills[i]);
        stillImage.attr('alt', titles[i]);
        stillImage.attr('data-still', titles[i]);

        // Add container attributes
        container.addClass('container');
        container.attr('id', 'imageBox');
        // Append images to container
        container.append(gifImage);
        container.append(stillImage);

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

            // Else, use later
        } else {
            searchTerm += gameName[i];
        }
    }
    return searchTerm
}

// ID converter for result images
function IDConverter(detail) {
    var term = '';

    // Iterate through detail word
    for (var i = 0; i < detail.length; i++) {
        // If a special character, replace with underscore
        if (detail[i] === ' ' || detail[i] === "'" || detail[i] === '-') {
            term += '_';

            // Else, use actual letter
        } else {
            term += detail[i];
        }
        
    }
    // Trim for white space
    term.trim();

    return term
}

// Search GIPHY API using search syntax
function SearchAPICall(searchTerm) {
    $.ajax({
        // Build search query using components
        url: searchSyntax + apiKey + '&q=' + searchTerm,
        method: "GET"

    }).then(function (response) {
        console.log(response);
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

// Event handler for topic buttons being clicked
$('#btnArea').on('click', '#topicButtons', function () {
    // Use title converter to convert attribute into search term
    var searchTerm = TitleConverter($(this).attr('data-game'));

    // Use function to Send Search API call to GIPHY and display to user results
    SearchAPICall(searchTerm);
});

// Event handler for adding value to button list
$('#addGame').on('click', function (event) {
    // Stops page refresh from input form submission
    event.preventDefault();
    // Take new game user input value submitted by user and assign: newGameName
    var newGameName = $('#gameInput').val();

    // Push new game to games array and re-render buttons from games
    games.push(newGameName);
    RenderButtonsFrom(games);
});

$('#resultsArea').on('click', 'img', function(){
    var imageKey = $(this).attr('id');
    var gifImageResult = imageKey.split('-',2);

// Split result into portions
    var imageType = gifImageResult[1];
    var imageName = gifImageResult[0];

    // if clicked item gif
    if (imageType === 'gif') {
        imageName = imageName + '-still';
        // Hide clicked image
        $(this).hide();
        // Show related image
       
        $('#'+imageName).show();
        console.log("It's a gif");
        console.log('to show');
        console.log($('#'+imageName));


    } else if (imageType === 'still') {

        imageName = imageName + '-gif';
        // Hide clicked image
        $(this).hide();
        // Show related image
        $('#'+imageName).show();
        console.log("It's a still");
        console.log('to show');
        console.log($('#'+imageName));

    }
    
})

// Arguments begin here
RenderButtonsFrom(games);