import { Badge, Button, Card, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { formatDate } from '../utils/series';

const details = [
  { key: 'director', label: 'Direção' },
  { key: 'production', label: 'Produtora' },
  { key: 'releaseDate', label: 'Lançamento', formatter: formatDate },
  { key: 'watchedAt', label: 'Assistida em', formatter: formatDate },
];

function SerieList({ series, deletingId, onDelete }) {
  if (series.length === 0) {
    return (
      <Card className="surface-card empty-state border-0 shadow-sm">
        <Card.Body>
          <h3>Nenhuma série encontrada</h3>
          <p className="mb-0">
            Ajuste a busca ou cadastre uma nova série para começar o catálogo.
          </p>
        </Card.Body>
      </Card>
    );
  }

  return (
    <Row className="g-4">
      {series.map((serie) => (
        <Col xl={4} md={6} key={serie.id}>
          <Card className="serie-card h-100 border-0 shadow-sm">
            <Card.Body className="d-flex flex-column">
              <div className="d-flex justify-content-between gap-3 align-items-start">
                <div>
                  <Card.Title as="h3" className="mb-2">
                    {serie.title}
                  </Card.Title>
                  <Card.Subtitle className="serie-subtitle">
                    {serie.category || 'Sem categoria informada'}
                  </Card.Subtitle>
                </div>

                <Badge pill bg="warning" text="dark" className="season-badge">
                  {serie.seasons} temp.
                </Badge>
              </div>

              <div className="serie-meta mt-4">
                {details.map((detail) => (
                  <p key={`${serie.id}-${detail.key}`}>
                    <span>{detail.label}</span>
                    {detail.formatter
                      ? detail.formatter(serie[detail.key])
                      : serie[detail.key] || 'Não informado'}
                  </p>
                ))}
              </div>

              <div className="mt-auto d-flex gap-2 flex-wrap">
                <Button
                  as={Link}
                  to={`/series/${serie.id}/editar`}
                  variant="outline-light"
                >
                  Editar
                </Button>
                <Button
                  variant="danger"
                  onClick={() => onDelete(serie)}
                  disabled={deletingId === serie.id}
                >
                  {deletingId === serie.id ? 'Excluindo...' : 'Excluir'}
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
}

export default SerieList;
