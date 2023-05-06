// load item from local storage
export function load(key) {
  try {
    const value = localStorage.getItem(key);
    return JSON.parse(value);
  } catch (error) {
    console.log(error);
    return null;
  }
}
