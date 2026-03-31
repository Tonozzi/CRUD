import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import {
  createSerie,
  deleteSerie,
  getSerieById,
  listSeries,
  updateSerie,
} from './services/seriesApi';

jest.mock('./services/seriesApi');

const sampleSeries = [
  {
    id: 1,
    title: 'Dark',
    seasons: 3,
    releaseDate: '2017-12-01',
    director: 'Baran bo Odar',
    production: 'Netflix',
    category: 'Sci-Fi/Mystery',
    watchedAt: '2024-02-08',
  },
  {
    id: 2,
    title: 'Fleabag',
    seasons: 2,
    releaseDate: '2016-07-21',
    director: 'Phoebe Waller-Bridge',
    production: 'BBC',
    category: 'Comedy/Drama',
    watchedAt: '2024-01-14',
  },
];

function renderApp(route = '/') {
  return render(
    <MemoryRouter
      initialEntries={[route]}
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <App />
    </MemoryRouter>
  );
}

beforeEach(() => {
  jest.clearAllMocks();
  window.confirm = jest.fn(() => true);
});

test('renderiza o catálogo na rota inicial', async () => {
  listSeries.mockResolvedValue([]);

  renderApp('/');

  const mainNavigation = screen.getByRole('navigation', {
    name: /navegação principal/i,
  });

  expect(
    within(mainNavigation).getByRole('link', { name: /^catálogo$/i })
  ).toBeInTheDocument();
  expect(
    within(mainNavigation).getByRole('link', { name: /nova série/i })
  ).toBeInTheDocument();
  expect(screen.getByText(/catálogo de séries/i)).toBeInTheDocument();
  expect(
    await screen.findByText(/nenhuma série encontrada/i)
  ).toBeInTheDocument();
});

test('lista séries da API, permite buscar e excluir um item', async () => {
  listSeries.mockResolvedValue(sampleSeries);
  deleteSerie.mockResolvedValue({ message: 'Serie removed successfully' });

  renderApp('/');

  expect(await screen.findByText('Dark')).toBeInTheDocument();
  expect(screen.getByText('Fleabag')).toBeInTheDocument();

  fireEvent.change(screen.getByLabelText(/buscar série/i), {
    target: { value: 'dark' },
  });

  expect(screen.getByText('Dark')).toBeInTheDocument();
  expect(screen.queryByText('Fleabag')).not.toBeInTheDocument();

  fireEvent.click(screen.getByRole('button', { name: /excluir/i }));

  await waitFor(() => {
    expect(deleteSerie).toHaveBeenCalledWith(1);
  });

  await waitFor(() => {
    expect(screen.queryByText('Dark')).not.toBeInTheDocument();
  });

  expect(screen.getByText(/série excluída com sucesso/i)).toBeInTheDocument();
});

test('cadastra uma nova série usando o formulário', async () => {
  const createdSerie = {
    id: 11,
    title: 'Severance',
    seasons: 2,
    releaseDate: '2022-02-18',
    director: 'Ben Stiller',
    production: 'Apple TV+',
    category: 'Sci-Fi/Drama',
    watchedAt: '2026-03-29',
  };

  createSerie.mockResolvedValue(createdSerie);
  listSeries.mockResolvedValue([createdSerie]);

  renderApp('/series/nova');

  fireEvent.change(screen.getByLabelText(/^título$/i), {
    target: { value: 'Severance' },
  });
  fireEvent.change(screen.getByLabelText(/temporadas/i), {
    target: { value: '2' },
  });
  fireEvent.change(screen.getByLabelText(/data de lançamento/i), {
    target: { value: '2022-02-18' },
  });
  fireEvent.change(screen.getByLabelText(/diretor/i), {
    target: { value: 'Ben Stiller' },
  });
  fireEvent.change(screen.getByLabelText(/produtora/i), {
    target: { value: 'Apple TV+' },
  });
  fireEvent.change(screen.getByLabelText(/categoria/i), {
    target: { value: 'Sci-Fi/Drama' },
  });
  fireEvent.change(screen.getByLabelText(/data em que assistiu/i), {
    target: { value: '2026-03-29' },
  });

  fireEvent.click(screen.getByRole('button', { name: /cadastrar série/i }));

  await waitFor(() => {
    expect(createSerie).toHaveBeenCalledWith({
      title: 'Severance',
      seasons: 2,
      releaseDate: '2022-02-18',
      director: 'Ben Stiller',
      production: 'Apple TV+',
      category: 'Sci-Fi/Drama',
      watchedAt: '2026-03-29',
    });
  });

  expect(
    await screen.findByText(/série cadastrada com sucesso/i)
  ).toBeInTheDocument();
});

test('carrega uma série existente e envia a atualização', async () => {
  const editedSerie = {
    id: 1,
    title: 'Dark',
    seasons: 3,
    releaseDate: '2017-12-01',
    director: 'Baran bo Odar',
    production: 'Netflix',
    category: 'Sci-Fi',
    watchedAt: '2024-02-08',
  };

  getSerieById.mockResolvedValue({
    ...editedSerie,
    category: 'Sci-Fi/Mystery',
  });
  updateSerie.mockResolvedValue(editedSerie);
  listSeries.mockResolvedValue([editedSerie]);

  renderApp('/series/1/editar');

  expect(await screen.findByDisplayValue('Dark')).toBeInTheDocument();

  fireEvent.change(screen.getByLabelText(/categoria/i), {
    target: { value: 'Sci-Fi' },
  });

  fireEvent.click(
    screen.getByRole('button', { name: /salvar alterações/i })
  );

  await waitFor(() => {
    expect(updateSerie).toHaveBeenCalledWith('1', {
      title: 'Dark',
      seasons: 3,
      releaseDate: '2017-12-01',
      director: 'Baran bo Odar',
      production: 'Netflix',
      category: 'Sci-Fi',
      watchedAt: '2024-02-08',
    });
  });

  expect(
    await screen.findByText(/série atualizada com sucesso/i)
  ).toBeInTheDocument();
});
