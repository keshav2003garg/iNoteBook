import {useState} from "react"
import NoteContext from "./noteContext"

const NoteState = (props)=>{
    const host = process.env.REACT_APP_HOST
    const [notes, setNotes] = useState([])


    const getNotes = async ()=>{
        const response = await fetch(`${host}/api/notes/fetch-all-notes`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("token")
            }
        })
        const json = await response.json()
        setNotes(json)
    }


    const addNote = async (title, description, tag)=>{
        const response = await fetch(`${host}/api/notes/add-notes`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("token")
            },
            body: JSON.stringify({title, description, tag})
        })
        const note = await response.json()
        setNotes(notes.concat(note))
    }


    const deleteNote = async (id)=>{
        await fetch(`${host}/api/notes/delete-notes/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("token")
            }
        })
        const newNotes = notes.filter((note)=>{return note._id!==id})
        setNotes(newNotes)
    }


    const editNote = async (id, title, description, tag)=>{
        const response = await fetch(`${host}/api/notes/update-notes/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("token")
            },
            body: JSON.stringify({id, title, description, tag})
        })
        await response.json()
        let newNotes = JSON.parse(JSON.stringify(notes))
        for (let index = 0; index<notes.length; index++) {
            const element = notes[index];
            if(element._id===id){
                newNotes[index].title=title
                newNotes[index].description=description
                newNotes[index].tag=tag
                break;
            }
        }
        setNotes(newNotes)
    }


    return(
        <NoteContext.Provider value={{notes, getNotes, addNote, deleteNote, editNote}}>
            {props.children}
        </NoteContext.Provider> 
    )
}

export default NoteState