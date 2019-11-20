<template>
        <div class='product'>
        <div class='product-name'>{{ place.name }}</div>
        <img class='product-thumb' :src='"./../assets/images/places/" + destination.id + "/" + place.id + ".jpg"' />
        <p class='product-description'>{{ place.description }}</p>

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
            trip: null,
            itinerary: null,
            tripplace: null
        };
    },
    methods: {
        addToItinerary: function(destinationId, placeId) {
            this.itinerary.add(destinationId, placeId);
            this.tripplace = this.itinerary.getPlace(this.trip,placeId);
            //app.store.cartCount = cart.count();
            //this.addAlert = true;
            //setTimeout(() => (this.addAlert = false), 2000);
        },
        removeFromItinerary: function(destinationId, placeId) {
            this.itinerary.remove(destinationId, placeId);
            this.tripplace = this.itinerary.getPlace(this.trip,placeId);
            //app.store.cartCount = this.cart.count();
        }
    },
    mounted() {
        this.itinerary = new Trip();
        this.trip = this.itinerary.getTrip(this.destination.id);
        this.tripplace = this.itinerary.getPlace(this.trip,this.place.id);
    }
}
</script>
<style>

</style>