import React from 'react';
import ReactDOM from 'react-dom';
import Home from './Home';
import Subject from './Subject';
import Note from './Note';
import { BrowserRouter as Router, Route } from 'react-router-dom';


ReactDOM.render((
<Router>
    <React.Fragment>
    <Route exact path="/Home" component={Home} />
    <Route exact path="/subject/:id" component={Subject} />
    <Route exact path="/note" component={Note} />
    </React.Fragment>
</Router>),
document.getElementById('root')
)


