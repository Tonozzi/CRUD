import { Navbar } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
import filmIcon from '../assets/film.svg';
import popcornIcon from '../assets/popcorn.svg';

function getLinkClassName({ isActive }) {
  return `app-nav-link${isActive ? ' active' : ''}`;
}

function NavBar() {
  return (
    <Navbar expand="lg" className="app-navbar" variant="dark">
      <div className="app-navbar-inner">
        <Navbar.Brand as={Link} to="/" className="brand-mark">
          <span className="brand-icons" aria-hidden="true">
            <img src={filmIcon} alt="" className="brand-icon brand-icon-film" />
            <img
              src={popcornIcon}
              alt=""
              className="brand-icon brand-icon-popcorn"
            />
          </span>

          <span>
            <span className="brand-title">Tonozzi's movies</span>
            <span className="brand-subtitle">Catálogo de filmes e séries</span>
          </span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-navigation" />
        <Navbar.Collapse id="main-navigation">
          <nav className="app-nav-links ms-auto" aria-label="Navegação principal">
            <NavLink to="/" end className={getLinkClassName}>
              Catálogo
            </NavLink>
            <NavLink to="/series/nova" className={getLinkClassName}>
              Nova série
            </NavLink>
          </nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
}

export default NavBar;
