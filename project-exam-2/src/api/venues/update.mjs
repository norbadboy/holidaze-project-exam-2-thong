import { API_PATH } from "../constant.mjs";
import { autFetch } from "../headers.mjs";

const action = "/venues";
const method = "PUT";

export async function updateVenue(venueId, venueData) {
  const updateVenueUrl = API_PATH + action + "/" + venueId;

  const response = await autFetch(updateVenueUrl, {
    method,
    body: JSON.stringify(venueData),
  });

  return await response.json();
}
