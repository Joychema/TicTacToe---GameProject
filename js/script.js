// Gameboard module: Handles internal representation of the game grid
const Gameboard = (function () {
    // Array to hold the state of the gameboard, 9 cells initialized to null
    const board = Array(9).fill(null);

    // Returns current board state
    const getBoard = () => board;

    // Reset all cells to null
    const resetBoard = () => {
        for (let i = 0; i < board.length; i++) {
            board[i] = null;
        }
    };

    // Updates a cell with the player's mark if it's empty
    const updateCell = (index, mark) => {
        if (!board[index]) {
            board[index] = mark;
            return true;
        }
        return false;
    };

    // Checks if all cells are filled (used to detect a tie)
    const isFull = () => board.every(cell => cell !== null);

    // publicly exposed methods
    return { getBoard, resetBoard, updateCell, isFull };

})();

// Player Factory: Creates a player object with name and mark (X or O)
const Player = (name, mark) => ({
    getName: () => name,
    getMark: () => mark
  });
  
// GameController Module: Manages game state, player turns, and win logic
const GameController = (function () {
    let players = [];
    let currentPlayerIndex = 0;
    let gameOver = false;
  
    // Starts a new game with provided player names
    const startGame = (name1, name2) => {
      players = [Player(name1, "X"), Player(name2, "O")];
      Gameboard.resetBoard();         // Clear the board
      currentPlayerIndex = 0;         // X always starts
      gameOver = false;
      DisplayController.render();     // Draw board
      DisplayController.updateTurn(players[currentPlayerIndex].getName());
    };
  
    // Handles logic when a cell is clicked
    const playTurn = (index) => {
      if (gameOver) return;
  
      const mark = players[currentPlayerIndex].getMark();
      const success = Gameboard.updateCell(index, mark);
  
      if (success) {
        DisplayController.render();  // Update UI with latest move
  
        if (checkWin(mark)) {
          gameOver = true;
          DisplayController.showResult(`${players[currentPlayerIndex].getName()} wins!`);
        } else if (Gameboard.isFull()) {
          gameOver = true;
          DisplayController.showResult("It's a tie!");
        } else {
          switchTurn(); // Change to next player
        }
      }
    };
  
    // Alternates between player 0 and 1
    const switchTurn = () => {
      currentPlayerIndex = (currentPlayerIndex + 1) % 2;
      DisplayController.updateTurn(players[currentPlayerIndex].getName());
    };
  
    // Checks if current player's mark meets any winning combination
    const checkWin = (mark) => {
      const b = Gameboard.getBoard();
      const winPatterns = [
        [0,1,2], [3,4,5], [6,7,8], // rows
        [0,3,6], [1,4,7], [2,5,8], // cols
        [0,4,8], [2,4,6]           // diagonals
      ];
      return winPatterns.some(pattern =>
        pattern.every(i => b[i] === mark)
      );
    };
  
    // Public API
    return { startGame, playTurn };
  })();
  
// DisplayController Module: Handles UI updates and DOM interaction
const DisplayController = (function () {
    // DOM element selections using querySelector
    const cells = document.querySelectorAll('.cell');
    const resultDisplay = document.querySelector('.result');
    const currentTurnDisplay = document.querySelector('.current-turn');
    const startBtn = document.querySelector('.start-btn');
    const restartBtn = document.querySelector('.restart-btn');
    const player1Input = document.querySelector('.player1');
    const player2Input = document.querySelector('.player2');
  
    // Updates each cell in the DOM to reflect board state
    const render = () => {
      const board = Gameboard.getBoard();
      cells.forEach((cell, index) => {
        cell.textContent = board[index] || '';
        // Assigns a click event handler to each cell
        cell.onclick = () => GameController.playTurn(index);
      });
    };
  
    // Displays a message when a player wins or game ties
    const showResult = (message) => {
      resultDisplay.textContent = message;
    };
  
    // Updates the text to show whose turn it is
    const updateTurn = (name) => {
      currentTurnDisplay.textContent = `Current Turn: ${name}`;
    };
  
    // Binds the Start and Restart buttons to their actions
    const bindButtons = () => {
      startBtn.onclick = () => {
        const name1 = player1Input.value || "Player 1";
        const name2 = player2Input.value || "Player 2";
        GameController.startGame(name1, name2);
        resultDisplay.textContent = "";
      };
  
      restartBtn.onclick = () => {
        const name1 = player1Input.value || "Player 1";
        const name2 = player2Input.value || "Player 2";
        GameController.startGame(name1, name2);
        resultDisplay.textContent = "";
      };
    };
  
    // Public API
    return { render, showResult, updateTurn, bindButtons };
  })();

  // Initialize UI logic after page has fully loaded
document.addEventListener('DOMContentLoaded', () => {
    DisplayController.bindButtons();
  });
  