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

  // Create, Login, Logout, Chnage Details

  const userLogin = async (email, password) => {
    setLoading(true);
    try {
      
      console.log(res.data);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const userCreate = async (userName, userEmail, userPassword) => {
    setLoading(true);
    try {

      const checkExistingUser = await axiosInstance.get(`/users`);
      const findUser = checkExistingUser.find((data) => data.userEMail === userEmail);
      if(findUser) {
        return {
          success: false,
          message: "User Alreday Exists",
        };
      }

      const res = await axiosInstance.post("/users", {
        userName,
        userEmail,
        userPassword,
      });
      console.log(res.data)
      setUser(res.data);

      return {
        success: true, 
        message: "Account Created Successfully"
      }

    } catch (error) {
       return {
         success: false,
         message: "Failed To Create Account",
         error: error
       };

    } finally {
      setLoading(false);
    }
  };

  const userLogout = async () => {
    try {
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const userUpdate = async () => {
    try {
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        loading,
        error,
        userLogin,
        userCreate,
        userUpdate,
        userLogout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

// Create a Custom Hook (This is Optional)
// export const useUserContext = () => {
//   return useContext(UserContext);
// };
