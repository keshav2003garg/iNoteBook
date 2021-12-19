import React, { useState, useContext } from 'react'
import noteContext from '../context/notes/noteContext'

export default function NoteBook(props) {
    const context = useContext(noteContext)
    const { addNote } = context
    const [note, setNote] = useState({ title: "", description: "", tag: "" })

    const handleClick = (e) => {
        e.preventDefault()
        addNote(note.title, note.description, note.tag)
        setNote({ title: "", description: "", tag: "" })
        props.showAlert("Note Added SuccessFully", "success")
    }
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    return (
        <div className="container my-4">
            <h1>Add a Note</h1>
            <div className="mb-3">
                <label htmlFor="title" className="form-label">Title</label>
                <input type="text" className="form-control" id="title" name="title" placeholder="Add a Title"
                    onChange={onChange} value={note.title} />
            </div>
            <div className="mb-3">
                <label htmlFor="description" className="form-label">Description</label>
                <textarea className="form-control" id="description" name="description" rows="3" placeholder="Add a Description" onChange={onChange} value={note.description}></textarea>
                <button disabled={note.title.length<5 || note.description.length<5 } type="button" className="btn btn-primary my-3" onClick={handleClick}>Add Note</button>
            </div>
        </div>
    )
}
