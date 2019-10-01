let app = new Vue({
    el: '#app',
    data: {
        'numberOfPlayers': null,
        'players': ['',''],
        'currentPlayer': '',
        'currentSymbol': 'X',
        'gameOver': false,
        'GameResults': null,
        'gameTable': [['','',''],
                      ['','',''],
                      ['','',''],
                     ]
    },
    methods: {
        makeMove: function(rowindex,cellindex) {
            if (this.gameTable[rowindex][cellindex] != "" || this.gameOver)
                return;
            if (this.numberOfPlayers == 1 && !this.players[1])
                this.players[1] = 'Computer';
            this.gameTable[rowindex].splice(cellindex,1,this.currentSymbol);
            if (this.isGameOver())
            {
                gameOver = true;
                return;
            }
            if (this.currentSymbol == "X") 
                this.currentSymbol = "O";
            else
                this.currentSymbol ="X";
            
            if (this.currentPlayer == this.players[0])
                this.currentPlayer = this.players[1];
            else
                this.currentPlayer = this.players[0];    

            if (this.numberOfPlayers == 1)    
            {
                // Computer makes a move
            }
        },
        isGameOver: function() {
            // checking rows
            for (var i = 0; i < 3; i++) {
                for (var j = 0; j < 3; j++)
                {
                    if (this.gameTable[i][j] != this.currentSymbol)
                        break;
                    if (j == 2) // if at the end of the row, then the current player won
                    {
                        this.GameResults = this.currentPlayer + " won!";    
                        return 2;
                    }
                }
            }
            // checking columns
            for (var j = 0; j < 3; j++) {
                for (var i = 0; i < 3; i++)
                {
                    if (this.gameTable[i][j] != this.currentSymbol)
                        break;
                    if (i == 2) // if at the bottom of the column, then the current player won
                    {
                        this.GameResults = this.currentPlayer + " won!";    
                        return 2;
                    }
                }
            }
            // checking diagonal top left to bottom right
            for (var i = 0; i < 3; i++) {
                if (this.gameTable[i][i] != this.currentSymbol)
                    break;
                if (i == 2)
                {
                    this.GameResults = this.currentPlayer + " won!";    
                    return 2;
                }
            }
            // checking diagonal top right to bottom left
            for (var i = 0; i < 3; i++) {
                j = 2-i;
                if (this.gameTable[i][j] !=this.currentSymbol)
                    break;
                if (i == 2)
                {
                    this.GameResults = this.currentPlayer + " won!";    
                    return 2;
                }
            }
            // if all the previous checks failed and no more empty spaces, then it's a draw
            for (var i = 0; i < 3; i++) {
                for (var j = 0; j < 3; j++)
                {
                    if (this.gameTable[i][j] == "")
                        return 0;
                    if (i == 2 && j == 2)
                    {
                        this.GameResults = "It's a draw!";    
                        return 1;
                    }
                }
            }
            return 0;
        },
        // reseting back to beginning of the game, all cells empty
        onReset: function() {
            this.numberOfPlayers = null;
            this.players =  ['',''];
            this.currentPlayer = '';
            this.currentSymbol = 'X';
            this.gameOver = false;
            this.GameResults = null;
            this.gameTable = [['','',''],
                         ['','',''],
                         ['','',''],
                        ];
        }
    }
});