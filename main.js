const winsDisplay = document.getElementById("wins");
const lossesDisplay = document.getElementById("losses");
const guessesLeftDisplay = document.getElementById("guesses-left");
let wins = 0;
let losses = 0;
let guessesLeft = 17;
let letterCounter = 0;
let lettersGuessed = [];
const lettersGuessedDisplay = document.getElementById("letters-guessed");
const wordBank = [
  "watermelon",
  "cherry-danish",
  "deviled-eggs",
  "steak",
  "dutch-baby",
  "pizza",
  "ice-cream",
  "cookies",
  "mashed-potatoes",
  "rasberry-pancakes",
  "bacon",
  "mac-and-cheese"
];
let selectedWord = "";
const displayWord = document.getElementById("chosen-food");
let underscores = [];
const playButton = document.getElementById("play-again");
const winSound = newAudio("sounds/win sound 1.wav");
//const loseSound = newAudio(" ");

function startGame() {
    winSound.pause();
    //loseSound.pause();
  
  selectedWord = "";
  underscores = [];
  guessesLeft = 17;
  guessesLeftDisplay.innerHTML = guessesLeft;
  letterCounter = 0;
  lettersGuessed = [];
  lettersGuessedDisplay.innerHTML = lettersGuessed;
  selectedWord = wordBank[Math.floor(Math.random() * wordBank.length)];
  for (let i = 0; i < selectedWord.length; i++) { 
    if (selectedWord[i] === "-" ) {
    underscores[i] = "-";
  } else {
    underscores [i] = "_"
    }
  }
  displayWord.innerHTML = underscores.join(" ");
  playButton.style.display = "none";
}

function didYouWin() {

  if (underscores.join("") === selectedWord && guessesLeft >= 0) {
    winSound.play();
    wins++;
  
    winsDisplay.innerHTML = wins;
    playButton.style.display = "block";
  } else if(guessesLeft === 0) {
      //loseSound.play();
      losses++; 
      lossesDisplay.innerHTML = losses; 
      playButton.style.display = "block";
    }
  
}

startGame();

function checkGuess(letter) {

  if (event.keyCode >= 65 && event.keyCode <= 90) { 

       let correctLetter = false;

        for (let i = 0; i < selectedWord.length; i++) {
          if(selectedWord[i] === letter) {
            correctLetter = true;
          }
        }

        if(correctLetter) {
          for (let i = 0; i < selectedWord.length; i++) {
            if(selectedWord[i] === letter) {
              underscores[i] = letter
              displayWord.innerHTML = underscores.join(" ");
            }
          }
        }
        else if (lettersGuessed.includes(letter)) {
          alert("You already guessed that letter.")
        }

        else {
          lettersGuessed.push(letter);
          lettersGuessedDisplay.innerHTML = lettersGuessed.join(", ");
        }

    
  } else { 
    alert("Please guess a letter.");
  }
}


document.onkeyup = function(event) {
  let userGuess = event.key.toLowerCase();

  checkGuess(userGuess);
  
  if (event.keyCode >= 65 && event.keyCode <= 90 && guessesLeft >= 1) { 
    guessesLeft--;
    guessesLeftDisplay.innerHTML = guessesLeft; 
  }

  didYouWin();
}
