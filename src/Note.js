import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'


class Note extends Component {

    render() {
        
    return (
    <div>
        <h1>Create a New Note for selected subject:</h1>

        <div>
            <form onSubmit={this.props.handleSubmit}>
                <textarea  rows="30" cols="80" onChange={e => this.props.handleChange(e)} />
                 <input type="submit" value="Submit" />
            </form>
        </div>

    </div>

        )
    }
}

export default Note