import { Link } from "react-router-dom";
import { Navbar, Container } from "react-bootstrap";
import logo from "../pictures/logo.png";
import "../styles/header.css";

function NavbarComponent() {
  return (
    <Container className="d-flex justify-content-space-between">
      <Navbar className="navbarContainer" fixed="top" bg="light" expand="lg">
        <div className="d-flex align-items-center">
          <Navbar.Brand href="/">
            {" "}
            <img src={logo} alt="logo" className="logo" />{" "}
          </Navbar.Brand>
        </div>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
      </Navbar>
    </Container>
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
