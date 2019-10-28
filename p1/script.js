Vue.component('round-detail', {
    data: function () {
        return {
            deleted: false,
        }
    },
    template: '#round-detail',
    props: ['number', 'winner'],
    methods: {
        deleteRound: function () {
            this.deleted = true
        }
    }
});

let app = new Vue({
    el: '#app',
    data: {
        'numberOfPlayers': 1,
        'players': [{name:'', symbol:'X', rawValue: -1},{name:'',symbol:'O', rawValue: 1}],
        'currentPlayer': 0,
        'startPlayer': 0,
        'gameOver': false,
        'GameResults': null,
        'gameTable': [[{value:'',win:false},{value:'',win:false},{value:'',win:false}],
                      [{value:'',win:false},{value:'',win:false},{value:'',win:false}],
                      [{value:'',win:false},{value:'',win:false},{value:'',win:false}],
                     ],
        'roundNumber':1,
        'rounds': []                
    },
    methods: {
        makeMove: function(rowindex,cellindex) {
            // don't do anything if a cell is already occupied or game is over
            if (this.gameTable[rowindex][cellindex].value != "" || this.gameOver)
                return;
            // if first time here and one player is playing, second player's name is "Computer"
            if (this.numberOfPlayers == 1 && !this.players[1].name)
                this.players[1].name = 'Computer';
            // insert the symbol of the current playeer
            this.gameTable[rowindex].splice(cellindex,1,{value:this.players[this.currentPlayer].symbol,win:false});
            let result = this.isGameOver(this.gameTable, this.players[this.currentPlayer].symbol)
            if (result == 2)
            {
                this.GameResults = this.players[this.currentPlayer].name + " won!";   
                this.gameOver = true;
                this.rounds.push({number:this.roundNumber++,winner:this.players[this.currentPlayer].name});
                return;
            }
            else if (result == 1)
            {
                this.GameResults = "It's a draw!";    
                this.gameOver = true;
                this.rounds.push({number:this.roundNumber++,winner:'Draw'});
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
                    if (MyTable[i][j].value != symbol)
                        break;
                    if (j == 2) // if at the end of the row, then the current player won
                    {
                        // marking the winning row red
                        for (var k = 0; k <3; k ++)
                            MyTable[i][k].win = true;                         
                        return 2;
                    }
                }
            }
            // checking columns
            for (var j = 0; j < 3; j++) {
                for (var i = 0; i < 3; i++)
                {
                    if (MyTable[i][j].value != symbol)
                        break;
                    if (i == 2) // if at the bottom of the column, then the current player won
                    {
                        // marking the winning column red
                        for (var k = 0; k <3; k ++)
                            MyTable[k][j].win = true;                                             
                        return 2;
                    }
                }
            }
            // checking diagonal top left to bottom right
            for (var i = 0; i < 3; i++) {
                if (MyTable[i][i].value != symbol)
                    break;
                if (i == 2)
                {
                    // marking the winning diagonal red
                    for (var k = 0; k <3; k ++)
                        MyTable[k][k].win = true;                         
                    return 2;
                }
            }
            // checking diagonal top right to bottom left
            for (var i = 0; i < 3; i++) {
                j = 2-i;
                if (MyTable[i][j].value != symbol)
                    break;
                if (i == 2)
                {
                    // marking the winning diagonal red
                    for (var k = 0; k <3; k ++)
                        MyTable[k][2-k].win = true;                         
                    return 2;
                }
            }
            // if all the previous checks failed and no more empty spaces, then it's a draw
            for (var i = 0; i < 3; i++) {
                for (var j = 0; j < 3; j++)
                {
                    if (MyTable[i][j].value == "")
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
                    if (board[i][j].value == '') { // Only possible moves
                        var move = {};
                        move.location = [i,j];
                        var boardWithNewMove = JSON.parse(JSON.stringify(board)); // Copy board to make it mutable
                        boardWithNewMove[i][j].value = player.symbol; // Try the move
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

        // reseting the board back to beginning of the game, keeping the players, changing the order
        onPlayAgain: function() {
            this.startPlayer = (this.startPlayer == 0) ? 1 : 0;
            this.currentPlayer = this.startPlayer;
            this.gameOver = false;
            this.GameResults = null;
            this.gameTable = [[{value:'',win:false},{value:'',win:false},{value:'',win:false}],
            [{value:'',win:false},{value:'',win:false},{value:'',win:false}],
            [{value:'',win:false},{value:'',win:false},{value:'',win:false}],
            ]
            if (this.players[this.currentPlayer].name == "Computer")
                setTimeout(this.Move, 10);
        },

        // reseting everything back to beginning of the game
        onReset: function() {
            this.numberOfPlayers = 1;
            this.players = [{name:'', symbol:'X', rawValue: -1},{name:'',symbol:'O', rawValue: 1}],
            this.currentPlayer = 0;
            this.startPlayer = 0;
            this.gameOver = false;
            this.GameResults = null;
            this.roundNumber = 1;
            this.rounds = [];
            this.gameTable = [[{value:'',win:false},{value:'',win:false},{value:'',win:false}],
            [{value:'',win:false},{value:'',win:false},{value:'',win:false}],
            [{value:'',win:false},{value:'',win:false},{value:'',win:false}],
           ]
        },
        deleteRound: function (roundNumber) {
            function isMatchingRound(round) {
                return round.number != this;
            }
            this.rounds = this.rounds.filter(isMatchingRound, roundNumber);
        }
    }
});