import { useContext } from "react";
import { TaskContext } from "../utils/context";

function TaskItem({ task, index }) {
  const { handleDeleteTask, handleEditTask, handleStatusChange } =
    useContext(TaskContext);

  return (
    <li>
      {task.title}
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
      <button onClick={() => handleDeleteTask(index)}>Delete task</button>
      <button onClick={() => handleEditTask(index)}>Edit</button>
      <select
        value={task.status}
        onChange={(e) => handleStatusChange(index, e.target.value)}
      >
        <option value="pending">Pending</option>
        <option value="completed">Completed</option>
      </select>
      <br />
      <br />
    </li>
  );
}

export default TaskItem;
