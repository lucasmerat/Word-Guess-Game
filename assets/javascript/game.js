/// declared variables for guess (keyboard), empyty array of letters guessed, words, slot for letters of word, a secretword to be chosen from bank, number of wins and guesses
var userGuess;
var guessedLetters = [];
var words = ["ahoy"];
var letters = [];
var secretWord;
var numGuesses = 12;
var correctGuessesCount;
var wins = 0;

//Play theme music on click
var theme = new Audio('assets/javascript/music.mp3');
document.getElementById('music-btn').onclick = function() {
    theme.play();
}

//Assign HTML elements to variable of guesses and wins
document.getElementById("wins").innerHTML = wins;
document.getElementById("num-guesses").innerHTML = numGuesses;

//Begin game with random word from bank and generate empty letters for length of chosen word
function start() {
    
    console.log(guessedLetters);
    guessedLetters = [];
    document.getElementById('all-guesses').style.display = 'none';
    document.getElementById('letters-guessed').innerHTML = guessedLetters.join(" ");
    document.getElementById('you-win').style.display = 'none';
    document.getElementById('play-again').style.display = 'none';
    secretWord = words[Math.floor(Math.random() * words.length)];
    correctGuessesCount = secretWord.length;
    console.log(correctGuessesCount);
    console.log(secretWord);
    console.log(letters);
    for (i = 0; i < secretWord.length; i++) {
    letters[i] = "_";
    }

  //Set current word element on page to empty letters, join array
  console.log(letters);
  document.getElementById("current-word").innerHTML = letters.join(" ");
}

//begin game
start();

//Function to begin when key is released
document.onkeyup = function(event) {
  userGuess = event.key;
  console.log(userGuess);
  //declare boolean for if letter is found, set to false
  var found = false;
  //Only runs code if keypress is a letter
  if (event.keyCode >= 65 && event.keyCode <= 90) {
    //Loop length of # of letters
    for (var i = 0; i < letters.length; i++) {
      //If the word at given index letter contains the guess, update letters array with the letter of key pressed
      if (secretWord[i] === userGuess) {
        console.log(letters);
        if (!letters.includes(userGuess)) {
            correctGuessesCount = correctGuessesCount - 1;
        }
        console.log(correctGuessesCount);
        letters[i] = userGuess;
        console.log(letters);
        console.log(letters[i]);
        //Then join letters together, update the word element on HTML, and change the found value to true
        document.getElementById("current-word").innerHTML = letters.join(" ");
        found = true;
      }
    }
    //Conditional outside loop, declaring that if the value of found is still false and ??? then add guessed letters to element for guessed letters
    console.log(guessedLetters);
    if (!found && !guessedLetters.includes(userGuess)) {
        console.log(arghSound);
        var arghSound = new Audio('assets/javascript/argh.mp3');
        arghSound.play();
        document.getElementById('all-guesses').style.display = 'block';
      guessedLetters.push(userGuess);
      document.getElementById("letters-guessed").innerHTML = guessedLetters.join(" ");
      numGuesses--;
      document.getElementById("num-guesses").innerHTML = numGuesses;
      console.log(numGuesses)
      //would like to make this a loop
      if (numGuesses === 11) {
        document.getElementById("guess1").style.display = "inline-block";
      } else if (numGuesses === 10) {
        document.getElementById("guess2").style.display = "inline-block";
      } else if (numGuesses === 9) {
        document.getElementById("guess3").style.display = "inline-block";
      } else if (numGuesses === 8) {
        document.getElementById("guess4").style.display = "inline-block";
      } else if (numGuesses === 7) {
        document.getElementById("guess5").style.display = "inline-block";
      } else if (numGuesses === 6) {
        document.getElementById("guess6").style.display = "inline-block";
      } else if (numGuesses === 5) {
        document.getElementById("guess7").style.display = "inline-block";
      } else if (numGuesses === 4) {
        document.getElementById("guess8").style.display = "inline-block";
      } else if (numGuesses === 3) {
        document.getElementById("guess9").style.display = "inline-block";
      } else if (numGuesses === 2) {
        document.getElementById("guess10").style.display = "inline-block";
      } else if (numGuesses === 1) {
        document.getElementById("guess11").style.display = "inline-block";
      } else if (numGuesses === 0) {
        document.getElementById("guess12").style.display = "inline-block";
      }
    }
    if (correctGuessesCount === 0){
        document.getElementById('you-win').style.display = 'block';
        document.getElementById('play-again').style.display = 'inline-block';
        document.getElementById('play-again').addEventListener("click",function(){
            var pirateImages = document.getElementsByClassName("hang-img");
        for (var i=0; i<pirateImages.length; i+=1){
            pirateImages[i].style.display = 'none';
       }
        //I want to make it so I dont have to reload and I can get images to show correctly. But this will do for now
            location.reload();
        });
    }
  }
};
