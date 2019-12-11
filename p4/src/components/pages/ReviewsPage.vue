<template>
    <div id='reviews' v-if='place'>
        <h1 data-test='place-name'>Reviews for {{ place.name }}</h1>
        <img class='destination-thumb' :src='"./../../assets/images/places/" + destId + "/" + placeId + ".jpg"' />
        <show-review
            v-for='review in place.reviews'
            :key='review.id'
            :review='review'
        ></show-review>

        <router-link :to='"/destination/" + destId'>&larr; Return to your destination</router-link>
    </div>
</template>

<script>
import ShowReview from './../ShowReview.vue'

export default {
    name: 'ReviewsPage',
    props: ['destId','placeId'],
    components: {ShowReview},
    data: function() {
        return {

        };
    },
    computed: {
        place: function() {
            return this.$store.getters.getPlaceById(this.destId, this.placeId);
        }
    }
}
</script>

<style>

</style>