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
        // Extract JSON itinerary string from local storage
        let itinerary = localStorage.getItem('itinerary');

        // Parse JSON itinerary String to `trips` object
        this.trips = (itinerary) ? JSON.parse(itinerary) : [];
    }

    /**
     * Getter method for trips
     */
    getTrips() {
        return this.trips;
    }

    /**
     * Updates itinerary in localstorage
     */
    update() {
        localStorage.setItem('itinerary', JSON.stringify(this.trips))
    }

    /**
     * Add a new place to the given trip
     * If a new destination, create a new trip
     */
    add(destinationId, placeId) {

        // First see if trip is already present
        let trip = this.getTrip(destinationId)

        if (trip) {
            // If place already in the trip, do nothing
            let place = this.getPlace(trip.id,placeId);
            if (!place)
                trip.places.push({id: placeId}); // add a place to a trip
        } else {
            // destination is not in itinerary, add as a new trip
            this.trips.push({
                id: destinationId,
                places: [{id: placeId }]
            });
        }

        this.update();
    }

    /**
     * Remove a place from a trip via placeId
     * If no more places in a trip, remove a trip
     */
    remove(destinationId, placeId) {
        let trip = this.getTrip(destinationId);

        if (trip)
        {
            let tripIndex = this.trips.indexOf(trip);            
            let place = this.getPlace(trip.id,placeId);

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
     * Get a trip from itinerary via destinationId
     * Returns null if a trip does not exist
     */
    getTrip(destinationId) {
        return this.trips.find(({ id }) => id === destinationId) || null;
    }
    /**
     * Get a place from a trip via placeId
     * Returns null if place does not exist in the trip
     */
    getPlace(destinationId, placeId) {
        let trip = this.getTrip(destinationId);
        if (trip)
            return trip.places.find(({ id }) => id === placeId) || null;
        else
            return null;
    }
}