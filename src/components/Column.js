import React from "react";
import TaskCard from "./TaskCard";
import "../styles/Column.css";

const Column = ({ title, tasks }) => {
  return (
    <div className="column">
      <h3>{title}</h3>
      <div className="task-list">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default Column;