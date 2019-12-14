import React, { Component } from 'react'
import NotesContext from './NotesContext'
import ValidationError from './ValidationError'
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
                value: ''
            },
        }
    }
  
    static contextType = NotesContext;


  
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

    updateName(name) {
        this.setState({notename: {value: name, touched: true}});
    }

    updateNoteText(text) {
        this.setState({notetext: {value: text, touched: true}});
    }

    updateFolder(selection) {
        this.setState({foldername: {value: selection}});
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
            this.setState({foldername: {value: this.context.folders[0].name}})
          }, 400);    
    }
  
    render() {

    const Required = () => (
    <span className="inputField__required">*</span>
    )

    const folderOptions = this.context.folders.map((folder, i) => {

        return (
        <option value={folder.name} key={folder.id}>
        {folder.name}
        </option>
        )
    })

    // console.log(this.context.folders)
  
    // const { error } = this.state
      
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
            
            <div>

            <label htmlFor="folderSelect">
                Choose a folder
                {' '}
                <Required />
            </label>
            <select 
                name="folders" 
                id="folderSelect" 
                onChange={e => this.updateFolder(e.target.value)}
            >
                {folderOptions}
            </select>
                
            </div>

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


            <div className="AddNote__buttons">
            <button 
                type="submit" 
                name="saveAddNote" 
                id="saveAddNote"
                onClick={() => {console.log(this.context.folders[0])}}
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


export default AddNote