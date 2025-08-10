import { useTaskContext } from "../context/TaskContext";
import TaskItem from "./TaskItem";
import { useMemo } from "react";

function TaskList() {
  const { state, dispatch, deleteTask, editTask, updateTask, changeStatus } = useTaskContext();

  // Memoized filtered + sorted tasks
  const filteredTasks = useMemo(() => {
    let tasksCopy = [...state.tasks];

    // Filter by status
    if (state.filter !== "all") {
      tasksCopy = tasksCopy.filter(task => task.status === state.filter);
    }

    // Sort newest first
    return tasksCopy.sort((a, b) => new Date(b.startedAt) - new Date(a.startedAt));
  }, [state.tasks, state.filter]);

  return (
    <div>
      {/* Filter buttons */}
      <div>
        <button onClick={() => dispatch({ type: "SET_FILTER", payload: "all" })}>
          All
        </button>
        <button onClick={() => dispatch({ type: "SET_FILTER", payload: "pending" })}>
          Pending
        </button>
        <button onClick={() => dispatch({ type: "SET_FILTER", payload: "completed" })}>
          Completed
        </button>
      </div>

      {/* Task list */}
      <ul>
        {filteredTasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            deleteTask={deleteTask}
            editTask={editTask}
            updateTask={updateTask}
            changeStatus={changeStatus}
          />
        ))}
      </ul>
    </div>
  );
}

export default TaskList;
