let app = new Vue({
    el: '#app',
    data: {
        'numberOfPlayers': null,
        'players': [{name:'', symbol:'X'},{name:'',symbol:'O'}],
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

            if (this.numberOfPlayers == 1)    
            {
                // Computer makes a move
            }
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
        // reseting back to beginning of the game, all cells empty
        onReset: function() {
            this.numberOfPlayers = null;
            this.players = [{name:'', symbol:'X'},{name:'',symbol:'O'}],
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