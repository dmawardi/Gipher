var games = ['Cyber Punk', 'Apex Legends', 'Fortnite', 'Devil May Cry', 'StarCraft', 'Diablo', 'Grand Theft Auto', 'Red Dead Redemption', 'Tomb Raider', 'Mario Kart', 'Super Mario', 'Final Fantasy'];
var results = {};
var gifImageURLs = [];

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

function RenderResultsFrom(array) {
    var resultsArea = $('#resultsArea');


    for (var i = 0; i < array.length; i++) {
        var button = $('<img>');
        button.addClass('img-thumbnail');
        button.attr('id', 'gameGIFButtons');
        button.attr('alt', array[i]);

        button.attr('data-GIF', array[i]);
        container.append(button);
    }

    var buttonArea = $('#btnArea');

    // Empty and reappend the buttons to the button area
    buttonArea.empty();
    buttonArea.append(container);
}

// Function to convert titles for API Calls
function TitleConverter(gameName) {
    var searchTerm = '';
    for (var i = 0; i < gameName.length; i++) {
        console.log('on cycle: '+i);
        console.log(gameName[i]);
        if (gameName[i] === ' ') {
          searchTerm += '+';
        } else {
          searchTerm += gameName[i];
        }
    }
    return searchTerm
  }


function SearchAPICall(searchTerm) {
    $.ajax({
        // Build search query using components
        url: searchSyntax + apiKey + '&q=' + searchTerm,
        method: "GET"
    }).then(function(response){
        console.log(response);
        // Assign response to results for future manipulation
        results = response;
        // Extract embed urls
        gifImageURLs = extractEmbedURLs(results);
    });
}

// Accepts GIPHY Object response to extract embed urls for resulting gifs
function extractEmbedURLs(results) {
    var embedURLs = [];

    console.log(results.data);
    // For each item returned in result, append to embedURLs array
    for (var i = 0; i < results.data.length; i++) {
        embedURLs.push(results.data[i].embed_url);
    }
    return embedURLs
}

// Event handler for topic buttons being clicked
$('#btnArea').on('click', '#topicButtons', function(){
    // Use title converter to convert attribute into search term
    var searchTerm = TitleConverter($(this).attr('data-game'));
    console.log(searchTerm);

    // Use function to Send Search API call to GIPHY and display to user results
    var results = SearchAPICall(searchTerm);

    console.log(results);
});

// Event handler for adding value to button list
$('#addGame').on('click', function(event) {
    // Stops page refresh from input form submission
    event.preventDefault();
    // Take new game user input value submitted by user and assign: newGameName
    var newGameName = $('#gameInput').val();

    // Push new game to games array and re-render buttons from games
    games.push(newGameName);
    RenderButtonsFrom(games);
});

// Arguments begin here
RenderButtonsFrom(games);