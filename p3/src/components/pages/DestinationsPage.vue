<template>
    <div id='destinations'>
        <h2>Choose Your Destination</h2>
        <ul class='cleanList'>
            <li v-for='destination in destinations' :key='destination.id'>
                <router-link exact :to='{ name: "destination", params: {"id" : destination.id } }'>
                    {{ destination.name }}
                </router-link>
            </li>
        </ul>


        <router-view></router-view>
    </div>
</template>
<script>
import * as app from './../../app.js';

export default {
    name: 'DestinationsPage',
    components: { },
    data: function() {
        return {
            destinations: null
        };
    },
    mounted() {
        app.axios.get(app.config.api + 'destinations')
        .then(response => {
            this.destinations = response.data;
        });
    }
}
</script>
<style>

</style>