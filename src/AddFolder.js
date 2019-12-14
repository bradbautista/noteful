import React, { Component } from 'react';
import NotesContext from './NotesContext';
import ValidationError from './ValidationError';
import PropTypes from 'prop-types';
import './AddFolder.css';

class AddFolder extends Component {

    // Establish state to track folder name
    constructor(props) {
        super(props);
        this.state = {
            foldername: {
                value: '',
                touched: false,
            },
        }
    }
  
    static contextType = NotesContext;

    
    // Form submission logic
    
    handleSubmit = (e) => {

        e.preventDefault()
        
        //  generate a (probably) unique ID
        let uid = Math.floor((Math.random() * 9999999) * (Math.random() * 9999999) * (Math.random() * 9999999))

        const folder = {
            id: uid.toString(),
            name: this.state.foldername.value,
        }

        fetch(`http://localhost:9090/folders/`, {
            method: 'POST',
            body: JSON.stringify(folder),
            headers: {
            'content-type': 'application/json',
            }
        })
        .then(res => {
            if (!res.ok) {
                // Get the error message from the response,
                return res.json().then(error => {
                // then throw it
                throw error
                })
            }
            return res.json()
        })
        .then(data => {
          this.setState({foldername: {value: '', touched: false}});
          window.location.reload(false);
        })
        .catch(error => {
            alert(error.toString());
        })
    }

    
    // Dynamic name updates
    updateName(name) {
        this.setState({foldername: {value: name, touched: true}});
    }

    // Folder name validation
    validateFolderName(fieldValue) {
        const name = this.state.foldername.value.trim();
        if (name.length === 0) {
          return 'Please give the folder a name';
        }
    }
  

    render() {

    // Asterisk component
    const Required = () => (
    <span className="inputField__required">*</span>
    )
          
    // Our form  
    return (

        <section className="AddFolder">
        <h3 className="AddFolder__heading">Add a folder</h3>

        {/* FOLDER NAME INPUT */}
        <form
            className="AddFolder__form"
            onSubmit={this.handleSubmit}
        >

            <div>
            <label htmlFor="folderName">
                Folder name
                {' '}
                <Required />
            </label>
            <input
                type="text"
                name="folderName"
                id="folderName"
                value={this.state.foldername.value}
                onChange={e => this.updateName(e.target.value)}
                required
            />
            {this.state.foldername.touched && (
                <ValidationError message={this.validateFolderName()} />
            )}
            </div>

            {/* SAVE / CANCEL BUTTONS */}
            <div className="AddFolder__buttons">
            <button 
                type="submit" 
                name="saveAddFolder" 
                id="saveAddFolder"
                onClick={(e) => {this.handleSubmit(e)}}
                disabled={
                    this.validateFolderName()
                }
            >
                Save
            </button>

            <button 
                type="button" 
                name="cancelAddFolder" 
                id="cancelAddFolder" 
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

export default AddFolder