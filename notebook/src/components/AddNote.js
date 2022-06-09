import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext'
import './addnote.css'
import './utility.css'


export default function AddNote(props) {
    const context = useContext(noteContext);
    const { addNote } = context;

    const [note,setNote]=useState({title:"",description:"",tag:""})
    const handleclick = (e) => {
        e.preventDefault();
        addNote(note.title,note.description,note.tag);
        setNote({title:"",description:"",tag:""})
        props.showAlert("Added Note Successfully","success")
    }
    const handlechange = (e) => {
        setNote({...note,[e.target.name]:e.target.value})
    }
    return (
        <div>
            <div className='container self-cont my-3'>
                <h2>Add Notes</h2>
                <form className='my-3'>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" placeholder=' title' onChange={handlechange}  value={note.title} className="  form-control bg-sp" id="title" name="title" aria-describedby="emailHelp" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <textarea rows={5} type="text"value={note.description}  placeholder=' discription' className="form-control bg-sp" id="description" name="description" onChange={handlechange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Tag</label>
                        <input type="text" value={note.tag} placeholder=' tag' onChange={handlechange}  className="form-control bg-sp" id="tag" name="tag" aria-describedby="emailHelp" />
                    </div>
                    <button  disabled={note.title.length<5||note.description.length<5} type="submit" className="btn btn-success " onClick={handleclick}>Add Notes</button>
                </form>
            </div>
        </div>
    )
}
