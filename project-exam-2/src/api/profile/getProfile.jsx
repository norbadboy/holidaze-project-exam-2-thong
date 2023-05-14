import { API_PATH } from "../constant.mjs";
import { headers } from "../headers.mjs";

const action = "/profiles";
const method = "GET";

export async function GetProfile(userName) {
  const profileUrl = `${API_PATH}${action}/${userName}`;
  return fetch(profileUrl, {
    method,
    headers: headers(),
  }).then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error("Unable to get profile");
  });
}
