import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "../styles/homePage.module.css";
import imageNotAvailable from "../pictures/imageNotAvailable.png";
import { FaStar } from "react-icons/fa";

function ProductCard(props) {
  const { product } = props;

  const formatPrice = (price) => {
    return Number(price).toLocaleString("en-US", { maximumFractionDigits: 0 });
  };

  const getLocation = (location) => {
    if (
      location.city === "Unknown" ||
      location.city === "" ||
      location.country === "Unknown" ||
      location.country === ""
    ) {
      return "Contact manager for location";
    } else {
      return `${location.city}, ${location.country}`;
    }
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <Card className={styles.homePageCard}>
      <Link to={`/${product.id}`} key={product.id} style={{ textDecoration: "none" }}>
        <Card.Img
          className={styles.homePageCard_Img}
          src={
            product && product.media && product.media.length > 0
              ? product.media[0]
              : imageNotAvailable
          }
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = imageNotAvailable;
          }}
        />
        <Card.Body className={styles.productCard_Body}>
          <div>
            <div className="d-flex justify-content-between">
              <Card.Title>{capitalizeFirstLetter(product.name)}</Card.Title>
              <div className={styles.productRating_Container}>
                <FaStar className={styles.productRating_Icon} />
                <Card.Text className={styles.productRating_Text}>{product.rating}</Card.Text>
              </div>
            </div>
            <div className={styles.productLocation_Container}>
              <Card.Text className={styles.productLocation_Text}>
                {getLocation(product.location)}
              </Card.Text>
            </div>
            <Card.Text className={styles.productText_Price}>
              ${formatPrice(product.price)}
            </Card.Text>
          </div>
        </Card.Body>
      </Link>
    </Card>
  );
}

export default ProductCard;
