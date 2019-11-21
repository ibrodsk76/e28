<template>
    <div id='destinations' v-if='destination'>
        <h2>{{ destination.name }}</h2>
        <show-place
            v-for='place in destination.places'
            :key='place.id'
            :place='place'
            :destination='destination'
        ></show-place>
    </div>
</template>
<script>
import ShowPlace from './../ShowPlace.vue'
const axios = require('axios');

export default {
    name: 'DestinationPage',
    props: ['id'],
    components: {ShowPlace},
    data: function() {
        return {
            destination: null
        };
    },
    mounted() {
        this.destination = axios
        .get(
            'https://my-json-server.typicode.com/ibrodsk76/e28-tripplanner-api/destinations/' + this.id
        )
        .then(response => {
            this.destination = response.data;
        });
        
    }
}
</script>
<style>

</style>