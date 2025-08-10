import { TaskProvider } from "./context/TaskContext";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";

function App() {
  return (
    <TaskProvider>
      <TaskInput />
      <TaskList />
    </TaskProvider>
  );
}

export default App;
