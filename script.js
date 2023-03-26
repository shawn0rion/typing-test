const quotes = [
  "Those who can imagine anything, can create the impossible.",
  "It is not the strongest of the species that survives, nor the most intelligent that survives. It is the one that is most adaptable to change.",
  "The general tendency of things throughout the world is to gradually tend towards a state of greater disorder.",
  "Imagination is more important than knowledge.",
  "The good thing about science is that it's true whether or not you believe in it.",
  "The saddest aspect of life right now is that science gathers knowledge faster than society gathers wisdom.",
  "Science is a way of thinking much more than it is a body of knowledge.",
  "I have no special talent. I am only passionately curious.",
  "Science knows no country, because knowledge belongs to humanity, and is the torch which illuminates the world.",
  "The most beautiful experience we can have is the mysterious. It is the fundamental emotion that stands at the cradle of true art and true science.",
];

// what would console version look like?
// there would be
//    timer
//    quote
//    display as i type
//    wpm when finished
//
function newQuote() {
  return quotes[Math.floor(Math.random() * quotes.length)];
}
let quote = newQuote();

const btn = document.getElementById("start");
const clock = document.getElementById("clock");
const textbox = document.getElementById("textbox");
const quoteDisplay = document.getElementById("quote-display");
quoteDisplay.innerHTML = quote;

btn.addEventListener("click", () => {
  // no repeats during typing
  if (clock.innerHTML !== "0") {
    return;
  }
  // unfocus btn so spacebar works
  btn.blur();
  // reset textbox when btn is clicked
  textbox.innerHTML = "";

  timer();
  document.addEventListener("keydown", textInput);
});

function textInput(e) {
  const char = e.key;
  if (char === "Backspace") {
    textbox.innerHTML = textbox.innerHTML.slice(0, -1);
  }
  myRegex = /^[a-zA-Z\d\s,.!?;:'"-]{0,1}$/;
  if (myRegex.test(char)) {
    textbox.innerHTML += char;
  }
}
function timer() {
  let seconds = 60;
  let intervalId = setInterval(function () {
    if (seconds > 0) {
      seconds--;
      clock.innerHTML = seconds;
      checkWinCondition(intervalId);
    }
  }, 1000);
}

function checkWinCondition(intervalId) {
  const text = textbox.innerHTML;
  if (
    (text === quote && text[text.length - 1] === quote[quote.length - 1]) ||
    clock.innerHTML == 0
  ) {
    clearInterval(intervalId);
    quote = newQuote();
    displayResults();
  }
}

function displayResults() {
  clock.innerHTML = 0;
  quoteDisplay.innerHTML = quote;
  document.removeEventListener("keydown", textInput);
}
