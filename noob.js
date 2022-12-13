// Difficulity Selector
let noob = document.getElementById("noob");
let easy = document.getElementById("easy");
let normal = document.getElementById("normal");
let hard = document.getElementById("hard");
let hacker = document.getElementById("hacker");
let all = document.querySelectorAll(".all");

// Array of words
const words = [
  "Good",
  "Bad",
  "Fat",
  "Fine",
  "Wall"
];

// Levels
const lvls = {
  "noob": 10,
  "easy": 8,
  "normal": 6,
  "hard": 4,
  "hacker": 2,
};

let defaultLevelName = "easy"; // Default Level
const statemant = function (num) {
  defaultLevelName = num;

}
let what = "noob";
statemant(what);

let defaultLevelSeconds = lvls[defaultLevelName];
// Add selectors
let startButton = document.querySelector(".start");
let lvlNameSpan = document.querySelector(".message .lvl");
let secondsSpan = document.querySelector(".message .seconds");
let theWord = document.querySelector(".the-word");
let upcomingWords = document.querySelector(".upcoming-words");
let input = document.querySelector(".input");
let timeLeftSpan = document.querySelector(".time span");
let scoreGot = document.querySelector(".score .got");
let scoreTotal = document.querySelector(".score .total");
let finishMessage = document.querySelector(".finish");
let restartBtn = document.querySelector(".restart");
let barIcon = document.querySelector(".bar");
let gameOptions = document.querySelector(".game-options");
var finishSeconds = document.getElementById('clock');
var secondsNeed = 00;
var Interval;
// Setting the page document
lvlNameSpan.innerHTML = defaultLevelName;
secondsSpan.innerHTML = defaultLevelSeconds;
timeLeftSpan.innerHTML = defaultLevelSeconds;
scoreTotal.innerHTML = words.length;


// game-options animation
barIcon.onclick = function () {
  if (gameOptions.getAttribute("style") == null) {
    gameOptions.setAttribute("style", "left: 0rem")
  } else {
    gameOptions.removeAttribute("style");
    gameOptions.setAttribute("style", "left: -10rem");
    gameOptions.removeAttribute("style");
  }
}

// Disable paste event
input.onpaste = function () {
  return false;
};

startButton.addEventListener('click', () => {
  clearInterval(Interval)
  Interval = setInterval(startTime, 1000)
})
function startTime() {
  secondsNeed++;
  if (secondsNeed <= 9) {
    finishSeconds.innerHTML = "0" + secondsNeed + " Seconds";
  }
  if (secondsNeed > 9) {
    finishSeconds.innerHTML = secondsNeed + " Second";
  }
}
// start Game
startButton.onclick = function () {
  this.remove()
  input.focus()
  // Generate Word Function
  genWords()
}
restartBtn.onclick = function () {
  window.location.reload();
}

function genWords() {
  // Get Random Word From Array
  let randomWord = words[Math.floor(Math.random() * words.length)];
  // Get word Index
  let wordIndex = words.indexOf(randomWord);
  // Remove word from Array
  words.splice(wordIndex, 1);
  // Show the random word
  theWord.innerHTML = randomWord;
  // Empty upcoming words
  upcomingWords.innerHTML = "";
  // generate words
  for (let i = 0; i < words.length; i++) {
    // Create Div
    let div = document.createElement("div");
    let txt = document.createTextNode(words[i]);
    div.appendChild(txt);
    upcomingWords.appendChild(div)
  };
  // Start play function
  startPlay()
};
function startPlay() {
  timeLeftSpan.innerHTML = defaultLevelSeconds;
  let start = setInterval(() => {
    timeLeftSpan.innerHTML--;
    if ((timeLeftSpan.innerHTML === "0") || (theWord.innerHTML.length === input.value.length)) {
      // Stop timer
      clearInterval(start)
      // Compare Words
      if (theWord.innerHTML.toLowerCase() === input.value.toLowerCase()) {
        // Empty input field
        input.value = "";
        // Increase Score
        scoreGot.innerHTML++;
        if (words.length > 0) {
          genWords()
        } else {
          clearInterval(start)
          let span = document.createElement("span");
          span.classList = "good";
          let spanText = document.createTextNode("Great !!");
          span.appendChild(spanText);
          finishMessage.appendChild(span);
          input.setAttribute("readonly", "readonly");
          clearInterval(Interval);
          input.classList = "input no";
          upcomingWords.remove()
        }
      } else {
        let span = document.createElement("span");
        span.classList = "bad";
        let spanText = document.createTextNode("Game Over!!");
        span.appendChild(spanText);
        finishMessage.appendChild(span);
        clearInterval(Interval)
        input.classList = "input no";
      }
    }
  }, 1000)
}