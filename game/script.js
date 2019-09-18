var currentPlayer = "Player 1";
var currentSymbol = "X";
var gameOver = false;
    
var tbl = document.getElementById("tttTable");
if (tbl != null) {
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++)
            tbl.rows[i].cells[j].onclick = function () { setXO(this); };
        }
    }
function setXO(cel) {
    if (cel.innerText != "" || gameOver)
        return;
    cel.innerText = currentSymbol;
    if (isGameOver())
    {
        gameOver = true;
        return;
    }
    if (currentSymbol == "X")
        currentSymbol = "O";
    else
        currentSymbol = "X";    
    if (currentPlayer == "Player 1")
        currentPlayer = "Player 2";
    else
        currentPlayer = "Player 1";    

    document.getElementById("lblPlayer").innerText = currentPlayer + "'s turn";
}

function isGameOver()
{
    var tbl = document.getElementById("tttTable");
    if (tbl != null) {
        // checking rows
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++)
            {
                if (tbl.rows[i].cells[j].innerText != currentSymbol)
                    break;
                if (j == 2) // if at the end of the row, then the current player won
                {
                    document.getElementById("lblResult").innerText = currentPlayer + " won!";    
                    return true;
                }
            }
        }
        // checking columns
        for (var j = 0; j < 3; j++) {
            for (var i = 0; i < 3; i++)
            {
                if (tbl.rows[i].cells[j].innerText != currentSymbol)
                    break;
                if (i == 2) // if at the bottom of the column, then the current player won
                {
                    document.getElementById("lblResult").innerText = currentPlayer + " won!";    
                    return true;
                }
            }
        }
        // checking diagonal top left to bottom right
        for (var i = 0; i < 3; i++) {
            if (tbl.rows[i].cells[i].innerText != currentSymbol)
                break;
            if (i == 2)
            {
                document.getElementById("lblResult").innerText = currentPlayer + " won!";    
                return true;
            }
        }
        // checking diagonal top right to bottom left
        for (var i = 0; i < 3; i++) {
            j = 2-i;
            if (tbl.rows[i].cells[j].innerText != currentSymbol)
                break;
            if (i == 2)
            {
                document.getElementById("lblResult").innerText = currentPlayer + " won!";    
                return true;
            }
        }
        // if all the previous checks failed and no more empty spaces, then it's a draw
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++)
            {
                if (tbl.rows[i].cells[j].innerText == "")
                    return;
                if (i == 2 && j == 2)
                {
                    document.getElementById("lblResult").innerText = "It's a draw!";    
                    return true;
                }
            }
        }
    }
    return false;
}

// reseting back to beginning of the game, all cells empty
function onReset()
{
    currentPlayer = "Player 1";
    currentSymbol = "X";
    
    var tbl = document.getElementById("tttTable");
    if (tbl != null) {
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++)
                tbl.rows[i].cells[j].innerText = "";
        }
    }

    document.getElementById("lblResult").innerText = "";
    document.getElementById("lblPlayer").innerText = currentPlayer + "'s turn";
    gameOver = false;
}