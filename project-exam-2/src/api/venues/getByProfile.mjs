import { API_PATH } from "../constant.mjs";
import { autFetch } from "../headers.mjs";

const action = "/profiles";
const action2 = "/venues";
const method = "GET";

// Show venues from a profile
const getVenuesByProfile = async (name, sort, sortOrder) => {
  const endpoint = `${API_PATH}${action}/${name}${action2}/?_owner=true&_bookings=true&sort=${sort}&sortOrder=${sortOrder}`;

  try {
    const response = await autFetch(endpoint, { method });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export { getVenuesByProfile };

// Show bookings of a venue from a profile
const getBookingOfVenueByProfile = async (name, sort, sortOrder) => {
  const endpoint = `${API_PATH}${action}/${name}${action2}?_bookings=true&_owner=true&sort=${sort}&sortOrder=${sortOrder}`;

  try {
    const response = await autFetch(endpoint, { method });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export { getBookingOfVenueByProfile };
