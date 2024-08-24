import React, { useContext, useState } from 'react'
import NoteContext from '../Context/notes/noteContext';

function AddNote(props) {

    const Context = useContext(NoteContext);
    const { addNote } = Context;

    const [note, setnote] = useState({ title: "", description: "", tag: "" });
    const handleAddNote = (e) => {
        e.preventDefault();
        addNote(note.title,note.description,note.tag);
        setnote({ title: "", description: "", tag: "" });
        props.showAlert("Note Added Successfully","success")
    }

    const onChange = (e) => {
        setnote({...note,[e.target.name]:e.target.value})
    }
    return (
        <div className="container">
            <h2>Add Notes</h2>
            <form>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name="title" value={note.title} onChange={onChange} minLength={5} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea className="form-control" id="description" name="description" value={note.description} onChange={onChange} style={{resize:'none'}} minLength={5} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input className="form-control" id="tag" name="tag" value={note.tag} onChange={onChange} />
                </div>

                <button disabled={note.title.length < 5 || note.description.length < 5} type="submit" className="btn btn-warning ml-3" onClick={handleAddNote}>Add Note</button>
            </form>
        </div>
    )
}

export default AddNote