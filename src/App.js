import { useEffect, useState } from "react";

//next thing i have to learn is to store this data in localstorage and then show using useEffect during refresh
function App() {
  const [tasks, setTasks] = useState([]);
  const [filtersView, setFiltersView] = useState('all');
  const [input, setInput] = useState("");
  const [update, setUpdate] = useState(false);
  const [updateIndex, setUpdateIndex] = useState(-1);
  const [updateValue, setUpdateValue] = useState("");
  const [hasLoaded, setHasLoaded] = useState(false);

  const handleAddTask = () => {
    if (input.trim() === "") return alert("empty task details");
    setTasks([...tasks, {title:input, status:'pending', startedAt: Date.now()}]);
    setInput("");
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const handleEditTask = (task, index) => {
    setUpdate(true);
    setUpdateIndex(index);
    setUpdateValue(task.title);
  };
  const handleEditTask1 = (index, updatedText) => {
    const updatedTasks = [...tasks];
    updatedTasks[index] = { ...updatedTasks[index], title: updatedText, updatedAt: Date.now()};
    setTasks(updatedTasks);
    setUpdate(false);
    setUpdateIndex(-1)
    setUpdateValue("");
  };

  const handleEditFilter = (index,choice) => {
    const updatedStatus = [...tasks];
    updatedStatus[index].status= choice;
    setTasks(updatedStatus);
  } 
  
  useEffect(() => {
      const savedTasks = localStorage.getItem("tasks");
      if(savedTasks) {
        setTasks(JSON.parse(savedTasks));
      }
      setHasLoaded(true);
  },[]);
  useEffect(() => {
    if(hasLoaded)
      localStorage.setItem("tasks",JSON.stringify(tasks));
  },[tasks, hasLoaded]);



  return (
    <>
      <h2> Task Manager</h2>

      {update ? (
        <>
          <input
            value={updateValue}
            onChange={(e) => setUpdateValue(e.target.value)}
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

      <select onChange={(e) => {setFiltersView(e.target.value)}}>
        <option value={'all'}>
          Show All
        </option>
        <option value={'pending'}>
          Pending
        </option>
        <option value={'completed'}>
          Completed
        </option>
      </select>
      <ul>
        {tasks.map((task,index) => (
          (filtersView === 'all') || (task.status === filtersView) ?
          (<li key={index}>
            {tasks[index].title}
            {'\t'}
            <ul>
              <li>
                Started at: {new Date(tasks[index].startedAt).toLocaleString('en-IN', {
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: true,
                  day: '2-digit',
                  month: 'long',
                  year: 'numeric',
                })}
              </li>
              {task.updatedAt &&
              <li>
                 <> Updated at: {new Date(tasks[index].updatedAt).toLocaleString('en-IN', {
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: true,
                  day: '2-digit',
                  month: 'long',
                  year: 'numeric',
                })}</>
              </li>}
            </ul>
            <br/>
            <button onClick={() => handleDeleteTask(index)}>
              {" "}
              Delete task{" "}
            </button>
            <button
              onClick={() => {
                handleEditTask(tasks[index], index);
              }}
            >
              Edit
            </button>
            <select  value={task.status} onChange={(e) => handleEditFilter(index,e.target.value)}>
              <option value={'pending'} >
                Pending
              </option>
              <option value={'completed'} >
                Completed
              </option>
            </select>
            <br />
            <br />
          </li>)
        : <></>))}
      </ul>
    </>
  );
}

export default App;
