<template>
    <div id='products'>
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
const axios = require('axios');

export default {
    name: 'DestinationsPage',
    components: { },
    data: function() {
        return {
            destinations: null
           // links: ['home', 'destinations', 'trips']
        };
    },
    mounted() {
        this.destinations = axios
        .get(
            'https://my-json-server.typicode.com/ibrodsk76/e28-tripplanner-api/destinations'
        )
        .then(response => {
            this.destinations = response.data;
        });
    }
}
</script>
<style>

</style>