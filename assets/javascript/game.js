//Dom Elements
var $newGameButton = document.getElementById("newGameButton");
var $placeHolders = document.getElementById("placeHolders");
var $guessedLetters = document.getElementById("guessedLetters");
var $guessesLeft = document.getElementById("guessesLeft");
var $wins = document.getElementById("numberOfWins");
var $losses = document.getElementById("numberOfLosses");


// Create an array of words
var words = [
    "javascript",
    "monkey",
    "amazing",
    "pancake",
    "no game no life",
    "hangman",
    "spaces",
    "whatever",
    "distribution",
    "lsd",
    "galaxy"
];

var wins = 0;
var losses = 0;
var guessesLeft = 9;
var gameRunning = false;
var guessedLetters = [];
var incorrectGuessedLetters = [];
var word = '';

// Set up the answer array
var placeHolderArray = [];

// for (var i = 0; i < word.length; i++) {
//     placeHolderArray[i] = "_";
// }
// // remaining letters = the length of the actual word picked
// var remainingLetters = word.length;

// // The game loop
// while (remainingLetters > 0) {
//     // Show the player their progress


// }

function newGame() {
    gameRunning = true;
    guessesLeft = 9;
    guessedLetters = [];
    incorrectGuessedLetters = [];
    placeHolderArray = [];

    // Pick a random word
    word = words[Math.floor(Math.random() * words.length)];

    for (var i = 0; i < word.length; i++) {
        if (word[i] === ' ') {
            placeHolderArray.push(' ');
        }
        else {
            placeHolderArray.push('_');
        }
    }
    //Write all new game info to DOM
    $guessesLeft.textContent = guessesLeft;
    $placeHolders.textContent = placeHolderArray.join('');
    $guessedLetters.textContent = incorrectGuessedLetters;

    //add event listener for new game button for new game
    
}

$newGameButton.addEventListener('click', newGame);



//adding onkeyup event to trigger letterguess

//function to check for correct letters and add them to the correct guesses box


//function to check for Incorrect letters and add them to the wrong guesses box

//function that keeps track of wins

//function that keeps track of losses