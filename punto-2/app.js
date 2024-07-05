class Note {
    constructor(id, description) {
        this.id = id;
        this.description = description;
    }

    updateDescription(description) {
        this.description = description;
    }


}

class NoteManager {
    constructor() {
        this.note = JSON.parse(localStorage.getItem('note')) || [];
        this.loadNote();
    }

    addNote(description) {
        const id = this.note.length ? this.note[this.note.length - 1].id + 1 : 1;
        const note = new Note(id, description);
        this.note.push(note);   
        this.saveNote();
        this.renderNote();
    }

    editNote(id, newDescription) {
        const noteEdit = this.note.find(note => note.id === id);
        if (noteEdit) {
            noteEdit.updateDescription(newDescription);
            this.saveNote();
            this.renderNote();
        }
    }

    deleteNote(id) {
        this.note = this.note.filter(note => note.id !== id);
        this.saveNote();
        this.renderNote();
    }
 

    saveNote() {
        localStorage.setItem('note', JSON.stringify(this.note));
    }

    loadNote() {
        this.renderNote();
    }

    renderNote() {
        const noteList = document.getElementById('note-list');
        noteList.innerHTML = '';
        this.note.forEach(note => {
            const item = document.createElement('li');
            item.textContent = note.description;

            const editButton = document.createElement('button');
            editButton.textContent = 'Editar';
            editButton.addEventListener('click', () => {
                const newDescription = prompt('Ingrese la nueva descripción:', note.description);
                if (newDescription !== null) {
                    this.editNote(note.id, newDescription);
                }
            });

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Eliminar';
            deleteButton.addEventListener('click', (e) => {
                e.stopPropagation(); // Evitar que el evento se propague al elemento padre, ¿Por qué? Porque el evento click en el botón también se propaga al elemento li.
                this.deleteNote(note.id);
            });

            item.appendChild(editButton);
            item.appendChild(deleteButton);
            noteList.appendChild(item);

        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const noteManager = new NoteManager();

    document.getElementById('add-note').addEventListener('click', () => {
        const newNote = document.getElementById('new-note').value;
        if(newNote) {
            noteManager.addNote(newNote);
            document.getElementById('new-note').value = '';
        }
    });
    
});