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
let quote = "";
function newQuote() {
  quote = quotes[Math.floor(Math.random() * quotes.length)];
}

const clock = document.getElementById("clock");
const textbox = document.getElementById("textbox");
const mistakes = document.getElementById("mistakes");
const acc = document.getElementById("acc");
const wpm = document.getElementById("wpm");
const results = document.querySelector(".footer");
const quoteDiv = document.getElementById("quote");
newQuote();
let displayQuote = createQuoteDisplay();
quoteDiv.appendChild(displayQuote);

textbox.addEventListener("keydown", (e) => {
  myRegex = /^[a-zA-Z\d\s,.!?;:'"-]{0,1}$/;
  if (e.key !== "Backspace" && !myRegex.test(e.key)) {
    return;
  }
  // start
  if (clock.innerHTML === "0") {
    results.classList.remove("show");
    timer();
  }
  checkMistakes(e.key);
});

function createQuoteDisplay() {
  const p = document.createElement("p");

  const letters = quote.split("");
  letters.forEach((letter) => {
    const span = document.createElement("span");
    span.textContent = letter;
    p.appendChild(span);
  });
  return p;
}

function checkMistakes(char) {
  // const thisQuoteChar = quote.split("")[textbox.value.length];
  const idx = textbox.value.length;
  const arr = [...displayQuote.childNodes];
  // remove color
  if (char === "Backspace") {
    displayQuote.childNodes[idx - 1].classList = "";
    return;
  }
  // fail
  if (char !== arr[idx].textContent) {
    // add mistake
    mistakes.textContent = parseInt(mistakes.textContent) + 1;
    // if green, remove green
    if (displayQuote.childNodes[idx].classList.contains("pass")) {
      displayQuote.childNodes[idx].classList.remove("pass");
    }
    // add red
    displayQuote.childNodes[idx].classList.add("fail");
  } else {
    if (displayQuote.childNodes[idx].classList.contains("fail")) {
      displayQuote.childNodes[idx].classList.remove("fail");
    }
    displayQuote.childNodes[idx].classList.add("pass");
  }
}

function timer() {
  let seconds = 60;
  clock.innerHTML = seconds;
  let intervalId = setInterval(function () {
    if (seconds > 0) {
      seconds--;
      clock.innerHTML = seconds;
      checkWinCondition(intervalId);
    }
  }, 1000);
}

function checkWinCondition(intervalId) {
  const text = textbox.value;
  if (
    text === quote ||
    text[text.length - 1] === quote[quote.length - 1] ||
    clock.innerHTML == 0
  ) {
    clearInterval(intervalId);
    trackStats(text);
    newQuote();
    displayResults();
  }
}

function trackStats(text) {
  const letterCount = text.split("").length;
  const wordCount = text.split(" ").length;
  const accuracy = ((letterCount - mistakes.textContent) / letterCount) * 100;
  const wordPerMin = (wordCount / (60 - parseInt(clock.innerHTML))) * 60;
  acc.textContent = accuracy.toFixed(1) + "%";
  wpm.textContent = wordPerMin.toFixed(1);
}

function displayResults() {
  textbox.value = "";
  clock.innerHTML = 0;
  displayQuote = createQuoteDisplay();
  while (quoteDiv.firstChild) {
    quoteDiv.removeChild(quoteDiv.lastChild);
  }
  quoteDiv.appendChild(displayQuote);

  results.classList.add("show");
}
