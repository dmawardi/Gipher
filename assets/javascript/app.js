var topics = ['Cyber Punk', 'Apex Legends', 'Fortnite', 'Devil May Cry', 'StarCraft', 'Diablo', 'Grand Theft Auto', 'Red Dead Redemption', 'Tomb Raider', 'Mario Kart', 'Super Mario', 'Final Fantasy'];

var apiKey = 'wqxHRPOli6qO50YxXqMbQ1wYnC3FPGhJ';
var searchSyntax = 'api.giphy.com/v1/gifs/search?';


// Takes in an array (ex. topics) and outputs each item as a button in the btnArea
function makeButtonsFrom(array) {
    var container = $('<div>');
    container.addClass('container  col-12');
    console.log('container created');

    for (var i = 0; i < array.length; i++) {
        var button = $('<button>');
        button.addClass('btn btn-info');
        button.attr('id', 'topicButtons');
        button.attr('data-topic', array[i]);
        button.text(array[i]);
        container.append(button);
        console.log('button appended to container');
    }

    var buttonArea = $('#btnArea');
    console.log(buttonArea);

    buttonArea.empty();

    buttonArea.append(container);
}

function searchAPICall(searchTerm) {
    $(ajax)
}

$('#topicButtons').on('click', function(){


})

makeButtonsFrom(topics);