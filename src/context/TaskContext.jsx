import { createContext, useEffect, useState } from "react";
import { axiosInstance } from "../lib/axiosInstnace";

// Create a Context
export const TaskContext = createContext();

// Create a Provider
export const TaskContextProvider = ({ children }) => {
  const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem("tasks")));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (storedTasks) {
      setTasks(storedTasks);
    } else {
      getTasks();
    }
  }, []);

  const createTask = async (taskData) => {
    setLoading(true);
    try {
      const res = await axiosInstance.post("/tasks", taskData);
      setTasks((prevTasks) => [...prevTasks, res.data]);
      localStorage.setItem("tasks", JSON.stringify([...tasks, res.data]));

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

  const getTasks = async (taskData) => {
    setLoading(true);
    try {
      const res = await axiosInstance.get("/tasks");
      setTasks(res.data);
      localStorage.setItem("tasks", JSON.stringify(res.data));

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

  // ToDO
  const updateTask = async (taskData, taskId) => {
    setLoading(true);
    try {
      const res = await axiosInstance.get("/tasks");
      const item = res.data.find((task) => task.id === taskId);
      if (!item) {
        return {
          success: false,
          message: "Task Not Found",
        };
      }

      const updatedTask = { ...item, ...taskData };
      await axiosInstance.put("/tasks", { ...res.data, updatedTask });

      const updatedTasks = res.data.map((task) =>
        task.id === taskId ? updatedTask : task
      );
      setTasks(updatedTasks);
      localStorage.setItem(
        "tasks",
        JSON.stringify({ ...res.data, updatedTask })
      );

      return {
        success: true,
        message: "Task Updated Successfully",
      };
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const deleteTask = async (taskId) => {
    setLoading(true);
    try {
      const res = await axiosInstance.get("/tasks");
      const item = res.data.find((task) => task.id === taskId);
      if (!item) {
        return {
          success: false,
          message: "Task Not Found",
        };
      }

      const deleteTaskRes = await axiosInstance.delete(`/tasks/${taskId}`);
       return {
         success: true,
         message: "Task Deleted Successfully",
       };
    } catch (error) {
        return {
          success: false,
          message: "Failed to Delete Task",
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
