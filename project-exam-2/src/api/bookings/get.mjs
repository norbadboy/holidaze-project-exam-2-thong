import { API_PATH } from "../constant.mjs";
import { autFetch } from "../headers.mjs";

const action = "/profiles";
const method = "GET";

export async function getAllBookingsByProfile(name, sort, sortOrder) {
  const endpoint = `${API_PATH}${action}/${name}/bookings?_venue=true&sort=${sort}&sortOrder=${sortOrder}`;

  try {
    const response = await autFetch(endpoint, { method });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return []; // Return an empty array in case of an error
  }
}
