import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../styles/homePage.css";
import imageNotAvailable from "../pictures/imageNotAvailable.png";

function ProductCard(props) {
  const { product } = props;
  return (
    <Card className="homePageCard">
      <Link to={`/product/${product.id}`} style={{ textDecoration: "none" }}>
        <Card.Img
          variant="top"
          src={product.media}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = imageNotAvailable;
          }}
        />
        <Card.Body>
          <Card.Title style={{ fontSize: "1.1em" }}>{product.name}</Card.Title>
          <Card.Text>$ {product.price}</Card.Text>
        </Card.Body>
      </Link>
    </Card>
  );
}

export default ProductCard;
