import { useState } from "react";

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [update, setUpdate] = useState(false);
  const [updateIndex, setUpdateIndex] = useState(-1);
  const [updateValue, setUpdateValue] = useState("");

  const handleAddTask = async () => {
    if (input.trim() === "") return alert("empty task details");
    setTasks([...tasks, input]);
    setInput("");
  };

  const handleDeleteTask = async (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const handleEditTask = (task, index) => {
    setUpdate(true);
    setUpdateIndex(index);
    setUpdateValue(task);
  };
  const handleEditTask1 = async (index, updatedText) => {
    const updatedTasks = [...tasks];
    updatedTasks[index] = updatedText;
    setTasks(updatedTasks);
    setUpdate(false);
    setUpdateIndex(-1)
    setUpdateValue("");
  };

  return (
    <>
      <h2> Task Manager</h2>

      {update ? (
        <>
          <input
            value={updateValue}
            onChange={(e) => setUpdateValue(e.target.value)}
            placeholder={tasks[updateIndex]}
          />
          <button onClick={() => handleEditTask1(updateIndex, updateValue)}>Update task</button>
        </>
      ) : (
        <>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter task title"
          />
          <button onClick={handleAddTask}>Add task</button>
        </>
      )}

      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            {tasks[index]}
            <button onClick={() => handleDeleteTask(index)}>
              {" "}
              Delete task{" "}
            </button>
            <button
              onClick={() => {
                handleEditTask(task, index);
              }}
            >
              Edit
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
