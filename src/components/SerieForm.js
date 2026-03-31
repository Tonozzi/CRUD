import { useEffect, useState } from 'react';
import { Alert, Button, Card, Col, Form, Row, Stack } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {
  EMPTY_SERIE,
  normalizeSeriePayload,
  validateSerie,
} from '../utils/series';

const fields = [
  {
    name: 'title',
    label: 'Título',
    type: 'text',
    placeholder: 'Ex.: Dark',
  },
  {
    name: 'seasons',
    label: 'Temporadas',
    type: 'number',
    min: 1,
    placeholder: 'Quantidade de temporadas',
  },
  {
    name: 'releaseDate',
    label: 'Data de lançamento',
    type: 'date',
  },
  {
    name: 'director',
    label: 'Diretor(a)',
    type: 'text',
    placeholder: 'Nome da direção principal',
  },
  {
    name: 'production',
    label: 'Produtora',
    type: 'text',
    placeholder: 'Ex.: Netflix, HBO, AMC',
  },
  {
    name: 'category',
    label: 'Categoria',
    type: 'text',
    placeholder: 'Ex.: Drama, Sci-Fi, Comédia',
  },
  {
    name: 'watchedAt',
    label: 'Data em que assistiu',
    type: 'date',
  },
];

function SerieForm({
  initialValues = EMPTY_SERIE,
  onSave,
  isEditing = false,
  isSubmitting = false,
  submitError = '',
}) {
  const [formValues, setFormValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setFormValues(initialValues);
    setErrors({});
  }, [initialValues]);

  const handleChange = ({ target }) => {
    const { name, value } = target;

    setFormValues((currentValues) => ({
      ...currentValues,
      [name]: value,
    }));

    setErrors((currentErrors) => ({
      ...currentErrors,
      [name]: '',
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const nextErrors = validateSerie(formValues);

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    await onSave(normalizeSeriePayload(formValues));
  };

  return (
    <Card className="surface-card border-0 shadow-sm">
      <Card.Body className="p-4 p-xl-5">
        <div className="d-flex flex-column flex-lg-row justify-content-between gap-3 mb-4">
          <div>
            <span className="section-kicker">
              {isEditing ? 'PUT /series' : 'POST /series'}
            </span>
            <h2 className="section-title mb-2">
              {isEditing ? 'Editar série' : 'Cadastrar nova série'}
            </h2>
            <p className="section-copy mb-0">
              Preencha os dados abaixo para salvar as informações na API.
            </p>
          </div>

          <div className="hint-chip">
            Campos obrigatórios 
          </div>
        </div>

        {submitError && (
          <Alert variant="danger" className="mb-4">
            {submitError}
          </Alert>
        )}

        <Form onSubmit={handleSubmit} noValidate>
          <Row className="g-4">
            {fields.map((field) => (
              <Col md={field.type === 'date' ? 6 : 12} key={field.name}>
                <Form.Group controlId={field.name}>
                  <Form.Label>{field.label}</Form.Label>
                  <Form.Control
                    name={field.name}
                    type={field.type}
                    min={field.min}
                    placeholder={field.placeholder}
                    value={formValues[field.name]}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    isInvalid={Boolean(errors[field.name])}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors[field.name]}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            ))}
          </Row>

          <Stack direction="horizontal" gap={2} className="mt-4 flex-wrap">
            <Button type="submit" variant="warning" disabled={isSubmitting}>
              {isSubmitting
                ? 'Salvando...'
                : isEditing
                  ? 'Salvar alterações'
                  : 'Cadastrar série'}
            </Button>
            <Button
              as={Link}
              to="/series"
              variant="outline-secondary"
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
          </Stack>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default SerieForm;
