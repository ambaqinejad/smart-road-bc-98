import React, {Component} from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import NavigationBar from './components/NavigationBar'
import Home from './container/Home'
import Camera from './container/Camera'
import LocationQuery from './container/LocationQuery'
import PathQuery from './container/PathQuery'
import FakePlate from './components/FakePlate'


class App extends Component {

    render() {
        return (
            <Router>
                <div className="App">
                    <NavigationBar/>
                    <FakePlate/>
                    <Switch>
                        <Route exact path='/' component={Home}/>
                        <Route path='/camera' component={Camera}/>
                        <Route path='/location-query' component={LocationQuery}/>
                        <Route path='/path-query' component={PathQuery}/>
                    </Switch>
                </div>
            </Router>

        );
    }
}

export default App;
