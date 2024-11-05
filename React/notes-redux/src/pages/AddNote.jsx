import { useState } from "react";

import styles from './Note.module.css'
import { useDispatch, useSelector } from "react-redux";
import { addNote } from "../redux/noteSlice";
import { useNavigate } from "react-router-dom";

const AddNote = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const notes = useSelector(state => state.notes)

    const [title, setTitle] = useState('')
    const [text, setText] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        const newNote = {
            id: notes.length + 1,
            title: title,
            text: text,
        }
        if (title!== '' && text!==''){
            dispatch(addNote(newNote))
            setTitle('')
            setText('')
            navigate('/')
        } else{
            alert("Write your note")
        }
    }

    return (
        <div className="container">
            <form className={styles.note} onSubmit={handleSubmit}>
                <textarea className={styles.areaTitle} value={title}
                    placeholder="Название заметки" onChange={(e) => setTitle(e.target.value)}>
                </textarea>
                <textarea className={styles.areaText} value={text}
                    placeholder="Текст заметки" onChange={(e) => setText(e.target.value)}>
                </textarea>
                <button type="submit" className={styles.addBtn}>Добавить заметку</button>
                
            </form>
        </div>
    );
}
 
export default AddNote;