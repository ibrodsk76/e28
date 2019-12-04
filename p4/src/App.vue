<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    
    <nav>
            <ul>
                <li v-for='link in links' :key='link'>
                    <router-link exact :to='{ name: link }'>
                        {{ link }}
                    </router-link>
                </li>
            </ul>
        </nav>

        <router-view></router-view>

  </div>
</template>

<script>

export default {
  name: 'app',
  data: function() {
        return {
            links: ['home', 'destinations', 'trips']
        };
    },
    mounted() {
        this.$store.dispatch('setDestinations');
    }
}
</script>

<style lang='scss'>
@import './assets/css/tripplanner.scss';
</style>
