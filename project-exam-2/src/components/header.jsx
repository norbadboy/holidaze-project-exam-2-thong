import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../pictures/logo.png";
import styles from "../styles/header.module.css";
import { Nav, Navbar, Container } from "react-bootstrap";
import { load } from "../api/storage/load.mjs";
import defaultUser from "../pictures/defaultUser.png";
import { useState, useRef, useEffect } from "react";
import { FaBars } from "react-icons/fa";
import { logout } from "../api/auth/logout.mjs";
// import SearchBar from "./searchBar";

function LoggedOutHeader() {
  const user = load("user");
  const [expanded, setExpanded] = useState(false);
  const navbarRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const brandLink = user && user.venueManager ? "/manager" : "/user";

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setExpanded(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <Navbar
      ref={navbarRef}
      collapseOnSelect
      bg="light"
      expand="xxxl"
      className={styles.navbarContainer}
      fixed="top"
      expanded={expanded}
    >
      <Container className="d-flex justify-content-space-between">
        <div className="d-flex align-items-center">
          <Navbar.Brand className="logoContainer">
            {user ? (
              <Link to={brandLink}>
                <img src={logo} alt="logo" className={styles.logo} />
              </Link>
            ) : (
              <Link to="/">
                <img src={logo} alt="logo" className={styles.logo} />
              </Link>
            )}
          </Navbar.Brand>
        </div>
        {/* <div className="d-flex align-items-center">
          <SearchBar />
        </div> */}
        {user && (
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            className={`${styles.navbarToggle} ${styles.pillToggle}`}
            onClick={() => setExpanded(expanded ? false : "expanded")}
            onMouseDown={(e) => e.preventDefault()}
          >
            <div className="d-flex align-items-center">
              <span>
                <FaBars className={styles.customHamBars} />
              </span>
              {user && <img src={user.avatar} alt="user avatar" className={styles.avatarImage} />}
            </div>
          </Navbar.Toggle>
        )}
        {!user && (
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            className={`${styles.navbarToggle} ${styles.pillToggle}`}
            onClick={() => setExpanded(expanded ? false : "expanded")}
            onMouseDown={(e) => e.preventDefault()}
          >
            <div className="d-flex align-items-center">
              <span>
                <FaBars className={styles.customHamBars} />
              </span>
              <img src={defaultUser} alt="default avatar" className={styles.avatarImage} />
            </div>
          </Navbar.Toggle>
        )}
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className={styles.navItemsContainer}>
            {user ? (
              <>
                {location.pathname === "/manager" && (
                  <>
                    <Nav.Link
                      as={Link}
                      to="/manage-venue"
                      className="d-flex justify-content-end"
                      onClick={() => setExpanded(false)}
                    >
                      Manage Venue
                    </Nav.Link>
                    <Nav.Link
                      onClick={() => {
                        handleLogout();
                        setExpanded(false);
                      }}
                      className="d-flex justify-content-end"
                    >
                      Log out
                    </Nav.Link>
                  </>
                )}
                {location.pathname === "/user" && (
                  <>
                    <Nav.Link
                      as={Link}
                      to="/profile"
                      className="d-flex justify-content-end"
                      onClick={() => setExpanded(false)}
                    >
                      Profile
                    </Nav.Link>
                    <Nav.Link
                      as={Link}
                      to="/bookings"
                      className="d-flex justify-content-end"
                      onClick={() => setExpanded(false)}
                    >
                      Bookings
                    </Nav.Link>
                    <Nav.Link
                      onClick={() => {
                        handleLogout();
                        setExpanded(false);
                      }}
                      className="d-flex justify-content-end"
                    >
                      Log out
                    </Nav.Link>
                  </>
                )}
              </>
            ) : (
              <>
                <Nav.Link
                  as={Link}
                  to="/register"
                  className="d-flex justify-content-end"
                  onClick={() => setExpanded(false)}
                >
                  <strong>Sign up</strong>
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/login"
                  className="d-flex justify-content-end"
                  onClick={() => setExpanded(false)}
                >
                  Log in
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/"
                  className="d-flex justify-content-end"
                  onClick={() => setExpanded(false)}
                >
                  Home
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

function Header() {
  return (
    <div>
      <LoggedOutHeader />
    </div>
  );
}

export default Header;
