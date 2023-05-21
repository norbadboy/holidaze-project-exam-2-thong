import { useUser } from "../../contexts/userContext";
import { Row, Col, Card, Modal, Button, Dropdown } from "react-bootstrap";
import styles from "../../styles/bookings.module.css";
import { useState, useEffect, useCallback } from "react";
import { getAllBookingsByProfile } from "../../api/bookings/get.mjs";

function UserBookings() {
  const [userBookings, setUserBookings] = useState([]);
  const { user } = useUser();
  const userName = user.name;
  const [showModal, setShowModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
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

  const fetchUserBookings = useCallback(async () => {
    try {
      const bookings = await getAllBookingsByProfile(userName, sort, sortOrder);
      console.log(bookings);
      setUserBookings(bookings);
    } catch (error) {
      console.error(error);
    }
  }, [userName, sort, sortOrder]);

  useEffect(() => {
    fetchUserBookings();
  }, [fetchUserBookings]);

  // Function to handle modal
  const handleShowModal = (booking) => {
    setSelectedBooking(booking);
    setShowModal(true);
  };

  // Function to close modal
  const handleCloseModal = () => {
    setSelectedBooking(null);
    setShowModal(false);
  };

  // Function to handle sort
  const handleSortChange = (sortValue, sortOrderValue) => {
    setSort(sortValue);
    setSortOrder(sortOrderValue);
  };

  return (
    <Row className="justify-content-center">
      <Col className="mt-5">
        <h1 className="text-start mt-5">My Bookings</h1>
        <hr />
        <div className="d-flex justify-content-end my-4">
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
              <Dropdown.Item eventKey="created,desc">Booked (newest)</Dropdown.Item>
              <Dropdown.Item eventKey="created,asc">Booked (oldest)</Dropdown.Item>
              <Dropdown.Item eventKey="dateFrom,asc">Check-in (upcoming) </Dropdown.Item>
              <Dropdown.Item eventKey="dateFrom,desc">Check-in (later)</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <Row className="justify-content-start">
          {userBookings.map((booking) => (
            <Col xs={12} md={6} lg={6} key={booking.id}>
              <Card.Img
                src={booking.venue.media[0]}
                alt={booking.venue.name}
                className={styles.myBookingsImage}
                onClick={() => handleShowModal(booking)}
              />
              <Card
                className={styles.myBookingsCard_Container}
                onClick={() => handleShowModal(booking)}
              >
                <Card.Title className={styles.myBookingsCard_Title}>
                  <strong> {booking.venue.name} </strong>
                  <div className={styles.myBookingsCard_Text}>Guests: {booking.guests}</div>
                </Card.Title>
                <Card.Subtitle className={`text-muted ${styles.myBookingsCard_Subtitle}`}>
                  {booking.venue.location.address !== "Unknown" &&
                    booking.venue.location.address.replace(",", "")}
                  {booking.venue.location.city !== "Unknown" && `, ${booking.venue.location.city}`}
                  {booking.venue.location.country !== "Unknown" &&
                    `, ${booking.venue.location.country}`}
                </Card.Subtitle>

                <div className={styles.myBookingsCard_Date}>
                  <div>
                    <strong>Check-in:</strong> {formatDate(booking.dateFrom)}
                  </div>
                  <div>
                    <strong>Check-out:</strong> {formatDate(booking.dateTo)}
                  </div>
                </div>
                <div></div>
              </Card>
            </Col>
          ))}
        </Row>
      </Col>
      <Modal show={showModal} onHide={handleCloseModal} fullscreen>
        <Modal.Header closeButton>
          <Modal.Title>{selectedBooking?.venue.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            <strong>Created:</strong> {selectedBooking && formatDate(selectedBooking.created)}
          </p>
          <p>
            <strong>Updated:</strong> {selectedBooking && formatDate(selectedBooking.updated)}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Row>
  );
}

export default UserBookings;
