import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../styles/homePage.css";
import imageNotAvailable from "../pictures/imageNotAvailable.png";
import { FaStar } from "react-icons/fa";

function ProductCard(props) {
  const { product } = props;
  return (
    <Card className="homePageCard">
      <Link to={`/${product.id}`} style={{ textDecoration: "none" }}>
        <Card.Img
          variant="top"
          src={product.media}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = imageNotAvailable;
          }}
        />
        <Card.Body>
          <div className="d-flex justify-content-between">
            <Card.Title style={{ fontSize: "0.95rem" }}>{product.name}</Card.Title>
            <div className="ml-auto d-flex align-items-start">
              <FaStar className="starIcon" style={{ marginRight: "7px", width: "15px" }} />
              <Card.Text>{product.rating}</Card.Text>
            </div>
          </div>
          <Card.Text>$ {product.price}</Card.Text>
        </Card.Body>
      </Link>
    </Card>
  );
}

export default ProductCard;
