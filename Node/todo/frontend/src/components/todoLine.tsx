import React from "react";
import { toogleTodo, removeTodo } from '../redux/todosSlice.ts'
import { useDispatch } from "react-redux";
import axios from "axios";


export interface todoProps {
    _id: number;
    text: string;
    done: boolean;
    __v: number;
}

const TodoLine: React.FC<{todo: todoProps}> = ({todo}) => {
    const dispatch = useDispatch()
    const handleUpdate = async() => {
        try {
        await axios.patch(`http://localhost:5000/todos/${todo._id}`, {done: !todo.done})
        dispatch(toogleTodo(todo._id))
        } catch (err) {
            console.log(err)
        }
    }

    const handleRemove = async() => {
        try {
            await axios.delete(`http://localhost:5000/todos/${todo._id}`)
            dispatch(removeTodo(todo._id))
        } catch (err) {}
    }

    return(
        <div className="todoLine">
            <span className="span" style={{textDecoration: todo.done ? 'line-through': 'none'}}>{todo.text}</span>
            <button onClick={() => handleUpdate()}>^</button>
            <button onClick={() => handleRemove()}>-</button>
        </div>
    )
}

export default TodoLine