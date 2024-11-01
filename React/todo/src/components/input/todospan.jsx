import './input.css'
import criss from './../../images/close.png'
import check from './../../images/check-mark.png'
import { useState } from 'react'

const TodoSpan = ({todo, setTodos, todos}) => {

    const [styles, setStyles] = useState({})

    const handleClickCheck = () => {
        setStyles({
            backgroundColor: 'lightgray',
            textDecoration: 'line-through',
        })
    }

    const handleClickCriss = () => {
        setTodos(prevTodos => prevTodos.filter((item) => item.id !== todo.id))
    }

    return (
        <div className="input-line">
            <span className='todospan' style={styles}>{todo.text} {todo.id}</span>
            <div className="img-box">
                <img src={check} alt="" className="criss" onClick={handleClickCheck}/>
                <img src={criss} alt="" className="check" onClick={handleClickCriss}/>
            </div>
        </div>
    );
}
 
export default TodoSpan;