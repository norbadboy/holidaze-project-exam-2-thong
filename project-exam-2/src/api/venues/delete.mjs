import { API_PATH } from "../constant.mjs";
import { autFetch } from "../headers.mjs";

const action = "/venues";
const method = "DELETE";

export async function deleteVenue(venueId) {
  const deleteVenueUrl = API_PATH + action + "/" + venueId;

  const response = await autFetch(deleteVenueUrl, {
    method,
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return venueId;
}
