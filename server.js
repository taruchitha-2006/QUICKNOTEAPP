const express = require("express");
const fs = require("fs");

const app = express();
const PORT = 3000;

app.use(express.json());

const notesFile = "./notes.json";

// GET all notes
app.get("/notes", (req, res) => {
    const notes = JSON.parse(fs.readFileSync(notesFile, "utf8"));
    res.json(notes);
});

// POST a new note
app.post("/notes", (req, res) => {
    const notes = JSON.parse(fs.readFileSync(notesFile, "utf8"));

    const newNote = {
        id: Date.now(),
        title: req.body.title,
        content: req.body.content
    };

    notes.push(newNote);

    fs.writeFileSync(notesFile, JSON.stringify(notes, null, 2));

    res.status(201).json(newNote);
});

// DELETE a note
app.delete("/notes/:id", (req, res) => {
    const notes = JSON.parse(fs.readFileSync(notesFile, "utf8"));

    const id = Number(req.params.id);

    const updatedNotes = notes.filter(note => note.id !== id);

    fs.writeFileSync(notesFile, JSON.stringify(updatedNotes, null, 2));

    res.json({ message: "Note deleted successfully" });
});

    app.use(express.static(__dirname));
    app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});
