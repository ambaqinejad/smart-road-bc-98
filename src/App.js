import React, {Component} from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import NavigationBar from './components/NavigationBar'
import Home from './container/Home'


class App extends Component {

    render() {
        return (
            <Router>
                <div className="App">
                    <NavigationBar/>
                    <Switch>
                        <Route exact path='/' component={Home}/>
                        <Route path='/path-query' component={''}/>
                        <Route path='/plate-query' component={''}/>
                    </Switch>
                </div>
            </Router>

        );
    }
}

export default App;
