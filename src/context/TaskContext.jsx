import { createContext, useEffect, useState } from "react";
import { axiosInstance } from "../lib/axiosInstnace";

// Create a Context
export const TaskContext = createContext();

// Create a Provider
export const TaskContextProvider = ({ children }) => {
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || []
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    getTasks();
  }, [tasks]);

  const createTask = async (taskData) => {
    setLoading(true);
    try {
      const res = await axiosInstance.post("/tasks", taskData);
      setTasks((prevTasks) => [...prevTasks, res.data]);

      const storedItems = JSON.parse(localStorage.getItem("tasks"));
      const updatedData = [...storedItems, res.data];
      localStorage.setItem("tasks", JSON.stringify(updatedData));

      return {
        success: true,
        message: "Task Created Successfully",
      };
    } catch (error) {
      return {
        success: false,
        message: "Failed to Create Task",
      };
    } finally {
      setLoading(false);
    }
  };

  const getTasks = async () => {
    setLoading(true);
    try {
      const storedData = JSON.parse(localStorage.getItem("tasks"));
      if(storedData) {
        setTasks(res.data);
        return;
      }
      const res = await axiosInstance.get("/tasks");
      setTasks(res.data);

      return {
        success: true,
        message: "Task Fetched Successfully",
      };
    } catch (error) {
      return {
        success: false,
        message: "Failed to Fetch Task",
      };
    } finally {
      setLoading(false);
    }
  };

  const updateTask = async (taskData, taskId) => {
    setLoading(true);
    try {
      const res = await axiosInstance.patch(`/tasks/${taskId}`, taskData);
      console.log(res);
       const storedItems = JSON.parse(localStorage.getItem("tasks"));
       const updatedData = storedItems.map((item) => item.id === taskId ? res.data : item);
       setTasks(updatedData);
       localStorage.setItem("tasks", JSON.stringify(updatedData));

      return {
        success: true,
        message: "Task Updated Successfully",
      };
    } catch (error) {
      console.log(error);
      return {
        success: false,
        message: "Failed To Update Task",
      };
    } finally {
      setLoading(false);
    }
  };

  const deleteTask = async (taskId) => {
    setLoading(true);
    try {
      const res = await axiosInstance.delete(`/tasks/${taskId}`);
      console.log(res.data);

      const storedItems = JSON.parse(localStorage.getItem("tasks"));
      const updatedData = storedItems.filter((item) => item.id !== taskId);
      setTasks(updatedData);
      localStorage.setItem("tasks", JSON.stringify(updatedData));

      return {
        success: true,
        message: "Task Deleted Successfully",
      };
    } catch (error) {
      console.log(error);
      return {
        success: false,
        message: "Failed To Delete Task",
      };
    } finally {
      setLoading(false);
    }
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        loading,
        error,
        createTask,
        getTasks,
        updateTask,
        deleteTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
