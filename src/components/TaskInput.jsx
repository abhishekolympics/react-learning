import { useState } from "react";
function TaskInput({ update, updateValue, setUpdateValue, onAdd, onEdit }) {
  const [input, setInput] = useState("");

  return update ? (
    <>
      <input value={updateValue} onChange={(e) => setUpdateValue(e.target.value)} />
      <button onClick={onEdit}>Update task</button>
    </>
  ) : (
    <>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter task title"
      />
      <button onClick={() => {
        onAdd(input);
        setInput("");
      }}>
        Add task
      </button>
    </>
  );
}

export default TaskInput;
