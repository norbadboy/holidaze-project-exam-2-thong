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
        }, 1500);
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

  // guests dropdown
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
    <div className={styles.venuePage_Container}>
      <Row className="productPageContainer">
        <div className="mb-3">
          <h1 className={styles.venuePage_Title}>{venue.name}</h1>
          <div className="d-flex mt-2">
            <div className="d-flex">
              <FaStar className={styles.rating_Icon} />
              <h5>{venue.rating}</h5>
            </div>
            <div className="d-flex flex-1 flex-column justify-content-center mb-1 mx-3">
              <div className={styles.dot}> </div>
            </div>
            <div className={styles.titleLocation_Container}>
              {venue.location?.address === "Unknown" ||
              venue.location?.city === "Unknown" ||
              venue.location?.country === "Unknown" ? (
                <div className={styles.contactManagerMessage}>Contact manager for location</div>
              ) : (
                <div className={styles.titleContainer_Text}>
                  {venue.location?.address}, {venue.location?.city}, {venue.location?.country}
                </div>
              )}
            </div>
          </div>
        </div>
        <Col>
          <div className={styles.venueImgContainer}>
            <Row className="d-flex flex-grow-1 g-1">
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
          <Card.Body className="mt-4">
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
            <Row className={styles.descriptionAndBook_Container}>
              <Col>
                <hr />
                <Card className={styles.description_Container}>
                  <Card.Body className={styles.description_Body}>
                    <Col>
                      <div className="d-flex flex-column mb-4">
                        <h6>Description:</h6>
                        <Card.Text>{venue.description} </Card.Text>
                      </div>
                    </Col>
                  </Card.Body>
                </Card>
              </Col>
              <Col className="d-flex justify-content-center">
                <Card className={styles.datesAndGuestsContainer}>
                  <Card.Body>
                    <div className="mb-3">
                      <h4 className="d-flex">
                        ${venue.price}{" "}
                        <div
                          className="ms-1 d-flex justify-content-center align-items-center"
                          style={{ fontSize: "22px", fontWeight: "400" }}
                        >
                          day
                        </div>
                      </h4>
                    </div>
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
            <Row className="mt-4 d-flex flex-column">
              <hr className={styles.breakLine} />
              <Col className="d-flex">
                <div className={styles.locationSection_Container}>
                  <h5>Where you'll be</h5>
                  <div>
                    <div className={styles.locationAddress_Container}>
                      {venue.location?.address === "Unknown" ||
                      venue.location?.city === "Unknown" ||
                      venue.location?.country === "Unknown" ? (
                        <div className={styles.contactManagerMessage}>
                          Contact manager for location
                        </div>
                      ) : (
                        <div className={styles.locationAddress_Text}>
                          {venue.location?.address}, {venue.location?.city},{" "}
                          {venue.location?.country}
                        </div>
                      )}
                    </div>
                    <div className={styles.locationAddress_MapContainer}>
                      <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d20049021.957695697!2d-0.763671874999963!3d52.163595497788464!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46ed8886cfadda85%3A0x72ef99e6b3fcf079!2sEuropa!5e0!3m2!1sno!2sno!4v1685256908597!5m2!1sno!2sno"
                        allowFullScreen=""
                        loading="lazy"
                        title="Google Map"
                        className={styles.googleMap}
                      ></iframe>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
            <Row className="mt-5 d-flex flex-column">
              <hr className={styles.breakLine} />
              <Col className="d-flex">
                <div className={styles.amenities_Container}>
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
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Col>
      </Row>
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
