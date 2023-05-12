import { API_PATH } from "../constant.mjs";
import { headers } from "../headers.mjs";
import { load } from "../storage/load.mjs";

const action = "/profiles";
const method = "GET";
const profile = load("user");
const userName = profile.name;

// get profile from server
export async function getProfile() {
  const profileURL = `${API_PATH}${action}/${userName}?_bookings=true`;
  const response = await fetch(profileURL, {
    headers: headers("application/json"),
    method,
  });

  if (response.ok) {
    return await response.json();
  }

  throw new Error(response.statusText);
}

export async function getBookingsByProfile() {
  const bookingByProfile = `${API_PATH}${action}/${userName}/bookings`;
  const response = await fetch(bookingByProfile, {
    headers: headers("application/json"),
    method,
  });

  if (response.ok) {
    return await response.json();
  }

  throw new Error(response.statusText);
}
