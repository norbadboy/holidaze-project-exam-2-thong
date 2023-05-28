import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";
import styles from "../styles/footer.module.css";
import { useState } from "react";
import { Offcanvas, Button } from "react-bootstrap";
import { BaseButton } from "../styles/styledComponents/styledButton";

function Footer() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const renderSocialLinks = () => (
    <div className={styles.footerSocial_Container}>
      <div className="facebookIcon">
        <a
          href="https://www.facebook.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="footerIcon"
        >
          <FaFacebook className={styles.footerIcon} />
        </a>
      </div>
      <div className="instagramIcon">
        <a
          href="https://www.instagram.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="footerIcon"
        >
          <FaInstagram className={styles.footerIcon} />
        </a>
      </div>
      <div className="twitterIcon">
        <a
          href="https://www.twitter.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="footerIcon"
        >
          <FaTwitter className={styles.footerIcon} />
        </a>
      </div>
    </div>
  );

  const renderLinks = () => (
    <div className={styles.footerLink_Container}>
      <Link className={styles.footerLink} to="#">
        Privacy
      </Link>
      <Link className={styles.footerLink} to="#">
        Terms
      </Link>
      <Link className={styles.footerLink} to="#">
        About Us
      </Link>
    </div>
  );

  const renderCompanyName = () => (
    <div className={styles.companyName_Container}>
      &copy; {new Date().getFullYear()} <p className={styles.companyName_Text}>Holidaze, Inc.</p>
    </div>
  );

  return (
    <div className={styles.footerContainer}>
      <div className="d-flex flex-grow-1 justify-content-between">
        <span className={`${styles.companyName_Desktop}`}>{renderCompanyName()}</span>

        <span className={`${styles.footerLink_Container} ${styles.desktop}`}>{renderLinks()}</span>

        <span className={`${styles.footerSocial_Container} ${styles.desktop}`}>
          {renderSocialLinks()}
        </span>

        <span className={`${styles.offcanvasButtonContainer} ${styles.mobile}`}>
          <BaseButton className={styles.offcanvasButton} onClick={handleShow}>
            More info
          </BaseButton>
          <Offcanvas
            show={show}
            onHide={handleClose}
            placement="bottom"
            className={styles.offcanvasCustom_Container}
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>More information</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body className={styles.offcanvasCustom}>
              {renderCompanyName()}
              {renderLinks()}
              {renderSocialLinks()}
            </Offcanvas.Body>
          </Offcanvas>
        </span>
      </div>
    </div>
  );
}

export default Footer;
