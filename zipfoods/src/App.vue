<template>
  <div id="app">
    <img id="logo" alt="ZipFoods logo" src='./assets/images/zipfoods-logo.png'>
  
    <nav>
      <ul>
        <li v-for='link in links' :key='link'>
            <router-link exact :to='{name: link}'>{{ link }}</router-link>
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
      links: ['home', 'products', 'categories']
    }
  }
}
</script>

<style lang='scss'>
@import './assets/css/zipfoods.scss';
</style>
