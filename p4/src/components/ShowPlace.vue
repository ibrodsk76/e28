<template>
    <div class='destination'>
        <div class='destination-name'>{{ place.name }}</div>
        <img class='destination-thumb' :src='"./../assets/images/places/" + destination.id + "/" + place.id + ".jpg"' />
        <p class='destination-description'>{{ place.description }}</p>

        <button v-if='!tripplace' @click='addToItinerary(destination.id, place.id)'>Add to itinerary</button>
        <button v-if='tripplace' @click='removeFromItinerary(destination.id, place.id)'>Remove from itinerary</button>
    </div>
</template>
<script>
import { default as Trip }from './../Trip.js';

export default {
    name: 'ShowPlace',
    props: ['destination','place'],
    data: function() {
        return {
            itinerary: [],
            tripplace: null
        };
    },
    methods: {
        addToItinerary: function(destinationId, placeId) {
            this.itinerary = new Trip();
            this.itinerary.add(destinationId, placeId);
            this.tripplace = this.itinerary.getPlace(this.destination.id,placeId);
        },
        removeFromItinerary: function(destinationId, placeId) {
            this.itinerary = new Trip();
            this.itinerary.remove(destinationId, placeId);
            this.tripplace = this.itinerary.getPlace(this.destination.id,placeId);
        }
    },
    mounted() {
        this.itinerary = new Trip();
        this.tripplace = this.itinerary.getPlace(this.destination.id,this.place.id);
    }
}
</script>
<style>

</style>