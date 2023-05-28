import { API_PATH } from "../constant.mjs";
import { headers } from "../headers.mjs";
import { load } from "../storage/load.mjs";

const action = "/profiles";
const method = "PUT";

// update avatar on server
export async function updateAvatar(avatar) {
  const profile = load("user");
  const profileName = profile.name;
  const profileURL = `${API_PATH}${action}/${profileName}/media`;
  const response = await fetch(profileURL, {
    body: JSON.stringify({ avatar }),
    headers: headers("application/json"),
    method,
  });

  if (response.ok) {
    const profile = await response.json();
    return profile;
  }

  throw new Error(response.statusText);
}
