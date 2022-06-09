const express=require('express');
const router=express.Router();
const Notes=require('../models/Notes')
const fetchuser=require('../middleware/fetchuser')
const {body,validationResult}=require('express-validator');
const { findById } = require('../models/Notes');

//Routes 1: get all the notes
router.get('/fetchallnotes',fetchuser
,async(req,res)=>{
    try {
        const notes=await Notes.find({user:req.user.id});
        // console.log("notes fetched successfully")
        res.json(notes);   
    } catch (error) {
        res.status(500).json({error:error.message})
    }
})

router.post('/addnewnote',fetchuser,[
    body('title','title should have atleast 3 character').isLength({min:3}),
    body('description','Description should have atleast 4 character...!').isLength({min:4}),
],async(req,res)=>{
    const errors=validationResult(req);
    // if error ocurred while validation
    if(!errors.isEmpty())
        return res.status(400).json({errors:errors.array()});


    try {
        const {title,description,tag}=req.body;
        const note=new Notes({
            title,description,tag,user:req.user.id,
        })
        const savenote=await note.save();
        console.log("notes added successfully")
        res.json(savenote);

    } catch (error) {
        res.status(500).json({error:error.message})
    }
})

//Route 3 : update an existing note
router.put('/updatenotes/:id',fetchuser,async(req,res)=>{
    try {
        const {title,description,tag}=req.body;
        //create a newNote object
        const newNote={};
        if(title){newNote.title=title}
        if(description){newNote.description=description}
        if(tag){newNote.tag=tag}
    
        //find the note to be updated
        let note= await Notes.findById(req.params.id);
        if(!note){return res.status(404).send("page Not Found")}
    
        if(note.user.toString()!==req.user.id){
            return res.status(401).send("Not allowed");
        }
        note=await Notes.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
        res.json({note});
    } catch (error) {
        res.status(500).json({error:error.message})
    }
})

//Route 4 : delete an existing note

router.delete('/deletenote/:id',fetchuser,async(req,res)=>{

    try {
        
        let note=await Notes.findById(req.params.id);
        //if  note is not present in the data base
        if(!note)
        return res.status(404).send("Page Not Found");
        
        // if user not author of this note
        if(note.user.toString()!==req.user.id)
        return res.status(401).send("Not Allowed");
        
        note=await Notes.findByIdAndDelete(req.params.id);
        res.json({"Success":"Note has been deleted",note:note});
    } catch (error) {
        res.status(500).json({error:error.message})
    }
    
})
module.exports=router;