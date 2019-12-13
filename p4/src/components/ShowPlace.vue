<template>
    <div class='destination'>
        <div data-test='place-name' class='destination-name'>{{ place.name }}</div>
        <img data-test="place-image" class='destination-thumb' :src='"./../assets/images/places/" + destination.id + "/" + place.id + ".jpg"' />
        <p class='destination-description'>{{ place.description }}</p>
        <p><router-link v-if='place.reviews' :to='"/reviews/" + destination.id + "/" + place.id'>Reviews ({{place.reviews.length}})</router-link></p>
        <p><router-link :to='"/addreview/" + destination.id + "/" + place.id'>Write a review...</router-link></p>

        <button :data-test='"add-to-itinerary-button-" + place.id' v-if='!placeadded' @click='addToItinerary(destination.id, place.id)'>Add to itinerary</button>
        <button :data-test='"remove-from-itinerary-button-" + place.id' v-if='placeadded' @click='removeFromItinerary(destination.id, place.id)'>Remove from itinerary</button>

    </div>
</template>
<script>
import { default as Trip }from './../Trip.js';

export default {
    name: 'ShowPlace',
    props: ['destination','place'],
    data: function() {
        return {
            placeadded: false
        };
    },
    methods: {
        addToItinerary: function(destinationId, placeId) {
            let itinerary = new Trip();
            itinerary.add(destinationId, placeId);
            this.placeadded = true;
        },
        removeFromItinerary: function(destinationId, placeId) {
            let itinerary = new Trip();
            itinerary.remove(destinationId, placeId);
            this.placeadded = false;
        }
    },
    mounted() {
        if (this.tripplace)
            this.placeadded = true;
    },
    computed: {
        tripplace: function() {
            let itinerary = new Trip();
            return itinerary.getPlace(this.destination.id,this.place.id);
        }
    }
}
</script>
<style>

</style>