<template>
    <div>
        <p>{{ playerName }}'s turn</p>
        <table>
            <tr v-for="(row,rowindex) in gameTable" v-bind:key='rowindex'>
                <td v-for="(cell,cellindex) in row" v-on:click="$emit('make-move',[rowindex,cellindex])" v-bind:key='cellindex'
                v-bind:class="{ results: gameTable[rowindex][cellindex].win }">
                            {{cell.value}}
                </td> 
            </tr>
        </table>
        <div class='results'>
            {{gameResults}}
        </div>
    </div>
</template>
<script>
export default {
   data: function () {
        return {
        }
    },
    template: '#tictactoe-board',
    props: ['gameTable','playerName','gameResults']
};
</script>
<style scoped>
table {
    border-collapse: collapse;
}   
table td {
    border: 1px solid black;
    width: 20px;
    height: 20px;
    padding: 10px 10px;
}
table tr:first-child td{
    border-top: 0;
}
table tr:last-child td {
    border-bottom: 0;
}
table tr td:first-child
{
    border-left: 0;
}
table tr td:last-child
{
    border-right: 0;
}
.results
{
    color: red;
}
</style>