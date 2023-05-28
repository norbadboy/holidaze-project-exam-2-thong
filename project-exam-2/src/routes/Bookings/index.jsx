import { useUser } from "../../contexts/userContext";
import { Row, Col, Card, Modal, Button, Dropdown } from "react-bootstrap";
import { StyledButton, BaseButton } from "../../styles/styledComponents/styledButton";
import styles from "../../styles/bookings.module.css";
import { useState, useEffect, useCallback } from "react";
import { getAllBookingsByProfile } from "../../api/bookings/get.mjs";
import { updateBooking } from "../../api/bookings/update.mjs";
import { deleteBooking } from "../../api/bookings/delete.mjs";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useForm } from "react-hook-form";
import { FaSortDown } from "react-icons/fa";

function UserBookings() {
  const [userBookings, setUserBookings] = useState([]);
  const { user } = useUser();
  const userName = user.name;
  const [showModal, setShowModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [sort, setSort] = useState("created");
  const [sortOrder, setSortOrder] = useState("desc");

  // State variables for managing dates
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [excludedDates, setExcludedDates] = useState([]);

  // form setup
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      startDate: null,
      endDate: null,
    },
  });

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
      setUserBookings(bookings);
    } catch (error) {
      console.error(error);
    }
  }, [userName, sort, sortOrder]);

  useEffect(() => {
    fetchUserBookings();
  }, [fetchUserBookings]);

  useEffect(() => {
    if (selectedBooking) {
      const dates = [];
      const dateFrom = new Date(selectedBooking.dateFrom);
      const dateTo = new Date(selectedBooking.dateTo);
      for (let d = dateFrom; d <= dateTo; d.setDate(d.getDate() + 1)) {
        dates.push(new Date(d));
      }
      setExcludedDates(dates);
    }
  }, [selectedBooking]);

  // Function to handle updating the booking
  const handleUpdateBooking = async (data) => {
    if (selectedBooking) {
      try {
        const updatedBooking = {
          ...selectedBooking,
          guests: data.guests,
        };

        if (data.startDate) {
          updatedBooking.dateFrom = new Date(data.startDate).toISOString();
        }

        if (data.endDate) {
          updatedBooking.dateTo = new Date(data.endDate).toISOString();
        }

        await updateBooking(selectedBooking.id, updatedBooking);
        handleCloseModal();
        fetchUserBookings(); // To refresh bookings after update
      } catch (error) {
        console.error(error);
      }
    }
  };

  // Function to handle deleting the booking
  const handleDeleteBooking = async () => {
    if (selectedBooking) {
      // Confirm before deleting
      const confirmation = window.confirm("Are you sure to delete this booking?");
      if (confirmation) {
        try {
          await deleteBooking(selectedBooking.id);
          handleCloseModal();
          fetchUserBookings(); // To refresh bookings after deletion
        } catch (error) {
          console.error(error);
        }
      }
    }
  };

  // guests dropdown
  const [guests, setGuests] = useState(1);
  const handleSelect = (e, selectedGuests) => {
    const parsedGuests = parseInt(e, 10);
    setGuests(parsedGuests);
    setValue("guests", parsedGuests);
  };

  // Generate options for dropdown
  const generateDropdownItems = () => {
    const maxGuests = selectedBooking ? selectedBooking.venue.maxGuests : 1;
    const items = [];
    for (let i = 1; i <= maxGuests; i++) {
      items.push(
        <Dropdown.Item key={i} eventKey={i}>
          {i}
        </Dropdown.Item>
      );
    }
    return items;
  };

  // Function to handle modal
  const handleShowModal = (booking) => {
    setSelectedBooking(booking);
    setGuests(booking.guests);
    setStartDate(new Date(booking.dateFrom));
    setEndDate(new Date(booking.dateTo));
    setShowModal(true);
  };

  // Function to set state when closing modal
  const handleCloseModal = () => {
    setSelectedBooking(null);
    setShowModal(false);
    setStartDate(null);
    setEndDate(null);
    setGuests(1);
  };

  // Function to handle sort
  const handleSortChange = (sortValue, sortOrderValue) => {
    setSort(sortValue);
    setSortOrder(sortOrderValue);
  };

  return (
    <Row className={styles.userBookings_Container}>
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
              <div className={styles.myBookingsCard_Container}>
                <Card.Title className={styles.myBookingsCard_Title}>
                  <strong> {booking.venue.name} </strong>
                  <div className={styles.myBookingsCard_Text}>Guests: {booking.guests}</div>
                </Card.Title>
                <Card.Subtitle className={`text-muted ${styles.myBookingsCard_Subtitle}`}>
                  {booking.venue.location.address === "Unknown" ||
                  booking.venue.location.address === "" ||
                  booking.venue.location.city === "Unknown" ||
                  booking.venue.location.city === "" ||
                  booking.venue.location.country === "Unknown" ||
                  booking.venue.location.country === ""
                    ? "Contact manager for location"
                    : `${booking.venue.location.address.replace(",", "")}, ${
                        booking.venue.location.city
                      }, ${booking.venue.location.country}`}
                </Card.Subtitle>
                <div className={styles.myBookingsCard_Date}>
                  <div>
                    <strong>Check-in:</strong> {formatDate(booking.dateFrom)}
                  </div>
                  <div>
                    <strong>Check-out:</strong> {formatDate(booking.dateTo)}
                  </div>
                </div>
                <div className="d-flex justify-content-center mt-3">
                  <BaseButton
                    className={styles.viewBookingButton}
                    onClick={() => handleShowModal(booking)}
                  >
                    Edit Booking
                  </BaseButton>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Col>
      <Modal show={showModal} onHide={handleCloseModal} fullscreen>
        <Modal.Header closeButton className={styles.userBookings_ModalHeader}>
          <Modal.Title>{selectedBooking?.venue.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body className={styles.userBookings_ModalBody}>
          <form onSubmit={handleSubmit(handleUpdateBooking)}>
            <Row className="mb-4">
              <Col xs={12} md={7} lg={6} className="mb-3">
                <div className="d-flex justify-content-between">
                  <div className="d-flex flex-column flex-grow-1">
                    <p>
                      <strong>Guests:</strong> {selectedBooking && selectedBooking.guests}
                    </p>
                    <p>
                      <strong>Check-in:</strong>{" "}
                      {selectedBooking && formatDate(selectedBooking.dateFrom)}
                    </p>
                    <p>
                      <strong>Check-out:</strong>{" "}
                      {selectedBooking && formatDate(selectedBooking.dateTo)}
                    </p>
                    <hr />
                    <div className="mt-4">
                      <p>
                        <strong>Created:</strong>{" "}
                        {selectedBooking && formatDate(selectedBooking.created)}
                      </p>
                      <p>
                        <strong>Updated:</strong>{" "}
                        {selectedBooking && formatDate(selectedBooking.updated)}
                      </p>
                    </div>
                  </div>
                </div>
              </Col>
              <Col xs={12} md={7} lg={6}>
                <Card className={styles.datesAndGuestsContainer}>
                  <div className="d-flex flex-column">
                    <DatePicker
                      selected={
                        startDate
                          ? startDate
                          : selectedBooking
                          ? new Date(selectedBooking.dateFrom)
                          : null
                      }
                      onChange={(date) => {
                        setStartDate(date);
                        setValue("startDate", date, { shouldValidate: true });
                      }}
                      selectsStart
                      startDate={startDate}
                      endDate={endDate}
                      excludeDates={excludedDates}
                      minDate={new Date()}
                      placeholderText="Check-in"
                      showTimeSelect
                      className={`rounded ${styles.datePicker}`}
                    />
                    <DatePicker
                      selected={
                        endDate
                          ? endDate
                          : selectedBooking
                          ? new Date(selectedBooking.dateTo)
                          : null
                      }
                      onChange={(date) => {
                        setEndDate(date);
                        setValue("endDate", date, { shouldValidate: true });
                      }}
                      selectsEnd
                      startDate={startDate}
                      endDate={endDate}
                      minDate={startDate ? startDate : new Date()}
                      excludeDates={excludedDates}
                      placeholderText="Check-out"
                      showTimeSelect
                      className={`rounded ${styles.datePicker}`}
                    />
                    <div className="text-danger">
                      {errors.startDate && "Check-in date is required"}
                      {errors.endDate && "Check-out date is required"}
                    </div>
                    <div className="d-flex flex-grow-1">
                      <Dropdown onSelect={handleSelect} className="d-flex flex-grow-1">
                        <Dropdown.Toggle
                          variant="secondary"
                          id="dropdown-basic"
                          className={`${styles.guestsDropdownToggle}`}
                        >
                          <div className="d-flex justify-content-between">
                            <div className="d-flex flex-column align-items-start">
                              <strong style={{ fontSize: "16px" }}>GUESTS</strong>
                              <p>
                                {guests} {guests > 1 ? "guests" : "guest"}
                              </p>
                            </div>
                            <div className="d-flex flex-grow-1 flex-column justify-content-start align-items-end mt-2">
                              <FaSortDown style={{ width: "25px", height: "25px" }} />
                            </div>
                          </div>
                        </Dropdown.Toggle>
                        <Dropdown.Menu
                          variant="secondary"
                          style={{
                            maxHeight: "200px",
                            overflow: "auto",
                            width: "100%",
                            textAlign: "center",
                          }}
                        >
                          {generateDropdownItems()}
                        </Dropdown.Menu>
                      </Dropdown>
                      <input type="hidden" {...register("guests")} value={guests} />
                    </div>
                    <div className="my-3 d-flex justify-content-center">
                      <StyledButton
                        variant="primary"
                        type="submit"
                        onClick={handleUpdateBooking}
                        className="mt-2 py-2 d-flex justify-content-center"
                      >
                        Update Booking
                      </StyledButton>
                    </div>
                  </div>
                </Card>
              </Col>
            </Row>
          </form>
        </Modal.Body>
        <Modal.Footer className={styles.userBookings_ModalFooter}>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="danger" onClick={handleDeleteBooking}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Row>
  );
}

export default UserBookings;
