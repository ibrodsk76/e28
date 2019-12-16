describe('trips-page', () => {

    let destination = {
        id: 1,
        name: 'Paris, France'
      }

    let place = {
        name: 'Eiffel Tower'
      }

    it('interacts with itineraries', () => {
        // go to destination page
        cy.visit('/destination/' + destination.id)
        // add a place to itinarary
        cy.get('[data-test="add-to-itinerary-button"]').first().click();
        // make sure the button was changed to "Remove from itinerary"
        cy.contains('button', "Remove from itinerary");
        // click "Remove from itinerary" button
        cy.get('[data-test="remove-from-itinerary-button"]').first().click();
        // make sure the button was changed to 'add' button, should be 4 'add' buttons now
        cy.get('[data-test="add-to-itinerary-button"]').should('have.length', 4)
        // add a place to itinarary
        cy.get('[data-test="add-to-itinerary-button"]').first().click();
        // go to 'trips' page
        cy.visit('/trips')
        // verifi page title
        cy.contains('h2', "Your Trips")
        // verify the destination is there
        cy.contains('[data-test="destination-name"]', destination.name)
        // should only have 1 destination
        cy.get('[data-test="destination-name"]').should('have.length', 1)
        // click destination to go to 'trip' page
        cy.get('[data-test="destination-name"]').first().click();
        // verify place name
        cy.contains('[data-test="place-name"]', place.name)
        // click 'remove' button
        cy.get('[data-test="remove-from-itinerary-button-1"]').click();
        // place should disappear and 'no places' message displayed.
        cy.contains('[data-test="no-places"]', "No places in your itinerary")
        // click destination link
        cy.get('[data-test="destination-name"]').click();
        // verify that made it to correct destination page
        cy.contains('h2', destination.name)
      })

})