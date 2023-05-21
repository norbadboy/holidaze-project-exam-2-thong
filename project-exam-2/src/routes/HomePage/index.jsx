import { Row, Col, Card } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { API_PATH } from "../../api/constant.mjs";
import useAPI from "../../api/apiHook.jsx";
import { StyledButton } from "../../styles/styledComponents/styledButton.jsx";
import ProductCard from "../../components/productCard.jsx";
import SearchBar from "../../components/searchBar.jsx";
import CountriesFilter from "../../components/homePageFilter.jsx";
import styles from "../../styles/homePage.module.css";

const url = API_PATH + "/venues";

function HomePage() {
  const [productLimit, setProductLimit] = useState(24);
  const limit = 96;
  const { data, loading, error } = useAPI(
    url + `?_owner=true&_bookings=true&limit=${limit}&sort=created&_order=desc`
  );
  let [searchParams] = useSearchParams();
  const [items, setItems] = useState([]);

  const searchText = searchParams.get("search");

  const [selectedCountry] = useState("");
  const [countryFilteredItems, setCountryFilteredItems] = useState([]);

  const handleFilter = (country) => {
    if (country) {
      const filteredData = data.filter((item) => item.location.country === country);
      setCountryFilteredItems(filteredData);
    } else {
      setCountryFilteredItems(data);
    }
  };

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

  useEffect(() => {
    handleFilter(selectedCountry);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCountry, data]);

  const productsToRender = searchText ? items : countryFilteredItems;

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
    <div className={styles.homePageContainer}>
      <div className="">
        <SearchBar products={data} />
      </div>
      <div className="mb-4">
        <Card className={styles.homePageTitle_Card}>
          <CountriesFilter items={data} onFilter={handleFilter} />
        </Card>
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
