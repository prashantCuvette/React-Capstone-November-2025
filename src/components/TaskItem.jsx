import React from "react";

const TaskItem = ({taskTitle, taskDescription}) => {
  return (
    <div style={{
        border: "1px solid navy",
        margin: "0.5rem",
        borderRadius: "2px"
    }}>
      <p>{taskTitle}</p>
      <p>{taskDescription}</p>
    </div>
  );
};

export default TaskItem;
