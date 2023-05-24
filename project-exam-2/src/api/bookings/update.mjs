import { API_PATH } from "../constant.mjs";
import { autFetch } from "../headers.mjs";

const action = "/bookings";
const method = "PUT";

export async function updateBooking(bookingId, bookingData) {
  const updateBookingUrl = API_PATH + action + "/" + bookingId;

  const response = await autFetch(updateBookingUrl, {
    method,
    body: JSON.stringify(bookingData),
  });

  return await response.json();
}
