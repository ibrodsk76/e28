<template>
    <div id='trips-page'>
        <h2>Your Trips</h2>

        <div v-if='trips.length == 0'>No trips</div>


        <ul v-else class='cleanList'>
            <li v-for='trip in trips' :key='trip.id'>
                <router-link exact :to='{ name: "trip", params: {"id" : trip.id } }'>
                    {{ getDestination(trip.id)['name'] }}
                </router-link>
            </li>
        </ul>
        <router-view></router-view>
    </div>
</template>
<script>
import { default as Trip }from './../../Trip.js';

export default {
    name: 'TripsPage',
    data: function() {
        return {
            trips: [],
            itinerary: null
        };
    },
    methods: {
        getDestination(tripId) {
            return this.destinations.find(({ id }) => id === tripId);
        }
    },
    mounted() {
        this.itinerary = new Trip();
        this.trips = this.itinerary.getTrips();
    },
    computed: {
        destinations: function() {
            return this.$store.state.destinations;
        }
    }
}
</script>
<style>

</style>