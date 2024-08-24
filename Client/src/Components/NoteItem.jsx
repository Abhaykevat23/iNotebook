import React, { useContext } from 'react'
import NoteContext from '../Context/notes/noteContext';

function NoteItem(props) {
    const Context=useContext(NoteContext);
    const { deleteNote } = Context;
    const { note ,updateNote } = props;
    
    
    return (
        <div className='col-md-3'>
            <div className="card my-3" >
                <div className="card-body">
                    <h3 className="card-title">{note.title}</h3>
                    <p className="card-text">{note.description} </p>
                    <h5 className="card-text">{note.tag}</h5>
                    <i className="fa-solid fa-trash-can mx-2" 
                        onClick={
                            ()=>{
                                deleteNote(note._id);
                                props.showAlert("Note Deleted Successfully","success");  
                            }
                        }>
                    </i>
                    <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>{updateNote(note)}}></i>
                </div>
            </div>
        </div>
    )
}

export default NoteItem