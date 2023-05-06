import { load } from "./storage/load.mjs";

// get the token from local storage
export function headers() {
  const token = load("token");
  return {
    "Content-Type": "application/json; charset=UTF-8",
    Authorization: `Bearer ${token}`,
  };
}

// fetch token from api
export async function autFetch(url, options = {}) {
  return fetch(url, {
    ...options,
    headers: headers(),
  });
}
