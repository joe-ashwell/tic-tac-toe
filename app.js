const onePlayerChoice = document.querySelector('.one-player');
const twoPlayerChoice = document.querySelector('.two-player');
const startModal = document.querySelector('.start-modal');
const startModalItems = document.querySelectorAll('.start-modal-item');
const modalButton = document.querySelector('.start-modal-button');
const playerMessageBlock = document.querySelector('.player-message-block');
const CLEAR_MESSAGE = ``;
let playerChoice;

// Captures player game mode choice
function playerModeChoice() {

  this.classList.toggle('selected');
  playerMessageBlock.innerHTML = CLEAR_MESSAGE;

  if (this === onePlayerChoice) {
    return playerChoice = 1;
  } else if (this === twoPlayerChoice) {
    return playerChoice = 2;
  }

}

// Closes the modal and starts to capture player names after certain conditions are met
function openPlayerNamesModal() {

  if (playerChoice !== 1 && playerChoice !== 2) {
    playerMessageBlock.innerHTML = `Please select a player mode.`;
  } else {
    startModal.classList.add('hide');
  }

}

modalButton.addEventListener('click', openPlayerNamesModal);
twoPlayerChoice.addEventListener('click', playerModeChoice);
onePlayerChoice.addEventListener('click', playerModeChoice);