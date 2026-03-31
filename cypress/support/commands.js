Cypress.Commands.add('fillSerieForm', (serie) => {
  cy.get('input[name="title"]').clear().type(serie.title);
  cy.get('input[name="seasons"]').clear().type(String(serie.seasons));
  cy.get('input[name="releaseDate"]').clear().type(serie.releaseDate);
  cy.get('input[name="director"]').clear().type(serie.director);
  cy.get('input[name="production"]').clear().type(serie.production);
  cy.get('input[name="category"]').clear().type(serie.category);
  cy.get('input[name="watchedAt"]').clear().type(serie.watchedAt);
});
