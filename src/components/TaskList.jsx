import { useSelector, useDispatch } from "react-redux";
import TaskItem from "./TaskItem";
import { setFilter, deleteTask, editTask, updateTask, changeStatus } from "../features/taskSlice";
import { useMemo, useEffect } from "react";

function TaskList() {
  const { tasks, filter } = useSelector((state) => state.tasks);
  const dispatch = useDispatch();

  // Save to localStorage when tasks change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Memoized filter + sort
  const filteredTasks = useMemo(() => {
    let tasksCopy = [...tasks];
    if (filter !== "all") {
      tasksCopy = tasksCopy.filter((task) => task.status === filter);
    }
    return tasksCopy.sort((a, b) => new Date(b.startedAt) - new Date(a.startedAt));
  }, [tasks, filter]);

  return (
    <div>
      {/* Filter buttons */}
      <div>
        <button onClick={() => dispatch(setFilter("all"))}>All</button>
        <button onClick={() => dispatch(setFilter("pending"))}>Pending</button>
        <button onClick={() => dispatch(setFilter("completed"))}>Completed</button>
      </div>

      {/* Task list */}
      <ul>
        {filteredTasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            deleteTask={(id) => dispatch(deleteTask(id))}
            editTask={(id) => dispatch(editTask(id))}
            updateTask={(id, title) => dispatch(updateTask({ id, title }))}
            changeStatus={(id, status) => dispatch(changeStatus({ id, status }))}
          />
        ))}
      </ul>
    </div>
  );
}

export default TaskList;
