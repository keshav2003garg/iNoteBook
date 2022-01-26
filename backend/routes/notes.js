const express = require("express")
const router = express.Router()
const Notes = require("../models/Notes")
const fetchuser = require("../middleware/fetchuser")
const { body, validationResult } = require('express-validator');




router.post('/fetch-all-notes', fetchuser,
    async (req, res)=>{
        try {
            const fetchNotes = await Notes.find({user: req.user})
            res.json(fetchNotes)
        } catch (error) {
            res.status(500)
        }
        
    }
)



router.post('/add-notes', [
    body('title', 'Enter a valid tyle').isLength({min: 3}),
    body('description', 'Enter a valid description').isLength({min: 5}) ], fetchuser,
    async (req, res)=>{
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()){return res.status(400).json({ errors: errors.array() });}

            const {title, description, tag} = req.body

            const addNotes = new Notes({title, description, tag, user: req.user})
            const addedNote = await addNotes.save()
            res.json(addedNote)
        } catch (error) {
            res.status(500)
        }
    }
)



router.put('/update-notes/:id', fetchuser,
    async (req, res)=>{
        try {
            const {title, description, tag} = req.body
            
            const newNotes = {}
            if(title){newNotes.title = title}
            if(description){newNotes.description = description}
            if(tag){newNotes.tag = tag}

            const notes = await Notes.findById(req.params.id)
            if(!notes){return res.status(404).send("Not Found")}

            if(notes.user.toString()!==req.user){return res.status(401).send("Not Allowed")}

            await Notes.findByIdAndUpdate(req.params.id, {$set: newNotes}, {new: true})
            res.json({Success: "Your Note has been successfully updated"})
        } catch (error) {
            res.status(500)
        }
    }
)



router.delete('/delete-notes/:id', fetchuser, async (req, res)=>{
    try {
        const notes = await Notes.findById(req.params.id)
        if(!notes){return res.status(404).send("Not Found")}

        if(notes.user.toString()!==req.user){return res.status(401).send("Not Allowed")}

        await Notes.findByIdAndDelete(req.params.id)
        res.json({Success: "Your Note has been successfully deleted"})
    } catch (error) {
        res.status(500)
    }
    
})




module.exports = router