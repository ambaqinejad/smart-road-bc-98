import React, {Component} from 'react'
import FakePlate from '../components/FakePlate'
import SearchBox from '../components/SearchBox'
import RoadCard from '../components/RoadCard'
import {GET_ROADS_URL} from '../constants/api/ApiAddresses'


class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            searchBoxContent: "",
            roads: []
        }
    }


    componentDidMount() {
        this.getRoadsInfosFromServer()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.getRoadsInfosFromServer()
    }

    onSearchBoxContentChange = (event) => {
        this.setState({searchBoxContent: event.target.value});
    };

    getRoadsInfosFromServer = () => {
        fetch(GET_ROADS_URL)
            .then(data => data.json())
            .then(roads => this.setState({roads: roads}))
    };

    render() {
        return (
            <div>
                <FakePlate/>
                <SearchBox
                    onChange={this.onSearchBoxContentChange}/>
                <RoadCard/>
                <RoadCard/>
                <RoadCard/>
                <RoadCard/>
                <RoadCard/>
                <RoadCard/>
                <RoadCard/>
                <RoadCard/>
                <RoadCard/>
            </div>
        )
    }
}

export default Home;