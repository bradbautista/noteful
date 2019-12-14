import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom';
import NotesContext from './NotesContext';
import PropTypes from 'prop-types';
import './Nav.css';

class Nav extends Component {

    static contextType = NotesContext;

    render() {

        const noteId = this.props.match.params.noteId;
        let selectedNote = this.context.notes.filter((note) => {
            return note.id === noteId
        })
        const folderId = this.props.match.params.folderId

        return (

            // If no note has been selected, return a list of folders
            (selectedNote[0] === undefined)
            ?   <nav className="nav">
                    <ul className="folderList">
                        {this.context.folders.map(folder =>
                        // If the ID of the folder being mapped matches the
                        // folderID param, class it as selected to apply
                        // CSS letting user know it has been selected
                        (folderId === folder.id)
                        ?   <li className="selectedFolder" key={folder.id}>
                                <Link to={`/folder/${folder.id}`}>
                                {folder.name}
                                </Link>
                            </li>
                        :   <li className="folder" key={folder.id}>
                                <Link to={`/folder/${folder.id}`}>
                                {folder.name}
                                </Link>
                            </li>
                        )}
                    </ul>
                    <Link to={'/add-folder'} className="addFolder__btn">
                        Add folder
                    </Link>
                </nav>

            // If a note has been selected, display the name of the folder it
            // is in and a back button
            :   <nav className="nav">
                <ul className="folderList">
                    {/* This maps the one-note array using the same logic as above */}
                    {selectedNote.map(note =>
                    <li className="folder" key={note.folderId}>
                        {/* But because we're mapping that and not the folders array and we need to display only the relevant folder, we run a find on the folders array and display the .name of the object that is returned when that find matches the relevant folderId */}
                        {this.context.folders.find(folder => folder.id === selectedNote[0].folderId).name}
                    </li>
                    )}
                </ul>
                <button type="button" name="backButton" id="backButton" onClick={() => {this.props.history.push('/')}}>Go back</button>
                </nav>
        )
    }
}

Nav.defaultProps = {
    noteId: '1',
    folderId: '1'
}
  
Nav.propTypes = {
    noteId: PropTypes.string.isRequired,
    folderId: PropTypes.string.isRequired,
};

NotesContext.Consumer.propTypes = {
    value: PropTypes.object,
}

export default withRouter(Nav);