<template>
    <div class='product' v-if='place'>
        <div class='product-name'>{{ place.name }}</div>
        <img class='product-thumb' :src='"./../assets/images/places/" + destination.id + "/" + place.id + ".jpg"' />
        <p class='product-description'>{{ place.description }}</p>

        <button @click="$emit('remove-fromitinerary', [destination.id, place.id])">Remove from itinerary</button>
    </div>
</template>
<script>
import { default as Trip }from './../Trip.js';

export default {
    name: 'ShowTripplace',
    props: ['destination','placeId'],
    data: function() {
        return {
            itinerary: [],
            place: null
        };
    },
    mounted() {
        this.itinerary = new Trip();
        this.place = this.destination.places.find(({ id }) => id === this.placeId)
    }
}
</script>
<style>

</style>