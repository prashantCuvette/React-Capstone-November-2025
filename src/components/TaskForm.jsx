import React, { use, useContext, useState } from "react";
import TaskFormStyle from "./TaskForm.module.css";
import { TaskContext } from "../context/TaskContext";
import { UserContext } from "../context/UserContext";
import toast from "react-hot-toast";

const TaskForm = ({ setTaskForm }) => {
  const [selectedColor, setSelectedColor] = useState("red");

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setTaskForm(false);
    }
  };

  const taskContext = useContext(TaskContext);
  const userContext = useContext(UserContext);

  const [taskData, setTaskdata] = useState({
    name: "Task 1",
    description: "Desc 1",
    priority: "",
  });

  const handleFormSubmit = async (e) => {
    try {
      e.preventDefault();
      const newTaskData = {
        ...taskData,
        color: selectedColor,
        userId: userContext.user.id,
        userName: userContext.user.userName,
        createdAt: new Date().toISOString(),
      };

      const res = await taskContext.createTask(newTaskData);
      if (res.success) {
        toast.success(res.message);
      } else {
        throw new Error(res.message);
      }
      setSelectedColor("red");
      setTaskdata({
        name: "",
        description: "",
        priority: "",
      });
      setTaskForm(false);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className={TaskFormStyle.overlay} onClick={handleOverlayClick}>
      <div className={TaskFormStyle.formContainer}>
        <div className={TaskFormStyle.header}>
          <h2 className={TaskFormStyle.title}>Add a Task</h2>
          <button
            onClick={() => setTaskForm(false)}
            className={TaskFormStyle.closeBtn}
          >
            ❌
          </button>
        </div>

        <form className={TaskFormStyle.form} onSubmit={handleFormSubmit}>
          <div className={TaskFormStyle.inputGroup}>
            <label className={TaskFormStyle.label}>Task Name</label>
            <input
              placeholder="Enter task name"
              className={TaskFormStyle.input}
              value={taskData.name}
              onChange={(e) =>
                setTaskdata({ ...taskData, name: e.target.value })
              }
            />
          </div>

          <div className={TaskFormStyle.inputGroup}>
            <label className={TaskFormStyle.label}>Task Description</label>
            <textarea
              placeholder="Enter task description"
              className={TaskFormStyle.textarea}
              value={taskData.description}
              onChange={(e) =>
                setTaskdata({ ...taskData, description: e.target.value })
              }
            />
          </div>

          <div className={TaskFormStyle.inputGroup}>
            <label className={TaskFormStyle.label}>Priority</label>
            <select
              className={TaskFormStyle.select}
              value={taskData.priority}
              onChange={(e) =>
                setTaskdata({ ...taskData, priority: e.target.value })
              }
            >
              <option value="">Select Priority</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div className={TaskFormStyle.inputGroup}>
            <label className={TaskFormStyle.label}>Color</label>
            <div className={TaskFormStyle.colorOptions}>
              <div
                className={`${TaskFormStyle.colorOption} ${
                  TaskFormStyle.colorRed
                } ${selectedColor === "red" ? TaskFormStyle.selected : ""}`}
                onClick={() => setSelectedColor("red")}
              />
              <div
                className={`${TaskFormStyle.colorOption} ${
                  TaskFormStyle.colorYellow
                } ${selectedColor === "yellow" ? TaskFormStyle.selected : ""}`}
                onClick={() => setSelectedColor("yellow")}
              />
              <div
                className={`${TaskFormStyle.colorOption} ${
                  TaskFormStyle.colorGreen
                } ${selectedColor === "green" ? TaskFormStyle.selected : ""}`}
                onClick={() => setSelectedColor("green")}
              />

              <div
                className={`${TaskFormStyle.colorOption} ${
                  TaskFormStyle.colorPink
                } ${selectedColor === "pink" ? TaskFormStyle.selected : ""}`}
                onClick={() => setSelectedColor("pink")}
              />
            </div>
          </div>

          <button type="submit" className={TaskFormStyle.submitBtn}>
            Add Task
          </button>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
