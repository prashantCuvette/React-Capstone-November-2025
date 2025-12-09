import { useContext, useState } from "react";
import Header from "../components/Header";
import TaskForm from "../components/TaskForm";
import TaskItem from "../components/TaskItem";
import HomeStyle from "./Home.module.css";
import { TaskContext } from "../context/TaskContext";

const Home = () => {
  const [taskForm, setTaskForm] = useState(false);

  const context = useContext(TaskContext);

  const [search, setSearch] = useState("");

  function filterResults(searchFilter) {
    const filteredResults = context.tasks.filter((item) => {
      return (
        item.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
        item.description.toLowerCase().includes(searchFilter.toLowerCase())
      );
    });
    return filteredResults;
  }

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
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {taskForm ? <TaskForm setTaskForm={setTaskForm} typeOfTask="Add" /> : null}

          <div className={HomeStyle.taskListContainer}>
            {context.tasks.length === 0 ? (
              <div className={HomeStyle.emptyState}>
                <h2>No Task is Present. Create One</h2>
              </div>
            ) : (
              <div className={HomeStyle.taskGrid}>
                {filterResults(search).map((task, index) => {
                  return (
                    <TaskItem
                      key={task.id}
                      id={task.id}
                      name={task.name}
                      description={task.description}
                      priority={task.priority}
                      color={task.color}
                      userName={task.userName}
                      createdAt={task.createdAt}
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
