import { API_PATH } from "../constant.mjs";
import { headers } from "../headers.mjs";

const action = "/auth/register";
const method = "POST";

export async function register({ name, email, password }) {
  const registerURL = API_PATH + action;
  const body = JSON.stringify({ name, email, password });

  const response = await fetch(registerURL, {
    headers: headers("application/json"),
    method,
    body,
  });

  if (response.ok) {
    return await response.json();
  } else {
    throw new Error("Unable to register");
  }
}
