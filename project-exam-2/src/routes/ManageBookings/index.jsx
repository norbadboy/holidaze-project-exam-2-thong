import { getBookingOfVenueByProfile } from "../../api/venues/getByProfile.mjs";
import { useUser } from "../../contexts/userContext.jsx";
import { Row, Col, Card, Modal, Button, Dropdown } from "react-bootstrap";
import { useState, useEffect, useCallback } from "react";
import styles from "../../styles/manageBookings.module.css";
import BookingsModal from "../../components/manageBookingsModal.jsx";
import { StyledButton } from "../../styles/styledComponents/styledButton.jsx";

function ManageBookings() {
  const [venueBookings, setVenueBookings] = useState([]);
  const { user } = useUser();
  const userName = user.name;

  const [show, setShow] = useState(false);
  const [currentBookings, setCurrentBookings] = useState([]);

  const [sort, setSort] = useState("created");
  const [sortOrder, setSortOrder] = useState("desc");

  function formatDate(dateString) {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }

  const handleShow = (bookings) => {
    setCurrentBookings(bookings);
    setShow(true);
  };
  const handleClose = () => setShow(false);

  const fetchVenueBookings = useCallback(async () => {
    try {
      const bookings = await getBookingOfVenueByProfile(userName, sort, sortOrder);
      console.log("bookings", bookings);
      setVenueBookings(bookings);
    } catch (error) {
      console.error(error);
    }
  }, [userName, sort, sortOrder]);

  useEffect(() => {
    fetchVenueBookings();
  }, [fetchVenueBookings]);

  // Function to handle sort
  const handleSortChange = (sortValue, sortOrderValue) => {
    setSort(sortValue);
    setSortOrder(sortOrderValue);
  };

  return (
    <Row className="justify-content-center">
      <Col className="mt-5">
        <div className="pt-5">
          <h1 className={styles.title}>Manage Bookings</h1>
        </div>
        <hr />
        <div className="d-flex justify-content-end mb-4">
          <Dropdown
            onSelect={(e) => {
              const [sort, sortOrder] = e.split(",");
              handleSortChange(sort, sortOrder);
            }}
          >
            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
              Sort by
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item eventKey="created,desc">Created (newest first)</Dropdown.Item>
              <Dropdown.Item eventKey="created,asc">Created (oldest first)</Dropdown.Item>
              <Dropdown.Item eventKey="name,asc">Name (A-Z)</Dropdown.Item>
              <Dropdown.Item eventKey="name,desc">Name (Z-A)</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <Row className="justify-content-start">
          {venueBookings
            .filter((venue) => venue.bookings && venue.bookings.length > 0)
            .map((venue) => (
              <Col key={venue.id} xs={12} md={6} lg={6}>
                <Card.Img
                  src={venue.media[0]}
                  alt={venue.title}
                  className={styles.manageBookingsImage}
                />
                <Card className={styles.manageBookingsCard_Container}>
                  <Card.Title className={styles.manageBookingsCard_Title}>
                    <strong>{venue.name}</strong>
                  </Card.Title>
                  <Card.Subtitle className={`text-muted ${styles.manageBookingsCard_Subtitle}`}>
                    {venue.location.address}
                  </Card.Subtitle>
                  <div className="mt-3">
                    <Card.Text className={styles.manageBookingsCard_Text}>
                      <strong>Created:</strong> {formatDate(venue.created)}
                    </Card.Text>
                    <Card.Text className={styles.manageBookingsCard_Text}>
                      <strong>Updated:</strong> {formatDate(venue.updated)}
                    </Card.Text>
                  </div>
                  <div className="d-flex justify-content-center mt-4">
                    <StyledButton
                      className={styles.manageBookingsCard_Button}
                      onClick={() => handleShow(venue.bookings)}
                    >
                      View Bookings
                    </StyledButton>
                  </div>
                </Card>
              </Col>
            ))}
        </Row>
        <BookingsModal bookings={currentBookings} show={show} handleClose={handleClose} />
      </Col>
    </Row>
  );
}

export default ManageBookings;
