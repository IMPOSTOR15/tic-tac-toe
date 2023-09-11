import xIcon from '../assets/icons/x-icon.svg'
import oIcon from '../assets/icons/o-icon.svg'

export default class BoardController {
    constructor(cellElements, currentPlayer, gameModeElement, alertController) {
        this.cellElements = cellElements
        this.board = [
            [null, null, null],
            [null, null, null],
            [null, null, null]
        ];
        this.isEnd = null
        this.alertController = alertController;
        this.gameModeElement = gameModeElement;
        this.currentPlayer = currentPlayer;
        this.xImage = new Image();
        this.oImage = new Image();
        this.inicializeIcons();
    }

    //Функция хода игрока
    makeMove(x, y) {
        if (this.board[x][y] !== null || this.isEnd) {
            return;
        }
        this.board[x][y] = this.currentPlayer;
        if (this.currentPlayer === 'X') {
            this.cellElements[x * 3 + y].appendChild(this.xImage.cloneNode());
        } else {
            this.cellElements[x * 3 + y].appendChild(this.oImage.cloneNode());
        }

        if (this.checkWin()) {
            this.isEnd = true;
            setTimeout(() => {
                this.alertController.showAlert(`${this.checkWin()} победил!`)
            }, 100);
            return;
        } else if (this.checkDraw()) {
            setTimeout(() => {
                this.alertController.showAlert(`Ничья!`)
            }, 100);
            return;
        }
    
        this.currentPlayer = this.currentPlayer === "X" ? "O" : "X";
    }
    //Проверку на победу
    checkWin() {
        for (let i = 0; i < 3; i++) {
            // Проверка строк
            if (this.board[i][0] === this.board[i][1] && this.board[i][1] === this.board[i][2] && this.board[i][0] !== null) {
                return this.board[i][0];
            }
    
            // Проверка столбцов
            if (this.board[0][i] === this.board[1][i] && this.board[1][i] === this.board[2][i] && this.board[0][i] !== null) {
                return this.board[0][i];
            }
        }
    
        // Проверка диагоналей
        if (this.board[0][0] === this.board[1][1] && this.board[1][1] === this.board[2][2] && this.board[0][0] !== null) {
            return this.board[0][0];
        }
    
        if (this.board[0][2] === this.board[1][1] && this.board[1][1] === this.board[2][0] && this.board[0][2] !== null) {
            return this.board[0][2];
        }
    
        return null;
    }
    //Проверка на ничью
    checkDraw() {
        return this.board.flat().every(cell => cell !== null);
    }
    //Инициализация иконок
    inicializeIcons() {
        this.xImage.src = xIcon;
        this.xImage.classList.add('cell-icon');
        this.oImage.src = oIcon;
        this.oImage.classList.add('cell-icon');
    }
    //Начало игры
    startNewGame() {
        this.alertController.showAlert(`Новая игра!`)
        this.isEnd = false
        this.board = [
            [null, null, null],
            [null, null, null],
            [null, null, null]
        ];
        this.currentPlayer = "O";
        this.cellElements.forEach(cell => cell.innerText = "");
    }
    //Сохранение текущей игры в localstorage
    saveGame() {
        const currentGame = {
            board: this.board,
            mode: this.gameModeElement.value,
            currentPlayer: this.currentPlayer,
        }
        localStorage.setItem('saved-game', JSON.stringify(currentGame))
        this.alertController.showAlert(`Игра сохранена`)
    }
    //Очиста сохранения игры их localstorage
    clearSavedGame() {
        localStorage.removeItem('saved-game')
        this.alertController.showAlert(`Сохранение очищенно`)
    }
    //Загрузка игры из localstorage
    loadGame() {
        const savedGame = JSON.parse(localStorage.getItem('saved-game'))
        if (!savedGame) {
            this.alertController.showAlert(`Сохранение не найденно`)
            return
        }
        this.cellElements.forEach(cell => cell.innerText = "");
        this.board = savedGame.board
        this.currentPlayer = savedGame.currentPlayer
        this.gameModeElement.value = savedGame.mode
        this.board.forEach((row, rowIndex) => {
            row.forEach((cell, cellIndex) => {
                if (cell === 'X') {
                    this.cellElements[rowIndex * 3 + cellIndex].appendChild(this.xImage.cloneNode());
                } 
                if (cell === 'O'){
                    this.cellElements[rowIndex * 3 + cellIndex].appendChild(this.oImage.cloneNode());
                }
            })
        })
        this.alertController.showAlert(`Сохранение загруженно`)
    }
}