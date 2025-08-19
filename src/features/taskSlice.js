import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: JSON.parse(localStorage.getItem("tasks")) || [],
  inputValue: "",
  filter: "all",
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setInput: (state, action) => {
      state.inputValue = action.payload;
    },
    addTask: (state, action) => {
      state.tasks.push({
        id: Date.now(),
        title: action.payload,
        status: "pending",
        startedAt: Date.now(),
        updatedAt: null,
        isEditing: false,
      });
      state.inputValue = "";
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    editTask: (state, action) => {
      state.tasks = state.tasks.map((task) =>
        task.id === action.payload
          ? { ...task, isEditing: true }
          : { ...task, isEditing: false }
      );
    },
    updateTask: (state, action) => {
      const { id, title } = action.payload;
      state.tasks = state.tasks.map((task) =>
        task.id === id
          ? { ...task, title, updatedAt: Date.now(), isEditing: false }
          : task
      );
    },
    changeStatus: (state, action) => {
      const { id, status } = action.payload;
      state.tasks = state.tasks.map((task) =>
        task.id === id ? { ...task, status } : task
      );
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
});

export const {
  setInput,
  addTask,
  deleteTask,
  editTask,
  updateTask,
  changeStatus,
  setFilter,
} = taskSlice.actions;

export default taskSlice.reducer;
