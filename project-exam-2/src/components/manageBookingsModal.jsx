import { Modal, Button } from "react-bootstrap";
import styles from "../styles/manageBookings.module.css";

function BookingsModal({ bookings, show, handleClose }) {
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

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Bookings</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {bookings.map((booking, index) => (
          <div key={booking.id} className={styles.manageBookingsCard_Date}>
            <h5>
              <strong>Booking {index + 1}</strong>
            </h5>
            <div>
              <strong>Guests:</strong> {booking.guests}
            </div>
            <div>
              <strong>Check-in:</strong> {formatDate(booking.dateFrom)}
            </div>
            <div>
              <strong>Check-out:</strong> {formatDate(booking.dateTo)}
            </div>
          </div>
        ))}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default BookingsModal;
