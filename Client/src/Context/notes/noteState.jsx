import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000"
  const NotesInitial = [
    {
      "_id": "66116b90a06fe55bcf6facfd",
      "user": "661024645f3a90ab32f2a49e",
      "title": "my title",
      "description": "hello this is description",
      "tag": "public tag",
      "date": "2024-04-06T15:34:40.496Z",
      "__v": 0
    },
    {
      "_id": "66116b90a06fe55bcf6facff",
      "user": "661024645f3a90ab32f2a49e",
      "title": "my title",
      "description": "hello this is description",
      "tag": "public tag",
      "date": "2024-04-06T15:34:40.619Z",
      "__v": 0
    },
    {
      "_id": "66116b90a06fwe55bcf6facfd",
      "user": "661024645f3a90ab32f2a49e",
      "title": "my title",
      "description": "hello this is description",
      "tag": "public tag",
      "date": "2024-04-06T15:34:40.496Z",
      "__v": 0
    },
    {
      "_id": "66116b90a06fee55bcf6facff",
      "user": "661024645f3a90ab32f2a49e",
      "title": "my title",
      "description": "hello this is description",
      "tag": "public tag",
      "date": "2024-04-06T15:34:40.619Z",
      "__v": 0
    },
    {
      "_id": "66116b90a06fes55bcf6facfd",
      "user": "661024645f3a90ab32f2a49e",
      "title": "my title",
      "description": "hello this is description",
      "tag": "public tag",
      "date": "2024-04-06T15:34:40.496Z",
      "__v": 0
    },
    {
      "_id": "66116b90a06fec55bcf6facff",
      "user": "661024645f3a90ab32f2a49e",
      "title": "my title",
      "description": "hello this is description",
      "tag": "public tag",
      "date": "2024-04-06T15:34:40.619Z",
      "__v": 0
    },
    {
      "_id": "66116b90a06feq55bcf6fad01",
      "user": "661024645f3a90ab32f2a49e",
      "title": "my title",
      "description": "hello this is description",
      "tag": "public tag",
      "date": "2024-04-06T15:34:40.860Z",
      "__v": 0
    }
  ];

  const [Notes, setNotes] = useState(NotesInitial);

  // Get all Note
  const getNotes = async () => {
    //API call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'),
      },
    });
    const json = await response.json();
    console.log(json);
    setNotes(json);
  }
  // Add a Note
  const addNote = async (title, description, tag) => {
    //API call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'),
      },
      body: JSON.stringify({ title, description, tag })
    });
    const json = await response.json();

    console.log("Adding a new Note...");
    let note = json
    setNotes(Notes.concat(note))
  }

  // Delete a Note
  const deleteNote =async (id) => {
    //API call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'),
      },
    });
    const json = await response.json()
    console.log(json);

    const newNote = Notes.filter((note) => { return note._id !== id });
    setNotes(newNote);
    console.log("deleting" + id);
  }

  // Update a Note
  const editNote = async (id, title, description, tag) => {
    //API call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'),
      },
      body: JSON.stringify({ title, description, tag })
    });
    const json = await response.json()


    let newNotes=JSON.parse(JSON.stringify(Notes));
    //Logic to edit client 
    for (let i = 0; i < newNotes.length; i++) {
      const element = newNotes[i];
      if (element._id == id) {
        newNotes[i].title = title;
        newNotes[i].description = description;
        newNotes[i].tag = tag;
        break;
      }
    }

    setNotes(newNotes)
  }

  return (
    <NoteContext.Provider value={{ Notes, addNote, deleteNote, editNote, getNotes }} >
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;