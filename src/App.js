import { useMemo, useState } from 'react';
import './App.css';
import NavBar from './components/NavBar';
import SerieForm from './components/SerieForm';
import SerieList from './components/SerieList';
import filmIcon from './assets/film.svg';
import popcornIcon from './assets/popcorn.svg';

const initialSeries = [
  {
    id: 1,
    titulo: 'Dark',
    temporadas: '3',
    dataLancamento: '2017-12-01',
    diretor: 'Baran bo Odar',
    produtora: 'Netflix',
    categoria: 'Ficção científica',
    dataAssistiu: '2025-02-10',
  },
  {
    id: 2,
    titulo: 'Breaking Bad',
    temporadas: '5',
    dataLancamento: '2008-01-20',
    diretor: 'Vince Gilligan',
    produtora: 'AMC',
    categoria: 'Drama',
    dataAssistiu: '2025-01-15',
  },
];

const tabs = [
  { id: 'sobre', label: 'Sobre' },
  { id: 'cadastro', label: 'Cadastro' },
  { id: 'listagem', label: 'Lista de Filmes' },
];

const sideDecorations = [
  { id: 'film-1', type: 'film' },
  { id: 'popcorn-1', type: 'popcorn' },
  { id: 'film-2', type: 'film' },
  { id: 'popcorn-2', type: 'popcorn' },
  { id: 'film-3', type: 'film' },
  { id: 'popcorn-3', type: 'popcorn' },
  { id: 'film-4', type: 'film' },
  { id: 'popcorn-4', type: 'popcorn' },
  { id: 'film-5', type: 'film' },
];

function App() {
  const [activeTab, setActiveTab] = useState('sobre');
  const [series, setSeries] = useState(initialSeries);
  const [editingSerie, setEditingSerie] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSeries = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();

    if (!term) {
      return series;
    }

    return series.filter((serie) =>
      Object.values(serie).some((value) =>
        String(value).toLowerCase().includes(term)
      )
    );
  }, [searchTerm, series]);

  const handleSaveSerie = (serieData) => {
    if (editingSerie) {
      setSeries((currentSeries) =>
        currentSeries.map((serie) =>
          serie.id === editingSerie.id
            ? { ...serie, ...serieData, id: editingSerie.id }
            : serie
        )
      );
      setEditingSerie(null);
      setActiveTab('listagem');
      return;
    }

    setSeries((currentSeries) => [
      ...currentSeries,
      { ...serieData, id: Date.now() },
    ]);
    setActiveTab('listagem');
  };

  const handleEditSerie = (serie) => {
    setEditingSerie(serie);
    setActiveTab('cadastro');
  };

  const handleDeleteSerie = (serieId) => {
    setSeries((currentSeries) =>
      currentSeries.filter((serie) => serie.id !== serieId)
    );

    if (editingSerie?.id === serieId) {
      setEditingSerie(null);
    }
  };

  const handleCancelEdit = () => {
    setEditingSerie(null);
  };

  return (
    <main className="app">
      <div className="stage">
        <aside className="decor-column" aria-hidden="true">
          {sideDecorations.map((item) => (
            <img
              key={`left-${item.id}`}
              src={item.type === 'film' ? filmIcon : popcornIcon}
              alt=""
              className={`decor-icon decor-icon-${item.type}`}
            />
          ))}
        </aside>

        <section className="modal">
          <h1 className="site-title">Tonozzi&apos;s Films</h1>

          <NavBar
            tabs={tabs}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />

          <section className="tab-panel">
            {activeTab === 'sobre' && (
              <div className="content-block">
                <h2>Sobre</h2>
                <p>
                  Bem-vindo ao Tonozzi&apos;s Films, um catálogo para
                  cadastrar, consultar e organizar as suas séries.
                </p>
                <p>
                  Use as abas para navegar pelo catálogo, adicionar, editar ou excluir títulos ou procurar um título pela listagem.
                </p>
              </div>
            )}

            {activeTab === 'cadastro' && (
              <SerieForm
                key={editingSerie?.id ?? 'new'}
                onSave={handleSaveSerie}
                editingSerie={editingSerie}
                onCancelEdit={handleCancelEdit}
              />
            )}

            {activeTab === 'listagem' && (
              <div className="content-block">
                <h2>Séries cadastradas</h2>

                <label htmlFor="busca" className="search-field">
                  Buscar série
                  <input
                    id="busca"
                    type="search"
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                    placeholder="Digite título, diretor, categoria..."
                  />
                </label>

                <SerieList
                  series={filteredSeries}
                  onEdit={handleEditSerie}
                  onDelete={handleDeleteSerie}
                />
              </div>
            )}
          </section>
        </section>

        <aside className="decor-column" aria-hidden="true">
          {sideDecorations.map((item) => (
            <img
              key={`right-${item.id}`}
              src={item.type === 'film' ? filmIcon : popcornIcon}
              alt=""
              className={`decor-icon decor-icon-${item.type}`}
            />
          ))}
        </aside>
      </div>
    </main>
  );
}

export default App;
