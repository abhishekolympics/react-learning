import { useContext } from "react";
import TaskItem from "./TaskItem";
import { TaskContext } from "../utils/context";

function TaskList() {
  const { tasks, filtersView } = useContext(TaskContext);

  return (
    <ul>
      {Array.from({ length: tasks.length }, (_, i) => {
        const reversedIndex = tasks.length - 1 - i;
        const task = tasks[reversedIndex];

        if (filtersView === "all" || task.status === filtersView) {
          return (
            <TaskItem
              key={reversedIndex}
              task={task}
              index={reversedIndex}
            />
          );
        }
        return null;
      })}
    </ul>
  );
}

export default TaskList;
