import { API_PATH } from "../constant.mjs";
import { autFetch } from "../headers.mjs";

const action = "/venues";

export async function getVenues() {
  const getVenuesUrl = `${API_PATH}${action}?_owner=true`;

  const response = await autFetch(getVenuesUrl);

  return await response.json();
}
