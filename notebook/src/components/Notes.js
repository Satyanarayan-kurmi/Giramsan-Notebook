import React, { useContext, useEffect, useRef,useState } from 'react';
import { useNavigate } from 'react-router-dom';
import noteContext from '../context/notes/noteContext'
import AddNote from './AddNote';
import Noteitem from './Noteitem'
import './utility.css'

export default function Notes(props) {
  const context = useContext(noteContext);
  let navigate=useNavigate();
  const { notes, getNotes,editNote } = context;
  useEffect(() => {
    if(localStorage.getItem('token')){
      getNotes()
    }
    else{
      navigate('/login')
    }
  }, [])

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({id:currentNote._id, etitle:currentNote.title,edescription:currentNote.description,etag:currentNote.tag});
  }
  const [note,setNote]=useState({id:"",etitle:"",edescription:"",etag:""})

  const handleclick = (e) => {
    console.log("Note is Updated",note);
    editNote(note.id,note.etitle,note.edescription,note.etag)
    refclose.current.click();
    props.showAlert("Updated Successfully","success")
}
const handlechange = (e) => {
    setNote({...note,[e.target.name]:e.target.value})
}

  const refclose=useRef(null);
  const ref = useRef(null)
  return (
    <div className='edit'>
      <AddNote showAlert={props.showAlert} />
      {/* tabindex */}
      <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>

      <div className="modal fade " id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form className='my-3'>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Title</label>
                  <input type="text" onChange={handlechange} className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">Tag</label>
                  <input type="text" onChange={handlechange} className="form-control" id="etag" name="etag" value={note.etag} aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">Description</label>
                  <textarea type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={handlechange} />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button ref={refclose} type="button" className="btn btn-outline-secondary" data-bs-dismiss="modal">Close</button>
              <button disabled={note.etitle.length<5||note.edescription.length<5} onClick={handleclick} type="button" className="btn btn-outline-success">Update Note</button>
            </div>
          </div>
        </div>
      </div>
      <div className='row my-3'>
        <h2>Saved Notes</h2>
        <div className='container mx-2'>
          {notes.length===0&& "There is No note to display...!"}
        </div>
        {notes.map((note) => {
          return <Noteitem key={note._id} showAlert={props.showAlert} updateNote={updateNote} note={note} />
        })}
      </div>
    </div>
  )
}
