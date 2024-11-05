import { Link } from 'react-router-dom';
import styles from './NoteItem.module.css'
import { useSelector } from 'react-redux';

const NoteItem = ({note}) => {
    
    const Style = useSelector(state => state.styles.interface.noteitem)

    return (
        <div style={Style}>
            <h1 className="note-title">{note.title}</h1>
            <p className="note-text">{note.text}</p>
            <Link className={styles.editBtn} to={`/edit/${note.id}`}>Редактировать</Link>
        </div>
    );
}
 
export default NoteItem;