<template>
    <div>
        <h2>Welcome to TripPlanner!</h2>
        <p>   Please, choose your destination and start building the itinerary for your upcoming trip(s)!
        </p>
        <router-link exact :to='{ name: "destinations" }'>
            All Destinations
        </router-link>
    </div>
</template>
<script>
export default { 
    name: 'HomePage',
    data: function() {
        return {
        };
    }
}
</script>
<style>

</style>