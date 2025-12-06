import { useState } from "react";
import TaskItemStyle from "./TaskItem.module.css";

const TaskItem = ({
  taskTitle,
  taskDescription,
  createdBy,
  createdDate,
  priority,
  color,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const maxLength = 150;
  // const shouldShowReadMore = taskDescription.length > maxLength;

  const handleEdit = () => {
    console.log("Edit task:", taskTitle);
    // edit logic here
  };

  const handleDelete = () => {
    console.log("Delete task:", taskTitle);
    // delete logic here
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
    <div className={`${TaskItemStyle.card} ${getColorClass()}`}>
      <div className={TaskItemStyle.header}>
        <h3 className={TaskItemStyle.title}>{taskTitle}</h3>
        <div className={TaskItemStyle.actions}>
          <button
            onClick={handleEdit}
            className={`${TaskItemStyle.actionBtn} ${TaskItemStyle.editBtn}`}
            title="Edit"
          >
            ✏️
          </button>
          <button
            onClick={handleDelete}
            className={`${TaskItemStyle.actionBtn} ${TaskItemStyle.deleteBtn}`}
            title="Delete"
          >
            🗑️
          </button>
        </div>
      </div>

      <div className={TaskItemStyle.content}>
        <p>{taskDescription}</p>
        {/* <p
          className={`${TaskItemStyle.description} ${
            !isExpanded && shouldShowReadMore ? TaskItemStyle.collapsed : ""
          }`}
        >
          {taskDescription}
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
              className={`${TaskItemStyle.metaText} ${TaskItemStyle.createdBy}`}
            >
              {createdBy}
            </p>
          </div>
          <div className={TaskItemStyle.metaItem}>
            <span className={TaskItemStyle.metaIcon}>📅</span>
            <p className={TaskItemStyle.metaText}>{createdDate}</p>
          </div>
        </div>
      </div>

      <span className={`${TaskItemStyle.priorityBadge} ${getPriorityClass()}`}>
        {priority}
      </span>
    </div>
  );
};

export default TaskItem;
