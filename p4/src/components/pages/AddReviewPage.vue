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
                    :class='{ "form-input-error": $v.myreview.user.$error }'
                    id='name'
                    v-model='$v.myreview.user.$model'
                />
            </div>
            <div v-if='$v.myreview.user.$error'>
                <div
                    class='form-feedback-error'
                    if='!$v.myreview.user.minLength'
                    >Name must be at least 4 characters long.
                </div>
            </div>
            <div class='form-group'>
                <label for='title'>Title of your review</label>
                <input
                    type='text'
                    data-test='title-input'
                    :class='{ "form-input-error": $v.myreview.title.$error }'
                    id='title'
                    v-model='$v.myreview.title.$model'
                />
            </div>            
            <div v-if='$v.myreview.title.$error'>
                <div
                    class='form-feedback-error'
                    v-if='!$v.myreview.title.required'
                    >Title is required.
                </div>
                <div
                    class='form-feedback-error'
                    v-else-if='!$v.myreview.title.minLength'
                    >Title must be at least 4 characters long.
                </div>
            </div>
             <div class='form-group'>
                <label for='review'>Your Review</label>
                <textarea
                    data-test='place-review-textarea'
                    :class='{ "form-input-error": $v.myreview.review.$error }'
                    id='review'
                    v-model='$v.myreview.review.$model'
                ></textarea>
            </div>    
            <div v-if='$v.myreview.review.$error'>
                <div
                    class='form-feedback-error'
                    v-if='!$v.myreview.review.required'
                    >Review is required.
                </div>
                <div
                    class='form-feedback-error'
                    v-else-if='!$v.myreview.review.minLength'
                    >Review must be at least 10 characters long.
                </div>
            </div>
            <button data-test='add-review-button' type='submit'>Submit Review</button>

            <div class='form-feedback-error' v-if='formHasErrors'>Please correct the above errors</div>
        </form>

        <router-link :to='"/destination/" + destId'>&larr; Return to your destination</router-link>
    </div>
</template>

<script>
import * as app from './../../app.js';
import { required, minLength } from 'vuelidate/lib/validators';

let myreview = {
        user: '',
        title: '',
        review: '',
        date: null
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
    validations: {
        myreview: {
            user: {
                minLength: minLength(4)
            },
            title: {
                required,
                minLength: minLength(4)
            },
            review: {
                required,
                minLength: minLength(10)
            }
        }
    },
    watch: {
        '$v.$anyError': function() {
            this.formHasErrors = this.$v.$anyError;
        }
    },
    methods:{
        submitReview: function(){
            if (!this.formHasErrors) {
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
}
</script>

<style>

</style>