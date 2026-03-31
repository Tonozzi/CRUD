import { useDeferredValue, useEffect, useMemo, useState } from 'react';
import { Alert, Button, Card, Col, Form, Row, Spinner } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import SerieList from '../components/SerieList';
import { deleteSerie, listSeries } from '../services/seriesApi';

function getSearchableText(serie) {
  return [
    serie.title,
    serie.director,
    serie.production,
    serie.category,
    serie.releaseDate,
    serie.watchedAt,
    serie.seasons,
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();
}

function SeriesListPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [series, setSeries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [feedbackMessage, setFeedbackMessage] = useState(
    location.state?.feedback ?? ''
  );
  const deferredSearchTerm = useDeferredValue(searchTerm);

  useEffect(() => {
    if (location.state?.feedback) {
      setFeedbackMessage(location.state.feedback);
      navigate(location.pathname, { replace: true, state: null });
    }
  }, [location.pathname, location.state, navigate]);

  useEffect(() => {
    let isMounted = true;

    async function loadSeries() {
      try {
        setLoading(true);
        setErrorMessage('');
        const response = await listSeries();

        if (isMounted) {
          setSeries(response);
        }
      } catch (error) {
        if (isMounted) {
          setErrorMessage(
            'Não foi possível carregar as séries. Verifique se a API está rodando em http://localhost:5000.'
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadSeries();

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredSeries = useMemo(() => {
    const normalizedTerm = deferredSearchTerm.trim().toLowerCase();

    if (!normalizedTerm) {
      return series;
    }

    return series.filter((serie) =>
      getSearchableText(serie).includes(normalizedTerm)
    );
  }, [deferredSearchTerm, series]);

  const handleDelete = async (serie) => {
    const shouldDelete = window.confirm(
      `Deseja realmente excluir "${serie.title}"?`
    );

    if (!shouldDelete) {
      return;
    }

    try {
      setDeletingId(serie.id);
      setErrorMessage('');
      await deleteSerie(serie.id);
      setSeries((currentSeries) =>
        currentSeries.filter((currentSerie) => currentSerie.id !== serie.id)
      );
      setFeedbackMessage('Série excluída com sucesso.');
    } catch (error) {
      setErrorMessage('Não foi possível excluir a série selecionada.');
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div>
      <div className="d-flex flex-column flex-lg-row justify-content-between gap-3 mb-4">
        <div>
          <span className="section-kicker">GET /series + DELETE /series/:id</span>
          <h2 className="section-title mb-2">Catálogo de séries</h2>
          <p className="section-copy mb-0">
            Busque por título, direção, produtora ou categoria e gerencie os
            registros retornados pela API.
          </p>
        </div>

        <Button as={Link} to="/series/nova" variant="warning" className="align-self-start">
          Nova série
        </Button>
      </div>

      {feedbackMessage && (
        <Alert
          variant="success"
          dismissible
          onClose={() => setFeedbackMessage('')}
          className="mb-4"
        >
          {feedbackMessage}
        </Alert>
      )}

      {errorMessage && (
        <Alert variant="danger" className="mb-4">
          {errorMessage}
        </Alert>
      )}

      <Card className="surface-card border-0 shadow-sm mb-4">
        <Card.Body>
          <Row className="g-3 align-items-end">
            <Col lg={8}>
              <Form.Group controlId="serie-search">
                <Form.Label>Buscar série</Form.Label>
                <Form.Control
                  type="search"
                  placeholder="Digite título, diretor, produtora ou categoria"
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                />
              </Form.Group>
            </Col>

            <Col lg={4}>
              <div className="search-summary">
                {loading ? 'Carregando catálogo...' : `${filteredSeries.length} resultado(s)`}
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {loading ? (
        <Card className="surface-card border-0 shadow-sm">
          <Card.Body className="py-5 d-flex align-items-center justify-content-center gap-3">
            <Spinner animation="border" role="status" size="sm" />
            <span>Carregando séries da API...</span>
          </Card.Body>
        </Card>
      ) : (
        <SerieList
          series={filteredSeries}
          deletingId={deletingId}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}

export default SeriesListPage;
