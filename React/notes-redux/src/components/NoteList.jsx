import { useSelector } from "react-redux";
import NoteItem from "./NoteItem";


const NoteList = () => {

    const notes = useSelector(state => state.notes)
    const Style = useSelector(state => state.styles.interface.notelist)

    return (
       <div style={Style}>
        {notes.map((note) => {
            return (
                <NoteItem key = {note.id} note = {note}/>
            )
        })}
       </div> 
    );
}
 
export default NoteList;