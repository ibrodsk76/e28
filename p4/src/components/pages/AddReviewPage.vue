<template>
   <div id='add-review-page' v-if='place'>
        <h1 data-test='place-name'>Add Review for {{ place.name }}</h1>
        <img class='destination-thumb' :src='"./../../assets/images/places/" + destId + "/" + placeId + ".jpg"' />

        <form @submit.prevent='submitReview'>
            <div class='form-group'>
                <label for='name'>Your Name</label>
                <input
                    type='text'
                    data-test='user-name-input'
                    id='name'
                    v-model='myreview.user'
                />
            </div>
            <div class='form-group'>
                <label for='title'>Title of your review</label>
                <input
                    type='text'
                    data-test='title-input'
                    id='title'
                    v-model='myreview.title'
                />
            </div>            
             <div class='form-group'>
                <label for='review'>Your Review</label>
                <textarea
                    data-test='place-review-textarea'
                    id='review'
                    v-model='myreview.review'
                ></textarea>
            </div>    
            <button data-test='add-review-button' type='submit'>Submit Review</button>
        </form>

        <router-link :to='"/destination/" + destId'>&larr; Return to your destination</router-link>
    </div>
</template>

<script>
import * as app from './../../app.js';

let myreview = {};
if (process.env.NODE_ENV == 'development') {
    myreview = {
        user: 'Irene',
        title: 'My Review',
        review: 'This is my review',
        date: null
    }
}
else
{
    myreview = {
        user: '',
        title: '',
        review: '',
        date: null
    }
}
export default {
    name: 'AddReviewPage',
    props: ['destId','placeId'],
    data: function() {
        return {
            myreview: myreview,
            formHasErrors: false
        };
    },
    computed: {
        place: function() {
            return this.$store.getters.getPlaceById(this.destId, this.placeId);
        }
    },
    methods:{
        submitReview: function(){
            let destinations = this.$store.getters.getDestinations();
            let destinationIndex = destinations.findIndex(destination => destination.id == this.destId);
            let placeIndex = destinations[destinationIndex].places.findIndex(place => place.id == this.placeId);
            if (!destinations[destinationIndex].places[placeIndex].reviews)
            {
                destinations[destinationIndex].places[placeIndex].reviews = [];
            }
            var today = new Date();
            myreview.date = (today.getMonth()+1) + "/" + today.getDate() + "/" + today.getFullYear();
            destinations[destinationIndex].places[placeIndex].reviews.push(myreview);
            app.axios
                    .put(app.config.api + 'destinations.json', destinations)
                    .then(response => {
                        console.log(response);
                        //this.$store.commit('addProduct', {
                        //    [key]: this.product
                        //});
                        this.$router.push({
                            name: 'destination',
                            params: { id: this.destId}
                        });
                    });

        }
    }
}
</script>

<style>

</style>