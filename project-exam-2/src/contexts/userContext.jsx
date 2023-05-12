import { createContext, useState, useContext } from "react";
import { load } from "../api/storage/load.mjs";
import { save } from "../api/storage/save.mjs";

const UserContext = createContext();

export const useUserContext = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(load("user"));

  const updateUser = (newUser) => {
    setUser(newUser);
    save("user", newUser); // Assuming you have a save function to store data in local storage
  };

  return <UserContext.Provider value={{ user, updateUser }}>{children}</UserContext.Provider>;
};
