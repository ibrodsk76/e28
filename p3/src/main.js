import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';
import HomePage from './components/pages/HomePage.vue';
import DestinationsPage from './components/pages/DestinationsPage.vue';
import DestinationPage from './components/pages/DestinationPage.vue';
import TripsPage from './components/pages/TripsPage.vue';
import TripPage from './components/pages/TripPage.vue';

Vue.config.productionTip = false
Vue.use(VueRouter);

const routes = [
  { path: '/', component: HomePage, name: 'home' },
  { path: '/destinations', component: DestinationsPage, name: 'destinations' },
  { path: '/destination/:id', component: DestinationPage, name: 'destination', props: true },
  { path: '/trips', component: TripsPage, name: 'trips' },
  { path: '/trip/:id', component: TripPage, name: 'trip', props: true }
]

const router = new VueRouter({
  routes: routes,
  mode: 'history'
});

new Vue({
  router: router,
  render: h => h(App),
}).$mount('#app')
