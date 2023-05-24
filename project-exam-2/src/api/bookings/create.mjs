import { API_PATH } from "../constant.mjs";
import { autFetch } from "../headers.mjs";

const action = "/bookings";
const method = "POST";

export async function createBooking(bookingData) {
  const createBookingUrl = API_PATH + action;

  const response = await autFetch(createBookingUrl, {
    method,
    body: JSON.stringify(bookingData),
  });

  const json = await response.json();

  return {
    status: response.status,
    body: json,
  };
}
