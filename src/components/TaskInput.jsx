import { useTaskContext } from "../context/TaskContext";

function TaskInput() {
  const { state, dispatch } = useTaskContext();

  return (
    <div>
      <input
        value={state.inputValue}
        onChange={(e) =>
          dispatch({ type: "SET_INPUT", payload: e.target.value })
        }
      />
      <button
        onClick={() => {
          if (state.inputValue.trim() === "") return;
          dispatch({ type: "ADD_TASK", payload: state.inputValue.trim() });
        }}
      >
        Add
      </button>
    </div>
  );
}

export default TaskInput;
