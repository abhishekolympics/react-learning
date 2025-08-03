import { useEffect, useState } from "react";
import TaskForm from "./components/TaskForm";

//next thing i have to learn is to store this data in localstorage and then show using useEffect during refresh
function App() {
  
  const [filtersView, setFiltersView] = useState('all');
  
  
  const [hasLoaded, setHasLoaded] = useState(false);

  

  const handleDeleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const handleEditTask = (task, index) => {
    setUpdate(true);
    setUpdateIndex(index);
    setUpdateValue(task.title);
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

      <TaskForm/>
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
