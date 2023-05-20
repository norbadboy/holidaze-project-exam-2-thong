import { Row, Col, Card } from "react-bootstrap";
import ProductCard from "../../components/productCard.jsx";
import { API_PATH } from "../../api/constant.mjs";
import useAPI from "../../api/apiHook.jsx";
import { useState, useEffect } from "react";
import { StyledButton } from "../../styles/styledComponents/styledButton.jsx";
import SearchBar from "../../components/searchBar.jsx";
import { useSearchParams } from "react-router-dom";

const url = API_PATH + "/venues";

function HomePage() {
  const [productLimit, setProductLimit] = useState(24);
  const limit = 96;
  const { data, loading, error } = useAPI(url + `?limit=${limit}&sort=created&_order=desc`);
  let [searchParams] = useSearchParams();
  const [items, setItems] = useState([]);

  const searchText = searchParams.get("search");

  useEffect(() => {
    if (searchText && data.length > 0) {
      const filteredProducts = data.filter((product) => {
        return product.name.toLowerCase().includes(searchText.toLowerCase());
      });
      setItems(filteredProducts);
    } else {
      setItems(data);
    }
  }, [searchText, data]);

  const productsToRender = searchText ? items : data;

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
          <h4>Here goes filters</h4>
        </Card>
      </div>
      <div className="mb-4">
        <SearchBar products={data} />
      </div>
      <Row>
        {productsToRender.slice(0, productLimit).map((product) => (
          <Col key={product.id} xl={4} md={6}>
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
      {productsToRender.length > productLimit && (
        <div className="text-center mb-5 pb-2">
          <StyledButton onClick={handleLoadMore}>Load more</StyledButton>
        </div>
      )}
    </div>
  );
}

export default HomePage;
