import { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import styles from "../styles/homePage.module.css";
import { FaWifi } from "react-icons/fa";

const MetaFilter = ({ onFilter }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedMeta, setSelectedMeta] = useState({
    wifi: false,
    parking: false,
    breakfast: false,
    pets: false,
  });

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const handleMetaChange = (event) => {
    const updatedMeta = {
      ...selectedMeta,
      [event.target.name]: event.target.checked,
    };

    setSelectedMeta(updatedMeta);
  };

  const handleApplyFilter = () => {
    onFilter(selectedMeta);
    handleClose();
  };

  return (
    <div className="filter-container">
      <Button variant="primary" onClick={handleShow} className={styles.filterButton}>
        <FaWifi className={styles.filterButton_Icon} />
        Amenities
      </Button>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Select meta</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {Object.keys(selectedMeta).map((metaKey) => (
            <Form.Check
              key={metaKey}
              type="checkbox"
              id={metaKey}
              name={metaKey}
              label={metaKey}
              checked={selectedMeta[metaKey]}
              onChange={handleMetaChange}
            />
          ))}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleApplyFilter}>
            Apply filter
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default MetaFilter;
