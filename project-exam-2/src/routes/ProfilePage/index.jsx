import { useState, useEffect } from "react";
import { getProfile } from "../../api/profile/getProfile.mjs";
import { updateAvatar } from "../../api/profile/updateAvatar.mjs";
import { StyledButton } from "../../styles/styledComponents/styledButton.jsx";
import { Row, Col, Card, Modal, Button } from "react-bootstrap";
import styles from "../../styles/header.module.css";
import { useUserContext } from "../../contexts/userContext.jsx";

function UserInfo() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newAvatar, setNewAvatar] = useState("");
  const { updateUser } = useUserContext();

  useEffect(() => {
    async function fetchProfile() {
      try {
        const profileData = await getProfile();
        setProfile(profileData);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    }

    fetchProfile();
  }, []);

  const handleAvatarChange = async () => {
    try {
      await updateAvatar(newAvatar);
      // Reload the profile after successful avatar update
      const profileData = await getProfile();
      setProfile(profileData);
      updateUser(profileData);
      setShowModal(false);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    setNewAvatar("");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <div className="mt-5">
        <h1 className="pt-5">User Inf</h1>
      </div>
      {profile && (
        <Card>
          <Card.Body className="d-flex justify-content-around">
            <Row className="d-flex flex-column">
              <Col>
                <strong>Name:</strong> {profile.name}
              </Col>
              <div className={styles.breakLine} />

              <Col>
                <strong>Email:</strong> {profile.email}
              </Col>
              <div className={styles.breakLine} />

              <Col>
                <strong>Venue Manager:</strong> {profile.venueManager ? "Yes" : "No"}
              </Col>
              <div className={styles.breakLine} />

              <Col>
                <strong>Venues:</strong> {profile._count.venues}
              </Col>
              <div className={styles.breakLine} />

              <Col>
                <strong>Bookings:</strong> {profile._count.bookings}
              </Col>
            </Row>
            <Row>
              <Col className="d-flex flex-column">
                <img src={profile.avatar} alt="Avatar" />
                <StyledButton onClick={() => setShowModal(true)}>Change Avatar</StyledButton>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      )}

      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Change Avatar</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="text"
            value={newAvatar}
            onChange={(e) => setNewAvatar(e.target.value)}
            placeholder="Enter new avatar URL"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAvatarChange}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default UserInfo;
