const express = require('express')
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');
const router = express.Router()
var fetchuser = require('../middleware/fetchuser')
// Route1: Get All the Notes using :GET /api/auth/fetchallnotes.Login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id })
        res.json(notes)

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Internal Server Error");
    }
})

// Route2: Add a new Notes using :Post /api/auth/addnote.Login required
router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Enter a valid description').isLength({ min: 5 })
], async (req, res) => {

    try {
        const { title, description, tag } = req.body;
        // if tere are errors, return Bad request and the errors       
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
            // const notes = await Notes.find({ user: req.user.id })
        }
        const note = new Note({
            title, description, tag, user: req.user.id

        })
        const savenote = await note.save();
        res.json(savenote)

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Internal Server Error");
    }
})

// Route3: update a existing  Notes using :put /api/auth/updatenote/:id.Login required

router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    //Create a newNote object
    const newNote = {};
    if (title) { newNote.title = title }
    if (description) { newNote.description = description }
    if (tag) { newNote.tag = tag }

    // Find the note to be updated and update it
    let note = await Note.findById(req.params.id);
    if (!note) {
        return res.status(401).send("Not Found");
    }

    if (note.user.toString() !== req.user.id) {
        return res.status(401).send("Not Allowed");
    }

    note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
    res.json({ note })

})

// Route4: Delete a existing  Notes using :delete /api/auth/deletenote.Login required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        // Find the note by ID
        let note = await Note.findById(req.params.id);

        // If note doesn't exist
        if (!note) {
            return res.status(404).send("Not Found");
        }

        // Check if the user owns this note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        // Delete the note
        await Note.findByIdAndDelete(req.params.id);

        res.json({ Success: "Note has been deleted", note: note });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});



module.exports = router;