var userGuess; //Variable to hold the player guess
var guessedLetters = []; //Empty array to hold incorrectly guessed letters
var letters = []; //Empry array to hold correct letters
var secretWord; //To assign word in play
var numGuesses = 6; //Number incorrect of guesses
var wins = 0; //Number of times won

//Play theme music on click

//Begin game with random word from bank and generate empty letters for length of chosen word
function start() {
  var theme = new Audio("assets/javascript/music.mp3");
  document.getElementById("music-btn").onclick = function() {
    theme.play();
  };
  document.addEventListener("keyup", pressKey); // Add event listener to keys
  var words = [
    //Array of possible words in play
    "ahoy",
    "matey",
    "parrot",
    "cannon",
    "eyepatch",
    "treasure",
    "pegleg",
    "hornswaggle",
    "aye"
  ];
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


function pressKey(event) {
  userGuess = event.key; //Set guess to the value of the key pressed
  console.log(userGuess); //Log the key pressed
  var found = false; //Declare boolean for if letter is found, set to false
  //Only runs code if keypress is a letter
  if (event.keyCode >= 65 && event.keyCode <= 90) {
    for (var i = 0; i < letters.length; i++) {
      //Loop length of # of letters
      //If the word at given index letter contains the guess, update letters array with the letter of key pressed
      if (secretWord[i] === userGuess) {
        var coinSound = new Audio("assets/javascript/coins.wav");
        coinSound.play();
        console.log(letters); 
        letters[i] = userGuess; //Replace blanks w letter guessed
        console.log(letters);
        document.getElementById("current-word").innerHTML = letters.join(" "); //Join letters together, update the word element on HTML, and change the found value to true
        found = true; //Boolean for if letter is found goes to true
      }
    }
    console.log(guessedLetters); 
    // Conditional for incorrect guess
    if (!found && !guessedLetters.includes(userGuess)) {
      var arghSound = new Audio("assets/javascript/argh.mp3");
      arghSound.play();
      guessedLetters.push(userGuess); //Add the incorrectly guessed letter to the wrong letters array
      document.getElementById(
        "letters-guessed"
      ).innerHTML = guessedLetters.join(" "); //Join the array and add to letters guessed on page
      numGuesses--; //Decrease number of incorrect guesses available by 1
      document.getElementById("num-guesses").innerHTML = numGuesses; //Set that value to be the number of guesses on the page
      console.log(numGuesses); 
      //Displays image each time there is an incorrect guess
      if (numGuesses <= 6) {
        document.getElementById("guess" + numGuesses).style.visibility =
          "visible";
      }
    }
    //Counts number of blanks to determine if game is over
    var countBlank = 0;
    for (var i = 0; i < letters.length; i++) {
      if (letters[i] == "_") {
        countBlank++;
        console.log(countBlank);
      }
    }
    // Logic for winning
    if (countBlank === 0) {
      document.removeEventListener("keyup", pressKey);
      document.getElementById("you-win").style.display = "block"; 
      wins++;
      document.getElementById("wins").innerHTML = wins;
      document.getElementById("play-again").style.display = "inline-block"; 
      document
        .getElementById("play-again")
        .addEventListener("click", function() {
          var pirateImages = document.getElementsByClassName("hang-img");
          // Loop to hide all pirate images when button is clicked
          for (var i = 0; i < pirateImages.length; i += 1) {
            pirateImages[i].style.visibility = "hidden";
          }
          start();
        });
    }
    // Logic for losing
    if (numGuesses === 0) {
      document.removeEventListener("keyup", pressKey);
      document.getElementById("you-lose").style.display = "block"; 
      document.getElementById("play-again").style.display = "inline-block"; 
      // Show the word they didn't guess correctly
      for (var i = 0; i < letters.length; i++) {
        letters[i] = secretWord[i];
      }
      document.getElementById("current-word").innerHTML = letters.join(" "); 
      document
        .getElementById("play-again")
        .addEventListener("click", function() {
          var pirateImages = document.getElementsByClassName("hang-img");
          // Loop to hide all pirate images when button is clicked
          for (var i = 0; i < pirateImages.length; i++) {
            pirateImages[i].style.visibility = "hidden";
          }
          start();
        });
    }
  }
}
