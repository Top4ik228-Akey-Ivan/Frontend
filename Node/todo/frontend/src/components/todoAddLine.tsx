import React, { useState } from "react"; 
import { useDispatch } from "react-redux"; 
import { addTodo } from '../redux/todosSlice.ts'; 
import axios from 'axios'; 

const TodoAddLine: React.FC = () => { 
    const [inputValue, setInputValue] = useState<string>(''); 
    const dispatch = useDispatch(); 

    const handleAddTodo = async () => { 
        if (!inputValue.trim()) {
            console.log('Караул')
            return;
        }

        try {
            // Отправка POST-запроса на бэкенд
            const response = await axios.post('http://localhost:5000/todos', {
                text: inputValue,
            });

            // Добавляем новое todo в Redux store
            dispatch(addTodo(response.data)); // Предполагается, что сервер возвращает добавленный todo

            // Очищаем поле ввода
            setInputValue('');
        } catch (error) {
            console.error("Ошибка при добавлении todo:", error);
            alert("Не удалось добавить todo. Попробуйте еще раз.");
        }
    }; 

    return( 
        <div className="todoAddLine"> 
            <input 
                value={inputValue} 
                onChange={(e) => setInputValue(e.target.value)} 
                type="text" 
                placeholder="Введите вашу todo" 
            /> 
            <button onClick={handleAddTodo}>+</button> 
        </div> 
    ); 
}; 

export default TodoAddLine;
