import { API_PATH } from "../../api/constant.mjs";
import { useParams } from "react-router-dom";
import useAPI from "../../api/apiHook";
import { Row, Col, Card, Button } from "react-bootstrap";

const url = API_PATH + "/venues";

function VenuePage() {
  let { id } = useParams();
  const { data: venue, loading, error } = useAPI(url + "/" + id);
  console.log(venue);

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
            <Card.Text>{venue.created}</Card.Text>

            <h1>{venue.name}</h1>
          </div>
          <Col>
            <Card className="productPageCard">
              <Card.Img
                variant="top"
                src={[venue.media]}
                alt={venue.title}
                style={{ width: "500px" }}
              />
            </Card>
            <Card.Body className="mt-5">
              <Card.Text>Price: {venue.price}</Card.Text>
              <Card.Text>Max guests: {venue.maxGuests}</Card.Text>
              <Card.Text>{venue.description}</Card.Text>
              <div>
                <h5>What this place offers</h5>
              </div>
              <div>
                <ul>
                  <li>Wifi: {venue.meta.wifi ? "Yes" : "No"}</li>
                  <li>Parking: {venue.meta.parking ? "Yes" : "No"}</li>
                  <li>Breakfast: {venue.meta.breakfast ? "Yes" : "No"}</li>
                  <li>Pets: {venue.meta.pets ? "Allowed" : "Not allowed"}</li>
                </ul>
              </div>
            </Card.Body>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default VenuePage;
