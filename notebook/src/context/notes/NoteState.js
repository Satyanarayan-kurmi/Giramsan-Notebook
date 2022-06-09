import {React,useState} from "react";
import NoteContext from "./noteContext";

const NoteState=(props)=>{
    const host="http://localhost:5000"
    const notesInitial=[]

    const [notes,setNotes]=useState(notesInitial)

    const getNotes=async()=>{
      const response=await fetch(`${host}/api/notes/fetchallnotes`,{
        method:'GET',
        headers:{
          'Content-Type':'application/json',
          'auth-token':localStorage.getItem('token')
        }
      });
      const json=await response.json();
      // console.log(json)
      setNotes(json)
    }
    //Add note
      const addNote=async(title,description,tag)=>{
        const response=await fetch(`${host}/api/notes/addnewnote`,{
          method:'POST',
          headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')
          },
          body:JSON.stringify(
            {title,description,tag}
          )
        });
      
        const json=response.json();
        if(0>1) console.log(json)
        const note={
          "_id": "626d4765d96eb88015b134ef",
          "user": "626c28a22b7f5ccbaef80f20",
          "title": title,
          "description": description,
          "tag": tag,
          "date": "2022-04-30T14:27:49.966Z",
          "__v": 0
        };
        console.log("adding a new note")
        setNotes(notes.concat(note))
      }
    // Delete note
    const deleteNote=async (id)=>{
        const response=await fetch(`${host}/api/notes/deletenote/${id}`,{
          method:'DELETE',
          headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')
          },
        });
        const json=response.json();
        console.log(json);
        console.log("Deleting note with id"+id);
        const newNotes=notes.filter((note)=>{return note._id!==id})
        setNotes(newNotes);
    }
    // Edit note
    const editNote=async (id,title,description,tag)=>{
      const response=await fetch(`${host}/api/notes/updatenotes/${id}`,{
        method:'PUT',
        headers:{
          'Content-Type':'application/json',
          'auth-token':localStorage.getItem('token')
        },
        body:JSON.stringify({title,description,tag})
      });
    
      const json=await response.json();
      if(0>1) console.log(json)

      // const json=response.json();
        let newNotes=JSON.parse(JSON.stringify(notes));
        for(let i=0;i<newNotes.length;i++){
          const element=newNotes[i];
          if(element._id===id){
            newNotes[i]._id=id;
            newNotes[i].title=title;
            newNotes[i].description=description;
            // console.log(newNotes[i]);
            break;
          }
        }
        setNotes(newNotes);
      }
    return(
        <NoteContext.Provider value={{notes,addNote,deleteNote,editNote,getNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;