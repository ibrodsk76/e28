import Vue from 'vue'
import Vuex from 'vuex'
import * as app from './../app.js';

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        //cartCount: 0,
        destinations: [],
    },
    mutations: {
        setDestinations(state, payload) {
            state.destinations = payload;
        }
    },
    actions: {
        setDestinations(context){
            app.axios.get(app.config.api + 'destinations.json').then(response => {
                context.commit('setDestinations',response.data);
            });
        }
    },
    getters: {
        getDestinations(state)
        {
            return function(){
                return state.destinations;
            }
        },
        getDestinationById(state) {
            return function (id) {
                return state.destinations.find(destination => destination.id == id);
            }
        },
        getPlaceById(state) {
            return function (destinationId, placeId) {
                let dest = state.destinations.find(destination => destination.id == destinationId);
                return dest.places.find(place => place.id == placeId);
            }
        } 
    }
})