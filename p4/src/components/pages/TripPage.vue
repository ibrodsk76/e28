<template>
    <div id='destinations' v-if='destination'>
        <h2>Your Trip Itinerary</h2>
        <h2> <router-link exact :to='{ name: "destination", params: {"id" : destination.id } }'>
                    {{ destination.name }}
                </router-link>
        </h2>

        <div data-test='no-places' v-if='!trip || trip.places.length == 0'>No places</div>

        <div v-else-if='trip.places.length > 0'>
            <show-tripplace
                v-for='place in trip.places'
                :key='place.id'
                :placeId='place.id'
                :destination='destination'
                v-on:remove-fromitinerary='removeFromitinerary($event[0],$event[1])'
            ></show-tripplace>
        </div>
        
        <router-view></router-view>
    </div>
</template>
<script>
import ShowTripplace from './../ShowTripplace.vue'
import { default as Trip }from './../../Trip.js';

export default {
    name: 'TripPage',
    props: ['id'],
    components: {ShowTripplace},
    data: function() {
        return {
            trip: null
        };
    },
    methods: {
        removeFromitinerary: function(destinationId, placeId) {
            let itinerary = new Trip();
            itinerary.remove(destinationId, placeId);        
            this.trip = itinerary.getTrip(this.id);    
        }
    },
    computed: {
        destination: function() {
            return this.$store.getters.getDestinationById(this.id);
        }
    },
    mounted() {
        let itinerary = new Trip();
        this.trip = itinerary.getTrip(this.id);
    }
}
</script>
<style>

</style>