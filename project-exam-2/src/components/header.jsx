import { Link, useNavigate } from "react-router-dom";
import logo from "../pictures/logo.png";
import styles from "../styles/header.module.css";
import { Nav, Navbar, Container } from "react-bootstrap";
import defaultUser from "../pictures/defaultUser.png";
import { useState, useRef, useEffect } from "react";
import { FaBars } from "react-icons/fa";
import { logout } from "../api/auth/logout.mjs";
import { useUser } from "../contexts/userContext";

function LoggedOutHeader() {
  const [expanded, setExpanded] = useState(false);
  const navbarRef = useRef(null);
  const navigate = useNavigate();
  const { user, setUser } = useUser();

  const handleLogout = () => {
    logout();
    setUser(null);
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
      <Container className="d-flex">
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
        {user && (
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            className={styles.pillToggle}
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
          <div className={styles.navItemsContainer}>
            <Nav className={styles.navItemsBody}>
              {user ? (
                <>
                  {user.venueManager ? (
                    <div>
                      <Nav.Link
                        as={Link}
                        to="/manage-bookings"
                        className={styles.navLink}
                        onClick={() => setExpanded(false)}
                      >
                        Bookings
                      </Nav.Link>
                      <div className={styles.breakLine} />

                      <Nav.Link
                        as={Link}
                        to="/profile"
                        className={styles.navLink}
                        onClick={() => setExpanded(false)}
                      >
                        Account
                      </Nav.Link>
                      <Nav.Link
                        as={Link}
                        to="/manage-venues"
                        className={styles.navLink}
                        onClick={() => setExpanded(false)}
                      >
                        Holidaze your venue
                      </Nav.Link>
                      <div className={styles.breakLine} />
                      <Nav.Link
                        as={Link}
                        to="/manager"
                        className={styles.navLink}
                        onClick={() => setExpanded(false)}
                      >
                        Home
                      </Nav.Link>
                      <Nav.Link
                        onClick={() => {
                          handleLogout();
                          setExpanded(false);
                        }}
                        className={styles.navLink}
                      >
                        <strong>Log out</strong>
                      </Nav.Link>
                    </div>
                  ) : (
                    <div className="">
                      <Nav.Link
                        as={Link}
                        to="/bookings"
                        className={styles.navLink}
                        onClick={() => setExpanded(false)}
                      >
                        Bookings
                      </Nav.Link>
                      <Nav.Link
                        as={Link}
                        to="/profile"
                        className={styles.navLink}
                        onClick={() => setExpanded(false)}
                      >
                        Account
                      </Nav.Link>
                      <div className={styles.breakLine} />
                      <Nav.Link
                        as={Link}
                        to="/user"
                        className={styles.navLink}
                        onClick={() => setExpanded(false)}
                      >
                        Home
                      </Nav.Link>
                      <Nav.Link
                        onClick={() => {
                          handleLogout();
                          setExpanded(false);
                        }}
                        className={styles.navLink}
                      >
                        <strong>Log out</strong>
                      </Nav.Link>
                    </div>
                  )}
                </>
              ) : (
                <>
                  <Nav.Link
                    as={Link}
                    to="/register"
                    className={styles.navLink}
                    onClick={() => setExpanded(false)}
                  >
                    <strong>Sign up</strong>
                  </Nav.Link>
                  <Nav.Link
                    as={Link}
                    to="/login"
                    className={styles.navLink}
                    onClick={() => setExpanded(false)}
                  >
                    Log in
                  </Nav.Link>
                  <Nav.Link
                    as={Link}
                    to="/"
                    className={styles.navLink}
                    onClick={() => setExpanded(false)}
                  >
                    Home
                  </Nav.Link>
                </>
              )}
            </Nav>
          </div>
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
