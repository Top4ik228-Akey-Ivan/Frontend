import { useState } from "react";
import PlusInput from "./input/plusinput";
import TodoSpan from "./input/todospan";

const Window = () => {

    const [todos, setTodos] = useState([
        {id: 1, text: 'Погулять с собакой', done: false},
        {id: 2, text: 'Погулять с котом', done: false},
    ])

    return (
        <div className="window">
            <PlusInput todos = {todos} setTodos = {setTodos}/>
            {todos.filter((todo) => todo.done !== true).map((todo) => {
                return(
                    <TodoSpan setTodos = {setTodos} todos = {todos} key={todo.id} todo = {todo}/>
                )
            })}
        </div>
    );
}
 
export default Window;