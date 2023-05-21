import { useState } from "react";
import { Dropdown } from "react-bootstrap";
import { Button, Form, InputGroup } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import styles from "../styles/header.module.css";
import { FaSearch } from "react-icons/fa";
import imageNotAvailable from "../pictures/imageNotAvailable.png";

function SearchBar({ products }) {
  const [value, setValue] = useState("");
  let [, setSearchParams] = useSearchParams();
  const [showDropdown, setShowDropdown] = useState(false);

  const onSubmitForm =
    ("submit",
    (e) => {
      e.preventDefault();
      const form = e.target;
      const searchTerm = form.search.value;
      setSearchParams({ search: searchTerm });
    });

  const filteredProducts = products.filter((product) => {
    return product.name.toLowerCase().includes(value.toLowerCase());
  });

  const onChange = (e) => {
    const searchTerm = e.target.value;
    setValue(searchTerm);
    if (searchTerm === "") {
      setShowDropdown(false);
    } else {
      setShowDropdown(true);
    }
  };

  const onSearch = (searchTerm) => {
    setValue(searchTerm);
    setShowDropdown(false);
    setSearchParams({ search: searchTerm });
  };

  return (
    <div className={styles.searchBarBody}>
      <div className={styles.searchBarContainer}>
        <Form onSubmit={onSubmitForm} className="d-flex">
          <InputGroup className="">
            <Form.Control
              type="text"
              name="search"
              placeholder="Search"
              value={value}
              onChange={onChange}
              className={styles.searchInput}
            />
            <Button type="submit" variant="outline-secondary" className={styles.searchButton}>
              <FaSearch className={styles.searchBarIcon} />
            </Button>
          </InputGroup>
        </Form>
        {showDropdown && (
          <Dropdown className={styles.dropdown}>
            {filteredProducts.slice(0, 5).map((product) => {
              return (
                <Dropdown.Item
                  className={styles.dropdownItem}
                  key={product.id}
                  onClick={() => onSearch(product.name)}
                >
                  <div className="d-flex">
                    <img
                      src={
                        product && product.media && product.media.length > 0
                          ? product.media[0]
                          : imageNotAvailable
                      }
                      alt={product.name}
                      className={styles.dropdownImage}
                    />
                    <div className="mt-1">{product.name}</div>
                  </div>
                </Dropdown.Item>
              );
            })}
          </Dropdown>
        )}
      </div>
    </div>
  );
}

export default SearchBar;
