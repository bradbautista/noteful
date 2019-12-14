import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import NotesContext from './NotesContext';
import './NoteArea.css';


export default class NoteArea extends Component {

    static contextType = NotesContext;

    render() {

        const folderId = this.props.match.params.folderId;
        let filteredNotes = this.context.notes.filter((note) => {
            return note.folderId === folderId
        })

        return (

            // If no folder has been selected, return a list of notes
            (folderId === undefined)
            ?   <section className='noteArea'>
                    <ul className="noteList">
                        {this.context.notes.map(note =>
                            <li className="note" key={note.id}>
                            <Link to={`/note/${note.id}`}>
                            <h2 className="noteTitle">{note.name}</h2>
                            </Link>
                            <p className="noteInfo">Last modified: {note.modified}</p>
                            <button 
                                name="deleteNote" 
                                id="deleteNote"
                                onClick={() => this.context.deleteNote(note.id)}
                            
                            >Delete note</button>
                            </li>
                        )}
                    </ul>

                    <Link to={'/add-note'} className="addNote__btn">
                    Add Note
                    </Link>

                </section>

            // If a folder has been selected, return only the notes
            // in that folder
            :   <section className='noteArea'>

                <ul className="noteList">
                    {filteredNotes.map(note =>
                        <li className="note" key={note.id}>
                        <Link to={`/note/${note.id}`}>
                        <h2 className="noteTitle">{note.name}</h2>
                        </Link>
                        <p className="noteInfo">Last modified: {note.modified}</p>
                        <button 
                            name="deleteNote" 
                            id="deleteNote"
                            onClick={() => this.context.deleteNote(note.id)}    
                        >Delete note</button>
                        </li>
                    )}
                </ul>

                <Link to={'/add-note'} className="addNote__btn">
                    Add Note
                </Link>

                </section>
        )
    }
}

NoteArea.defaultProps = {
    folderId: '1'
}
  
NoteArea.propTypes = {
    folderId: PropTypes.string.isRequired,
}

NotesContext.propTypes = {
    value: PropTypes.object,
}