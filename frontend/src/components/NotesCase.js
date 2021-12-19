import React, { useContext, useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router'
import noteContext from '../context/notes/noteContext'
import NoteItem from './NoteItem'

export default function NotesCase(props) {
    const context = useContext(noteContext)
    let history = useHistory()
    const { notes, getNotes, editNote } = context
    useEffect(() => {
        if(localStorage.getItem("token")){
            getNotes() 
        }
        else{
            history.push("/login")
        }
        // eslint-disable-next-line
    }, [])
    
    const ref = useRef(null)
    const refClose = useRef(null)
    const [note, setNote] = useState({id: "", edittitle: "", editdescription: "", edittag: "" })

    const updateNote = (currentNote) => {
        ref.current.click()
        setNote({id: currentNote._id, edittitle: currentNote.title, editdescription: currentNote.description, edittag: currentNote.tag })
    }
    const handleClick = (e) => {
        e.preventDefault()
        editNote(note.id, note.edittitle, note.editdescription, note.edittag)
        refClose.current.click()
        console.log(note)
        props.showAlert("Note Updated Successfully", "success")
    }
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    return (
        <>
            <button ref={ref} type="button" className="btn btn-primary d-none" data-toggle="modal" data-target="#exampleModal">Click</button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Update your Note</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="container my-4">
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input value={note.edittitle} type="text" className="form-control" id="edittitle" name="edittitle" placeholder="Add a Title" onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <textarea value={note.editdescription} className="form-control" id="editdescription" name="editdescription" rows="3" placeholder="Add a Description" onChange={onChange}></textarea>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={handleClick}>Update Notes</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row my-4">
                    <h1>Your Notes</h1>
                    <div className="container mx-2">
                        {notes.length===0 && "No Notes to display"}
                    </div>
                    {notes.map((note) => {
                        return <NoteItem key={note._id} note={note} updateNote={updateNote} showAlert={props.showAlert} />
                    })}
                </div>
            </div>
        </>
    )
}
