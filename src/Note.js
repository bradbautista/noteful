import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './Note.css'

export default class Note extends Component {
    render() {

        const noteId = this.props.match.params.noteId;

        let selectedNote = this.props.notes.filter((note) => {
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
                            <button name="deleteNote" id="deleteNote">Delete note</button>
                            </li>
                        )}
                    </ul>
            </section>
        )
    }
}
