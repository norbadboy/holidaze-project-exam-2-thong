import { useVenues } from "../../contexts/venuesContext";
import { useForm, useFieldArray } from "react-hook-form";
import { getVenuesByProfile } from "../../api/venues/getByProfile.mjs";
import { useUser } from "../../contexts/userContext";
import { useEffect, useState, useCallback } from "react";
import { Card, Row, Col, Button, Modal, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { StyledButton } from "../../styles/styledComponents/styledButton";
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
    const userVenues = await getVenuesByProfile(user.name);
    setVenues(userVenues);
  }, [user.name]); // fetchVenues will only change when user.name changes

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

    // Assign the result of the map function back to data.media
    data.media = data.media.map((mediaItem) => mediaItem.value);

    await addVenue(data);
    fetchVenues(); // Fetch venues after adding a new venue
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
  }, [fetchVenues]);

  const handleMediaModalOpen = () => setShowMediaModal(true);
  const handleMediaModalClose = () => setShowMediaModal(false);

  // Function to handle the venue edit
  const handleEditVenue = (venue) => {
    setValue("name", venue.name);
    setValue("description", venue.description);
    setValue("price", venue.price);
    setValue("maxGuests", venue.maxGuests);
    setValue("rating", venue.rating);
    setSelectVenue(venue);
    setShowModal(true);
  };

  // Function to handle the venue update
  const handleUpdate = async (data) => {
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

  return (
    <div className="mt-5">
      <h1 className="pt-4">Create Venue</h1>
      <div className="mb-5">
        <Card className={styles.createVenueCard_container}>
          <Card.Body>
            <form onSubmit={handleSubmit(onSubmit)} className="createForm">
              <Row>
                <Col xs={12} md={6} lg={4} className="pe-5">
                  <Card.Text className="d-flex flex-column">
                    <label>Name:</label>
                    <StyledInput type="text" {...register("name", { required: true })} />
                    {errors.name && <span>This field is required</span>}
                  </Card.Text>
                </Col>
                <Col xs={12} md={6} lg={4} className="pe-5 mb-3">
                  <Card.Text className="d-flex flex-column">
                    <label>Description:</label>
                    <textarea {...register("description", { required: true })}></textarea>
                    {errors.description && <span>This field is required</span>}
                  </Card.Text>
                </Col>
                <Col xs={12} md={6} lg={4} className="pe-5">
                  <Card.Text className="d-flex flex-column">
                    <label>Price:</label>
                    <StyledInput
                      type="number"
                      {...register("price", { required: true, valueAsNumber: true })}
                    />
                    {errors.price && <span>This field is required</span>}
                  </Card.Text>
                </Col>
                <Col xs={12} md={6} lg={4} className="pe-5">
                  <Card.Text className="d-flex flex-column">
                    <label>Max Guests:</label>
                    <StyledInput
                      type="number"
                      {...register("maxGuests", { required: true, valueAsNumber: true })}
                    />
                    {errors.maxGuests && <span>This field is required</span>}
                  </Card.Text>
                </Col>
                <Col xs={12} md={6} lg={4} className="pe-5">
                  <div className="d-flex flex-column">
                    <label>Rating:</label>
                    <StyledInput type="number" {...register("rating", { valueAsNumber: true })} />
                  </div>
                </Col>
                <Col
                  xs={12}
                  md={6}
                  lg={4}
                  className="d-flex flex-column align-items-start justify-content-center"
                >
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
                <Col xs={12} md={6} lg={4} className="mt-3">
                  <div>
                    <h4>Location</h4>
                    <div className="d-flex flex-column">
                      <label>Address:</label>
                      <StyledInput type="text" {...register("location.address")} />
                      <label>City:</label>
                      <StyledInput type="text" {...register("location.city")} />
                      <label>Zip:</label>
                      <StyledInput type="text" {...register("location.zip")} />
                      <div className="mb-3">
                        <label>Country:</label>
                        <CountryDropdown
                          value={country}
                          onChange={(val) => setCountry(val)}
                          style={{ width: "260px", height: "40px" }}
                        />
                      </div>
                      <label>Latitude:</label>
                      <StyledInput
                        type="number"
                        {...register("location.lat", { valueAsNumber: true })}
                      />
                      <label>Longitude:</label>
                      <StyledInput
                        type="number"
                        {...register("location.lng", { valueAsNumber: true })}
                      />
                    </div>
                  </div>
                </Col>
                <Col className={styles.createVenueMedia} xs={12} md={6} lg={4}>
                  <div>
                    <Button variant="primary" onClick={handleMediaModalOpen}>
                      Add Media
                    </Button>
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
        <h2>
          Venues created by {user.name} ({venues.length})
        </h2>
        <Row>
          {venues.map((venue) => (
            <Col key={venue.id} md={6} lg={4} className="mt-4">
              <Card style={{ height: "470px" }}>
                <Link to={`/${venue.id}`}>
                  <Card.Img
                    variant="top"
                    src={venue.media[0]}
                    style={{ height: "290px", objectFit: "cover" }}
                  />
                </Link>
                <Card.Body>
                  <div className="d-flex justify-content-between">
                    <Card.Title style={{ fontSize: "0.95rem" }}>{venue.name}</Card.Title>
                    <div className="ml-auto d-flex align-items-start">
                      <FaStar className="starIcon" style={{ marginRight: "7px", width: "15px" }} />
                      <Card.Text>{venue.rating}</Card.Text>
                    </div>
                  </div>
                  <Card.Text>$ {venue.price}</Card.Text>
                  <div className="d-flex justify-content-between">
                    <Button variant="secondary" onClick={() => handleEditVenue(venue)}>
                      Edit
                    </Button>
                    <Button variant="danger" onClick={() => deleteVenueById(venue.id)}>
                      Delete
                    </Button>
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
                defaultValue={field.value} // Populate initial values
              />
              <Button variant="danger" onClick={() => remove(index)}>
                Remove
              </Button>
            </div>
          ))}
          <Button
            variant="primary"
            onClick={() => append({ value: "" })} // Add a new media input field
          >
            Add More Media
          </Button>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleMediaSave}>
              Save
            </Button>
          </Modal.Footer>
        </Modal.Body>
      </Modal>
      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Venue</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(handleUpdate)}>
            <Row>
              <Col>
                <label>Name:</label>
                <input type="text" {...register("name", { required: true })} />
                {errors.name && <span>This field is required</span>}
              </Col>
              <Col>
                <label>Description:</label>
                <textarea {...register("description", { required: true })}></textarea>
                {errors.description && <span>This field is required</span>}
              </Col>
              <Col>
                <label>Media:</label>
                {fields.map((field, index) => (
                  <div key={field.id}>
                    <input
                      type="text"
                      {...register(`media[${index}].value`)}
                      defaultValue={field.value} // Populate initial values
                    />
                    <button type="button" onClick={() => remove(index)}>
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => append({ value: "" })} // Add a new media input field
                >
                  Add Media
                </button>
              </Col>
              <Col>
                <label>Price:</label>
                <input
                  type="number"
                  {...register("price", { required: true, valueAsNumber: true })}
                />
                {errors.price && <span>This field is required</span>}
              </Col>
              <Col>
                <label>Max Guests:</label>
                <input
                  type="number"
                  {...register("maxGuests", { required: true, valueAsNumber: true })}
                />{" "}
                {errors.maxGuests && <span>This field is required</span>}
              </Col>
              <Col>
                <label>Rating:</label>
                <input type="number" {...register("rating", { valueAsNumber: true })} />
              </Col>
              <Col className="d-flex">
                <Col>
                  <label>
                    <input type="checkbox" {...register("meta.wifi")} />
                    Wifi
                  </label>
                </Col>
                <Col>
                  <label>
                    <input type="checkbox" {...register("meta.parking")} />
                    Parking
                  </label>
                </Col>
                <Col>
                  <label>
                    <input type="checkbox" {...register("meta.breakfast")} />
                    Breakfast
                  </label>
                </Col>
                <Col>
                  <label>
                    <input type="checkbox" {...register("meta.pets")} />
                    Pets
                  </label>
                </Col>
              </Col>
            </Row>
            <Col>
              <StyledButton type="submit">Update</StyledButton>
            </Col>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default ManageVenues;
