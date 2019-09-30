let app = new Vue({
    el: '#app',
    data: {
        'numberOfPlayers': null,
        'players': ['',''],
        'currentPlayer': '',
        'currentSymbol': 'X',
        'gameOver': false,
        'gameTable': [['','',''],
                      ['','',''],
                      ['','',''],
                     ]
    },
    methods: {
        makeMove: function(row,cellindex) {
            if (this.numberOfPlayers == 1 && !this.players[1])
                this.players[1] = 'Computer';
            row.splice(cellindex,1,this.currentSymbol);
            if (this.currentSymbol == "X") 
                this.currentSymbol = "O";
            else
                this.currentSymbol ="X";
            
                if (this.currentPlayer == this.players[0])
                    this.currentPlayer = this.players[1];
                else
                    this.currentPlayer = this.players[0];    
        }
    }
});