import { API_PATH } from "../constant.mjs";
import { headers } from "../headers.mjs";
import * as storageSave from "../storage/save.mjs";

const action = "/auth/login";
const method = "POST";

export async function loginFunction({ email, password }) {
  const loginURL = API_PATH + action;
  const body = JSON.stringify({ email, password });

  const response = await fetch(loginURL, {
    headers: headers("application/json"),
    method,
    body,
  });

  if (response.ok) {
    const profile = await response.json();
    storageSave.save("token", profile.accessToken);
    delete profile.accessToken;
    storageSave.save("user", profile);
    return profile;
  } else {
    alert("wrong email or password");
  }
  loginFunction(email, password);
}
