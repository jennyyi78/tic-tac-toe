const gameBoard = (function () {
    let board = ["", "", "", "", "", "", "", "", ""];
    const getBoard = () => {
        return board;
    }

    const changeTile = (index, newValue) => {
        board[index] = newValue;
    }

    const winningBoard = () => {
        const verticals = () => {
            for (let i = 0; i < 7; i += 3) {
                if (board[i] === board[i + 1] && board[i + 1] == board[i + 2] && board[i + 2] !== "") {
                    return true;
                }
            }
            return false;
        }

        const horizontals = () => {
            for (let i = 0; i < 3; i++) {
                if (board[i] === board[i + 3] && board[i + 3] === board[i + 6] && board[i + 6] !== "") {
                    return true;
                }
            }
            return false;
        }

        const diagonals = () => {
            return (board[0] === board[4] && board[4] === board[8] && board[8] !== "" || board[2] === board[4] && board[4] === board[6] && board[6] !== "");
        }

        console.log(verticals());
        console.log(horizontals());
        console.log(diagonals());
        return (verticals() || horizontals() || diagonals());
    }
    return {
        getBoard,
        changeTile,
        winningBoard
    };
})();

const player = (symbol) => {
    return {
        symbol: symbol
    };
};

const displayController = (function () {
    const grid = document.querySelector(".game-board");
    const board = gameBoard.getBoard();
    board.forEach(function (item, index) {
        const div = document.createElement("div");
        const symbol = document.createTextNode(item);
        div.classList.toggle("tile");
        div.addEventListener("click", () => {
            let player = playGame.getCurrentPlayer();
            gameBoard.changeTile(index, player.symbol);
            div.textContent = player.symbol;
            playGame.takeTurn();
        });
        div.appendChild(symbol);
        grid.appendChild(div);
    });
})();

const playGame = (function () {
    const player1 = player("X");
    const player2 = player("O");
    let currentPlayer = player1;

    const takeTurn = () => {
        if (currentPlayer === player1) {
            currentPlayer = player2
        } else {
            currentPlayer = player1;
        }

        if (gameBoard.winningBoard()) {
            console.log("WIN");
        }
    }

    const getCurrentPlayer = () => {
        return currentPlayer;
    }

    return {
        takeTurn,
        getCurrentPlayer
    };
})();

