import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { StyledButton } from "../styles/styledComponents/styledButton";
import "../styles/homePage.css";
import imageNotAvailable from "../pictures/imageNotAvailable.png";

function ProductCard(props) {
  const { product } = props;
  return (
    <Card className="homePageCard">
      <Card.Img
        variant="top"
        src={product.media}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = imageNotAvailable;
        }}
      />
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <Card.Text>$ {product.price}</Card.Text>
        <Link to={`/product/${product.id}`}>
          <StyledButton variant="primary">View</StyledButton>
        </Link>
      </Card.Body>
    </Card>
  );
}

export default ProductCard;
