import { Row, Col, Card } from "react-bootstrap";
import ProductCard from "../../components/productCard.jsx";
import { API_PATH } from "../../api/constant.mjs";
import useAPI from "../../api/apiHook.jsx";
import { useState } from "react";
import { StyledButton } from "../../styles/styledComponents/styledButton.jsx";

const url = API_PATH + "/venues";

function HomePageUser() {
  const [productLimit, setProductLimit] = useState(24);
  const limit = 96;
  const { data, loading, error } = useAPI(url + `?_limit=${limit}&_sort=id&_order=desc`);

  const handleLoadMore = () => {
    setProductLimit(productLimit + 24);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Something went wrong...</div>;
  }

  return (
    <div className="homePageContainer px-2">
      <div className="homePageTitle--container mt-5 mb-4">
        <Card className="homePageTitle--card d-flex p-2 flex-column justify-content-center align-items-center">
          <h4>USER SITE</h4>
        </Card>
      </div>
      <Row>
        {data.slice(0, productLimit).map((product) => (
          <Col key={product.id} sm={12} md={6} lg={3} xl={4}>
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
      {data.length > productLimit && (
        <div className="text-center mb-5 pb-2">
          <StyledButton onClick={handleLoadMore}>Load more</StyledButton>
        </div>
      )}
    </div>
  );
}

export default HomePageUser;
