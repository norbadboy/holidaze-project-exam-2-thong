import { useVenues } from "../../contexts/venuesContext";
import { useForm, useFieldArray } from "react-hook-form";
import { getVenuesByProfile } from "../../api/venues/getByProfile.mjs";
import { useUser } from "../../contexts/userContext";
import { useEffect, useState } from "react";
import { Card, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { StyledButton } from "../../styles/styledComponents/styledButton";

function ManageVenues() {
  const { addVenue } = useVenues();
  const { user } = useUser();
  const [venues, setVenues] = useState([]);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "media",
  });

  const onSubmit = (data) => {
    // Convert price, maxGuests, and rating values to numbers
    data.price = Number(data.price);
    data.maxGuests = Number(data.maxGuests);
    data.rating = Number(data.rating);
    addVenue(data);
    // Optionally, you can redirect the user to a different page after successful submission
  };

  useEffect(() => {
    const fetchVenues = async () => {
      const userVenues = await getVenuesByProfile(user.name);
      console.log(userVenues);
      setVenues(userVenues);
    };

    fetchVenues();
  }, [user.name]);

  return (
    <div className="mt-5">
      <h1 className="pt-4">Create Venue</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
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
                  {...register(`media.${index}`)}
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
            <input type="number" {...register("price", { required: true })} />
            {errors.price && <span>This field is required</span>}
          </Col>
          <Col>
            <label>Max Guests:</label>
            <input type="number" {...register("maxGuests", { required: true })} />
            {errors.maxGuests && <span>This field is required</span>}
          </Col>
          <Col>
            <label>Rating:</label>
            <input type="number" {...register("rating")} />
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
          <StyledButton type="submit">Create</StyledButton>
        </Col>
      </form>
      <div className="venuesCreatedByUser mt-5">
        <h3>
          Venues created by {user.name} ({venues.length})
        </h3>
        <Row>
          {venues.map((venue, index) => (
            <Col key={index} md={6} lg={4} className="mt-4">
              <Card style={{ height: "500px" }}>
                <Link to={`/${venue.id}`}>
                  <Card.Img
                    variant="top"
                    src={venue.media[0]}
                    style={{ height: "320px", objectFit: "cover" }}
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
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}

export default ManageVenues;
