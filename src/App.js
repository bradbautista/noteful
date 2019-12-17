import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Header from './Header';
import Nav from './Nav';
import NoteArea from './NoteArea';
import Note from './Note';
import AddFolder from './AddFolder';
import AddNote from './AddNote';
import NotesContext from './NotesContext';
import FoldersError from './FoldersError';
import PropTypes from 'prop-types';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      folders: [
      ],
      notes: [
      ]
    };
  }

  deleteNote = noteId => {

    const newNotes = this.state.notes.filter (note => note.id !== noteId)
    let deleteEndpoint = `http://localhost:9090/notes/${noteId}`;

    fetch(deleteEndpoint, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      },
    })
    .then(res => {
      if (!res.ok) {
        throw new Error(res.status)
      }
      return res.json()
    })
    .catch(error => this.setState({ error }))

    this.setState({
      notes: newNotes
    })

  }

  componentDidMount() {

    let foldersEndpoint = 'http://localhost:9090/folders';
    let notesEndpoint = 'http://localhost:9090/notes';

    Promise.all([
      fetch(foldersEndpoint),
      fetch(notesEndpoint)
    ])
    .then(([folders, notes]) => {
        if (!folders.ok) 
          return notes.json().then(e => Promise.reject(e));
        if (!notes.ok) 
          return notes.json().then(e => Promise.reject(e));
        return Promise.all([folders.json(), notes.json()]);
    })
    .then(([folders, notes]) => {
        this.setState({folders, notes})
      }
    )
    .catch(err => {console.error({err})})
  }

  updateLists = () => {

    let foldersEndpoint = 'http://localhost:9090/folders';
    let notesEndpoint = 'http://localhost:9090/notes';

    Promise.all([
      fetch(foldersEndpoint),
      fetch(notesEndpoint)
    ])
    .then(([folders, notes]) => {
        if (!folders.ok) 
          return notes.json().then(e => Promise.reject(e));
        if (!notes.ok) 
          return notes.json().then(e => Promise.reject(e));
        return Promise.all([folders.json(), notes.json()]);
    })
    .then(([folders, notes]) => {
        this.setState({folders, notes})
      }
    )
    .catch(err => {console.error({err})})

  }


  render() {

    const contextValue = {
      folders: this.state.folders,
      notes: this.state.notes,
      deleteNote: this.deleteNote,
      // addFolder: this.addFolder,
      // addNote: this.addNote,
      updateLists: this.updateLists,
    }

    return (
      <NotesContext.Provider value={contextValue}>
        <div className="App">
          <Header/>
          <main>
              <FoldersError>
              <Route exact path='/' component={Nav} />
              <Route exact path='/' component={NoteArea} />
              <Route path='/folder/:folderId' component={Nav} />
              <Route path='/folder/:folderId' component={NoteArea} />
              <Route path='/note/:noteId' component={Nav} />
              <Route path='/note/:noteId' component={Note} />
              <Route path='/add-folder' component={Nav} />
              <Route path='/add-folder' component={AddFolder} />
              <Route path='/add-note' component={Nav} />
              <Route path='/add-note' component={AddNote} />
              </FoldersError>
          </main>
        </div>
      </NotesContext.Provider>
    );
  }

}

NotesContext.Provider.propTypes = {
  value: PropTypes.object,
}

export default App;