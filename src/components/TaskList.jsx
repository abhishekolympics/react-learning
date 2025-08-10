import { useTaskContext } from "../context/TaskContext";
import TaskItem from "./TaskItem";

function TaskList() {
  const { state, deleteTask, editTask, updateTask, changeStatus } =
    useTaskContext();

  const filteredTasks =
    state.filter === "all"
      ? state.tasks
      : state.tasks.filter((task) => task.status === state.filter);

  return (
    <ul>
      {[...filteredTasks].reverse().map((task) => (
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
  );
}

export default TaskList;
