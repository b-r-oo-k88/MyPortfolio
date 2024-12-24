const gameOption = ["rock", "paper", "scissor"];
let result;
let pm;
let computerMove;

const rockButton = document.querySelector('.rockButton')
const paperButton = document.querySelector('.paperButton')
const scisorButton = document.querySelector('.scisorButton')

const counter = JSON.parse(localStorage.getItem("counter")) || {
  winCount: 0,
  looseCount: 0,
  drawCount: 0,
};

function generateRandomNumber() {
  let random = Math.random();
  random = Math.round((random * 10) % 2);
  const computer = gameOption[random];
  return computer;
}

function playGame(playerMove) {
  const computer = generateRandomNumber();
  pm = playerMove;
  computerMove = computer;

  if (playerMove === "rock") {
    if (computer === "rock") {
      result = "You Draw";
      counter.drawCount++;
    } else if (computer === "paper") {
      result = "You Loose";
      counter.looseCount++;
    } else {
      result = "You Win";
      counter.winCount++;
    }
    displayBothMoves();
    displayResult();
    displayCounterResult();
  } else if (playerMove === "paper") {
    if (computer === "rock") {
      result = "You Win";
      counter.winCount++;
    } else if (computer === "paper") {
      result = "You Draw";
      counter.drawCount++;
    } else {
      result = "You Loose";
      counter.looseCount++;
    }
    displayBothMoves();
    displayResult();
    displayCounterResult();
  } else {
    if (computer === "rock") {
      result = "You Loose";
      counter.looseCount++;
    } else if (computer === "paper") {
      result = "You Win";
      counter.winCount++;
    } else {
      result = "You Draw";
      counter.drawCount++;
    }
    displayBothMoves();
    displayResult();
    displayCounterResult();
  }
  localStorage.setItem("counter", JSON.stringify(counter));
}

function displayCounterResult() {
  const paragraphElement = document.querySelector(".displayResult");
  // [winCount, looseCount, drawCount] = counter;
  paragraphElement.innerHTML = `<P>win:  ${counter.winCount},  loose:  ${counter.looseCount},  Draw:  ${counter.drawCount}</P>`;
  // paragraphElement.innerHTML = `<P>win:  ${winCount},  loose:  ${looseCount},  Draw:  ${drawCount}</P>`;
}

function displayResult() {
  const myMove = document.getElementById("displayResult");
  myMove.innerHTML = `<p>${result}</p>`;
}

function displayBothMoves() {
  const bothMoves = document.getElementById("displayBothMoves");

  //pm is for player move
  bothMoves.innerHTML = `<p>you: <img src='images/${pm}.png' class='img-display'> : Computer: <img src='images/${computerMove}.png ' class='img-display'></p>`;
}

//playing game with click
rockButton.addEventListener('click', ()=>{playGame('rock')})
paperButton.addEventListener('click', ()=>{playGame('paper')})
scisorButton.addEventListener('click', ()=>{playGame('scissor')})

//playing game with keyboard
document.addEventListener('keypress', (event)=>{
  if(event.key === 'r')
    playGame('rock')})
document.addEventListener('keypress', (event)=>{
  if(event.key === 'p')
    playGame('paper')})
document.addEventListener('keypress', (event)=>{
  if(event.key === 's')
    playGame('scissor')})

const autoPlayButton = document.getElementById("autoplay");
let isAutoplay = false;
let intervalId;

autoPlayButton.addEventListener('click', () => {
  autoPlayButton.innerHTML = 'Autoplaying';
  isAutoplay = !isAutoplay;
  
  if(isAutoplay){
    intervalId = setInterval(()=>{
      let playermove= generateRandomNumber();
      playGame(playermove);//it plays the game
    }, 1000)}
    else{
      clearInterval(intervalId);
      autoPlayButton.innerHTML = 'Autoplay';
  }});