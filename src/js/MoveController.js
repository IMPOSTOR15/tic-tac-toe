export default class MoveController {
    constructor(boardController, gameModeElement) {
        this.boardController = boardController;
        this.gameModeElement = gameModeElement;
    }

    move(x, y) {
        this.boardController.makeMove(x, y);
        let mode = this.gameModeElement.value;
        console.log();
        if (this.boardController.currentPlayer === "X" && (mode === "easy" || mode === "hard")) {
            this.computerMove(mode);
        }
    }

    computerMove(mode) {
        if (mode === "easy") {
            this.randomMove();
        } else if (mode === "hard") {
            this.bestMove();
        }
    }

    // Функция для выполнения случайного хода в игре
    randomMove() {
        let availableMoves = [];
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                // Если клетка пуста - добавить эту клетку в массив доступных ходов
                if (this.boardController.board[i][j] === null) {
                    availableMoves.push({ x: i, y: j });
                }
            }
        }
        // Если есть доступные ходы
        if (availableMoves.length) {
            // Выбираем и выполняем случайный ход из списка доступных
            let move = availableMoves[Math.floor(Math.random() * availableMoves.length)];
            this.boardController.makeMove(move.x, move.y);
        }
    }

    // Функция для выполнения лучшего возможного хода в игре
    bestMove() {
        let bestScore = -Infinity;
        let move;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                // Если клетка пуста
                if (this.boardController.board[i][j] === null) {
                    // Попробуем сделать ход текущим игроком
                    this.boardController.board[i][j] = this.boardController.currentPlayer;
                    // Оцениваем доску с помощью функции minimax
                    let score = this.currentPlayer === "X" ? this.minimax(this.boardController.board, 0, true) : this.minimax(this.boardController.board, 0, false);
                    // Отменить ход
                    this.boardController.board[i][j] = null;
                    // Если текущий результирующий балл лучше предыдущего
                    if (score > bestScore) {
                        bestScore = score;
                        move = { x: i, y: j };
                    }
                }
            }
        }
        // Выполнить лучший найденный ход
        this.boardController.makeMove(move.x, move.y);
    }

    // Рекурсивная функция для оценки доски игры
    
    minimax(board, depth, isMaximizing) {
        // Проверка наличия победителя на текущей доске
        let winner = this.boardController.checkWin();

        // Если победитель найден
        if (winner !== null) {
            if (winner === "X") {
                return 1;
            } else if (winner === "O") {
                return -1;
            } else {
                return 0;
            }
        }
        // Проверка на ничью (если все клетки заполнены и нет победителя)
        if (this.boardController.checkDraw()) {
            return 0;
        }

        // Если текущий игрок - максимизатор ("X")
        if (isMaximizing) {
            let bestScore = -Infinity;
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    if (board[i][j] === null) {
                        board[i][j] = "X";
                        // Рекурсивный вызов для следующего игрока
                        let score = this.minimax(board, depth + 1, false);
                        board[i][j] = null;
                        bestScore = Math.max(score, bestScore);
                    }
                }
            }
            return bestScore;
        // Если текущий игрок - минимизатор ("O")
        } else {
            let bestScore = Infinity;
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    if (board[i][j] === null) {
                        board[i][j] = "O";
                        // Рекурсивный вызов для следующего игрока
                        let score = this.minimax(board, depth + 1, true);
                        board[i][j] = null;
                        bestScore = Math.min(score, bestScore);
                    }
                }
            }
            return bestScore;
        }
    }
}