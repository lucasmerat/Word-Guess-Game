/// declared variables for guess (keyboard), empyty array of letters guessed, words, slot for letters of word, a secretword to be chosen from bank, number of wins and guesses
var userGuess;
var guessedLetters = [];
var words = ['captain', 'starboard', 'sailboat', 'ahoy', 'hornswaggle']
var letters = [];
var secretWord
var numGuesses = 12;
var wins = 0;

//Assign HTML elements to variable of guesses and wins
document.getElementById('wins').innerHTML = wins;
document.getElementById('num-guesses').innerHTML = numGuesses;

//Begin game with random word from bank and generate empty letters for length of chosen word
function start() {
    secretWord = words[Math.floor(Math.random() * words.length)];
    console.log(secretWord);
    console.log(letters)
    for (i=0; i<secretWord.length; i++) {
        letters[i] = '_';
    }

    //Set current word element on page to empto letters, join array
    console.log(letters)
    document.getElementById('current-word').innerHTML = letters.join(' ');
}

//begin game
start();

//Function to begin when key is released
document.onkeyup = function(event) {
    userGuess = event.key;
    //declare boolean for if letter is found, set to false
    var found = false;
    
//Loop length of # of letters 
for (var i=0; i < letters.length; i++) {
    
    //Conditional to say if the word at given index contains the guess, update letters array with the letter of key pressed
    if (secretWord[i] === userGuess) {
        console.log(letters);
        letters[i] = userGuess;
        console.log(letters);
        //Then join letters together, update the word element on HTML and change the found value to true
        document.getElementById('current-word').innerHTML = letters.join(' '); 
        found = true;
    } 
}
//Conditional outside loop, declaring that if the value of found is still false and ??? then add guessed letters to element for guessed letters 
    if (!found && guessedLetters.indexOf(userGuess < 0)) {
        guessedLetters.push(userGuess);
        document.getElementById('letters-guessed').innerHTML = guessedLetters.join(' ');
        //add number of guesses counter 

    }
} 


