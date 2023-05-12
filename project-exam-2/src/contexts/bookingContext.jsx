import { createContext, useState } from "react";

export const BookingContext = createContext();

function BookingContextProvider({ children }) {
  const [booking, setBooking] = useState([]);

  function removeElementFromArray(arr, element) {
    const index = arr.indexOf(element);
    if (index !== -1) {
      return arr.slice(0, index).concat(arr.slice(index + 1));
    }
    return arr;
  }

  const addBooking = (venue) => {
    setBooking([...booking, venue]);
  };

  const removeBooking = (venueId) => {
    const newBooking = removeElementFromArray(booking, venueId);
    setBooking(newBooking);
  };

  const clearAllBookings = () => {
    setBooking([]);
  };

  return (
    <BookingContext.Provider value={{ booking, addBooking, removeBooking, clearAllBookings }}>
      {children}
    </BookingContext.Provider>
  );
}

export default BookingContextProvider;
