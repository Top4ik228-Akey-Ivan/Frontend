import { useEffect, useState } from "react";

import styles from './Note.module.css'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateNote } from "../redux/noteSlice";

const UpdateNote = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { id } = useParams()

    const note = useSelector((state) => state.notes.find(note => note.id === Number(id)))

    const [title, setTitle] = useState('')
    const [text, setText] = useState('')

    useEffect(() => {
        if (note){
            setTitle(note.title)
            setText(note.text)
            console.log(note)
        }
    }, [note])

    const handleSubmit = (e) => {
        e.preventDefault()
        const updatedNote = {
            id: note.id,
            title: title,
            text: text,
        }
        dispatch(updateNote(updatedNote))
        navigate('/')

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
                <button type="submit" className={styles.addBtn}>Сохранить изменения</button>
            </form>
        </div>
    );
}
 
export default UpdateNote;