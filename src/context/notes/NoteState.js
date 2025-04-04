import { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);

  // Fetch all notes
  const getNotes = async () => {
    try {
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY4MTI0OWYzYmE4ZGIyZmMyNTZkZTIwIn0sImlhdCI6MTcxOTgyODgwNH0.4Yw3Vj5BonVJCHniRALlXwmF6D9rkbwtQIFAzJiV8uk"
        },
      });
      if (response.ok) {
        const json = await response.json();
        setNotes(json);
      } else {
        console.error("Failed to fetch notes");
      }
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  // Add a note
  const addNote = async (title, description, tag) => {
    try {
      const response = await fetch(`${host}/api/notes/addnote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY4MTI0OWYzYmE4ZGIyZmMyNTZkZTIwIn0sImlhdCI6MTcxOTgyODgwNH0.4Yw3Vj5BonVJCHniRALlXwmF6D9rkbwtQIFAzJiV8uk"
        },
        body: JSON.stringify({ title, description, tag })
      });
      if (response.ok) {
        const note = await response.json();
        setNotes(notes.concat(note));
      } else {
        console.error("Failed to add note");
      }
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  // Delete a note
  const deleteNote = async (id) => {
    try {
      const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY4MTI0OWYzYmE4ZGIyZmMyNTZkZTIwIn0sImlhdCI6MTcxOTgyODgwNH0.4Yw3Vj5BonVJCHniRALlXwmF6D9rkbwtQIFAzJiV8uk"
        }
      });
      if (response.ok) {
        const newNotes = notes.filter(note => note._id !== id);
        setNotes(newNotes);
      } else {
        console.error("Failed to delete note");
      }
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  // Edit a note
  const editNote = async (id, title, description, tag) => {
    try {
      const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: "PUT", // Use PUT for updates
        headers: {
          "Content-Type": "application/json",
          "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY4MTI0OWYzYmE4ZGIyZmMyNTZkZTIwIn0sImlhdCI6MTcxOTgyODgwNH0.4Yw3Vj5BonVJCHniRALlXwmF6D9rkbwtQIFAzJiV8uk"
        },
        body: JSON.stringify({ title, description, tag })
      });
      if (response.ok) {
        const updatedNote = await response.json();
        const newNotes = notes.map(note => note._id === id ? updatedNote : note);
        setNotes(newNotes);
      } else {
        console.error("Failed to update note");
      }
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  return (
    <noteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </noteContext.Provider>
  );
};

export default NoteState;
