import { API_PATH } from "../constant.mjs";
import { headers } from "../headers.mjs";
import { load } from "../storage/load.mjs";

const action = "/profile";
const method = "GET";

// get profile from server
export async function getProfile() {
  const profile = load("user");
  const profileName = profile.name;
  const profileURL = `${API_PATH}${action}/${profileName}?_bookings=true`;
  const response = await fetch(profileURL, {
    headers: headers("application/json"),
    method,
  });

  if (response.ok) {
    const profile = await response.json();
    return profile;
  }
  console.log("getProfile");

  throw new Error("Could not get profile");
}
