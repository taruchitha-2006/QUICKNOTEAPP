const noteForm = document.getElementById("noteForm");
const titleInput = document.getElementById("title");
const contentInput = document.getElementById("content");
const notesContainer = document.getElementById("notesContainer");

const API_URL = "/notes";

let editingNoteId = null;

async function loadNotes() {
    const response = await fetch(API_URL);
    const notes = await response.json();

    notesContainer.innerHTML = "";

    notes.forEach(note => {
        const noteDiv = document.createElement("div");
        noteDiv.className = "note";

        noteDiv.innerHTML = `
            <h3>${note.title}</h3>
            <p>${note.content}</p>

            <button onclick="editNote(${note.id})">
                Edit
            </button>

            <button class="delete-btn" onclick="deleteNote(${note.id})">
                Delete
            </button>
        `;

        notesContainer.appendChild(noteDiv);
    });
}

noteForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const note = {
        title: titleInput.value,
        content: contentInput.value
    };

    if (editingNoteId === null) {
        // CREATE
        await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(note)
        });
    } else {
        // UPDATE
        await fetch(`${API_URL}/${editingNoteId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(note)
        });

        editingNoteId = null;
    }

    titleInput.value = "";
    contentInput.value = "";

    loadNotes();
});

function editNote(id) {
    fetch(`${API_URL}`)
        .then(response => response.json())
        .then(notes => {
            const note = notes.find(note => note.id === id);

            if (note) {
                titleInput.value = note.title;
                contentInput.value = note.content;

                editingNoteId = id;
                titleInput.focus();
            }
        });
}

async function deleteNote(id) {
    await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
    });

    loadNotes();
}

loadNotes();