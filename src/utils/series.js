export const EMPTY_SERIE = {
  title: '',
  seasons: '',
  releaseDate: '',
  director: '',
  production: '',
  category: '',
  watchedAt: '',
};

export function validateSerie(serie) {
  const errors = {};

  if (!serie.title.trim()) {
    errors.title = 'Informe o título da série.';
  }

  if (!serie.seasons || Number(serie.seasons) <= 0) {
    errors.seasons = 'Informe a quantidade de temporadas.';
  }

  if (!serie.releaseDate) {
    errors.releaseDate = 'Informe a data de lançamento.';
  }

  if (!serie.director.trim()) {
    errors.director = 'Informe o diretor ou diretora.';
  }

  if (!serie.production.trim()) {
    errors.production = 'Informe a produtora.';
  }

  if (!serie.category.trim()) {
    errors.category = 'Informe a categoria.';
  }

  if (!serie.watchedAt) {
    errors.watchedAt = 'Informe a data em que assistiu.';
  }

  return errors;
}

export function normalizeSeriePayload(serie) {
  return {
    title: serie.title.trim(),
    seasons: Number(serie.seasons),
    releaseDate: serie.releaseDate,
    director: serie.director.trim(),
    production: serie.production.trim(),
    category: serie.category.trim(),
    watchedAt: serie.watchedAt,
  };
}

export function formatDate(value) {
  if (!value) {
    return 'Não informado';
  }

  const date = new Date(`${value}T00:00:00`);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat('pt-BR').format(date);
}
