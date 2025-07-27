import { useState } from "react";

function App() {

  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');

  const handleAddTask = async() => {
    if(input.trim() === '') return alert("empty task details");
    setTasks([...tasks, input]);
    setInput('');
  }

  const handleDeleteTask = async (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  }

  // const handleEditTask = async () => {
  //   tasks[s].push(newString);
  // }

  return ( <>
     <h2> Task Manager</h2>
     <input 
      value={input}
      onChange={(e) => setInput(e.target.value)}
      placeholder="Enter task title"
      />
      <button onClick={handleAddTask}>Add task</button>

      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            {tasks[index]}
            <button onClick={() => handleDeleteTask(index)}> Delete task </button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
