import React, { Component } from 'react';
import './FoldersError.css'

class FoldersError extends Component {

    constructor(props) {
        super(props);
        this.state = {
          hasError: false
        };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    render() {
        
        if (this.state.hasError) {      
          return (
            <p className="foldersError">Error: Folders and/or notes could not be loaded. Either the server is offline, you are offline or something is broken. Please wait and try again.</p>
          );
        }
        return this.props.children;
    } 
}

export default FoldersError;