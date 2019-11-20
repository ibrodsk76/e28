<template>
    <div id='products' v-if='destination'>
        <h2>Your Trip Itinerary</h2>
        <h2> <router-link exact :to='{ name: "destination", params: {"id" : destination.id } }'>
                    {{ destination.name }}
                </router-link>
        </h2>

        <div v-if='trip.places.length == 0'>No places</div>

        <div v-else-if='trip.places.length > 0'>
            <show-place
                v-for='place in trip.places'
                :key='place.id'
                :place='getPlace(place.id)'
                :destination='destination'
            ></show-place>
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
import ShowPlace from './../ShowPlace.vue'
import { default as Trip }from './../../Trip.js';
const axios = require('axios');

export default {
    name: 'TripPage',
    props: ['id'],
    components: {ShowPlace},
    data: function() {
        return {
            trip: null,
            destination: null
        };
    },
    methods: {
        getPlace(placeId){
            return this.destination.places.find(({ id }) => id === placeId);
        }
    },
    mounted() {
        let itinerary = new Trip();
        this.trip = itinerary.getTrip(this.id);
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