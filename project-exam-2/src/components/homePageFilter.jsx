import { useState } from "react";
import { Modal, Button, ListGroup } from "react-bootstrap";
import styles from "../styles/homePage.module.css";
import { FaGlobeAmericas } from "react-icons/fa";
import { BaseButton } from "../styles/styledComponents/styledButton";

const CountriesFilter = ({ items, onFilter }) => {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    onFilter(country);
    handleClose();
  };

  // Extract unique country list
  const countries = [...new Set(items.map((item) => item.location.country))];

  return (
    <div className={styles.filterContainer}>
      <BaseButton onClick={handleShow} className={styles.filterButton}>
        <FaGlobeAmericas className={styles.filterButton_Icon} />
        Countries
      </BaseButton>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Select a country</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ListGroup className={styles.filterList_Container}>
            {countries.map((country) => (
              <ListGroup.Item
                key={country}
                onClick={() => handleCountrySelect(country)}
                className={styles.filterList_Item}
              >
                {country}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CountriesFilter;
