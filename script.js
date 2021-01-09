const gameBoard = (function () {
    let board = ["", "", "", "", "", "", "", "", ""];
    const getBoard = () => {
        return board;
    };

    const changeTile = (index, newValue) => {
        board[index] = newValue;
    };

    const winningBoard = () => {
        const verticals = () => {
            for (let i = 0; i < 7; i += 3) {
                if (board[i] === board[i + 1] && board[i + 1] == board[i + 2] && board[i + 2] !== "") {
                    return true;
                }
            }
            return false;
        };

        const horizontals = () => {
            for (let i = 0; i < 3; i++) {
                if (board[i] === board[i + 3] && board[i + 3] === board[i + 6] && board[i + 6] !== "") {
                    return true;
                }
            }
            return false;
        };

        const diagonals = () => {
            return (board[0] === board[4] && board[4] === board[8] && board[8] !== "" || board[2] === board[4] && board[4] === board[6] && board[6] !== "");
        };

        return (verticals() || horizontals() || diagonals());
    };

    const isTied = () => {
        for (let i = 0; i < board.length; i++) {
            if (board[i] === "") {
                return false;
            }
        }

        return true;
    };

    const clear = () => {
        board.forEach(function (item, index) {
            changeTile(index, "");
        });
    };

    return {
        getBoard,
        changeTile,
        winningBoard,
        isTied,
        clear
    };
})();

const player = (symbol) => {
    return {
        symbol: symbol
    };
};

const displayController = (function () {
    const restartBtn = document.querySelector(".new-game");
    const grid = document.querySelector(".game-board");
    const board = gameBoard.getBoard();

    restartBtn.addEventListener("click", () => {
        grid.style["pointer-events"] = "auto";
        gameBoard.clear();
        playGame.setInitialState();
        clearDisplay();
    });

    board.forEach(function (item, index) {
        const div = document.createElement("div");
        const symbol = document.createTextNode(item);
        div.classList.toggle("tile");

        if (index === 7 || index === 4 || index === 1) {
            div.classList.toggle("vertical-borders");
        }
        if (index === 5 || index === 4 || index === 3) {
            div.classList.toggle("horizontal-borders");
        }

        div.addEventListener("click", () => {
            if (div.textContent === "") {
                let player = playGame.getCurrentPlayer();
                gameBoard.changeTile(index, player.symbol);
                div.textContent = player.symbol;
                playGame.takeTurn();
            }
        });

        div.appendChild(symbol);
        grid.appendChild(div);
    });

    const clearDisplay = () => {
        let tiles = document.getElementsByClassName("tile");
        for (let i = 0; i < tiles.length; i++) {
            tiles[i].textContent = "";
        }
    };
    
})();

const playGame = (function () {
    const player1 = player("X");
    const player2 = player("O");
    let currentPlayer = player1;
    const p1Text = document.querySelector(".p1Turn");
    const p2Text = document.querySelector(".p2Turn");
    const grid = document.querySelector(".game-board");

    const takeTurn = () => {
        if (gameBoard.isTied()) {
            p1Text.textContent = "Tied!";
            p2Text.textContent = "Tied!";
            grid.style["pointer-events"] = "none";

        } else if (gameBoard.winningBoard()) {
           
            grid.style["pointer-events"] = "none";
            if (currentPlayer === player1) {
                p1Text.textContent = "Winner!";
            } else {
                p2Text.textContent = "Winner!";
            }

        } else if (currentPlayer === player1) {
            p1Text.textContent = "";
            p2Text.textContent = "Your Turn!";
            currentPlayer = player2

        } else {
            setInitialState();
        }

    };

    const getCurrentPlayer = () => {
        return currentPlayer;
    };

    const setInitialState = () => {
        p1Text.textContent = "Your Turn!";
        p2Text.textContent = "";
        currentPlayer = player1;
    };

    return {
        takeTurn,
        getCurrentPlayer,
        setInitialState
    };

})();

