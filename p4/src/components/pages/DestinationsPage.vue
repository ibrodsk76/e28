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

    </div>
</template>
<script>

export default {
    name: 'DestinationsPage',
    components: { },
    data: function() {
        return { };
    },
    mounted() {
    },
    computed: {
        destinations: function() {
            return this.$store.state.destinations;
        }
    }
}
</script>
<style>

</style>