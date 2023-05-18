import { API_PATH } from "../constant.mjs";
import { autFetch } from "../headers.mjs";

const action = "/profiles";
const method = "GET";

export async function getAllBookingsByProfile(name) {
  const endpoint = `${API_PATH}${action}/${name}/bookings?_customer=true&_venue=true`;

  try {
    const response = await autFetch(endpoint, { method });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}
