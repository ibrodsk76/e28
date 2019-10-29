<template>
    <div>
        <ul>
            <li>Round #: {{ number }}</li>
            <li>Winner: {{ winner }}</li>
        </ul>
        <button @click="$emit('delete-round', number)">Delete round</button>
    </div>
</template>
<script>
export default {
   data: function () {
        return {
        }
    },
    template: '#round-detail',
    props: ['number', 'winner']
};
</script>
<style></style>