import { Row, Col, Card } from "react-bootstrap";
import { API_PATH } from "../../api/constant.mjs";
import ProductCard from "../../components/productCard.jsx";
import useAPI from "../../api/apiHook.jsx";

const url = API_PATH + "/venues";

function HomePage() {
  const { data, loading, error } = useAPI(url);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Something went wrong...</div>;
  }

  return (
    <div className="homePageContainer px-2">
      <div className="homePageTitle--container my-5">
        <Card className="homePageTitle--card d-flex p-4 flex-column justify-content-center align-items-center">
          <h1>Here goes filters</h1>
        </Card>
      </div>
      <Row>
        {data.map((product) => (
          <Col key={product.id} sm={12} md={6} lg={3} xl={4}>
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default HomePage;
