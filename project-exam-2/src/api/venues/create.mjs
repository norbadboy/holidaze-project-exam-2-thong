import { API_PATH } from "../constant.mjs";
import { autFetch } from "../headers.mjs";

const action = "/venues";
const method = "POST";

export async function createVenue(venueData) {
  const createVenueUrl = API_PATH + action;

  const response = await autFetch(createVenueUrl, {
    method,
    body: JSON.stringify(venueData),
  });

  return await response.json();
}
