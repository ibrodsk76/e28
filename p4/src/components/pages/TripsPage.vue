<template>
    <div id='trips-page'>
        <h2>Your Trips</h2>

        <div v-if='trips.length == 0'>You don't have any trips. <br> 
        Select a destination to start building your itinerary <br>
        <router-link exact :to='{ name: "destinations" }'>
            All Destinations
        </router-link>
        </div>


        <ul v-else class='cleanList'>
            <li v-for='trip in trips' :key='trip.id'>
                <router-link data-test='destination-name' exact :to='{ name: "trip", params: {"id" : trip.id } }'>
                    {{ getDestinationName(trip.id) }}
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
        getDestinationName(tripId) {
            let dest = this.destinations.find(({ id }) => id === tripId);
            if (dest)
                return dest.name;
            else
                return null;
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