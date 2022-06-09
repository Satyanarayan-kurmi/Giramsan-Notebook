import React,{useContext} from 'react'
import noteContext from '../context/notes/noteContext';
import './noteitem.css'
import './utility.css'

export default function Noteitem(props) {
    const context=useContext(noteContext)
    const {deleteNote}=context;
    const  {note,updateNote}=props;
  return (
        <div className='hello col-md-3'>
            <div className="card my-3">
                <div className="card-body bg-sp">
                    <div className=' d-flex justify-content-center'>
                        <h5 className="card-title">{note.title}</h5>
                        <i onClick={()=>{deleteNote(note._id);props.showAlert("Deleted Successfully","success")}} className="my-2 fa-solid fa-trash-can mx-2" ></i>
                        <i className="my-2 fa-solid fa-pen-clip mx-2" onClick={()=>{updateNote(note)}}></i>
                    </div>
                    <p className="card-text">{note.description}</p>
                </div>
            </div>
        </div>
  )
}
