
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTodos } from './redux/todosSlice.ts';
import { AppDispatch, RootState } from './redux/store.ts';
import TodoAddLine from './components/todoAddLine.tsx';
import TodoLine from './components/todoLine.tsx';


   const App: React.FC = () => {
       const dispatch: AppDispatch = useDispatch();
       const todos = useSelector((state: RootState) => state.todos.todos);
       console.log(todos)
       const status = useSelector((state: RootState) => state.todos.status);
       const error = useSelector((state: RootState) => state.todos.error);

       useEffect(() => {
           if (status === 'idle') {
               dispatch(fetchTodos());
           }
       }, [status, dispatch]);

       return (
           <div className='App'>
               <h1>Todo List</h1>
               {status === 'loading' && <p>Loading...</p>}
               {status === 'failed' && <p>Error: {error}</p>}
               <TodoAddLine/>
               <ul>
                   {todos.map((todo) => (
                       <TodoLine todo={todo} key={todo._id}/>
                   ))}
               </ul>
           </div>
       );
   };

   export default App;
   