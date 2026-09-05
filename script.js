const noteForm = document.getElementById("noteForm");
const titleInput = document.getElementById("title");
const contentInput = document.getElementById("content");
const notesContainer = document.getElementById("notesContainer");

const API_URL = "/notes";

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

    await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(note)
    });

    titleInput.value = "";
    contentInput.value = "";

    loadNotes();
});

async function deleteNote(id) {
    await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
    });

    loadNotes();
}

loadNotes();