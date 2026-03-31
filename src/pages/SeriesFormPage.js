import { useEffect, useMemo, useState } from 'react';
import { Alert, Card, Spinner } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import SerieForm from '../components/SerieForm';
import { createSerie, getSerieById, updateSerie } from '../services/seriesApi';
import { EMPTY_SERIE } from '../utils/series';

function SeriesFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = useMemo(() => Boolean(id), [id]);
  const [initialValues, setInitialValues] = useState(EMPTY_SERIE);
  const [loading, setLoading] = useState(isEditing);
  const [pageError, setPageError] = useState('');
  const [submitError, setSubmitError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isEditing) {
      setInitialValues(EMPTY_SERIE);
      setLoading(false);
      return undefined;
    }

    let isMounted = true;

    async function loadSerie() {
      try {
        setLoading(true);
        setPageError('');
        const response = await getSerieById(id);

        if (isMounted) {
          setInitialValues({
            ...EMPTY_SERIE,
            ...response,
            seasons: String(response.seasons ?? ''),
          });
        }
      } catch (error) {
        if (isMounted) {
          setPageError(
            'Não foi possível carregar a série selecionada para edição.'
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadSerie();

    return () => {
      isMounted = false;
    };
  }, [id, isEditing]);

  const handleSave = async (seriePayload) => {
    try {
      setIsSubmitting(true);
      setSubmitError('');

      if (isEditing) {
        await updateSerie(id, seriePayload);
      } else {
        await createSerie(seriePayload);
      }

      navigate('/series', {
        state: {
          feedback: isEditing
            ? 'Série atualizada com sucesso.'
            : 'Série cadastrada com sucesso.',
        },
      });
    } catch (error) {
      setSubmitError(
        isEditing
          ? 'Não foi possível atualizar a série. Tente novamente.'
          : 'Não foi possível cadastrar a série. Tente novamente.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <Card className="surface-card border-0 shadow-sm">
        <Card.Body className="py-5 d-flex align-items-center justify-content-center gap-3">
          <Spinner animation="border" role="status" size="sm" />
          <span>Carregando dados da série...</span>
        </Card.Body>
      </Card>
    );
  }

  if (pageError) {
    return (
      <Alert variant="danger" className="mb-0">
        {pageError}
      </Alert>
    );
  }

  return (
    <SerieForm
      initialValues={initialValues}
      onSave={handleSave}
      isEditing={isEditing}
      isSubmitting={isSubmitting}
      submitError={submitError}
    />
  );
}

export default SeriesFormPage;
