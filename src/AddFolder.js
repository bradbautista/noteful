import React, { Component } from 'react';
import NotesContext from './NotesContext';
import ValidationError from './ValidationError';
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
    
    handleSubmit = e => {
      e.preventDefault()
      console.log('Wire me daddy')
      // get the form fields from the event
    //   const { title, url, description, rating } = e.target
    //   const bookmark = {
    //     title: title.value,
    //     url: url.value,
    //     description: description.value,
    //     rating: rating.value,
    //   }
    //   this.setState({ error: null })
    //   fetch(config.API_ENDPOINT, {
    //     method: 'POST',
    //     body: JSON.stringify(bookmark),
    //     headers: {
    //       'content-type': 'application/json',
    //       'authorization': `bearer ${config.API_KEY}`
    //     }
    //   })
    //     .then(res => {
    //       if (!res.ok) {
    //         // get the error message from the response,
    //         return res.json().then(error => {
    //           // then throw it
    //           throw error
    //         })
    //       }
    //       return res.json()
    //     })
    //     .then(data => {
    //       title.value = ''
    //       url.value = ''
    //       description.value = ''
    //       rating.value = ''
    //       this.props.history.push('/')
    //       this.context.AddBookmark(data)
    //     })
    //     .catch(error => {
    //       this.setState({ error })
    //     })
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
            {/* <div className='AddBookmark__error' role='alert'>
            {error && <p>{error.message}</p>}
            </div> */}

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
                placeholder="New folder"
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
                onClick={() => {console.log('Wire me, daddy')}}
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


export default AddFolder