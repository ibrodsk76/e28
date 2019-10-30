<template>
  <div id="app">
    <h1>Tic Tac Toe</h1>
        <div id='app' v-cloak>
            <div v-if='gameMode == "start"'>
                <div>
                    <input type='radio' id='onePlayer' value='1' v-model='numberOfPlayers'>
                    <label for='onePlayer'>One Player</label>
                    <input type='radio' id='twoPlayers' value='2' v-model='numberOfPlayers'>
                    <label for='twoPlayers'>Two Players</label>
                </div>
                <div>
                    <p v-if='numberOfPlayers == 1'>
                        <label>What’s your name? <input type='text' v-model='players[0].name' @keyup.enter='startGame'></label>
                    </p>
                    <p v-if='numberOfPlayers == 2'>
                        <label>Player 1, what’s your name? <input type='text' v-model='players[0].name' ></label>
                        <label>Player 2, what’s your name? <input type='text' v-model='players[1].name'></label>
                    </p>
                    <div v-if='(numberOfPlayers==1 && players[0].name) || (numberOfPlayers == 2 && players[0].name && players[1].name)'>
                        <button @click='startGame'>Lets play!</button>
                    </div>    
                </div>
            </div>                     
            <div v-else>
                <tictactoe-board
                    v-on:make-move='makeMove($event[0],$event[1])'
                    :game-table='gameTable'
                    :player-name='players[currentPlayer].name'
                    :game-results='GameResults'>
                </tictactoe-board>
        
                <br/>
                <button v-if='gameOver' v-on:click="onPlayAgain">Play Again</button>
                <button v-on:click="onReset">Reset</button>
                <h2 v-if='rounds.length>0' class='rounds'>Results</h2>
                <round-detail 
                    v-for='round in rounds' 
                    v-on:delete-round='deleteRound($event)'
                    v-bind:number='round.number' 
                    v-bind:winner='round.winner'
                    v-bind:key='round.number'>
                </round-detail>
            </div>
        </div>
  </div>
</template>

<script>
import RoundDetail from './components/RoundDetail.vue';
import TictactoeBoard from './components/TictactoeBoard.vue';

export default {
  name: 'app',
  components: {
    RoundDetail,
    TictactoeBoard
  },
  data: function() {
      return {
        gameMode: 'start',
        numberOfPlayers: '',
        players: [{name:'', symbol:'X', rawValue: -1},{name:'',symbol:'O', rawValue: 1}],
        currentPlayer: 0,
        startPlayer: 0,
        gameOver: false,
        GameResults: null,
        gameTable: [[{value:'',win:false},{value:'',win:false},{value:'',win:false}],
                      [{value:'',win:false},{value:'',win:false},{value:'',win:false}],
                      [{value:'',win:false},{value:'',win:false},{value:'',win:false}],
                     ],
        roundNumber:1,
        rounds: []     }
    },
    methods: {
        startGame: function () {
            if (this.numberOfPlayers == 1)
                this.players[1].name = "Computer";
            this.gameMode = 'play';
        },
        makeMove: function(rowindex,cellindex) {
            // don't do anything if a cell is already occupied or game is over
            if (this.gameTable[rowindex][cellindex].value != "" || this.gameOver)
                return;
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
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++)
                {
                    if (MyTable[i][j].value != symbol)
                        break;
                    if (j == 2) // if at the end of the row, then the current player won
                    {
                        // marking the winning row red
                        for (let k = 0; k <3; k ++)
                            MyTable[i][k].win = true;                         
                        return 2;
                    }
                }
            }
            // checking columns
            for (let j = 0; j < 3; j++) {
                for (let i = 0; i < 3; i++)
                {
                    if (MyTable[i][j].value != symbol)
                        break;
                    if (i == 2) // if at the bottom of the column, then the current player won
                    {
                        // marking the winning column red
                        for (let k = 0; k <3; k ++)
                            MyTable[k][j].win = true;                                             
                        return 2;
                    }
                }
            }
            // checking diagonal top left to bottom right
            for (let i = 0; i < 3; i++) {
                if (MyTable[i][i].value != symbol)
                    break;
                if (i == 2)
                {
                    // marking the winning diagonal red
                    for (let k = 0; k <3; k ++)
                        MyTable[k][k].win = true;                         
                    return 2;
                }
            }
            // checking diagonal top right to bottom left
            for (let i = 0; i < 3; i++) {
                let j = 2-i;
                if (MyTable[i][j].value != symbol)
                    break;
                if (i == 2)
                {
                    // marking the winning diagonal red
                    for (let k = 0; k <3; k ++)
                        MyTable[k][2-k].win = true;                         
                    return 2;
                }
            }
            // if all the previous checks failed and no more empty spaces, then it's a draw
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++)
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
                let bestScore = -2;
                for(let k = 0; k < moves.length; k++) {
                    if(moves[k].score > bestScore) {
                        bestScore = moves[k].score;
                        bestMove = k;
                    }
                }
            } else {              
              // else loop over the moves and choose the move with the lowest score
                let bestScore = 2;
                for(let k = 0; k < moves.length; k++) {
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
            this.numberOfPlayers = '';
            this.players = [{name:'', symbol:'X', rawValue: -1},{name:'',symbol:'O', rawValue: 1}],
            this.currentPlayer = 0;
            this.startPlayer = 0;
            this.gameOver = false;
            this.GameResults = null;
            this.gameMode = 'start';
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
}
</script>

<style>
.rounds
{
    color: rgb(187, 50, 50);
}
[v-cloak] {
    display: none
}
</style>
