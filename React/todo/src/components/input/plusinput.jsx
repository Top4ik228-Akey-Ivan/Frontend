import './input.css'
import plus from './../../images/plus.png'
import { useRef } from 'react'

const PlusInput = ({todos, setTodos}) => {

    let inputRef = useRef(null)

    const handleClick = () => {
        const inputText = inputRef.current.value
        setTodos([...todos, {id: todos.length + 1, text: inputText, done: false}])
    }

    return (
        <div className="input-line">
            <input ref={inputRef} type="text" placeholder="Enter your todo" />
            <img onClick={handleClick} src={plus} alt="" className="plus" />
        </div>
    );
}
 
export default PlusInput;