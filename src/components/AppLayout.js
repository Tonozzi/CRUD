import { Container } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';

function AppLayout() {
  return (
    <main className="app-shell">
      <Container className="py-4 py-lg-5">
        <NavBar />

        <section className="content-surface">
          <Outlet />
        </section>
      </Container>
    </main>
  );
}

export default AppLayout;
