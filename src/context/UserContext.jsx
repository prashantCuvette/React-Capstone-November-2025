import { createContext, useContext, useEffect, useState } from "react";
import { axiosInstance } from "../lib/axiosInstnace";

// Create a Context
export const UserContext = createContext();


// Create a Provider
export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
 

  const getUser = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get("/users");
      console.log(res);
      setUser(res.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    } else {
        getUser();
    }
  }, []);

  return <>{children}</>;
};

// Create a Custom Hook (This is Optional)
export const useUserContext = () => {
  return useContext(UserContext);
};
