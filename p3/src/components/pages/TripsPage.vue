<template>
    <div id='trips-page'>
        <h2>Your Trips</h2>

        <div v-if='trips.length == 0'>No trips</div>


        <ul v-else-if='destinations.length > 0' class='cleanList'>
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
import * as app from './../../app.js';

export default {
    name: 'TripsPage',
    data: function() {
        return {
            trips: [],
            itinerary: null,
            destinations: null
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
        app.axios.get(app.config.api + 'destinations')
        .then(response => {
            this.destinations = response.data;
        });
    }
}
</script>
<style>

</style>