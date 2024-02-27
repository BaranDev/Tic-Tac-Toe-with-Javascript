function showMenu() {
    document.getElementById('menu').style.display = 'block';
    document.getElementById('gameContainer').style.display = 'none';
    window.location.reload(); 
}

function startTwoPlayerGame() {
    document.getElementById('menu').style.display = 'none';
    document.getElementById('gameContainer').style.display = 'block';
    const cells = document.querySelectorAll('.cell');
    let currentPlayer = 'X';
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    function checkWin() {
        return winningCombinations.some(combination => {
            return combination.every(index => {
                return cells[index].classList.contains(currentPlayer);
            });
        });
    }

    function checkDraw() {
        return [...cells].every(cell => {
            return cell.classList.contains('X') || cell.classList.contains('O');
        });
    }

    function handleClick(event) {
        const cell = event.target;
        cell.textContent = currentPlayer;
        cell.classList.add(currentPlayer, 'taken');

        if (checkWin()) {
            alert(currentPlayer + ' wins!');
            resetGame();
        } else if (checkDraw()) {
            alert('Draw!');
            resetGame();
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }

    function resetGame() {
        cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('X', 'O', 'taken');
        });
        currentPlayer = 'X';
    }

    cells.forEach(cell => {
        cell.addEventListener('click', handleClick);
    });
    document.getElementById('reset').addEventListener('click', resetGame);
    document.getElementById('back').addEventListener('click', showMenu);
}

function startComputerGame() {
    document.getElementById('menu').style.display = 'none';
    document.getElementById('gameContainer').style.display = 'block';
    const cells = document.querySelectorAll('.cell');
    let currentPlayer = 'X';
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    function checkWin() {
        return winningCombinations.some(combination => {
            return combination.every(index => {
                return cells[index].classList.contains(currentPlayer);
            });
        });
    }

    function checkDraw() {
        return [...cells].every(cell => {
            return cell.classList.contains('X') || cell.classList.contains('O');
        });
    }

    function handleClick(event) {
        const cell = event.target;
        cell.textContent = currentPlayer;
        cell.classList.add(currentPlayer, 'taken');

        if (checkWin()) {
            alert(currentPlayer + ' wins!');
            resetGame();
        } else if (checkDraw()) {
            alert('Draw!');
            resetGame();
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            if (currentPlayer === 'O') {
                computerMove();
            }
        }
    }

    function resetGame() {
        cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('X', 'O', 'taken');
        });
        currentPlayer = 'X';
    }

    function computerMove() {
        const emptyCells = [...document.querySelectorAll('.cell')].filter(c => !c.classList.contains('X') && !c.classList.contains('O'));
        if (emptyCells.length === 0) return;

        // Try to win if possible
        for (let i = 0; i < emptyCells.length; i++) {
            const move = emptyCells[i];
            move.textContent = 'O';
            move.classList.add('O', 'taken');
            if (checkWin()) {
                alert('Computer wins!');
                resetGame();
                return;
            }
            move.textContent = '';
            move.classList.remove('O', 'taken');
        }

        // Block the player if they are about to win
        for (let i = 0; i < emptyCells.length; i++) {
            const move = emptyCells[i];
            move.textContent = 'X';
            move.classList.add('X', 'taken');
            if (checkWin()) {
                move.textContent = 'O';
                move.classList.add('O', 'taken');
                currentPlayer = 'X';
                return;
            }
            move.textContent = '';
            move.classList.remove('X', 'taken');
        }

        // If no immediate winning or blocking moves, make a random move
        const move = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        move.textContent = 'O';
        move.classList.add('O', 'taken');
        if (checkWin()) {
            alert('Computer wins!');
            resetGame();
            return;
        } else if (checkDraw()) {
            alert('Draw!');
            resetGame();
            return;
        }
        currentPlayer = 'X';
    }

    cells.forEach(cell => {
        cell.addEventListener('click', handleClick);
    });
    document.getElementById('reset').addEventListener('click', resetGame);
    document.getElementById('back').addEventListener('click', showMenu);
}

window.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById('twoPlayers').addEventListener('click', startTwoPlayerGame);
    document.getElementById('vsComputer').addEventListener('click', startComputerGame);
    document.getElementById('menuButton').addEventListener('click', showMenu);
});
