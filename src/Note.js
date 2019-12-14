import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import NotesContext from './NotesContext'
import './Note.css'

export default class Note extends Component {

    static contextType = NotesContext; 

    render() {

        const noteId = this.props.match.params.noteId;

        let selectedNote = this.context.notes.filter((note) => {
            return note.id === noteId
        })

        return (
            <section className="noteArea">
                    <ul className="noteList">
                        {selectedNote.map(note =>
                            <li className="note" key={note.id}>
                            <Link to={`/note/${note.id}`}>
                            <h2 className="noteTitle">{note.name}</h2>
                            </Link>
                            <p className="noteInfo">Last modified: {note.modified}</p>
                            <p className="noteText">{note.content}</p>
                            <button 
                                name="deleteNote" 
                                id="deleteNote"
                                onClick={() => {
                                    this.context.deleteNote(note.id);
                                    this.props.history.push('/');
                                }}
                            >
                                Delete note
                            </button>
                            </li>
                        )}
                    </ul>
            </section>
        )
    }
}

NotesContext.propTypes = {
    value: PropTypes.object,
}

Note.defaultProps = {
    noteId: '1',
}
  
Note.propTypes = {
    noteId: PropTypes.string.isRequired,
};