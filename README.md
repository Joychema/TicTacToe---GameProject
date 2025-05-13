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
