const express = require('express');
const router = express.Router();
const Notes = require('../models/Notes');
var fetchuser = require('../middlewear/fetchuser');
const { body, validationResult } = require('express-validator');

// Route 1 : Get all notes of a perticular user =========================
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error")
    }
})



// Route 2 : Add notes  =========================
router.post('/addnote', fetchuser, [
    body('title', 'Enter Valid Title').isLength({ min: 3 }),
    body('description', 'Description must be atleast 5 characters').isLength({ min: 5 })
], async (req, res) => {

    const { title, description, tag } = req.body;
    try {
        // if there are errors then send bad request error message
        const result = validationResult(req);
        if (!result.isEmpty()) {
            res.send({ errors: result.array() });
        }
        const note = new Notes({
            title, description, tag, user: req.user.id
        })
        const saveNote = await note.save();
        res.json(saveNote);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error")
    }
})


// Route 3 : Update notes  =========================  put req.
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    try {
        //Create A New Object
        const newNote = {};
        if (title) {
            newNote.title = title;
        }
        if (description) {
            newNote.description = description;
        }
        if (tag) {
            newNote.tag = tag;
        }

        //find the note to be updated and update it
        let note = await Notes.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found..") }
        if (note.user.toString() !== req.user.id) { return res.status(401).send("Not Allowed..") }

        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
        res.json({ note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error")
    }

})


// Route 4 : delete notes  =========================  delete req.
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        //find the note to be updated and update it
        let note = await Notes.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found..") }
        if (note.user.toString() !== req.user.id) { return res.status(401).send("Not Allowed..") }
    
        note = await Notes.findByIdAndDelete(req.params.id);
        res.json({ "Success": "Note Deleted Successfully" });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error")
    }

})
module.exports = router