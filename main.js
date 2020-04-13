const winDisplay = document.getElementById("wins");
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

function startGame() {
  
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
  console.log(selectedWord);
  displayWord.innerHTML = underscores.join(" ");
  playButton.style.display = "none";
}

startGame();

function didYouWin() {
  if (letterCounter === selectedWord.length && guessesLeft >= 0) {
    wins++;
    winDisplay.innerHTML = wins;
    playButton.style.display = "block";
  } else {
    if (letterCounter !== selectedWord.length && guessesLeft <= 1) {
      losses++;
      lossesDisplay.innerHTML = losses;
      playButton.style.display = "block";
    }
  }
}

document.onkeyup = function (event) {
  let userGuess = event.key.toLowerCase();
  if (event.keyCode < 65 || event.keyCode > 90) {
    alert("Please guess a letter.");
  }
  
  if (selectedWord.indexOf(userGuess) > -1  && event.keyCode >= 65 && event.keyCode <= 90) {
    for (let i = 0; i < selectedWord.length; i++) {
      if (selectedWord[i] === userGuess) {
        underscores[i] = userGuess;
        displayWord.innerHTML = underscores.join(" ");
        letterCounter++;
        didYouWin();
      }
    }
  } else {
    if (!selectedWord.indexOf(userGuess) > -1 && event.keyCode >= 65 && event.keyCode <= 90 && lettersGuessed.indexOf (userGuess) === -1) {
      lettersGuessed.push(userGuess);
      lettersGuessedDisplay.innerHTML = lettersGuessed.join(", ");
      didYouWin();
    }
    else {
      if (lettersGuessed.indexOf(userGuess) > -1)
         alert("You already guessed that letter.");
    }
  }
  if (guessesLeft > 0 > -1 && event.keyCode >= 65 && event.keyCode <= 90 && lettersGuessed.indexOf (userGuess) === -1) {
  
    guessesLeft--;
    guessesLeftDisplay.innerHTML = guessesLeft;
   };
 }