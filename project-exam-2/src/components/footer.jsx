import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

function Footer() {
  const facebookIcon = <FaFacebook />;
  const instagramIcon = <FaInstagram />;
  const twitterIcon = <FaTwitter />;

  return (
    <Card className="mt-5 mb-3 p-3">
      <div className="footerTitleContainer">
        <h3>Information</h3>
      </div>
      <div className="footerRowContainer d-flex justify-content-between mt-2">
        <div className="footerCol">
          <h5>Home</h5>
          <div>
            <Link to="/">Home page</Link>
          </div>
        </div>
        <div
          className="footerCol d-flex flex-column align-items-center"
          d-flex
          justify-content-around
        >
          <h5>Contact Us</h5>
          <div>
            <Link to="/contact">Contact page</Link>
          </div>
          <div>
            <p>
              Phone: <u> 00 11 22 33 </u>
            </p>
          </div>
        </div>
        <div className="footerCol">
          <h5 className="d-flex justify-content-end">Social Media</h5>
          <div className="d-flex justify-content-center">
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
        </div>
      </div>
      <div>
        <p className="text-center mt-3">
          &copy; {new Date().getFullYear()} holidaze. All rights reserved.
        </p>
      </div>
    </Card>
  );
}

export default Footer;
