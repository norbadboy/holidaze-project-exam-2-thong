import { createContext, useContext, useState, useEffect } from "react";
import { useUser } from "./userContext";
import { getVenues } from "../api/venues/get.mjs";
import { updateVenue } from "../../src/api/venues/update.mjs";
import { createVenue } from "../../src/api/venues/create.mjs";
import { deleteVenue } from "../../src/api/venues/delete.mjs";

// Create the venues context
const VenuesContext = createContext();

// Create a custom hook to access the venues context
export function useVenues() {
  return useContext(VenuesContext);
}

// Create the VenuesProvider component
export function VenuesProvider({ children }) {
  const [venues, setVenues] = useState([]);
  const { user } = useUser(); // Get the user from the user context

  // Fetch venues data when the component mounts
  useEffect(() => {
    fetchVenues();
  }, []);

  // Function to fetch venues data
  async function fetchVenues() {
    try {
      const response = await getVenues();
      setVenues(response);
    } catch (error) {
      console.error("Error fetching venues:", error);
    }
  }

  // Function to create a venue (accessible only to venue managers)
  async function addVenue(venueData) {
    if (user && user.venueManager) {
      try {
        const response = await createVenue(venueData);
        setVenues((prevVenues) => [...prevVenues, response]);
        // Optionally, you can fetch the venues again to ensure the latest data is displayed
        fetchVenues();
      } catch (error) {
        console.error("Error creating venue:", error);
      }
    } else {
      console.error("User is not authorized to create a venue");
    }
  }

  // Function to update a venue (accessible only to venue managers)
  async function updateVenueById(venueId, venueData) {
    if (user && user.venueManager) {
      try {
        const updatedVenue = await updateVenue(venueId, venueData);
        setVenues((prevVenues) =>
          prevVenues.map((venue) => (venue.id === venueId ? updatedVenue : venue))
        );
      } catch (error) {
        console.error("Error updating venue:", error);
      }
    } else {
      console.error("User is not authorized to update a venue");
    }
  }

  // Function to delete a venue (accessible only to venue managers)
  async function deleteVenueById(venueId) {
    if (user && user.venueManager) {
      try {
        await deleteVenue(venueId);
        setVenues((prevVenues) => {
          const updatedVenues = prevVenues.filter((venue) => venue.id !== venueId);
          return updatedVenues;
        });
        window.location.reload();
      } catch (error) {
        console.error("Error deleting venue:", error); // Check the error if there's one
      }
    } else {
      console.error("User is not authorized to delete a venue");
    }
  }

  // Value object to be provided by the context
  const value = {
    venues,
    addVenue,
    updateVenueById,
    deleteVenueById,
  };

  // Render the context provider with the provided children
  return <VenuesContext.Provider value={value}>{children}</VenuesContext.Provider>;
}
