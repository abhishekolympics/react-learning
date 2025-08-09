import { useContext } from "react";
import { TaskContext } from "../utils/context";

function TaskInput() {
  const {
    update,
    updateValue,
    setUpdateValue,
    updateIndex,
    handleAddTask,
    handleEditTaskSubmit,
  } = useContext(TaskContext);

  const handleClick = () => {
    if (update) {
      handleEditTaskSubmit(updateIndex, updateValue);
    } else {
      handleAddTask(updateValue);
    }
    setUpdateValue("");
  };

  return (
    <div>
      <input
        type="text"
        value={updateValue}
        onChange={(e) => setUpdateValue(e.target.value)}
        placeholder="Enter task"
      />
      <button onClick={handleClick}>
        {update ? "Update Task" : "Add Task"}
      </button>
    </div>
  );
}

export default TaskInput;
