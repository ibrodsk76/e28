describe('destination-page', () => {

    let destination = {
        id: 1,
        name: 'Paris, France'
      }

    let place = {
        name: 'Eiffel Tower'
      }

    it('shows all the places', () => {
        // go to destination page
        cy.visit('/destination/' + destination.id)
        // verify the correct title
        cy.contains('h2', destination.name)
        // verify the first place
        cy.contains('[data-test="place-name"]', place.name)
        // verfy that all places are there, should be 4 for destination 1
        cy.get('[data-test="place-name"]').should('have.length', 4)

    })
})