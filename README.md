🕹️ Tic Tac Toe – JavaScript Edition

A browser-based Tic Tac Toe game built with factory functions and the module pattern in vanilla JavaScript. 
This project emphasizes clean architecture, separation of concerns, and zero global variables—perfect for practicing encapsulation and modular design.


🧠 Core Concepts Used

● Factory Functions: For creating multiple player instances.

● Module Pattern (IIFE): For single-instance modules like the gameboard and display controller.

● Encapsulation: Each part of the game handles only what it’s responsible for.

● Minimal Global Code: All logic is tucked inside modules or factories.


🔧 Features

● Players enter names and choose X or O.

● Alternating turns with clickable board interface.

● Win/tie detection logic.

● Prevents players from choosing an already taken cell.

● Restart game button.

● Displays the winner or tie result.


🚧 Development Process

1. Game Logic (Console Version First)
✅ Create Gameboard object using an IIFE to store a 9-element array.

✅ Use a Player(name, mark) factory function.

✅ Use a GameController module to manage turns, win checking, and board updates.

✅ Build and test gameplay logic in the console only.

2. DOM Integration
✅ Create a DisplayController module to:

Render gameboard array to the screen.

Handle player clicks and update game state.

Prevent moves in already filled cells.

3. User Interface
✅ Add input fields for player names.

✅ Add start and restart buttons.

✅ Display current turn and game outcome.


🧠 Design Philosophy

Divide and Conquer:
Each piece of logic lives in the module or factory where it logically belongs:

🧱 Gameboard – stores game state.

🧑‍🤝‍🧑 Player – stores player data.

🎮 GameController – controls flow, checks win/tie.

🖥️ DisplayController – handles UI rendering and user input.


📐 Pseudocode Plan: Tic Tac Toe

MODULE Gameboard:
    INIT board as Array[9] filled with null
    FUNCTION getBoard() → return board
    FUNCTION resetBoard() → set all cells in board to null
    FUNCTION updateCell(index, mark):
        IF board[index] is null:
            board[index] ← mark
            RETURN true
        RETURN false
    FUNCTION isFull() → return true if all cells are non-null


Creates Player Object with a mark (X and 0)
FUNCTION Player(name, mark):
    RETURN OBJECT {
        getName() → return name
        getMark() → return mark
    }

Manages the game loop, player turns, win logic
MODULE GameController:
    INIT players as empty array
    INIT currentPlayerIndex ← 0
    INIT gameOver ← false

    FUNCTION startGame(playerOneName, playerTwoName):
        players ← [Player(playerOneName, "X"), Player(playerTwoName, "O")]
        Gameboard.resetBoard()
        gameOver ← false
        currentPlayerIndex ← 0
        DisplayController.render()

    FUNCTION playTurn(index):
        IF gameOver is true:
            RETURN

        mark ← players[currentPlayerIndex].getMark()
        success ← Gameboard.updateCell(index, mark)
        
        IF success:
            DisplayController.render()
            IF checkWin(mark):
                gameOver ← true
                DisplayController.showResult(players[currentPlayerIndex].getName() + " wins!")
            ELSE IF Gameboard.isFull():
                gameOver ← true
                DisplayController.showResult("It's a tie!")
            ELSE:
                switchTurn()

    FUNCTION switchTurn():
        currentPlayerIndex ← (currentPlayerIndex + 1) % 2
        DisplayController.updateTurn(players[currentPlayerIndex].getName())

    FUNCTION checkWin(mark):
        DEFINE winPatterns as list of winning index combinations
        FOR each pattern in winPatterns:
            IF all Gameboard cells at pattern indices equal mark:
                RETURN true
        RETURN false
