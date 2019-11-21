<template>
    <div id='products' v-if='destination'>
        <h2>Your Trip Itinerary</h2>
        <h2> <router-link exact :to='{ name: "destination", params: {"id" : destination.id } }'>
                    {{ destination.name }}
                </router-link>
        </h2>

        <div v-if='!trip || trip.places.length == 0'>No places</div>

        <div v-else-if='trip.places.length > 0'>
            <show-tripplace
                v-for='place in trip.places'
                :key='place.id'
                :placeId='place.id'
                :destination='destination'
                v-on:remove-fromitinerary='removeFromitinerary($event[0],$event[1])'
            ></show-tripplace>
        </div>
        <!--<ul v-else-if='trip.places.length > 0' class='cleanList'>
            <li v-for='place in trip.places' :key='place.id'>                   
                {{ getPlace(trip.id, place.id)['name'] }}
                <button @click='removeFromItinerary(trip.id, place.id)'>Remove</button>
            </li>
        </ul>-->
        
        <router-view></router-view>
    </div>
</template>
<script>
import ShowTripplace from './../ShowTripplace.vue'
import { default as Trip }from './../../Trip.js';
const axios = require('axios');

export default {
    name: 'TripPage',
    props: ['id'],
    components: {ShowTripplace},
    data: function() {
        return {
            trip: null,
            destination: null
        };
    },
    methods: {
        removeFromitinerary: function(destinationId, placeId) {
            let itinerary = new Trip();
            itinerary.remove(destinationId, placeId);        
            this.trip = itinerary.getTrip(this.id);    
            //app.store.cartCount = this.cart.count();
        }
    },
    mounted() {
        let itinerary = new Trip();
        this.trip = itinerary.getTrip(this.id);
        axios
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