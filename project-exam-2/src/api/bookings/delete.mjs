import { API_PATH } from "../constant.mjs";
import { autFetch } from "../headers.mjs";

const action = "/bookings";
const method = "DELETE";

export async function deleteBooking(bookingId) {
  const deleteBookingUrl = API_PATH + action + "/" + bookingId;

  const response = await autFetch(deleteBookingUrl, {
    method,
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return bookingId;
}
