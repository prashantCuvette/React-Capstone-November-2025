import { useState } from "react";
import Header from "../components/Header";
import TaskForm from "../components/TaskForm";
import TaskItem from "../components/TaskItem";

const Home = () => {
  const [taskForm, setTaskForm] = useState(false);

  const task = [
    {
      taskTitle: "Title 1",
      taskDescription: "Description 1",
    },
    { taskTitle: "Title 2", taskDescription: "Description 2" },
    { taskTitle: "Title 3", taskDescription: "Description 3" },
    {
      taskTitle: "Title 1",
      taskDescription: "Description 1",
    },
    { taskTitle: "Title 2", taskDescription: "Description 2" },
    { taskTitle: "Title 3", taskDescription: "Description 3" },
  ];

  return (
    <>
      <Header />

      <div
        style={{
          width: "90%",
          height: "400px",
          border: "2px solid red",
          margin: "1rem",
        }}
      >
        <button onClick={() => setTaskForm((prev) => !prev)}>Add Task</button>
        <br />
        <br />
        <input placeholder="Search Task" />

        {taskForm ? <TaskForm setTaskForm={setTaskForm} /> : null}

        <div
          style={{
            border: "2px solid tomato",
            height: "250px",
            margin: "1rem",
          }}
        >
          {task.length === 0 ? (
            <h2>No Task is Present. Create One</h2>
          ) : (
            task.map((task, index) => {
              return (
                <TaskItem
                  key={index}
                  taskTitle={task.taskTitle}
                  taskDescription={task.taskDescription}
                />
              );
            })
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
