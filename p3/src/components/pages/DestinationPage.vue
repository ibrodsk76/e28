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
import * as app from './../../app.js';

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
        app.axios.get(app.config.api + 'destinations/' + this.id)
        .then(response => {
            this.destination = response.data;
        });
        
    }
}
</script>
<style>

</style>