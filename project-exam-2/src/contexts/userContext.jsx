import { createContext, useContext, useState, useEffect } from "react";
import { load } from "../api/storage/load.mjs";

export const UserContext = createContext(null);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      const loadedUser = await load("user");
      setUser(loadedUser);
      setIsLoading(false);
    };

    loadUser();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};
