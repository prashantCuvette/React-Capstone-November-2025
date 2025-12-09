import { createContext, useEffect, useState } from "react";
import { axiosInstance } from "../lib/axiosInstnace";

// Create a Context
export const UserContext = createContext();

// Create a Provider
export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
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
    console.log("Effect From Context");
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    } else {
      getUser();
    }
  }, []);

  // Create, Login, Logout, Chnage Details

  const userLogin = async (userEmail, userPassword) => {
    setLoading(true);
    try {
      const checkExistingUser = await axiosInstance.get(`/users`);
      const findUser = checkExistingUser.data.find(
        (data) => data.userEmail === userEmail
      );

      if (!findUser) {
        return {
          success: false,
          message: "Email Not Exists",
        };
      }

      if (findUser.userPassword === userPassword) {
        localStorage.setItem("user", JSON.stringify(findUser));
        setUser(findUser);
        return {
          success: true,
          message: "Login Successfull",
        };
      } else {
        return {
          success: false,
          message: "Incorrect Password",
        };
      }
    } catch (error) {
      return {
        success: false,
        message: "Failed To LogIn",
        error: error,
      };
    } finally {
      setLoading(false);
    }
  };

  const userCreate = async (userName, userEmail, userPassword) => {
    setLoading(true);
    try {
      const checkExistingUser = await axiosInstance.get(`/users`);
      const findUser = checkExistingUser.data.find(
        (data) => data.userEmail === userEmail
      );
      if (findUser) {
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
      localStorage.setItem("user", JSON.stringify(res.data));
      setUser(res.data);

      return {
        success: true,
        message: "Account Created Successfully",
      };
    } catch (error) {
      return {
        success: false,
        message: "Failed To Create Account",
        error: error,
      };
    } finally {
      setLoading(false);
    }
  };

  const userLogout = () => {
   localStorage.removeItem("user");
   localStorage.removeItem("tasks");
   setUser(null);
   return {
    success: true,
    message: "User Logged Out"
   }
  };

  const userUpdate = async (userName, userEmail, userPassword) => {
   setLoading(true);
   try {
     const checkExistingUser = await axiosInstance.get(`/users`);
     const findUser = checkExistingUser.data.find(
       (data) => data.userEmail === userEmail
     );

     if (!findUser) {
       return {
         success: false,
         message: "Email Not Exists",
       };
     }

     // Update User Here

     
   } catch (error) {
     return {
       success: false,
       message: "Failed To Update User",
       error: error,
     };
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