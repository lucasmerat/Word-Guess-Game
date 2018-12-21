var userGuess; //Variable to hold the player guess
var guessedLetters = []; //Empty array to hold guessed letters
var words = [
  "ahoy",
  "matey",
  "parrot",
  "cannonball",
  "eyepatch",
  "treasure",
  "pegleg"
]; //Array of words in play
var letters = []; //Empry array to hold blanks which turn to be letters of the secret word
var secretWord; //To assign word in play
var numGuesses = 6; //Number incorrect of guesses
var wins = 0;

//Play theme music on click
var theme = new Audio("assets/javascript/music.mp3");
document.getElementById("music-btn").onclick = function() {
  theme.play();
};

//Begin game with random word from bank and generate empty letters for length of chosen word
function start() {
  document.addEventListener("keyup", pressKey);
  numGuesses = 6;
  letters = [];
  document.getElementById("num-guesses").innerHTML = numGuesses;
  guessedLetters = []; //Sets incorrect guessed letter
  document.getElementById("all-guesses").style.display = "none";
  document.getElementById("letters-guessed").innerHTML = guessedLetters.join(
    " "
  );
  document.getElementById("you-win").style.display = "none";
  document.getElementById("you-lose").style.display = "none";
  document.getElementById("play-again").style.display = "none";
  secretWord = words[Math.floor(Math.random() * words.length)]; //Select a random word and assign to secret word
  console.log(secretWord);
  //Loop to assign letters to be blanks at start
  for (i = 0; i < secretWord.length; i++) {
    letters[i] = "_";
  }
  console.log(letters); //Log the length of the word in blanks
  document.getElementById("current-word").innerHTML = letters.join(" "); //Place on page and join array
}

start(); //begin game

document.addEventListener("keyup", pressKey);

function pressKey(event) {
  userGuess = event.key; //Set guess to the value of the key pressed
  console.log(userGuess); //Log the key pressed
  var found = false; //Declare boolean for if letter is found, set to false
  if (event.keyCode >= 65 && event.keyCode <= 90) {
    //Only runs code if keypress is a letter
    for (var i = 0; i < letters.length; i++) {
      //Loop length of # of letters
      //If the word at given index letter contains the guess, update letters array with the letter of key pressed
      if (secretWord[i] === userGuess) {
        console.log(letters); //Log letters before exchange of blank letters
        letters[i] = userGuess; //Replace blanks w letter guessed
        console.log(letters); //Log what letters are after replacement
        document.getElementById("current-word").innerHTML = letters.join(" "); //Join letters together, update the word element on HTML, and change the found value to true
        found = true; //Boolean for if letter is found goes to true
      }
    }
    console.log(guessedLetters); //Log the incorrect guessed letters
    if (!found && !guessedLetters.includes(userGuess)) {
      //If found is false still and the letter being guessed has not already been guessed
      var arghSound = new Audio("assets/javascript/argh.mp3");
      arghSound.play();
      document.getElementById("all-guesses").style.display = "block"; //Show area with images of pirate
      guessedLetters.push(userGuess); //Add the guessed letter to the wrong letters array
      document.getElementById(
        "letters-guessed"
      ).innerHTML = guessedLetters.join(" "); //Join the array and add to letters guessed on page
      numGuesses--; //Decrease number of incorrect guesses available by 1
      document.getElementById("num-guesses").innerHTML = numGuesses; //Set that value to be the number of guesses on the page
      console.log(numGuesses); //Log how many incorrect guesses left
      //Displays the correct image for each incorrect guess
      if (numGuesses <= 6) {
        document.getElementById("guess" + numGuesses).style.visibility = "visible";
      } 
    }

    var countBlank = 0;
    for (var i = 0; i < letters.length; i++) {
      if (letters[i] == "_") {
        countBlank++;
        console.log(countBlank);
      }
    }

    if (countBlank === 0) {
      document.removeEventListener("keyup", pressKey);
      document.getElementById("you-win").style.display = "block"; //Show you win graphic
      wins++;
      document.getElementById("wins").innerHTML = wins;
      document.getElementById("play-again").style.display = "inline-block"; //Show play again button
      document
        .getElementById("play-again")
        .addEventListener("click", function() {
          // Make clickable
          var pirateImages = document.getElementsByClassName("hang-img");
          for (var i = 0; i < pirateImages.length; i += 1) {
            // Loop to hide all pirate images when button is clicked
            pirateImages[i].style.visibility = "hidden";
          }
          start();
          //I want to make it so I dont have to reload and I can get images to show correctly. But this will do for now
        });
    }
    if (numGuesses === 0) {
      document.removeEventListener("keyup", pressKey);
      document.getElementById("you-lose").style.display = "block"; //Show you lose graphic
      document.getElementById("play-again").style.display = "inline-block"; //Show play again button
      for (var i=0; i<letters.length; i++){
        letters[i] = secretWord[i];
      }
      document.getElementById("current-word").innerHTML = letters.join(" "); //Place on page and join array
      document
        .getElementById("play-again")
        .addEventListener("click", function() {
          //I want to make it so I dont have to reload and I can get images to show correctly. But this will do for now
          var pirateImages = document.getElementsByClassName("hang-img");
          for (var i = 0; i < pirateImages.length; i += 1) {
            // Loop to hide all pirate images when button is clicked
            pirateImages[i].style.visibility = "hidden";
          }
          start();
        });
    }
  }
}