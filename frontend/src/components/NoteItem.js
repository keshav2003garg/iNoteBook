import React, {useContext} from 'react'
import noteContext from '../context/notes/noteContext'

export default function NoteItem(props) {
    const {note, updateNote, showAlert} = props
    const context = useContext(noteContext)
    const {deleteNote} = context
    return (
        <div className="col-md-3">
            <div className="card my-3">
                <div className="card-body">
                <div className="d-flex justify-content-between">
                    <h5 className="card-title">{note.title}</h5>
                    <i className="fas fa-edit" style={{cursor: "pointer"}} onClick={()=>{updateNote(note)}}></i></div>
                <p className="card-text">{note.description}</p>
                <i className="fas fa-trash-alt" style={{cursor: "pointer"}} onClick={()=>{deleteNote(note._id); showAlert("Note Deleted Successfully", "success")}}></i>
                </div>
            </div>
        </div>
    )
}
