//Dom Elements
var $newGameButton = document.getElementById("newGameButton");
var $placeHolders = document.getElementById("placeHolders");
var $guessedLetters = document.getElementById("guessed-letters");
var $guessesLeft = document.getElementById("guessesLeft");
var $wins = document.getElementById("wins");
var $losses = document.getElementById("losses");
var $updateMe = document.getElementById("updateMe");


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

//adding onkeyup event to trigger letterguess

function letterguess(letter) {
    console.log(letter);
    //if gameRunning is true AND the letter guessed DOES NOT exist in the guessedLetters array yet, then
    //push will add it to the end of the guessedLetters array
    if (gameRunning === true && guessedLetters.indexOf(letter) === -1) {
        guessedLetters.push(letter);

        //loop
        for (var i = 0; i < word.length; i++) {
            //conditional that compares the letter guessed with the correct word, each letter with the loop
            if (word[i].toLowerCase() === letter.toLowerCase()) {
                //if the letter is correct, this line replaces the placeholder ("_") with the correct letter from the picked word
                placeHolderArray[i] = word[i];
            }
        }
        //takes the content out of placeHolders and adds it together with no spaces/,'s 
        $placeHolders.textContent = placeHolderArray.join('');
        inCorrect(letter);
    }
    else {
        //if the game isn't running(if you haven't hit the new game button) it will tell you to hit it before
        //you can start
        if (!gameRunning) {
            alert("The game isn't running, click on the new game button to start")
        }
        //catch-all that tells you that you already guessed that letter
        else {
            alert("you've already guessed that letter, try another")
        }
    }

}

//function to check for correct letters and add them to the correct guesses box

function correct(letter) {
    if(placeHolderArray.indexOf(letter.toLowerCase()) === true){
        guessesLeft;
        $guessesLeft.textContent ="Guesses left: " + guessesLeft;
    }
}

//function to check for Incorrect letters and add them to the wrong guesses box

function inCorrect(letter) {

        if (placeHolderArray.indexOf(letter.toLowerCase()) === -1) {
            //decrement the number of guesses by 1
            guessesLeft--;
            //takes the guessed letter that is wrong and adds it to the wrong letters array
            incorrectGuessedLetters.push(letter);
            //puts a ', ' in between each incorrect guessed letter
            $guessedLetters.textContent = incorrectGuessedLetters.join(' ');
            //gets the element guessesLeft from html and updates it with the guessesLeft from js
            $guessesLeft.textContent ="Guesses left: " + guessesLeft;
        }
        numberOfLosses();
    }


//function that keeps track of winss

function numberOfWins() {
    if (word === placeHolderArray.join('')) {
        wins++;
        $wins.textContent = "Wins: " + wins;
        $updateMe.textContent = "congratulations, you won! hit new game to play again";
        gameRunning = false;
    }
}

//function that keeps track of losses

function numberOfLosses() {
    if (guessesLeft === 0) {
        losses++;
        $losses.textContent = "Losses: " + losses;
        $updateMe.textContent = "you lost, try again, hit new game to play again";
        $placeHolders.textContent = word;
        //maybe try adding the timeout function to get the word to show up before ending the game?
        gameRunning = false;
    }
    numberOfWins();

}

//newGame Function that resets the necessary attributes 
function newGame() {
    gameRunning = true;
    guessesLeft = 9;
    guessedLetters = [];
    incorrectGuessedLetters = [];
    placeHolderArray = [];

    // Pick a random word
    word = words[Math.floor(Math.random() * words.length)];
    //loop
    for (var i = 0; i < word.length; i++) {
        //if there is a space in the chosen word, this first conditional will add a space
        //to the placeholderArray, so that the user can see the spaces between words
        if (word[i] === ' ') {
            placeHolderArray.push(' ');
        }
        //otherwise there will just be a underscore for every letter in the chosen word
        else {
            placeHolderArray.push('_ ');
        }
    }
    //Write all new game info to DOM
    //referring to guessesLeft inside this function, which is 0
    $guessesLeft.textContent = "Guesses left: " + guessesLeft;
    $placeHolders.textContent = placeHolderArray.join('');
    //the guessed letters area is replaced with the incorrect guessed letters, which is empty because incorrectguessedletters up above is an empty array
    $guessedLetters.textContent = incorrectGuessedLetters;
}

//the Call to the function newGame
$newGameButton.addEventListener('click', newGame);

document.onkeyup = function (event) {
    //keyCode 65 represents 'a' and it goes all the way to 'z' which is 90
    //so this if conditional is stating that if the user pushes anything that is from a-z, or 65-90
    //VERY useful to make sure that the user doesn't try and break your program by hitting
    //unassociated keys, took a lot of digging around to find this method
    if (event.keyCode >= 65 && event.keyCode <= 90) {
        letterguess(event.key);
    }
}
