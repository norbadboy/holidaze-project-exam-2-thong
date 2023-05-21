import { useState } from "react";
import { Modal, Button, ListGroup } from "react-bootstrap";
import { FaDollarSign } from "react-icons/fa";
import styles from "../styles/homePage.module.css";

const PriceFilter = ({ onFilter }) => {
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const handlePriceSelect = (range) => {
    onFilter(range);
    handleClose();
  };

  // Define price ranges
  const priceRanges = ["0-100", "100-500", "500-1000", "Over 1000"];

  return (
    <div className="filter-container">
      <Button variant="primary" onClick={handleShow} className={styles.filterButton}>
        <FaDollarSign className={styles.filterButton_Icon} />
        Price
      </Button>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Select a price range</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ListGroup>
            {priceRanges.map((range) => (
              <ListGroup.Item key={range} onClick={() => handlePriceSelect(range)}>
                {range}
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

export default PriceFilter;
