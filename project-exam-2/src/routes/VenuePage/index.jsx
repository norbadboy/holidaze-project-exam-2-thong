import { useParams, Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { API_PATH } from "../../api/constant.mjs";
import useAPI from "../../api/apiHook";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useUser } from "../../contexts/userContext";
import { createBooking } from "../../api/bookings/create.mjs";
import { Row, Col, Card, Modal, Button, Container, Dropdown } from "react-bootstrap";
import { FaWifi, FaParking, FaStar, FaSortDown } from "react-icons/fa";
import { MdPets, MdFreeBreakfast, MdVerifiedUser } from "react-icons/md";
import styles from "../../styles/venue.module.css";
import { StyledButton } from "../../styles/styledComponents/styledButton.jsx";

const url = API_PATH + "/venues";

function VenuePage() {
  let { id } = useParams();
  const { data: venue, loading, error } = useAPI(`${url}/${id}?_owner=true&_bookings=true`);
  const media = venue?.media;
  const { user } = useUser();
  const navigate = useNavigate();

  // Check if the user is the owner of the venue
  const isOwner = user && venue?.owner?.name === user.name;

  // booking form
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      startDate: null,
      endDate: null,
    },
  });

  const onSubmit = async (data) => {
    const bookingData = {
      dateFrom: new Date(data.startDate).toISOString(),
      dateTo: new Date(data.endDate).toISOString(),
      guests: Number(guests),
      venueId: id,
    };

    try {
      const response = await createBooking(bookingData);
      console.log(response); // check response

      if (response.status === 201 || response.status === 200) {
        // If successful, show the success modal and after 2 seconds redirect to /bookings
        setShowSuccessModal(true);
        setTimeout(() => {
          setShowSuccessModal(false);
          navigate("/bookings");
        }, 2000);
      } else {
        // Handle unsuccessful booking scenario
        console.log("Booking was unsuccessful");
      }
    } catch (error) {
      console.log(error); // handle error
    }
  };

  // modal
  const [showModal, setShowModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  // check if a token is present in local storage
  // if so, show the booking button

  // guest dropdown
  const [guests, setGuests] = useState(1);
  const handleSelect = (e, selectedGuests) => {
    setGuests(e);
    setValue("guests", selectedGuests);
  };

  // Generate options for dropdown
  const generateDropdownItems = () => {
    const items = [];
    for (let i = 1; i <= venue.maxGuests; i++) {
      items.push(
        <Dropdown.Item key={i} eventKey={i}>
          {i}
        </Dropdown.Item>
      );
    }
    return items;
  };

  // date picker
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [excludedDates, setExcludedDates] = useState([]);

  useEffect(() => {
    if (venue?.bookings) {
      const dates = [];
      venue.bookings.forEach((booking) => {
        const dateFrom = new Date(booking.dateFrom);
        const dateTo = new Date(booking.dateTo);
        for (let d = dateFrom; d <= dateTo; d.setDate(d.getDate() + 1)) {
          dates.push(new Date(d));
        }
      });
      setExcludedDates(dates);
    }
  }, [venue]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Something went wrong...</div>;
  }

  return (
    <div className="venuePageContainer px-2 mt-5">
      <div className="venuePageTitle--container my-5 pt-5">
        <Row className="productPageContainer">
          <div className="mb-3">
            <h1>{venue.name}</h1>
            <div className="d-flex mt-3">
              <div className="d-flex">
                <FaStar className={styles.metaIcon} />
                <h5>{venue.rating}</h5>
              </div>
              <div className="d-flex flex-1 flex-column justify-content-center mb-1 mx-3">
                <div className={styles.dot}></div>
              </div>
              <div className={styles.titleContainer_location}>
                {venue.location?.address === "Unknown" ||
                venue.location?.city === "Unknown" ||
                venue.location?.country === "Unknown"
                  ? "Please contact owner for location"
                  : `${venue.location?.address}, ${venue.location?.city}, ${venue.location?.country}`}
              </div>
            </div>
          </div>
          <Col>
            <div className={styles.venueImgContainer}>
              <Row className="d-flex flex-grow-1">
                <Col>
                  {media && media[0] && (
                    <Card.Img
                      key={`${media[0]}-0`}
                      variant="top"
                      src={media[0]}
                      alt={venue.title}
                      className={`rounded px-1 ${styles.venueImgFirst}`}
                    />
                  )}
                </Col>
              </Row>
              <Row className={styles.venueImgOtherSections}>
                <Col>
                  {media && media[1] && (
                    <Card.Img
                      key={`${media[1]}-1`}
                      variant="top"
                      src={media[1]}
                      alt={venue.title}
                      className="pb-1 px-1 rounded"
                    />
                  )}
                </Col>
                <Col>
                  {media && media[2] && (
                    <Card.Img
                      key={`${media[2]}-2`}
                      variant="top"
                      src={media[2]}
                      alt={venue.title}
                      className="pt-1 px-1 rounded"
                    />
                  )}
                </Col>
              </Row>
              <Row className={styles.venueImgOtherSections}>
                <Col>
                  {media && media[3] && (
                    <Card.Img
                      key={`${media[3]}-3`}
                      variant="top"
                      src={media[3]}
                      alt={venue.title}
                      className="pb-1 px-1 rounded"
                    />
                  )}
                </Col>
                <Col>
                  {media && media[4] && (
                    <Card.Img
                      key={`${media[4]}-4`}
                      variant="top"
                      src={media[4]}
                      alt={venue.title}
                      className="pt-1 px-1 rounded"
                    />
                  )}
                </Col>
              </Row>
              <Button variant="dark" onClick={handleShow} className={styles.viewAllButton}>
                View All Images
              </Button>
            </div>
            <Card.Body className="mt-5">
              <div className={styles.ownerContainer}>
                <div className="d-flex">
                  <h5>
                    Entire venue hosted by <MdVerifiedUser className={styles.verifiedIcon} />
                    {venue.owner?.name}
                  </h5>
                  <div>
                    <img
                      src={venue.owner?.avatar}
                      alt={venue.owner?.name}
                      className={styles.ownerAvatar}
                    />
                  </div>
                </div>
                <Card.Text>Max guests: {venue.maxGuests}</Card.Text>
              </div>
              <Row className="mt-4 d-flex">
                <Col>
                  <Card className={styles.descriptionBody}>
                    <Card.Body>
                      <Col>
                        <div className="d-flex flex-column mb-4">
                          <h6>Description:</h6>
                          <Card.Text>{venue.description} </Card.Text>
                        </div>
                        <div>
                          <h6>Price:</h6>
                          <Card.Text> ${venue.price}/day</Card.Text>
                        </div>
                      </Col>
                    </Card.Body>
                  </Card>
                </Col>
                <Col className="d-flex justify-content-center">
                  <Card className={styles.datesAndGuestsContainer}>
                    <Card.Body>
                      <h5>Add dates for prices</h5>
                      <form onSubmit={handleSubmit(onSubmit)}>
                        <div className={styles.datePickerContainer}>
                          <DatePicker
                            {...register("startDate", { required: true })} // Registering startDate
                            selected={startDate}
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
                            className={`rounded ${styles.datePicker}`}
                            required
                            showTimeSelect
                          />
                          <DatePicker
                            {...register("endDate", { required: true })} // Registering endDate
                            selected={endDate}
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
                            className={`rounded ${styles.datePicker}`}
                            required
                            showTimeSelect
                          />
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
                        <div className="d-flex flex-grow-1">
                          {user && !isOwner ? (
                            <div className="mt-2 py-2 d-flex flex-grow-1 justify-content-center">
                              <StyledButton
                                type="submit"
                                className="mt-2 py-2 d-flex flex-grow-1 justify-content-center"
                              >
                                <strong>Reserve</strong>
                              </StyledButton>
                            </div>
                          ) : (
                            <Link
                              to="/login"
                              className="mt-2 py-2 d-flex flex-grow-1 justify-content-center"
                              style={{ textDecoration: "none" }}
                            >
                              <StyledButton
                                disabled={isOwner}
                                className="mt-2 py-2 d-flex flex-grow-1 justify-content-center"
                              >
                                <strong>{isOwner ? "Owner" : "Log in"}</strong>
                              </StyledButton>
                            </Link>
                          )}
                        </div>
                      </form>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Card className="amenitiesContainer mt-4">
                    <Card.Body>
                      <h5>What this place offers</h5>
                      <div className="offersContainer">
                        <ul style={{ padding: "0" }}>
                          <li className="d-flex mt-2">
                            <FaWifi className={styles.metaIcon} />
                            <div>
                              <strong>Wifi: </strong> {venue.meta?.wifi ? "Yes" : "No"}
                            </div>
                          </li>
                          <li className="d-flex mt-2">
                            <FaParking className={styles.metaIcon} />
                            <div>
                              <strong>Parking: </strong>
                              {venue.meta?.parking ? "Yes" : "No"}
                            </div>
                          </li>
                          <li className="d-flex mt-2">
                            <MdFreeBreakfast className={styles.metaIcon} />
                            <div>
                              {" "}
                              <strong>Breakfast: </strong>
                              {venue.meta?.breakfast ? "Yes" : "No"}
                            </div>
                          </li>
                          <li className="d-flex mt-2">
                            <MdPets className={styles.metaIcon} />
                            <div>
                              <strong>Pets: </strong> {venue.meta?.pets ? "Allowed" : "Not allowed"}
                            </div>
                          </li>
                        </ul>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
              <div className="locationContainer mt-4">
                <h5>Where you'll be</h5>
                <div>
                  <div className={styles.addressContainer}>
                    {venue.location?.address === "Unknown" ||
                    venue.location?.city === "Unknown" ||
                    venue.location?.country === "Unknown"
                      ? "Please contact owner for location"
                      : `${venue.location?.address}, ${venue.location?.city}, ${venue.location?.country}`}
                  </div>
                </div>
              </div>
            </Card.Body>
          </Col>
        </Row>
      </div>
      <Modal show={showModal} onHide={handleClose} size="lg" fullscreen>
        <Modal.Header closeButton>
          <Modal.Title>All Photos</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              {media?.map((media, index) => (
                <Col xs={12} sm={12} md={6} lg={6} xl={4} key={`${media}-${index}`}>
                  <Card.Img
                    src={media}
                    alt={`Image ${index}`}
                    style={{ width: "100%", height: "auto", marginBottom: "1.5rem" }}
                  />
                </Col>
              ))}
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showSuccessModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Reservation Successful</Modal.Title>
        </Modal.Header>
        <Modal.Body>Thank you for your reservation!</Modal.Body>
      </Modal>
    </div>
  );
}

export default VenuePage;
