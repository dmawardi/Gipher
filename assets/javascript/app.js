var games = ['Cyber Punk', 'Apex Legends', 'Fortnite', 'Devil May Cry', 'StarCraft', 'Diablo', 'Grand Theft Auto', 'Red Dead Redemption', 'Tomb Raider', 'Mario Kart', 'Super Mario', 'Final Fantasy'];

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
    });
}

// Event handler for topic buttons being clicked
$('#btnArea').on('click', '#topicButtons', function(){
    console.log($(this).attr('data-game'));

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