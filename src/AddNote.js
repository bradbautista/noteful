import React, { Component } from 'react'
import NotesContext from './NotesContext'
import ValidationError from './ValidationError'
import PropTypes from 'prop-types';
import './AddNote.css'

class AddNote extends Component {

    constructor(props) {
        super(props);
        this.state = {
            notename: {
              value: '',
              touched: false,
            },
            notetext: {
                value: '',
                touched: false,
            },
            foldername: {
                value: '',
                optionid: '',
            },
        }
    }
  
    static contextType = NotesContext;
  
    handleSubmit = (e) => {

        e.preventDefault()
        
        //  generate a (probably) unique ID
        let uid = Math.floor((Math.random() * 9999999) * (Math.random() * 9999999) * (Math.random() * 9999999))

        // Annoying date stuff
        let currentdate = new Date();
        let datetime = "Last modified: " + currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();

        const note = {
            id: uid.toString(),
            name: this.state.notename.value,
            modified: datetime,
            folderId: this.state.foldername.optionid,
            content: this.state.notetext.value,
        }

        console.log(note);

        //   this.setState({ error: null })

        fetch(`http://localhost:9090/notes/`, {
            method: 'POST',
            body: JSON.stringify(note),
            headers: {
            'content-type': 'application/json',
            }
        })
        .then(res => {
            if (!res.ok) {
                // get the error message from the response,
                return res.json().then(error => {
                // then throw it
                throw error
                })
            }
            return res.json()
        })
        .then(data => {
            this.setState({
                notename: {value: '', touched: false},
                notetext: {value: '', touched: false},
            });
            this.props.history.push('/')
            window.location.reload(false);
        })
        .catch(error => {
            alert(error.toString());
        })
    }

    updateName(name) {
        this.setState({notename: {value: name, touched: true}});
    }

    updateNoteText(text) {
        this.setState({notetext: {value: text, touched: true}});
    }

    updateFolder(e) {

        let index = e.target.selectedIndex;
        let optionElement = e.target.childNodes[index];
        let option = optionElement.getAttribute('id');

        this.setState({foldername: {value: e.target.value, optionid: option}});
    }

    validateNoteName(fieldValue) {
        const name = this.state.notename.value.trim();
        if (name.length === 0) {
          return 'Name is required';
        }
    }

    validateNoteText(fieldValue) {
        const text = this.state.notetext.value.trim();
        if (text.length === 0) {
          return 'No blank notes!';
        }
    }

    // To be tidy and make it easier to get the select value,
    // and also to avoid a case where the user submits without
    // selecting, we need it to be something other than null, but 
    // it can't be a default string in case the user deletes all
    // default values, SO, wait until we've got context data
    // available, then set it to the first folder name that appears

    componentDidMount() {

        setTimeout(() => {
            this.setState({foldername: {value: this.context.folders[0].name, optionid: this.context.folders[0].id}})
        }, 600);    
    }
  
    render() {



    // Establish asterisk component
    const Required = () => (
    <span className="inputField__required">*</span>
    )

    // Define options for our select input
    const folderOptions = this.context.folders.map((folder, i) => {

        return (
        <option value={folder.name} key={folder.id} id={folder.id}>
        {folder.name}
        </option>
        )
    })
    
    // Our form
    return (

        <section className="AddNote">

        <h3 className="AddNote__heading">Add a note</h3>

        <form
            className="AddNote__form"
            onSubmit={this.handleSubmit}
        >
            {/* <div className='AddBookmark__error' role='alert'>
            {error && <p>{error.message}</p>}
            </div> */}

            {/* NAME INPUT */}
            <div>
            <label htmlFor="noteName">
                Note title
                {' '}
                <Required />
            </label>
            <input
                type="text"
                name="noteName"
                id="noteName"
                placeholder="New note"
                onChange={e => this.updateName(e.target.value)}
                required
            />
            {this.state.notename.touched && (
                    <ValidationError message={this.validateNoteName()} />
            )}
            </div>
            
            {/* SELECT INPUT */}
            <div>
            <label htmlFor="folderSelect">
                Choose a folder
                {' '}
                <Required />
            </label>
            <select 
                name="folders" 
                id="folderSelect"   
                onChange={e => this.updateFolder(e)}
            >
                {folderOptions}
            </select>
            </div>

            {/* NOTE TEXT INPUT */}
            <div>
            <label htmlFor="noteText">
                Note text
                {' '}
                <Required />
            </label>
            <textarea
                name="noteText"
                id="noteText"
                placeholder="Beans, greens, potatoes, tomatoes"
                onChange={e => this.updateNoteText(e.target.value)}
                required
            />
            {this.state.notetext.touched && (
                    <ValidationError message={this.validateNoteText()} />
            )}
            </div>

            {/* BUTTONS */}
            <div className="AddNote__buttons">
            <button 
                type="submit" 
                name="saveAddNote" 
                id="saveAddNote"
                onClick={(e) => {this.handleSubmit(e)}}
                disabled={
                    this.validateNoteText() ||
                    this.validateNoteName()
                }
            >
                Save
            </button>
            <button 
                type="button" 
                name="cancelAddNote" 
                id="cancelAddNote" 
                onClick={() => {this.props.history.push('/')}}
            >
                Cancel
            </button>
            </div>
        </form>
        </section>
    );
    }   
}

NotesContext.propTypes = {
    value: PropTypes.object,
}

export default AddNote