/**
 * [
 *  {destinationId: 1, places: [{placeId: 1}, {placeId:2}]},
 *  {destinationId: 2, places: [{placeId: 1}, {placeId:2}]}}
 * ]
 */

export default class Trip {

    /**
     * 
     */
    constructor() {
        // Extract JSON cart string from local storage
        let itinerary = localStorage.getItem('itinerary');

        // Parse JSON cart String to `items` object
        this.trips = (itinerary) ? JSON.parse(itinerary) : [];
    }

    /**
     * Getter method for items
     */
    getTrips() {
        return this.trips;
    }

    /**
     * Returns how many places are in a trip
     */
   /* count(trip) {
        let sum = 0;
        for (let key of Object.keys(trip.places)) {
            sum += this.items[key].quantity;
        }
        return sum;
    } */

    /**
     * Updates cart in localstorage
     */
    update() {
        localStorage.setItem('itinerary', JSON.stringify(this.trips))
    }

    /**
     * Add a new place of the given trip
     */
    add(destinationId, placeId) {

        // First see if trip is already present
        let trip = this.getTrip(destinationId)

        if (trip) {
            // If place already in the trip, do nothing
            let place = this.getPlace(trip,placeId);
            if (!place)
                trip.places.push({id: placeId}); // add a place to a trip
        } else {
            // destination is not in cart, add as a new trip
            this.trips.push({
                id: destinationId,
                places: [{id: placeId }]
            });
        }

        this.update();
    }

    /**
     * Remove an item from items via productId
     */
    remove(destinationId, placeId) {
        let trip = this.getTrip(destinationId);

        if (trip)
        {
            let tripIndex = this.trips.indexOf(trip);            
            let place = this.getPlace(trip,placeId);

            if (place) {
                let placeIndex = this.trips[tripIndex].places.indexOf(place);
                this.trips[tripIndex].places.splice(placeIndex, 1);
                if (this.trips[tripIndex].places.length == 0)
                    this.trips.splice(tripIndex, 1);
                this.update();
            }
        }
    }

    /**
     * Get an item from items via productId
     * Returns null if product does not exist in items
     */
    getTrip(destinationId) {
        return this.trips.find(({ id }) => id === destinationId) || null;
    }
    getPlace(trip, placeId) {
        return trip.places.find(({ id }) => id === placeId) || null;
    }
}