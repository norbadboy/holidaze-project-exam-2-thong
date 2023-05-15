import { updateAvatar } from "../../api/profile/updateAvatar.mjs";
import { GetProfile } from "../../api/profile/getProfile.jsx";
import { useUser } from "../../contexts/userContext.jsx";
import { Row, Col, Modal, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { StyledButton } from "../../styles/styledComponents/styledButton.jsx";
import styles from "../../styles/header.module.css";

function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newAvatar, setNewAvatar] = useState("");

  const { user, setUser } = useUser();

  useEffect(() => {
    async function fetchProfile() {
      try {
        const profile = await GetProfile(user.name);
        setProfile(profile);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    }

    fetchProfile();
  }, [user.name]);

  const handleAvatarChange = async () => {
    try {
      await updateAvatar(newAvatar);
      const profile = await GetProfile(user.name);
      setProfile(profile);
      setUser(profile);
      setShowModal(false);
    } catch (error) {
      console.log(error);
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
    return <div>{error.message}</div>;
  }

  return (
    <div>
      <div className="my-5">
        <h1 className="pt-5">Personal info</h1>
      </div>
      {profile && (
        <div className="infoContainer d-flex flex-column flex-md-row justify-content-between">
          <Row className="d-flex flex-column flex-grow-1 pe-5 mb-2">
            <Col>
              <div className="mb-3">
                <strong>Name:</strong> {profile.name}
              </div>
              <div className={styles.breakLine} />
            </Col>
            <Col>
              <div className="mb-3">
                <strong>Email:</strong> {profile.email}
              </div>
              <div className={styles.breakLine} />
            </Col>
            <Col>
              <div className="mb-3">
                <strong>Venue Manager:</strong> {profile.venueManager ? "Yes" : "No"}
              </div>
              <div className={styles.breakLine} />
            </Col>
            <Col>
              <div className="mb-3">
                <strong>Venues:</strong> {profile._count.venues}
              </div>
              <div className={styles.breakLine} />
            </Col>
            <Col>
              <div className="mb-3">
                <strong>Bookings:</strong> {profile._count.bookings}
              </div>
              <div className={styles.breakLine} />
            </Col>
          </Row>
          <Row className="d-flex flex-grow-1">
            <div className="pt-2">
              <Col className="d-flex flex-column align-items-center">
                <img
                  src={profile.avatar}
                  alt="Avatar"
                  className="rounded img-fluid"
                  style={{ height: "350px" }}
                />
                <StyledButton className="mt-3" onClick={() => setShowModal(true)}>
                  Change Avatar
                </StyledButton>
              </Col>
            </div>
          </Row>
        </div>
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

export default ProfilePage;
