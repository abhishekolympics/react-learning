import { useState } from "react";
import { memo } from "react";

function TaskItem({ task, deleteTask, editTask, updateTask, changeStatus }) {
  const [tempTitle, setTempTitle] = useState(task.title);

  return (
    <li>
      {task.isEditing ? (
        <input
          value={tempTitle}
          onChange={(e) => setTempTitle(e.target.value)}
          onBlur={() => updateTask(task.id, tempTitle)}
          autoFocus
        />
      ) : (
        <span>{task.title}</span>
      )}

      <button onClick={() => deleteTask(task.id)}>Delete</button>
      {!task.isEditing && (
        <button onClick={() => editTask(task.id)}>Edit</button>
      )}

      <select
        value={task.status}
        onChange={(e) => changeStatus(task.id, e.target.value)}
      >
        <option value="pending">Pending</option>
        <option value="completed">Completed</option>
      </select>

      <ul>
        <li>
          Started at:{" "}
          {new Date(task.startedAt).toLocaleString("en-IN", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: true,
            day: "2-digit",
            month: "long",
            year: "numeric",
          })}
        </li>
        {task.updatedAt && (
          <li>
            Updated at:{" "}
            {new Date(task.updatedAt).toLocaleString("en-IN", {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
              hour12: true,
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          </li>
        )}
      </ul>
    </li>
  );
}

export default memo(TaskItem);
