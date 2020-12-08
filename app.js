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
const playerOneNameInput = document.querySelector('.player-one');
const playerTwoNameInput = document.querySelector('.player-two');
let playerOneName;
let playerTwoName;

// Game section
const gameSection = document.querySelector('.game-section')

const CLEAR_MESSAGE = ``;

// Captures player game mode choice
function playerModeChoice() {

  this.classList.toggle('selected');
  playerMessageBlock.innerHTML = CLEAR_MESSAGE;
  playerMessageBlock.classList.remove('active');

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
    playerMessageBlock.classList.add('active');
    playerMessageBlock.innerHTML = `Please select a player mode.`;
  } else {
    startModal.classList.add('hide');
    submitNamesModal.classList.remove('hide')
    if (gameModeChoice === 1) {
      playerTwoNameInput.disabled = true;
    }
  }

}

// Capture and return player names
function submitPlayerNames() {

  playerOneName = playerOneNameInput.value;
  playerTwoName = playerTwoNameInput.value;

  if (gameModeChoice === 1 && !playerOneName) {
    playerMessageBlock.innerHTML = `Please enter a name.`;
    playerMessageBlock.classList.add('active');
  } else if (gameModeChoice === 2 && !playerTwoName || !playerOneName) {
    playerMessageBlock.innerHTML = `Please enter a name.`;
    playerMessageBlock.classList.add('active');
  } else {
    submitNamesModal.classList.add('hide');
    gameSection.classList.remove('hide');
    playerMessageBlock.innerHTML = CLEAR_MESSAGE;
    playerMessageBlock.classList.remove('active');
  }

  return playerOneName, playerTwoName;

}

submitNamesModalButton.addEventListener('click', submitPlayerNames);
modalButton.addEventListener('click', openPlayerNamesModal);
twoGameModeChoice.addEventListener('click', playerModeChoice);
oneGameModeChoice.addEventListener('click', playerModeChoice);