import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './Header.css'

export default class Header extends Component {
  render() {
    return (
        <header>
        <Link to='/'><h1>Noteful</h1></Link>
        {/* <h1>Noteful</h1> */}
        </header>
    )
  }
}
