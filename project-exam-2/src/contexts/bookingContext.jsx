import { createContext, useState, useContext } from "react";
import { useUser } from "./userContext";
import { deleteBooking } from "../api/bookings/delete.mjs";
import { updateBooking } from "../api/bookings/update.mjs";
import {} from "../api/bookings/get.mjs";

// Create the bookings context
const BookingsContext = createContext();

// Create a custom hook to access the bookings context
export function useBookings() {
  return useContext(BookingsContext);
}

// Create the BookingsProvider component
export function BookingsProvider({ children }) {
  const [bookings, setBookings] = useState([]);
  const { user } = useUser(); // Get the user from the user context

  // Function to delete a booking (accessible only to logged in users)
  async function removeBookingById(bookingId) {
    if (user) {
      try {
        await deleteBooking(bookingId);
        setBookings((prevBookings) => prevBookings.filter((booking) => booking.id !== bookingId));
      } catch (error) {
        console.error("Error deleting booking:", error);
      }
    } else {
      console.error("User is not authorized to delete a booking");
    }
  }

  // Function to update a booking (accessible only to logged in users)
  async function updateBookingById(bookingId, bookingData) {
    if (user) {
      try {
        const updatedBooking = await updateBooking(bookingId, bookingData);
        setBookings((prevBookings) =>
          prevBookings.map((booking) => (booking.id === bookingId ? updatedBooking : booking))
        );
      } catch (error) {
        console.error("Error updating booking:", error);
      }
    } else {
      console.error("User is not authorized to update a booking");
    }
  }

  // Create the value prop for the provider
  const value = {
    bookings,
    removeBookingById,
    updateBookingById,
  };

  // Return the provider component with the value prop
  return <BookingsContext.Provider value={value}>{children}</BookingsContext.Provider>;
}
