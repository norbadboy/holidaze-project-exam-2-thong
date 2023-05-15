import { API_PATH } from "../../api/constant.mjs";
import { useParams } from "react-router-dom";
import useAPI from "../../api/apiHook";
import { Row, Col, Card } from "react-bootstrap";
import { FaWifi, FaParking } from "react-icons/fa";
import { MdPets, MdFreeBreakfast } from "react-icons/md";
import styles from "../../styles/venue.module.css";
import { StyledButton } from "../../styles/styledComponents/styledButton.jsx";

const url = API_PATH + "/venues";

function VenuePage() {
  let { id } = useParams();
  const { data: venue, loading, error } = useAPI(`${url}/${id}?_owner=true`);
  const media = venue.media;
  const created = venue.created;

  // check if a token is present in local storage
  // if so, show the booking button
  const token = localStorage.getItem("token");
  const showBookingButton = token ? true : false;

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
          <div>
            <Card.Text>{created}</Card.Text>
            <h1>{venue.name}</h1>
            <h5>rating: {venue.rating}</h5>
          </div>
          <Col>
            <div className="venueImgContainer" style={{ width: "500px" }}>
              <div className="d-flex">
                {media?.map((image) => (
                  <Card.Img key={image} variant="top" src={image} alt={venue.title} />
                ))}
              </div>
            </div>
            <Card.Body className="mt-5">
              <div className="quickInfoContainer">
                <h5>Entire home hosted by {venue.owner?.name}</h5>
                <Card.Text>Max guests: {venue.maxGuests}</Card.Text>
              </div>
              <div className="mt-5">
                <Card.Text>Price: {venue.price}</Card.Text>
                <Card.Text>Description: {venue.description}</Card.Text>
                {showBookingButton && <StyledButton className="mt-5">Book</StyledButton>}
              </div>
              <div className="amenitiesContainer mt-4">
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
              <div className="locationContainer mt-4">
                <h5>Where you'll be</h5>
                <div>
                  <div>
                    {venue.location?.address}, {venue.location?.city}, {venue.location?.country}
                  </div>
                </div>
              </div>
            </Card.Body>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default VenuePage;
