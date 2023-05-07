import { Link } from "react-router-dom";
import logo from "../pictures/logo.png";
import styles from "../styles/header.module.css";
import { Nav, Navbar, Container } from "react-bootstrap";

function NavbarComponent() {
  return (
    <Navbar
      collapseOnSelect
      bg="light"
      expand="xxxl"
      className={styles.navbarContainer}
      fixed="top"
    >
      <Container className="d-flex justify-content-space-between">
        <div className="d-flex align-items-center">
          <Navbar.Brand className="logoContainer">
            <Link to="/">
              <img src={logo} alt="logo" className="logoImage" />
            </Link>
          </Navbar.Brand>
        </div>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className={styles.navbarToggle} />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className={styles.navItemsContainer}>
            <Nav.Link href="/register" className="d-flex justify-content-end">
              <strong>Sign up</strong>
            </Nav.Link>
            <Nav.Link href="/login" className="d-flex justify-content-end">
              Log in
            </Nav.Link>
            <Nav.Link href="/" className="d-flex justify-content-end">
              Home
            </Nav.Link>
            <Nav.Link href="/admin" className="d-flex justify-content-end">
              Holidaze your home
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

function Header() {
  return (
    <header>
      <NavbarComponent />
    </header>
  );
}

export default Header;
