describe('home-page', () => {
    it('Visits the homepage', () => {
        cy.visit('/')
        cy.contains('h2', 'Welcome to TripPlanner!')
    })
})