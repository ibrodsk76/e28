let app = new Vue({
    el: '#app',
    data: {
        'numberOfPlayers': 1,
        'players': [{name:'', symbol:'X', rawValue: -1},{name:'',symbol:'O', rawValue: 1}],
        'currentPlayer': 0,
        'gameOver': false,
        'GameResults': null,
        'gameTable': [['','',''],
                      ['','',''],
                      ['','',''],
                     ]
    },
    methods: {
        makeMove: function(rowindex,cellindex) {
            // don't do anything if a cell is already occupied or game is over
            if (this.gameTable[rowindex][cellindex] != "" || this.gameOver)
                return;
            // if first time here and one player is playing, second player's name is "Computer"
            if (this.numberOfPlayers == 1 && !this.players[1].name)
                this.players[1].name = 'Computer';
            // insert the symbol of the current playeer
            this.gameTable[rowindex].splice(cellindex,1,this.players[this.currentPlayer].symbol);
            let result = this.isGameOver(this.gameTable, this.players[this.currentPlayer].symbol)
            if (result == 2)
            {
                this.GameResults = this.players[this.currentPlayer].name + " won!";   
                gameOver = true;
                return;
            }
            else if (result == 1)
            {
                this.GameResults = "It's a draw!";    
                gameOver = true;
                return;
            }

            this.currentPlayer = (this.currentPlayer == 0) ? 1 : 0;
            
            if (this.numberOfPlayers == 1 && this.currentPlayer == 1)    
            {
                // Computer makes a move
                // make it sleep for 500 ms, looks better
                setTimeout(this.Move, 500);
            }
        },
        Move: function() {
            var bestSpot = this.minimax(this.gameTable,this.players[0]);
            // make move          
            this.makeMove(bestSpot.location[0],bestSpot.location[1]);
        },
        isGameOver: function(MyTable, symbol) {
            // checking rows
            for (var i = 0; i < 3; i++) {
                for (var j = 0; j < 3; j++)
                {
                    if (MyTable[i][j] != symbol)
                        break;
                    if (j == 2) // if at the end of the row, then the current player won
                    {                         
                        return 2;
                    }
                }
            }
            // checking columns
            for (var j = 0; j < 3; j++) {
                for (var i = 0; i < 3; i++)
                {
                    if (MyTable[i][j] != symbol)
                        break;
                    if (i == 2) // if at the bottom of the column, then the current player won
                    {
                        return 2;
                    }
                }
            }
            // checking diagonal top left to bottom right
            for (var i = 0; i < 3; i++) {
                if (MyTable[i][i] != symbol)
                    break;
                if (i == 2)
                {
                    return 2;
                }
            }
            // checking diagonal top right to bottom left
            for (var i = 0; i < 3; i++) {
                j = 2-i;
                if (MyTable[i][j] != symbol)
                    break;
                if (i == 2)
                {
                    return 2;
                }
            }
            // if all the previous checks failed and no more empty spaces, then it's a draw
            for (var i = 0; i < 3; i++) {
                for (var j = 0; j < 3; j++)
                {
                    if (MyTable[i][j] == "")
                        return 0;
                    if (i == 2 && j == 2)
                    {
                        return 1;
                    }
                }
            }
            return 0;
        },

        minimax: function(board, player) {

            var currResult = this.isGameOver(board,player.symbol);
            if (currResult == 2) 
                return {score:player.rawValue}; // 1 or -1
            else if (currResult == 1)
                return {score:0};

            var moves = [];

            player = this.players[(player.rawValue == -1) ? 1 : 0];
              
            for (var i = 0; i < 3; i++) {
                for (var j = 0; j < 3; j++) { // For all moves
                    if (board[i][j] == '') { // Only possible moves
                        var move = {};
                        move.location = [i,j];
                        var boardWithNewMove = JSON.parse(JSON.stringify(board)); // Copy board to make it mutable
                        boardWithNewMove[i][j] = player.symbol; // Try the move
                        var result = this.minimax(boardWithNewMove, player);
                        move.score = result.score;
                        moves.push(move);
                    
                    }    
                } 
            }         
            //choosing best move    
            var bestMove;
            // if it is the computer's turn loop over the moves and choose the move with the highest score
            if(player.rawValue == 1) {
                var bestScore = -2;
                for(var k = 0; k < moves.length; k++) {
                    if(moves[k].score > bestScore) {
                        bestScore = moves[k].score;
                        bestMove = k;
                    }
                }
            } else {              
              // else loop over the moves and choose the move with the lowest score
                var bestScore = 2;
                for(var k = 0; k < moves.length; k++) {
                    if(moves[k].score < bestScore) { 
                        bestScore = moves[k].score;
                        bestMove = k;
                    }
                }
            }
              
            // return the chosen move (object) from the array to the higher depth
            return moves[bestMove];
                  
        },

        // reseting back to beginning of the game, all cells empty
        onReset: function() {
            this.numberOfPlayers = 1;
            this.players = [{name:'', symbol:'X', rawValue: -1},{name:'',symbol:'O', rawValue: 1}],
            this.currentPlayer = 0;
            this.gameOver = false;
            this.GameResults = null;
            this.gameTable = [['','',''],
                         ['','',''],
                         ['','',''],
                        ];
        }
    }
});