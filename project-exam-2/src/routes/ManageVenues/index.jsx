import { useVenues } from "../../contexts/venuesContext";
import { useForm, useFieldArray } from "react-hook-form";
import { getVenuesByProfile } from "../../api/venues/getByProfile.mjs";
import { useUser } from "../../contexts/userContext";
import { useEffect, useState, useCallback } from "react";
import { Card, Row, Col, Button, Modal, Form, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { StyledButton, SecondStyledButton } from "../../styles/styledComponents/styledButton";
import { StyledInput } from "../../styles/styledComponents/styledForm";
import styles from "../../styles/manageVenues.module.css";
import { CountryDropdown } from "react-country-region-selector";

function ManageVenues() {
  const { addVenue, updateVenueById, deleteVenueById } = useVenues();
  const { user } = useUser();
  const [venues, setVenues] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectVenue, setSelectVenue] = useState(null);
  const [showMediaModal, setShowMediaModal] = useState(false);
  const [mediaUrls, setMediaUrls] = useState([]);
  const [country, setCountry] = useState("");
  const [sort, setSort] = useState("created");
  const [sortOrder, setSortOrder] = useState("desc");

  const {
    register,
    handleSubmit,
    control,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "media",
  });

  const fetchVenues = useCallback(async () => {
    const userVenues = await getVenuesByProfile(user.name, sort, sortOrder);
    setVenues(userVenues);
  }, [user.name, sort, sortOrder]);

  /**
   * @param {Object} data - Form data
   * @param {string} data.name - Venue name
   * @param {string} data.description - Venue description
   * @param {number} data.price - Venue price
   * @param {number} data.maxGuests - Venue max guests
   * @param {number} data.rating - Venue rating
   * @param {Array} data.media - Venue media
   */
  const onSubmit = async (data) => {
    // Convert price, maxGuests, and rating values to numbers
    data.price = Number(data.price);
    data.maxGuests = Number(data.maxGuests);
    data.rating = Number(data.rating);

    // If lat and lng values are not empty, parse them. Otherwise, delete them from data
    if (data.location.lat) {
      data.location.lat = parseFloat(data.location.lat);
    } else {
      delete data.location.lat;
    }

    if (data.location.lng) {
      data.location.lng = parseFloat(data.location.lng);
    } else {
      delete data.location.lng;
    }

    data.media = data.media.map((mediaItem) => mediaItem.value).filter((url) => url);
    await addVenue(data);
    fetchVenues();
  };

  useEffect(() => {
    if (country) {
      setValue("location.country", country);
    } else {
      setValue("location.country", "");
    }
  }, [country, setValue]);

  // Fetch venues by profile
  useEffect(() => {
    fetchVenues();
  }, [sort, sortOrder, fetchVenues]);

  const handleMediaModalOpen = () => setShowMediaModal(true);
  const handleMediaModalClose = () => setShowMediaModal(false);

  // Function to handle the venue edit
  const handleEditVenue = (venue) => {
    setValue("name", venue.name);
    setValue("description", venue.description);
    setValue("price", venue.price);
    setValue("maxGuests", venue.maxGuests);
    setValue("rating", venue.rating);
    setValue(
      "media",
      venue.media.map((mediaUrl) => ({ value: mediaUrl }))
    );
    setMediaUrls(venue.media);
    setValue("location.address", venue.location.address);
    setValue("location.city", venue.location.city);
    setValue("location.zip", venue.location.zip);
    setValue("location.lat", venue.location.lat);
    setValue("location.lng", venue.location.lng);
    setSelectVenue(venue);
    setShowModal(true);
  };

  // Function to handle the venue update
  const handleUpdate = async (data) => {
    data.price = Number(data.price);
    data.maxGuests = Number(data.maxGuests);
    data.rating = Number(data.rating);
    data.media = data.media.map((mediaItem) => mediaItem.value);

    if (typeof data.meta.parking === "string") {
      data.meta.parking = data.meta.parking === "true";
    }

    if (data.location.lat) {
      data.location.lat = parseFloat(data.location.lat);
    } else {
      delete data.location.lat;
    }

    if (data.location.lng) {
      data.location.lng = parseFloat(data.location.lng);
    } else {
      delete data.location.lng;
    }

    await updateVenueById(selectVenue.id, data);
    const updatedVenue = {
      ...selectVenue,
      ...data,
    };
    setVenues(venues.map((venue) => (venue.id === selectVenue.id ? updatedVenue : venue)));
    setShowModal(false);
  };

  const handleModalClose = () => setShowModal(false);

  // Function to handle saving media in the form
  const handleMediaSave = () => {
    // Use getValues to get current values of the fields
    const mediaFields = getValues("media"); // This returns an array of current field values

    // Map over the mediaFields to extract the 'value' property
    const urls = mediaFields.map((field) => field.value);
    setMediaUrls(urls);
    setShowMediaModal(false);
  };

  // Function to handle sort
  const handleSortChange = (sortValue, sortOrderValue) => {
    setSort(sortValue);
    setSortOrder(sortOrderValue);
  };

  return (
    <div className={styles.manageVenues_Container}>
      <h1 className="pt-4">Create Venue</h1>
      <div className="mb-5">
        <Card className={styles.createVenueCard_container}>
          <Card.Body>
            <form onSubmit={handleSubmit(onSubmit)} className="createForm">
              <Row>
                <Col xs={12} md={6} lg={4} className="pe-5">
                  <Card.Text className="d-flex flex-column">
                    <label>
                      <strong>Name:</strong>
                    </label>
                    <StyledInput type="text" {...register("name", { required: true })} />
                    {errors.name && <span>This field is required</span>}
                  </Card.Text>
                </Col>
                <Col xs={12} md={6} lg={4} className="pe-5">
                  <Card.Text className="d-flex flex-column">
                    <label>
                      <strong>Price:</strong>
                    </label>{" "}
                    <StyledInput
                      type="number"
                      {...register("price", { required: true, valueAsNumber: true })}
                    />
                    {errors.price && <span>This field is required</span>}
                  </Card.Text>
                </Col>
                <Col xs={12} md={6} lg={4} className="pe-5">
                  <Card.Text className="d-flex flex-column">
                    <label>
                      <strong>Max guests:</strong>
                    </label>{" "}
                    <StyledInput
                      type="number"
                      {...register("maxGuests", { required: true, valueAsNumber: true })}
                    />
                    {errors.maxGuests && <span>This field is required</span>}
                  </Card.Text>
                </Col>
                <Col xs={12} md={6} lg={4} className="pe-5">
                  <div className="d-flex flex-column">
                    <label>
                      <strong>Rating:</strong>
                    </label>{" "}
                    <StyledInput type="number" {...register("rating", { valueAsNumber: true })} />
                  </div>
                </Col>
                <Col
                  xs={12}
                  md={6}
                  lg={4}
                  className="d-flex flex-column align-items-start justify-content-start"
                >
                  <label>
                    <strong>Amenities:</strong>
                  </label>{" "}
                  <div className="d-flex justify-content-between mb-2" style={{ width: "72%" }}>
                    <div className="d-flex flex-grow-1 justify-content-start">
                      <Form.Check type="checkbox">
                        <Form.Check.Input {...register("meta.wifi")} />
                        <Form.Check.Label>Wifi</Form.Check.Label>
                      </Form.Check>
                    </div>
                    <div className="d-flex flex-grow-1 justify-content-start">
                      <Form.Check type="checkbox">
                        <Form.Check.Input {...register("meta.parking")} />
                        <Form.Check.Label>Parking</Form.Check.Label>
                      </Form.Check>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between" style={{ width: "75%" }}>
                    <div className="d-flex flex-grow-1 justify-content-start">
                      <Form.Check type="checkbox">
                        <Form.Check.Input {...register("meta.pets")} />
                        <Form.Check.Label>Pets</Form.Check.Label>
                      </Form.Check>
                    </div>
                    <div className="d-flex flex-grow-1 justify-content-start">
                      <Form.Check type="checkbox">
                        <Form.Check.Input {...register("meta.breakfast")} />
                        <Form.Check.Label>Breakfast</Form.Check.Label>
                      </Form.Check>
                    </div>
                  </div>
                </Col>
                <Col xs={12} md={6} lg={4} className="pe-5">
                  <Card.Text className="d-flex flex-column">
                    <label>
                      <strong>Description:</strong>
                    </label>{" "}
                    <textarea
                      className={styles.manageVenues_Textarea}
                      {...register("description", { required: true })}
                    ></textarea>
                    {errors.description && <span>This field is required</span>}
                  </Card.Text>
                </Col>
                <Col xs={12} md={6} lg={4} className="mb-4">
                  <div className={styles.manageVenues_InputContainer}>
                    <h4>Location</h4>
                    <div className="d-flex flex-column">
                      <label>Address:</label>
                      <StyledInput
                        className={styles.manageVenues_InputField}
                        type="text"
                        {...register("location.address")}
                      />
                      <label>City:</label>
                      <StyledInput
                        className={styles.manageVenues_InputField}
                        type="text"
                        {...register("location.city")}
                      />
                      <label>Zip:</label>
                      <StyledInput
                        className={styles.manageVenues_InputField}
                        type="text"
                        {...register("location.zip")}
                      />
                      <div className="mb-3 d-flex flex-column">
                        <label>Country:</label>
                        <CountryDropdown
                          value={country}
                          onChange={(val) => setCountry(val)}
                          style={{ width: "260px", height: "40px" }}
                        />
                      </div>
                      <label>Latitude:</label>
                      <StyledInput
                        className={styles.manageVenues_InputField}
                        type="number"
                        {...register("location.lat", { valueAsNumber: true })}
                      />
                      <label>Longitude:</label>
                      <StyledInput
                        className={styles.manageVenues_InputField}
                        type="number"
                        {...register("location.lng", { valueAsNumber: true })}
                      />
                    </div>
                  </div>
                </Col>
                <Col className={styles.createVenueMedia} xs={12} md={6} lg={4}>
                  <div className={styles.createVenueMedia_Button}>
                    <SecondStyledButton onClick={handleMediaModalOpen}>
                      Add Media
                    </SecondStyledButton>
                  </div>
                  <div className={styles.mediaUrlsContainer}>
                    {mediaUrls.map((url, index) => (
                      <ul className="list-group" key={`${url}-${index}`}>
                        <li
                          className="list-group-item-secondary py-1 px-2 mt-2"
                          style={{ fontSize: "15px", borderRadius: "7px" }}
                        >
                          {url}
                        </li>
                      </ul>
                    ))}
                  </div>
                </Col>
                <div className="mt-4 d-flex justify-content-center">
                  <StyledButton type="submit">Create</StyledButton>
                </div>
              </Row>
            </form>
          </Card.Body>
        </Card>
      </div>
      <div className="venuesCreatedByUser mt-5">
        <div className="d-flex justify-content-between">
          <h2>
            Venues created by {user.name} ({venues.length})
          </h2>
          <div>
            <Dropdown>
              <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                Sort By
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={() => handleSortChange("created", "desc")}>
                  Created (newest)
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleSortChange("created", "asc")}>
                  Created (oldest)
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleSortChange("name", "asc")}>
                  Name (A-Z)
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleSortChange("name", "desc")}>
                  Name (Z-A)
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
        <Row>
          {venues.map((venue) => (
            <Col key={venue.id} md={6} lg={4} className="mt-4">
              <Link to={`/${venue.id}`}>
                <Card.Img
                  variant="top"
                  src={venue.media[0]}
                  alt={venue.title}
                  className={styles.manageVenues_Image}
                />
              </Link>
              <Card className={styles.manageVenuesCard_Container}>
                <Card.Body className={styles.manageVenuesCard_Body}>
                  <div className={styles.manageVenuesCard_Title}>
                    <Card.Title>{venue.name}</Card.Title>
                    <div className="ml-auto d-flex align-items-start">
                      <FaStar className={styles.manageVenuesCard_StarIcon} />
                      <Card.Text className={styles.manageVenuesCard_RatingText}>
                        {venue.rating}
                      </Card.Text>
                    </div>
                  </div>
                  <Card.Subtitle className={`text-muted ${styles.manageVenuesCard_Subtitle}`}>
                    {venue.location.address}
                  </Card.Subtitle>
                  <Card.Text className={styles.manageVenuesCard_Price}>${venue.price}</Card.Text>
                  <div className="d-flex justify-content-center">
                    <SecondStyledButton onClick={() => handleEditVenue(venue)}>
                      Edit venue
                    </SecondStyledButton>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
      <Modal show={showMediaModal} onHide={handleMediaModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Media</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {fields.map((field, index) => (
            <div key={field.id}>
              <input
                type="text"
                {...register(`media[${index}].value`)}
                defaultValue={field.value}
              />
              <Button variant="danger" onClick={() => remove(index)}>
                Remove
              </Button>
            </div>
          ))}
          <Button variant="primary" onClick={() => append({ value: "" })}>
            Add More Media
          </Button>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleMediaSave}>
              Save
            </Button>
          </Modal.Footer>
        </Modal.Body>
      </Modal>
      <Modal show={showModal} onHide={handleModalClose} fullscreen>
        <Modal.Header closeButton>
          <Modal.Title>Edit Venue</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(handleUpdate)}>
            <Row>
              <Col xs={12} md={6} lg={4} className="pe-5">
                <Card.Text className="d-flex flex-column">
                  <label>
                    <strong>Name:</strong>
                  </label>
                  <StyledInput type="text" {...register("name", { required: true })} />
                  {errors.name && <span>This field is required</span>}
                </Card.Text>
              </Col>
              <Col xs={12} md={6} lg={4} className="pe-5">
                <Card.Text className="d-flex flex-column">
                  <label>
                    <strong>Price:</strong>
                  </label>{" "}
                  <StyledInput
                    type="number"
                    {...register("price", { required: true, valueAsNumber: true })}
                  />
                  {errors.price && <span>This field is required</span>}
                </Card.Text>
              </Col>
              <Col xs={12} md={6} lg={4} className="pe-5">
                <Card.Text className="d-flex flex-column">
                  <label>
                    <strong>Max guests:</strong>
                  </label>{" "}
                  <StyledInput
                    type="number"
                    {...register("maxGuests", { required: true, valueAsNumber: true })}
                  />
                  {errors.maxGuests && <span>This field is required</span>}
                </Card.Text>
              </Col>
              <Col xs={12} md={6} lg={4} className="pe-5">
                <div className="d-flex flex-column">
                  <label>
                    <strong>Rating:</strong>
                  </label>{" "}
                  <StyledInput type="number" {...register("rating", { valueAsNumber: true })} />
                </div>
              </Col>
              <Col
                xs={12}
                md={6}
                lg={4}
                className="d-flex flex-column align-items-start justify-content-start"
              >
                <label>
                  <strong>Amenities:</strong>
                </label>{" "}
                <div className="d-flex justify-content-between mb-2" style={{ width: "72%" }}>
                  <div className="d-flex flex-grow-1 justify-content-start">
                    <Form.Check type="checkbox">
                      <Form.Check.Input {...register("meta.wifi")} />
                      <Form.Check.Label>Wifi</Form.Check.Label>
                    </Form.Check>
                  </div>
                  <div className="d-flex flex-grow-1 justify-content-start">
                    <Form.Check type="checkbox">
                      <Form.Check.Input {...register("meta.parking")} />
                      <Form.Check.Label>Parking</Form.Check.Label>
                    </Form.Check>
                  </div>
                </div>
                <div className="d-flex justify-content-between" style={{ width: "75%" }}>
                  <div className="d-flex flex-grow-1 justify-content-start">
                    <Form.Check type="checkbox">
                      <Form.Check.Input {...register("meta.pets")} />
                      <Form.Check.Label>Pets</Form.Check.Label>
                    </Form.Check>
                  </div>
                  <div className="d-flex flex-grow-1 justify-content-start">
                    <Form.Check type="checkbox">
                      <Form.Check.Input {...register("meta.breakfast")} />
                      <Form.Check.Label>Breakfast</Form.Check.Label>
                    </Form.Check>
                  </div>
                </div>
              </Col>
              <Col xs={12} md={6} lg={4} className="pe-5">
                <Card.Text className="d-flex flex-column">
                  <label>
                    <strong>Description:</strong>
                  </label>{" "}
                  <textarea
                    className={styles.manageVenues_Textarea}
                    {...register("description", { required: true })}
                  ></textarea>
                  {errors.description && <span>This field is required</span>}
                </Card.Text>
              </Col>
              <Col xs={12} md={6} lg={4} className="mb-4">
                <div className={styles.manageVenues_InputContainer}>
                  <h4>Location</h4>
                  <div className="d-flex flex-column">
                    <label>Address:</label>
                    <StyledInput
                      className={styles.manageVenues_InputField}
                      type="text"
                      {...register("location.address")}
                    />
                    <label>City:</label>
                    <StyledInput
                      className={styles.manageVenues_InputField}
                      type="text"
                      {...register("location.city")}
                    />
                    <label>Zip:</label>
                    <StyledInput
                      className={styles.manageVenues_InputField}
                      type="text"
                      {...register("location.zip")}
                    />
                    <div className="mb-3 d-flex flex-column">
                      <label>Country:</label>
                      <CountryDropdown
                        value={country}
                        onChange={(val) => setCountry(val)}
                        style={{ width: "260px", height: "40px" }}
                      />
                    </div>
                    <label>Latitude:</label>
                    <StyledInput
                      className={styles.manageVenues_InputField}
                      type="number"
                      {...register("location.lat", { valueAsNumber: true })}
                    />
                    <label>Longitude:</label>
                    <StyledInput
                      className={styles.manageVenues_InputField}
                      type="number"
                      {...register("location.lng", { valueAsNumber: true })}
                    />
                  </div>
                </div>
              </Col>
              <Col className={styles.createVenueMedia} xs={12} md={6} lg={4}>
                <div className={styles.createVenueMedia_Button}>
                  <SecondStyledButton onClick={handleMediaModalOpen}>Add Media</SecondStyledButton>
                </div>
                <div className={styles.mediaUrlsContainer}>
                  {mediaUrls.map((url, index) => (
                    <ul className="list-group" key={`${url}-${index}`}>
                      <li
                        className="list-group-item-secondary py-1 px-2 mt-2"
                        style={{ fontSize: "15px", borderRadius: "7px" }}
                      >
                        {url}
                      </li>
                    </ul>
                  ))}
                </div>
              </Col>
            </Row>
          </form>
        </Modal.Body>
        <Modal.Footer className="justify-content-between">
          <Button
            variant="danger"
            onClick={() => {
              deleteVenueById(selectVenue.id);
              handleModalClose();
            }}
          >
            Delete
          </Button>
          <div>
            <Button variant="secondary" className="me-3 mb-1" onClick={handleModalClose}>
              Close
            </Button>
            <StyledButton variant="primary" onClick={handleSubmit(handleUpdate)}>
              Update
            </StyledButton>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ManageVenues;
