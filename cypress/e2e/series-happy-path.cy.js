import initialSeries from '../fixtures/series.json';

const createdSerie = {
  title: 'Severance',
  seasons: 2,
  releaseDate: '2022-02-18',
  director: 'Ben Stiller',
  production: 'Apple TV+',
  category: 'Sci-Fi/Drama',
  watchedAt: '2026-03-30',
};

const editedSerie = {
  title: 'Dark',
  seasons: 3,
  releaseDate: '2017-12-01',
  director: 'Baran bo Odar',
  production: 'Netflix',
  category: 'Sci-Fi',
  watchedAt: '2024-02-08',
};

function mockSeriesApi(seedSeries = initialSeries) {
  let series = Cypress._.cloneDeep(seedSeries);

  cy.intercept('GET', '**/series', (req) => {
    req.reply(Cypress._.cloneDeep(series));
  }).as('getSeries');

  cy.intercept('GET', '**/series/*', (req) => {
    const id = Number(req.url.split('/').pop());
    const serie = series.find((item) => item.id === id);

    req.reply(serie);
  }).as('getSerieById');

  cy.intercept('POST', '**/series', (req) => {
    const newId = series.length
      ? Math.max(...series.map((item) => item.id)) + 1
      : 1;

    const newSerie = {
      ...req.body,
      id: newId,
    };

    series = [...series, newSerie];
    req.reply(newSerie);
  }).as('createSerie');

  cy.intercept('PUT', '**/series', (req) => {
    const updatedSerie = req.body;

    series = series.map((item) =>
      item.id === updatedSerie.id ? updatedSerie : item
    );

    req.reply(updatedSerie);
  }).as('updateSerie');

  cy.intercept('DELETE', '**/series/*', (req) => {
    const id = Number(req.url.split('/').pop());

    series = series.filter((item) => item.id !== id);
    req.reply({
      message: 'Serie removed successfully',
    });
  }).as('deleteSerie');
}

describe('Serie Journal happy paths', () => {
  beforeEach(() => {
    cy.on('window:confirm', () => true);
  });

  it('renderiza o layout, a navbar e o estado vazio do catálogo', () => {
    mockSeriesApi([]);

    cy.visit('/');
    cy.wait('@getSeries');

    cy.contains('Tonozzi\'s movies').should('be.visible');
    cy.contains('nav[aria-label="Navegação principal"] a', 'Catálogo').should(
      'have.class',
      'active'
    );
    cy.contains('nav[aria-label="Navegação principal"] a', 'Nova série').should(
      'be.visible'
    );
    cy.contains('Catálogo de séries').should('be.visible');
    cy.contains('Nenhuma série encontrada').should('be.visible');
  });

  it('lista as séries da API e filtra pela busca', () => {
    mockSeriesApi();

    cy.visit('/');
    cy.wait('@getSeries');

    cy.contains('.serie-card', 'Dark').should('be.visible');
    cy.contains('.serie-card', 'Fleabag').should('be.visible');
    cy.contains('2 resultado(s)').should('be.visible');

    cy.get('#serie-search').type('dark');

    cy.contains('.serie-card', 'Dark').should('be.visible');
    cy.contains('.serie-card', 'Fleabag').should('not.exist');
    cy.contains('1 resultado(s)').should('be.visible');
  });

  it('cadastra uma nova série pelo formulário', () => {
    mockSeriesApi();

    cy.visit('/');
    cy.wait('@getSeries');

    cy.contains('nav[aria-label="Navegação principal"] a', 'Nova série').click();
    cy.location('pathname').should('eq', '/series/nova');
    cy.contains('Cadastrar nova série').should('be.visible');

    cy.fillSerieForm(createdSerie);
    cy.contains('button', 'Cadastrar série').click();

    cy.wait('@createSerie')
      .its('request.body')
      .should('deep.equal', createdSerie);

    cy.wait('@getSeries');
    cy.location('pathname').should('eq', '/series');
    cy.contains('Série cadastrada com sucesso.').should('be.visible');
    cy.contains('.serie-card', createdSerie.title).should('be.visible');
  });

  it('edita uma série existente a partir da listagem', () => {
    mockSeriesApi();

    cy.visit('/');
    cy.wait('@getSeries');

    cy.contains('.serie-card', 'Dark').within(() => {
      cy.contains('Editar').click();
    });

    cy.location('pathname').should('eq', '/series/1/editar');
    cy.wait('@getSerieById');
    cy.contains('Editar série').should('be.visible');

    cy.get('input[name="category"]').clear().type(editedSerie.category);
    cy.contains('button', 'Salvar alterações').click();

    cy.wait('@updateSerie')
      .its('request.body')
      .should('deep.equal', {
        id: 1,
        ...editedSerie,
      });

    cy.wait('@getSeries');
    cy.location('pathname').should('eq', '/series');
    cy.contains('Série atualizada com sucesso.').should('be.visible');
    cy.contains('.serie-card', editedSerie.title).within(() => {
      cy.contains(editedSerie.category).should('be.visible');
    });
  });

  it('exclui uma série do catálogo', () => {
    mockSeriesApi();

    cy.visit('/');
    cy.wait('@getSeries');

    cy.contains('.serie-card', 'Fleabag').within(() => {
      cy.contains('Excluir').click();
    });

    cy.wait('@deleteSerie');
    cy.contains('Série excluída com sucesso.').should('be.visible');
    cy.contains('.serie-card', 'Fleabag').should('not.exist');
    cy.contains('.serie-card', 'Dark').should('be.visible');
  });

  it('exibe a página não encontrada e permite voltar ao catálogo', () => {
    mockSeriesApi();

    cy.visit('/rota-inexistente');
    cy.contains('Página não encontrada').should('be.visible');
    cy.contains('Voltar para o início').click();

    cy.wait('@getSeries');
    cy.location('pathname').should('eq', '/');
    cy.contains('Catálogo de séries').should('be.visible');
  });
});
