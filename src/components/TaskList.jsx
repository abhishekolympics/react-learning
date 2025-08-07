import TaskItem from "./TaskItem";

function TaskList({ tasks, filter, onDelete, onEdit, onStatusChange }) {
  return (
    <ul>
      {/* This below logic helps in reducing any overheads for time and space complexities.*/}
      {Array.from({ length: tasks.length }, (_, i) => {
        const reversedIndex = tasks.length - 1 - i;
        const task = tasks[reversedIndex];

        if (filter === "all" || task.status === filter) {
          return (
            <TaskItem
              key={reversedIndex}
              task={task}
              index={reversedIndex}
              onDelete={onDelete}
              onEdit={onEdit}
              onStatusChange={onStatusChange}
            />
          );
        }

        return null;
      })}
    </ul>
  );
}

export default TaskList;
