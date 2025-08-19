import { useSelector, useDispatch } from "react-redux";
import { setInput, addTask } from "../features/taskSlice";

function TaskInput() {
  const inputValue = useSelector((state) => state.tasks.inputValue);
  const dispatch = useDispatch();

  return (
    <div>
      <input
        value={inputValue}
        onChange={(e) => dispatch(setInput(e.target.value))}
      />
      <button
        onClick={() => {
          if (inputValue.trim() === "") return;
          dispatch(addTask(inputValue.trim()));
        }}
      >
        Add
      </button>
    </div>
  );
}

export default TaskInput;
