<template>
    <div class='destination' v-if='place'>
        <div class='destination-name'>{{ place.name }}</div>
        <img class='destination-thumb' :src='"./../assets/images/places/" + destination.id + "/" + place.id + ".jpg"' />
        <p class='destination-description'>{{ place.description }}</p>

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