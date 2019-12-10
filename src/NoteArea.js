import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './NoteArea.css'


export default class NoteArea extends Component {
  render() {
    
    const folderId = this.props.match.params.folderId;
    let filteredNotes = this.props.notes.filter((note) => {
        return note.folderId === folderId
    })

    return (

        // If no folder has been selected, return a list of notes
        (folderId === undefined)
        ?   <section className='noteArea'>
                <ul className="noteList">
                    {this.props.notes.map(note =>
                        <li className="note" key={note.id}>
                        <Link to={`/note/${note.id}`}>
                        <h2 className="noteTitle">{note.name}</h2>
                        </Link>
                        <p className="noteInfo">Last modified: {note.modified}</p>
                        <button name="deleteNote" id="deleteNote">Delete note</button>
                        </li>
                    )}
                </ul>

            <button name="addNote" id="addNote">Add note</button>
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
                    <button name="deleteNote" id="deleteNote">Delete note</button>
                    </li>
                )}
            </ul>
            <button name="addNote" id="addNote">Add note</button>
            </section>
    )
  }
}
