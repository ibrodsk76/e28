<template>
    <div id='destinations' v-if='destination'>
        <h2>{{ destination.name }}</h2>
        <show-place
            v-for='place in destination.places'
            :key='place.id'
            :place='place'
            :destination='destination'
        ></show-place>
    </div>
</template>
<script>
import ShowPlace from './../ShowPlace.vue'

export default {
    name: 'DestinationPage',
    props: ['id'],
    components: {ShowPlace},
    data: function() {
        return {
        };
    },
    computed: {
        destination: function() {
            return this.$store.getters.getDestinationById(this.id);
        }
    },
    mounted() {        
    }
}
</script>
<style>

</style>