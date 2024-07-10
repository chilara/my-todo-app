import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Todo {
  id: number;
  text: string;
  status: boolean;
}

// Define a type for the slice state
interface TodoState {
  todos: Array<Todo>;
}

// Define the initial state using that type
const initialState: TodoState = {
  todos: [],
};

const todoSlice = createSlice({
  name: "todos",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      const newTodo = {
        id: Date.now(),
        text: action.payload,
        status: false,
      };
      state.todos.push(newTodo);
    },
    editTodo: (state, action: PayloadAction<{ id: number; text: string }>) => {
      const { id, text } = action.payload;
      const todo = state.todos.find((todo) => todo.id === id);
      if (todo) {
        todo.text = text;
      }
    },
    statusTodo: (state, action: PayloadAction<number>) => {
      const todo = state.todos.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.status = !todo.status;
      }
    },
    deleteTodo: (state, action: PayloadAction<number>) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
  },
});

export const { addTodo, editTodo, deleteTodo, statusTodo } = todoSlice.actions;

export default todoSlice.reducer;
