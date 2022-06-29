import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Home from './routes/Home'
import Register from './routes/Register'
import Login from './routes/Login'
import './App.css';

const App = () => {
    return(
        <Router>      
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
            </Switch>
        </Router>
    )
}
export default App;