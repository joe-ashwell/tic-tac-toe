//General
const progressBar = document.querySelector('div.progress-bar');
const CLEAR_MESSAGE = ``;

// Start Mmdal
const oneGameModeChoice = document.querySelector('.one-player');
const twoGameModeChoice = document.querySelector('.two-player');
const startModal = document.querySelector('.start-modal');
const startModalItems = document.querySelectorAll('.start-modal-item');
const modalButton = document.querySelector('.start-modal-button');
const playerMessageBlock = document.querySelector('.player-message-block');
let gameModeChoice;

// Submit names modal
const submitNamesModal = document.querySelector('.modal-submit-names');
const submitNamesModalButton = document.querySelector('.modal-submit-names-button');
const goBack = document.querySelector('.modal-submit-names-button-previous');
const playerOneNameInput = document.querySelector('.player-one');
const playerTwoNameInput = document.querySelector('.player-two');
const playerTwoLabel = document.querySelector('label#p2');
let playerOneName;
let playerTwoName;

// Game section
const gameSection = document.querySelector('.game-section')
const scoreSectionPlayer1 = document.querySelector('li.player-1');
const scoreSectionPlayer2 = document.querySelector('li.player-2');
const gameCells = document.querySelectorAll('.cell');
let playCount = 0;
let playerOneGameLog = [];
let playerTwoGameLog = [];
const PLAYER_ONE_CROSS = `<i class="fa fa-times" aria-hidden="true"></i>`;
const PLAYER_TWO_NAUGHTS = `<i class="fa fa-circle-o" aria-hidden="true"></i>`;
const WINNING_CONDITIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];
let playerOneWins = false;
let playerTwoWins = false;
let gameOver = false;
let playerOneScore = 0
let playerTwoScore = 0;
const playerScoreSection = document.querySelector('div.player-score-section');
const playAgainButton = document.querySelector('button.play-again');
const resetButton = document.querySelector('button.reset-button');


// Captures player game mode choice (one or two players)
function playerModeChoice() {

  this.classList.add('selected');
  playerMessageBlock.innerHTML = CLEAR_MESSAGE;
  playerMessageBlock.classList.add('hide');
  progressBar.style.width = `33vw`;

  if (this === oneGameModeChoice) {
    twoGameModeChoice.classList.remove('selected')
    return gameModeChoice = 1;
  } else if (this === twoGameModeChoice) {
    oneGameModeChoice.classList.remove('selected')
    return gameModeChoice = 2;
  }

}

// Closes the modal and starts to capture player names after certain conditions are met
function openPlayerNamesModal() {

  if (gameModeChoice !== 1 && gameModeChoice !== 2) {
    playerMessageBlock.classList.remove('hide');
    playerMessageBlock.innerHTML = `Please select a player mode.`;
  } else {
    startModal.classList.add('hide');
    submitNamesModal.classList.remove('hide')
    progressBar.style.width = `66vw`;
    if (gameModeChoice === 1) {
      playerTwoNameInput.disabled = true;
      playerTwoLabel.textContent = `You've chosen to play the computer, let's call it Barry.`;
    } else {
      playerTwoLabel.textContent = `Player 2`;
    }
  }


}

// Capture and return player names
function submitPlayerNames() {

  playerOneName = playerOneNameInput.value;
  playerTwoName = playerTwoNameInput.value;

  if (gameModeChoice === 1 && !playerOneName) {
    playerMessageBlock.innerHTML = `Please enter a name.`;
    playerMessageBlock.classList.remove('hide');

  } else if (gameModeChoice === 2 && !playerTwoName || !playerOneName) {
    playerMessageBlock.innerHTML = `Please enter a name.`;
    playerMessageBlock.classList.remove('hide');

  } else {
    submitNamesModal.classList.add('hide');
    gameSection.classList.remove('hide');
    playerMessageBlock.innerHTML = CLEAR_MESSAGE;
    playerMessageBlock.classList.add('hide');
    progressBar.style.width = `100vw`;
  }

  setPlayerScore();

}

function goBackToGameModeChoice() {

  submitNamesModal.classList.add('hide');
  playerMessageBlock.classList.add('hide');
  resetSettings();

}

function playGame() {

  // First checks to see if a player has been by comparing if the cell is blank or not.
  // Updates the playCount only when a successful click has been made
  if (!this.innerHTML &&
      gameModeChoice === 2 &&
      gameOver === false
    
    ) {

    // Then ensures player one uses the cross, and player 2 uses the naughts by checking the modulus of clicks
    if (playCount % 2 === 0) {
      this.innerHTML = PLAYER_ONE_CROSS;
      playerOneGameLog.push(parseInt(this.dataset.cellIndex));
      playCount++;
      scoresOnTheDoors();
      setPlayerScore();
    } else {
      this.innerHTML = PLAYER_TWO_NAUGHTS;
      playerTwoGameLog.push(parseInt(this.dataset.cellIndex));
      playCount++;
      scoresOnTheDoors();
      setPlayerScore();
    }

  } 
  
  else if (!this.innerHTML &&
           gameModeChoice === 1 &&
           gameOver === false
  
  ) {
    this.innerHTML = PLAYER_ONE_CROSS;
    playerOneGameLog.push(parseInt(this.dataset.cellIndex));
    playCount++;
    scoresOnTheDoors();
    setPlayerScore();

    if (gameOver === false) {

      // Delay the function call to make it appear a bit more realistic
      setTimeout(computerPlayerTwo, 1500);

    }

  }

}

function computerPlayerTwo() {

  let computerChoice = getRandomNumber();

    if (
      playerOneGameLog.length + playerTwoGameLog.length < 9 &&
      playerOneGameLog.includes(computerChoice) || 
      playerTwoGameLog.includes(computerChoice)
      ) {
      computerPlayerTwo();

    } else {
      gameCells[computerChoice].innerHTML = PLAYER_TWO_NAUGHTS;
      playerTwoGameLog.push(parseInt(gameCells[computerChoice].dataset.cellIndex));
      playCount++;
      console.log(computerChoice);
    }

  scoresOnTheDoors();

}

function setPlayerScore() {

  playerScoreSection.innerHTML = `

  <h3>${playerOneName}</h3> <span class="score-section"><h3>${playerOneScore} - ${playerTwoScore}</h3></span> <h3>${playerTwoName || `Barry`}</h3>
  
  `;

}

function scoresOnTheDoors() {

  WINNING_CONDITIONS.forEach(condition => {

    if (
      playerOneGameLog.includes(condition[0]) &&
      playerOneGameLog.includes(condition[1]) &&
      playerOneGameLog.includes(condition[2]) &&
      playerTwoWins === false

    ) {
      playerOneWins = true;
      playerOneScore += 1;
      setPlayerScore();
      gameOver = true;
      playerMessageBlock.classList.remove('hide');
      playerMessageBlock.classList.add('winner');
      playerMessageBlock.innerHTML = `Awesome! ${playerOneName} won!`;
    } 
    
    else if (
      playerTwoGameLog.includes(condition[0]) &&
      playerTwoGameLog.includes(condition[1]) &&
      playerTwoGameLog.includes(condition[2]) &&
      playerOneWins === false

    ) {
      playerTwoWins = true;
      playerTwoScore += 1;
      setPlayerScore();
      gameOver = true;
      playerMessageBlock.classList.remove('hide');
      playerMessageBlock.classList.add('winner');
      playerMessageBlock.innerHTML = `Awesome! ${playerTwoName} won!`;
    }
    
    else if (
      playerOneWins === false &&
      playerTwoWins === false &&
      playerOneGameLog.length + playerTwoGameLog.length === gameCells.length
    ) {
      gameOver = true;
      playerMessageBlock.classList.remove('hide');
      playerMessageBlock.classList.add('draw');
      playerMessageBlock.innerHTML = `Good effort! ${playerOneName} and ${playerTwoName} drew!`;
    }

    else {

      return;

    }
    
  })

  if (gameOver === true) {
    playAgainButton.classList.remove('secondary');
  }

}

function getRandomNumber() {

  return Math.floor(Math.random() * 9);

}

function playAgain() {

  playerOneGameLog = [];
  playerTwoGameLog = [];
  playCount = 0;
  gameOver = false;
  playerOneWins = false;
  playerTwoWins = false;
  playAgainButton.classList.add('secondary');
  gameCells.forEach(cell => cell.innerHTML = CLEAR_MESSAGE);
  playerMessageBlock.classList.add('hide');
  playerMessageBlock.classList.remove('winner', 'draw');

}

function resetSettings() {

  gameModeChoice = 0;
  playerOneNameInput.value = CLEAR_MESSAGE;
  playerOneScore = 0;
  playerTwoNameInput.value = CLEAR_MESSAGE;
  playerTwoScore = 0;
  playerTwoNameInput.disabled = false;

  playAgain();

  startModal.classList.remove('hide');
  gameSection.classList.add('hide');
  progressBar.style.width = `0`;

  // To remove selected game mode state 
  startModalItems.forEach(item => {

    if (item.classList.contains('selected') === true) {
      item.classList.remove('selected');
    }

  })

}

goBack.addEventListener('click', goBackToGameModeChoice);
playAgainButton.addEventListener('click', playAgain);
resetButton.addEventListener('click', resetSettings);
gameCells.forEach(cell => {cell.addEventListener('click', playGame)});
submitNamesModalButton.addEventListener('click', submitPlayerNames);
modalButton.addEventListener('click', openPlayerNamesModal);
twoGameModeChoice.addEventListener('click', playerModeChoice);
oneGameModeChoice.addEventListener('click', playerModeChoice);