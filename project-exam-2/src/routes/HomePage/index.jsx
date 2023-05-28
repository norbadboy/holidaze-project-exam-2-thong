import { Row, Col } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { API_PATH } from "../../api/constant.mjs";
import useAPI from "../../api/apiHook.jsx";
import { StyledButton, BaseButton } from "../../styles/styledComponents/styledButton.jsx";
import styles from "../../styles/homePage.module.css";
import ProductCard from "../../components/productCard.jsx";
import SearchBar from "../../components/searchBar.jsx";
import CountriesFilter from "../../components/homePageFilter.jsx";
import PriceFilter from "../../components/priceFilter.jsx";

const url = API_PATH + "/venues";

function HomePage() {
  const [productLimit, setProductLimit] = useState(24);
  const limit = 100;
  const { data, loading, error } = useAPI(
    url + `?_owner=true&_bookings=true&limit=${limit}&sort=created&_order=desc`
  );
  let [searchParams] = useSearchParams();
  const [items, setItems] = useState([]);

  const searchText = searchParams.get("search");

  const [selectedCountry, setSelectedCountry] = useState("");
  const [countryFilteredItems, setCountryFilteredItems] = useState([]);

  const [selectedPriceRange, setSelectedPriceRange] = useState("");
  const [priceFilteredItems, setPriceFilteredItems] = useState([]);

  // State to track the current active filters
  const [activeFilters, setActiveFilters] = useState({
    country: "",
    price: "",
    // name: "", // For example
  });

  const handleFilter = (country) => {
    if (country) {
      const filteredData = data.filter((item) => item.location.country === country);
      setCountryFilteredItems(filteredData);
      setActiveFilters((prevFilters) => ({ ...prevFilters, country }));
    } else {
      setCountryFilteredItems(data);
      setActiveFilters((prevFilters) => ({ ...prevFilters, country: "" }));
    }
  };

  const handlePriceFilter = (range) => {
    if (range) {
      let filteredData;
      if (range === "Over 1000") {
        filteredData = data.filter((item) => item.price > 1000);
      } else {
        const [min, max] = range.split("-").map(Number);
        filteredData = data.filter((item) => {
          if (max) {
            return item.price >= min && item.price <= max;
          } else {
            return item.price >= min;
          }
        });
      }
      setPriceFilteredItems(filteredData);
      setActiveFilters((prevFilters) => ({ ...prevFilters, price: range }));
      setSelectedPriceRange(range); // Add this line
    } else {
      setPriceFilteredItems(data);
      setActiveFilters((prevFilters) => ({ ...prevFilters, price: "" }));
      setSelectedPriceRange(""); // And this line
    }
  };

  // Clear all filters
  const handleClearFilters = () => {
    setProductLimit(24);
    setItems(data);
    setCountryFilteredItems(data);
    setPriceFilteredItems(data); // add this line
    setActiveFilters({
      // reset activeFilters state
      country: "",
      price: "", // add this line
    });
    setSelectedCountry(""); // add this line
    setSelectedPriceRange(""); // add this line
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

  useEffect(() => {
    handlePriceFilter(selectedPriceRange);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPriceRange, data]);

  const productsToRender = selectedPriceRange
    ? priceFilteredItems
    : searchText
    ? items
    : countryFilteredItems;

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
      <div>
        <SearchBar products={data} />
      </div>
      <hr />
      <div className={styles.homePageTitle_Card}>
        <div className={styles.filters_Container}>
          <CountriesFilter items={data} onFilter={handleFilter} />
          <PriceFilter onFilter={handlePriceFilter} />
        </div>
        <div className={styles.clearButton_Container}>
          <BaseButton onClick={handleClearFilters} className={styles.clearButton}>
            Clear filters
          </BaseButton>
        </div>
      </div>
      <hr />
      <div className="mt-3 d-flex justify-content-center">
        {activeFilters.country && (
          <p className={styles.activeFilters_Item}>{activeFilters.country}</p>
        )}
        {activeFilters.price && <p className={styles.activeFilters_Item}>{activeFilters.price}</p>}
      </div>
      <Row className="g-5">
        {productsToRender.slice(0, productLimit).map((product) => (
          <Col key={product.id} xl={4} md={6}>
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
      {productsToRender.length > productLimit && (
        <div className="text-center mt-4 mb-5 pb-2">
          <StyledButton onClick={handleLoadMore}>Load more</StyledButton>
        </div>
      )}
    </div>
  );
}

export default HomePage;
