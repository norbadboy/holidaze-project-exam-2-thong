import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";
import "../styles/footer.css";

function Footer() {
  const facebookIcon = <FaFacebook />;
  const instagramIcon = <FaInstagram />;
  const twitterIcon = <FaTwitter />;

  return (
    <div className="footerContainer mb-3 d-flex">
      <div className="d-flex flex-grow-1 justify-content-between">
        <span className="d-flex p-3">
          <p>&copy; {new Date().getFullYear()} Holidaze, Inc.</p>
        </span>
        <span className="d-flex">
          <div className="d-flex align-items-center">
            <Link className="footerLink" to="#">
              Privacy
            </Link>
            <Link className="footerLink" to="#">
              Terms
            </Link>
            <Link className="footerLink" to="#">
              About Us
            </Link>
          </div>
        </span>
        <span className="d-flex flex-end p-3">
          <div className="d-flex align-items-center">
            <div className="facebookIcon">
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="footerIcon"
              >
                {facebookIcon}
              </a>
            </div>
            <div className="instagramIcon">
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="footerIcon"
              >
                {instagramIcon}
              </a>
            </div>
            <div className="twitterIcon">
              <a
                href="https://www.twitter.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="footerIcon"
              >
                {twitterIcon}
              </a>
            </div>
          </div>
        </span>
      </div>
    </div>
  );
}

export default Footer;
