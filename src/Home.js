import React, { Component } from 'react';
import Note from './Note'
// import { Link } from 'react-router-DOM'

class Home extends Component {

  constructor(){
    super()
    this.state = {
      notes: [],
      subject:'',
      noteValue:''
    }
  }

    getNotes = () => {
    fetch("http://localhost:3000/notes")
    .then(res => res.json())
    .then(notes => this.setState({
      notes: notes
    }))
  }

  componentDidMount = () => {
    this.getNotes()
  }

  handleSubmit = () => {
    fetch('http://localhost:3000/notes', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        subject: this.state.subject,
        noteValue: this.state.noteValue
      })
    })
  }

handleDelete = (id) => {
  fetch(`http://localhost:3000/notes/${id}`, { 
  method: 'DELETE' 
})
.then(res => res.json())
.then(res => this.getNotes())
}

  handleChange = e => {
    e.persist()
    if(e.target.type === "select-one"){
      this.setState({ subject: e.target.value})
    } else { 
      this.setState({
        noteValue: e.target.value
      })
    }
  }

  handleEdit = (note) => {
    this.props.history.push({pathname: `/subject/${note.id}` })
  }

  
  render() {
    const displayNotes = this.state.notes.filter( note => this.state.subject == note.subject )
    const listNotes =  displayNotes.map((note) => {
    return (
    <div>
      <li>{note.noteValue}</li>
      <button onClick={() => this.handleEdit(note)}>Edit</button>
      <button onClick={() => this.handleDelete(note.id)}>Delete</button>
    </div>
       )
    })

    return(
<div>
  <div>
      <center>
        <p style={{fontSize:"80px"}}>Jot</p>
      </center>
  </div>

  <div>
    <h2>See latest Notes for:</h2>
    <select value={this.state.subject} onChange={this.handleChange} >
      <option value="Algebra">Algebra</option>
      <option value="History">History</option>
      <option value="Music">Music</option>
      <option value="Geography">Geography</option>
      <option value="Economics">Economics</option>
    </select>
  </div>

  <div>
    <ul>
      <li>{listNotes}</li><br/>
    </ul>
  </div>
  
  <div>
      <Note handleSubmit={this.handleSubmit} handleChange={this.handleChange}/>
  </div>

</div>

    )
  }
}

export default Home;
