import { createContext, useReducer, useContext, useEffect, useCallback } from "react";

const TaskContext = createContext();

const initialState = {
  tasks: JSON.parse(localStorage.getItem("tasks")) || [],
  inputValue: "",
  filter: "all",
};

export const taskReducer = (state, action) => {
  switch (action.type) {
    case "SET_INPUT":
      return { ...state, inputValue: action.payload };

    case "ADD_TASK":
      return {
        ...state,
        tasks: [
          ...state.tasks,
          {
            id: Date.now(),
            title: action.payload,
            status: "pending",
            startedAt: Date.now(),
            updatedAt: null,
            isEditing: false,
          },
        ],
        inputValue: "",
      };

    case "DELETE_TASK":
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };

    case "EDIT_TASK":
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload
            ? { ...task, isEditing: true }
            : { ...task, isEditing: false }
        ),
      };

    case "UPDATE_TASK":
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id
            ? {
                ...task,
                title: action.payload.title,
                updatedAt: Date.now(),
                isEditing: false,
              }
            : task
        ),
      };

    case "CHANGE_STATUS":
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id
            ? { ...task, status: action.payload.status }
            : task
        ),
      };

    case "SET_FILTER":
      return { ...state, filter: action.payload };

    default:
      return state;
  }
};

export function TaskProvider({ children }) {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  // ✅ useCallback to prevent function recreation with every re-render

  const deleteTask = useCallback(
    (id) => dispatch({ type: "DELETE_TASK", payload: id }),
    [dispatch]
  );

  const editTask = useCallback(
    (id) => dispatch({ type: "EDIT_TASK", payload: id }),
    [dispatch]
  );

  const updateTask = useCallback(
    (id, title) => dispatch({ type: "UPDATE_TASK", payload: { id, title } }),
    [dispatch]
  );

  const changeStatus = useCallback(
    (id, status) =>
      dispatch({ type: "CHANGE_STATUS", payload: { id, status } }),
    [dispatch]
  );

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(state.tasks));
  }, [state.tasks]);

  return (
    <TaskContext.Provider
      value={{
        state,
        dispatch,
        deleteTask,
        editTask,
        updateTask,
        changeStatus,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export function useTaskContext() {
  return useContext(TaskContext);
}
