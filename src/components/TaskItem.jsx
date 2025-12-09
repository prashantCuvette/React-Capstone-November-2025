import { useState } from "react";
import TaskItemStyle from "./TaskItem.module.css";
import { TaskContext } from "../context/TaskContext";
import { useContext } from "react";
import UpdateTaskForm from "./UpdateTaskForm";
import toast from "react-hot-toast";

const TaskItem = ({
  id,
  name,
  description,
  userName,
  createdAt,
  priority,
  color,
}) => {
  // const [isExpanded, setIsExpanded] = useState(true);
  // const maxLength = 150;
  // const shouldShowReadMore = description.length > maxLength;



  const [taskForm, setTaskForm] = useState(false);
  const context = useContext(TaskContext);


  const handleEdit = () => {
    setTaskForm(true);
  };

  const handleDelete = async (taskId) => {
    try {
      const res = await context.deleteTask(taskId)
      if(res.success) {
        toast.success(res.message);
      } else {
        throw new Error(res);
      }
    } catch (error) {
      toast.error(res.message);
    }
  };

  const getPriorityClass = () => {
    switch (priority.toLowerCase()) {
      case "low":
        return TaskItemStyle.priorityLow;
      case "medium":
        return TaskItemStyle.priorityMedium;
      case "high":
        return TaskItemStyle.priorityHigh;
      default:
        return TaskItemStyle.priorityMedium;
    }
  };

  const getColorClass = () => {
    switch (color.toLowerCase()) {
      case "red":
        return TaskItemStyle.colorRed;
      case "yellow":
        return TaskItemStyle.colorYellow;
      case "green":
        return TaskItemStyle.colorGreen;
      default:
        return "";
    }
  };

  return (
    <>
      {taskForm ? (
        <UpdateTaskForm
          setTaskForm={setTaskForm}
          typeOfTask="Update"
          name={name}
          description={description}
          priority={priority}
          taskId={id}
        />
      ) : null}
      <div className={`${TaskItemStyle.card} ${getColorClass()}`}>
        <div className={TaskItemStyle.header}>
          <h3 className={TaskItemStyle.title}>{name}</h3>
          <div className={TaskItemStyle.actions}>
            <button
              onClick={handleEdit}
              className={`${TaskItemStyle.actionBtn} ${TaskItemStyle.editBtn}`}
              title="Edit"
            >
              ✏️
            </button>
            <button
              onClick={() => handleDelete(id)}
              className={`${TaskItemStyle.actionBtn} ${TaskItemStyle.deleteBtn}`}
              title="Delete"
            >
              🗑️
            </button>
          </div>
        </div>

        <div className={TaskItemStyle.content}>
          <p>{description}</p>
          {/* <p
          className={`${TaskItemStyle.description} ${
            !isExpanded && shouldShowReadMore ? TaskItemStyle.collapsed : ""
          }`}
        >
          {description}
        </p> */}
          {/* {shouldShowReadMore && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className={TaskItemStyle.readMore}
          >
            {isExpanded ? "Show less" : "Read more"}
          </button>
        )} */}
        </div>

        <div className={TaskItemStyle.footer}>
          <div className={TaskItemStyle.metadata}>
            <div className={TaskItemStyle.metaItem}>
              <span className={TaskItemStyle.metaIcon}>👤</span>
              <p
                className={`${TaskItemStyle.metaText} ${TaskItemStyle.userName}`}
              >
                {userName}
              </p>
            </div>
            <div className={TaskItemStyle.metaItem}>
              <span className={TaskItemStyle.metaIcon}>📅</span>
              <p className={TaskItemStyle.metaText}>{createdAt}</p>
            </div>
          </div>
        </div>

        <span
          className={`${TaskItemStyle.priorityBadge} ${getPriorityClass()}`}
        >
          {priority}
        </span>
      </div>
    </>
  );
};

export default TaskItem;
