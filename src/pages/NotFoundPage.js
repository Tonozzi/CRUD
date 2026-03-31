import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <Card className="surface-card border-0 shadow-sm">
      <Card.Body className="p-4 p-xl-5 text-center">
        <span className="section-kicker">404</span>
        <h2 className="section-title mt-2">Página não encontrada</h2>
        <p className="section-copy mb-4">
          A rota solicitada não existe. Use a navegação principal para voltar ao
          início ou abrir o catálogo de séries.
        </p>
        <Button as={Link} to="/" variant="warning">
          Voltar para o início
        </Button>
      </Card.Body>
    </Card>
  );
}

export default NotFoundPage;
