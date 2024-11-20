import React from "react";
import "../styles/TaskCard.css"; // Ensure you have styles for this component.

const TaskCard = ({ task }) => {
  return (
    <div className="task-card">
      <div className="task-header">
        <span className="task-id">{task.id}</span>
        <span className="task-icon">{/* Add priority/status icon here */}</span>
      </div>
      <div className="task-title">{task.title}</div>
      <div className="task-details">
        <span className="task-type">{task.type}</span>
      </div>
      <div className="task-footer">
        <img
          className="assignee-avatar"
          src={task.assigneeAvatar}
          alt={task.assigneeName}
        />
        <span className="assignee-name">{task.assigneeName}</span>
      </div>
    </div>
  );
};

export default TaskCard;
