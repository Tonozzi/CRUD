import axios from 'axios';

export const API_BASE_URL =
  process.env.REACT_APP_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export async function listSeries() {
  const { data } = await api.get('/series');
  return data;
}

export async function getSerieById(id) {
  const { data } = await api.get(`/series/${id}`);
  return data;
}

export async function createSerie(payload) {
  const { data } = await api.post('/series', payload);
  return data;
}

export async function updateSerie(id, payload) {
  const { data } = await api.put('/series', {
    ...payload,
    id: Number(id),
  });
  return data;
}

export async function deleteSerie(id) {
  const { data } = await api.delete(`/series/${id}`);
  return data;
}

export default api;
