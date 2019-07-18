var games = ['Cyber Punk', 'Apex Legends', 'Fortnite', 'Devil May Cry', 'StarCraft', 'Diablo', 'Grand Theft Auto', 'Red Dead Redemption', 'Tomb Raider', 'Mario Kart', 'Super Mario', 'Final Fantasy'];

var apiKey = 'wqxHRPOli6qO50YxXqMbQ1wYnC3FPGhJ';
var searchSyntax = 'api.giphy.com/v1/gifs/search?';


// Takes in an array (ex. games) and outputs each item as a button in the btnArea
function RenderButtonsFrom(array) {
    var container = $('<div>');
    container.addClass('container  col-12');

    for (var i = 0; i < array.length; i++) {
        var button = $('<button>');
        button.addClass('btn btn-info');
        button.attr('id', 'topicButtons');
        button.attr('data-topic', array[i]);
        button.text(array[i]);
        container.append(button);
    }

    var buttonArea = $('#btnArea');

    // Empty and reappend the buttons to the button area
    buttonArea.empty();
    buttonArea.append(container);
}

// Function to convert titles for API Calls
function TitleConverter(movieName) {
    var searchTerm = '';
    console.log(movieName.length);
    for (var i = 0; i < movieName.length; i++) {
        console.log('on cycle: '+i);
        console.log(movieName[i]);
        if (movieName[i] === ' ') {
          searchTerm += '+';
        } else {
          searchTerm += movieName[i];
        }
    }
    return searchTerm
  }


function SearchAPICall(searchTerm) {
    $.ajax({
        url: 'https://',
        method: "GET"
    }).then(function(response){
        console.log(response);
    });
}

// Event handler for topic buttons being clicked
$('#topicButtons').on('click', function(){


});

// Event handler for adding value to button list
$('#addGame').on('click', function(event) {
    // Stops page refresh from input form submission
    event.preventDefault();
    // Take new game user input value submitted by user and assign: newGameName
    var newGameName = $('#gameInput').val();

    console.log(newGameName);

    // Push new game to games array and re-render buttons from games
    games.push(newGameName);
    RenderButtonsFrom(games);
});

RenderButtonsFrom(games);