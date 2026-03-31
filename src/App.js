import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import AppLayout from './components/AppLayout';
import NotFoundPage from './pages/NotFoundPage';
import SeriesFormPage from './pages/SeriesFormPage';
import SeriesListPage from './pages/SeriesListPage';

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<SeriesListPage />} />
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="/series" element={<SeriesListPage />} />
        <Route path="/series/nova" element={<SeriesFormPage />} />
        <Route path="/series/:id/editar" element={<SeriesFormPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
