   // src/features/todosSlice.ts
   import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
   import axios from 'axios';

   interface Todo {
       _id: number;
       text: string;
       done: boolean;
       __v: number;
   }

   interface TodosState {
       todos: Todo[];
       status: 'idle' | 'loading' | 'succeeded' | 'failed';
       error: string | null;
   }

   const initialState: TodosState = {
       todos: [],
       status: 'idle',
       error: null,
   };

   export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
       const response = await axios.get<Todo[]>('http://localhost:5000/todos');
       return response.data;
   });

   const todosSlice = createSlice({
       name: 'todos',
       initialState,
       reducers: { 
        addTodo(state, action: PayloadAction<Todo>) { 
        const newTodo = { 
            _id: action.payload._id, 
            text: action.payload.text, 
            done: action.payload.done,
            __v: action.payload.__v, 
        } 
        state.todos.push(newTodo) 
    }, 
    toogleTodo(state, action: PayloadAction<number>) { 
        const todo = state.todos.find(todo => todo._id === action.payload) 
        if (todo) todo.done = !todo.done 
    }, 
    removeTodo(state, action: PayloadAction<number>) { 
        state.todos = state.todos.filter(todo => todo._id !== action.payload) 
    } 
    },
       extraReducers: (builder) => {
           builder
               .addCase(fetchTodos.pending, (state) => {
                   state.status = 'loading';
               })
               .addCase(fetchTodos.fulfilled, (state, action) => {
                   state.status = 'succeeded';
                   state.todos = action.payload;
               })
               .addCase(fetchTodos.rejected, (state, action) => {
                   state.status = 'failed';
                   state.error = action.error.message || 'Unknown error';
               });
       },
   });

   export default todosSlice.reducer;
   export const { addTodo, toogleTodo, removeTodo } = todosSlice.actions
   