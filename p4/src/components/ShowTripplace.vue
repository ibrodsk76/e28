<template>
    <div class='destination' v-if='place'>
        <div data-test='place-name' class='destination-name'>{{ place.name }}</div>
        <img class='destination-thumb' :src='"./../assets/images/places/" + destination.id + "/" + place.id + ".jpg"' />
        <p class='destination-description'>{{ place.description }}</p>

        <button :data-test='"remove-from-itinerary-button-" + place.id' @click="$emit('remove-fromitinerary', [destination.id, place.id])">Remove from itinerary</button>
    </div>
</template>
<script>

export default {
    name: 'ShowTripplace',
    props: ['destination','placeId'],
    data: function() {
        return {
            place: null
        };
    },
    mounted() {        
        this.place = this.destination.places.find(({ id }) => id === this.placeId)
    }
}
</script>
<style>

</style>