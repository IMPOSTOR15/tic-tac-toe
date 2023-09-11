import '../assets/styles/index.css'
import '../assets/styles/normalize.css'
import BoardController from './BoardController'
import Modal from './Modal';
import MoveController from './MoveController';
import AlertController from './AlertController';

const alertController = new AlertController('alertPlace', 'alertTemplate');

const cellElements = [
    document.getElementById('cell00'),
    document.getElementById('cell01'),
    document.getElementById('cell02'),
    document.getElementById('cell10'),
    document.getElementById('cell11'),
    document.getElementById('cell12'),
    document.getElementById('cell20'),
    document.getElementById('cell21'),
    document.getElementById('cell22'),
]

const modeSelectElement = document.getElementById("gameMode");
const startNewGameBtnElement = document.getElementById('startNewGameBtn');

let currentPlayer = "O";

const currentBoardController = new BoardController(cellElements, currentPlayer, modeSelectElement, alertController);
const currentMoveController = new MoveController(currentBoardController, modeSelectElement);


cellElements[0].addEventListener('click', () => currentMoveController.move(0,0));
cellElements[1].addEventListener('click', () => currentMoveController.move(0,1));
cellElements[2].addEventListener('click', () => currentMoveController.move(0,2));
cellElements[3].addEventListener('click', () => currentMoveController.move(1,0));
cellElements[4].addEventListener('click', () => currentMoveController.move(1,1));
cellElements[5].addEventListener('click', () => currentMoveController.move(1,2));
cellElements[6].addEventListener('click', () => currentMoveController.move(2,0));
cellElements[7].addEventListener('click', () => currentMoveController.move(2,1));
cellElements[8].addEventListener('click', () => currentMoveController.move(2,2));

startNewGameBtnElement.addEventListener('click', () => currentBoardController.startNewGame());

const settingsModal =  new Modal({
    modalId: 'settingsModal',
    openBtnId: 'settingsBtn',
    closeBtnId: 'closeSettingsModalBtn',
});

const savePropgressBtn = document.getElementById('saveProgressBtn');
const loadPropgressBtn = document.getElementById('loadProgressBtn');
const clearProgressBtn = document.getElementById('clearProgressBtn');

savePropgressBtn.addEventListener('click', () => {
    currentBoardController.saveGame();
})


loadPropgressBtn.addEventListener('click', () => {
    currentBoardController.loadGame();
})

clearProgressBtn.addEventListener('click', () => {
    currentBoardController.clearSavedGame();
})