import { useEffect, useState } from "react";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import { loadTasks, saveTasks } from "./utils/localStorage";

function App() {
  const [tasks, setTasks] = useState([]);
  const [filtersView, setFiltersView] = useState("all");
  const [update, setUpdate] = useState(false);
  const [updateIndex, setUpdateIndex] = useState(-1);
  const [updateValue, setUpdateValue] = useState("");
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const saved = loadTasks();
    if (saved) setTasks(saved);
    setHasLoaded(true);
  }, []);

  useEffect(() => {
    if (hasLoaded) saveTasks(tasks);
  }, [tasks, hasLoaded]);

  const handleAddTask = (title) => {
    if (!title.trim()) return alert("Empty task details");
    setTasks([...tasks, { title, status: "pending", startedAt: Date.now() }]);
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const handleEditTask = (index) => {
    setUpdate(true);
    setUpdateIndex(index);
    setUpdateValue(tasks[index].title);
  };

  const handleEditTaskSubmit = (index, newTitle) => {
    const updated = [...tasks];
    updated[index] = {
      ...updated[index],
      title: newTitle,
      updatedAt: Date.now(),
    };
    setTasks(updated);
    setUpdate(false);
    setUpdateIndex(-1);
    setUpdateValue("");
  };

  const handleStatusChange = (index, newStatus) => {
    const updated = [...tasks];
    updated[index].status = newStatus;
    setTasks(updated);
  };

  return (
    <>
      <h2>Task Manager</h2>
      <TaskInput
        update={update}
        updateValue={updateValue}
        setUpdateValue={setUpdateValue}
        onAdd={handleAddTask}
        onEdit={() => handleEditTaskSubmit(updateIndex, updateValue)}
      />
      <select onChange={(e) => setFiltersView(e.target.value)} value={filtersView}>
        <option value="all">Show All</option>
        <option value="pending">Pending</option>
        <option value="completed">Completed</option>
      </select>
      <TaskList
        tasks={tasks}
        filter={filtersView}
        onDelete={handleDeleteTask}
        onEdit={handleEditTask}
        onStatusChange={handleStatusChange}
      />
    </>
  );
}

export default App;
