import { useContext, useState } from "react";
import Header from "../components/Header";
import TaskForm from "../components/TaskForm";
import TaskItem from "../components/TaskItem";
import HomeStyle from "./Home.module.css";
import { TaskContext } from "../context/TaskContext";

const Home = () => {
  const [taskForm, setTaskForm] = useState(false);

  const context = useContext(TaskContext);
  console.log(context.tasks.length)

  

  return (
    <>
      <Header />
      <div className={HomeStyle.container}>
        <div className={HomeStyle.mainContent}>
          <div className={HomeStyle.topSection}>
            <button
              onClick={() => setTaskForm((prev) => !prev)}
              className={HomeStyle.addTaskBtn}
            >
              Add Task
            </button>
            <input
              placeholder="Search Task"
              className={HomeStyle.searchInput}
            />
          </div>

          {taskForm ? <TaskForm setTaskForm={setTaskForm} /> : null}

          <div className={HomeStyle.taskListContainer}>
            {context.tasks.length === 0 ? (
              <div className={HomeStyle.emptyState}>
                <h2>No Task is Present. Create One</h2>
              </div>
            ) : (
              <div className={HomeStyle.taskGrid}>
                {context.tasks.map((task, index) => {
                  return (
                    <TaskItem
                      key={task.id}
                      taskTitle={task.taskTitle}
                      taskDescription={task.taskDescription}
                      priority={task.priority}
                      color={task.color}
                      createdBy={task.createdBy}
                      createdDate={task.createdDate}
                    />
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
