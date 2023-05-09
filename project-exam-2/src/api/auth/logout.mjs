import { remove } from "../storage/remove.mjs";

export async function logout() {
  remove("token");
  remove("user");
}
