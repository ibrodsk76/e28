import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';
import HomePage from './components/pages/HomePage.vue';
import DestinationsPage from './components/pages/DestinationsPage.vue';
import DestinationPage from './components/pages/DestinationPage.vue';
import TripsPage from './components/pages/TripsPage.vue';
import TripPage from './components/pages/TripPage.vue';
import ReviewsPage from './components/pages/ReviewsPage.vue';
import AddReviewPage from './components/pages/AddReviewPage.vue';
import Vuelidate from 'vuelidate'

import store from './store'

Vue.config.productionTip = false
Vue.use(VueRouter);
Vue.use(Vuelidate);


const routes = [
  { path: '/', component: HomePage, name: 'home' },
  { path: '/destinations', component: DestinationsPage, name: 'destinations' },
  { path: '/destination/:id', component: DestinationPage, name: 'destination', props: true },
  { path: '/trips', component: TripsPage, name: 'my trips' },
  { path: '/trip/:id', component: TripPage, name: 'trip', props: true },
  { path: '/reviews/:destId/:placeId', component: ReviewsPage, name: 'reviews', props: true},
  { path: '/addreview/:destId/:placeId', component: AddReviewPage, name: 'addreview', props: true}
]

const router = new VueRouter({
  routes: routes,
  mode: 'history'
});

new Vue({
  router: router,
  store: store,
  render: h => h(App),
}).$mount('#app')
