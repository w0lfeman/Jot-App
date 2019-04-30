import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'

const link = {
    width: '100px',
    padding: '12px',
    margin: '0 6px 6px',
    background: 'blue',
    textDecoration: 'none',
    color: 'white',
  }

class Subject extends Component {

    constructor(props){
        super(props)
        this.state = {
            note: {}
        }
    }


    getData = () => {
        let id = this.props.match.params.id

        fetch(`http://localhost:3000/notes/${id}`)
        .then(res => res.json())
        .then(note => this.setState({
          note: note
        }))
      }

      componentDidMount = () => {
          this.getData()
      }

    handleEdit = (e) => {
        this.setState({note: { ...this.state.note, noteValue: e.target.value }})
    }

    handleEditSubmit = (e) => {
        e.preventDefault()
        fetch(`http://localhost:3000/notes/${this.props.match.params.id}`, {
        headers: { "Content-Type": "application/json" },
        method: 'PATCH',
        body: JSON.stringify({
          noteValue: this.state.note.noteValue
        })
      })
      }

render() {

    return (
<div>
        <div>
              <NavLink
             to="/Home"
             exact
             style={link}
             activeStyle={{
              background: 'darkblue'
              }}
             >Back to Home</NavLink>
         </div>

         <div>
            <h1>Edit Note</h1>
         </div>

         <div>
            <form onSubmit={(e) => this.handleEditSubmit(e)}>
                <textarea  rows="30" cols="80" onChange={(e) => this.handleEdit(e) } value={this.state.note.noteValue} />
                <input type="submit" value="Submit" />
            </form>
        </div>
</div>

        );
    }
}

export default Subject