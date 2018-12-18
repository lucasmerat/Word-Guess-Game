/// declared variables for guess (keyboard), empyty array of letters guessed, words, slot for letters of word, a secretword to be chosen from bank, number of wins and guesses
var userGuess; //Variable to hold the player guess
var guessedLetters = []; //Empty array to hold guessed letters
var words = ["ahoy", "matey", "parrot", "cannonball", "eyepatch"]; //Array of words in play
var letters = []; //Empry array to hold blanks which turn to be letters of the secret word
var secretWord; //To assign word in play
var numGuesses = 12; //Number incorrect of guesses
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
    guessedLetters = []; //Sets incorrect guessed letter
    document.getElementById('all-guesses').style.display = 'none';
    document.getElementById('letters-guessed').innerHTML = guessedLetters.join(" ");
    document.getElementById('you-win').style.display = 'none';
    document.getElementById('play-again').style.display = 'none';
    secretWord = words[Math.floor(Math.random() * words.length)]; //Select a random word and assign to secret word
    console.log(secretWord);
    //Loop to assign letters to be blanks at start
    for (i = 0; i < secretWord.length; i++) {
    letters[i] = "_";
    }
    console.log(letters); //Log the length of the word in blanks
  document.getElementById("current-word").innerHTML = letters.join(" "); //Place on page and join array
}

start();//begin game

document.addEventListener('keyup', pressKey);

function pressKey (event) {
  userGuess = event.key; //Set guess to the value of the key pressed
  console.log(userGuess); //Log the key pressed
  var found = false;  //Declare boolean for if letter is found, set to false
  if (event.keyCode >= 65 && event.keyCode <= 90) {   //Only runs code if keypress is a letter
    for (var i = 0; i < letters.length; i++) { //Loop length of # of letters
      //If the word at given index letter contains the guess, update letters array with the letter of key pressed
      if (secretWord[i] === userGuess) {
        console.log(letters); //Log letters before exchange of blank letters
        letters[i] = userGuess; //Replace blanks w letter guessed
        console.log(letters); //Log what letters are after replacement
        document.getElementById("current-word").innerHTML = letters.join(" ");  //Join letters together, update the word element on HTML, and change the found value to true
        found = true; //Boolean for if letter is found goes to true
      }
    }
    console.log(guessedLetters); //Log the incorrect guessed letters
    if (!found && !guessedLetters.includes(userGuess)) { //If found is false still and the letter being guessed has not already been guessed
        console.log(arghSound);//Play argh sound
        var arghSound = new Audio('assets/javascript/argh.mp3');
        arghSound.play();
        document.getElementById('all-guesses').style.display = 'block'; //Show area with images of pirate
      guessedLetters.push(userGuess); //Add the guessed letter to the wrong letters array
      document.getElementById("letters-guessed").innerHTML = guessedLetters.join(" "); //Join the array and add to letters guessed on page
      numGuesses--; //Decrease number of incorrect guesses available by 1
      document.getElementById("num-guesses").innerHTML = numGuesses; //Set that value to be the number of guesses on the page
      console.log(numGuesses) //Log how many incorrect guesses left
      //Displays the correct image for each incorrect guess. Make this a loop?
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

    var countBlank = 0;
    for (var i=0; i<letters.length; i++){
        if(letters[i] == '_'){
            countBlank++;
            console.log(countBlank)
        }
    }


        if (countBlank === 0) {
            document.removeEventListener('keyup', pressKey);
            document.getElementById('you-win').style.display = 'block';//Show you win graphic
            document.getElementById('play-again').style.display = 'inline-block';//Show play again button
            document.getElementById('play-again').addEventListener("click",function(){ //Make clickable 
                var pirateImages = document.getElementsByClassName("hang-img");
            for (var i=0; i<pirateImages.length; i+=1){ // Loop to hide all pirate images when button is clicked
                pirateImages[i].style.display = 'none';
           }
            //I want to make it so I dont have to reload and I can get images to show correctly. But this will do for now
                location.reload();
            });
        }
  }
};