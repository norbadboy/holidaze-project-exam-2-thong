import { API_PATH } from "../constant.mjs";
import { autFetch } from "../headers.mjs";

const action = "/profiles";
const method = "GET";

const getVenuesByProfile = async (name) => {
  const endpoint = API_PATH + action + "/" + name + "/venues";

  try {
    const response = await autFetch(endpoint, { method });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export { getVenuesByProfile };
