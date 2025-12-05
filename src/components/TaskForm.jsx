import React from 'react'

const TaskForm = ({ setTaskForm }) => {
  return (
    <div
      style={{
        border: "2px solid green",
        maxWidth: "250px",
      }}
    >
      <p>Add a Task</p>
      <form>
        <input placeholder="task name" />
        <br />
        <br />
        <input placeholder="task desc" />
        <br />
        <br />
        <button>Add Task</button>
      </form>

      <button onClick={() => setTaskForm(false)}>Close ❌</button>
    </div>
  );
};

export default TaskForm
