import React, {Component} from 'react'
import Modal from '../components/custom-modals/modal-part/Modal'
import FakePlate from '../components/FakePlate'
import SearchBox from '../components/SearchBox'
import Spinner from '../components/Spinner'
import RoadsCardList from '../components/RoadsCardsList'
import {GET_ROADS_URL} from '../constants/api/ApiAddresses'
import '../css/containers/home.css'
import '../css/components/buttons.css'


class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            searchBoxContent: "",
            roads: [],
            spinnerIsLoading: true,
            showModal: false
        }
    }


    componentDidMount() {
        this.getRoadsInfosFromServer()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        // this.getRoadsInfosFromServer()
    }

    onSearchBoxContentChange = (event) => {
        this.setState({searchBoxContent: event.target.value});
    };

    getRoadsInfosFromServer = () => {
        fetch(GET_ROADS_URL)
            .then(data => data.json())
            .then(roads => this.setState(
                {
                    roads: roads,
                    spinnerIsLoading: false
                }
            ))
            .catch((error) => {
                console.log(error);
                this.setState(
                    {
                        spinnerIsLoading: false
                    }
                )
            })

    };


    goToCameraPageClick = (id, province) => {

    };

    showModal = () => {
        this.setState({showModal: true})
    };

    hideModal = () => {
        this.setState({showModal: false})
    };

    render() {
        return (
            <div>
            <div>
                <FakePlate/>
                <SearchBox
                    onChange={this.onSearchBoxContentChange}/>
                <button
                    className='smart-road-buttons'
                    onClick={this.showModal}>
                    ایجاد محور
                </button>
                <Spinner isLoading={this.state.spinnerIsLoading}/>
                {!this.state.spinnerIsLoading
                    ? <div dir={'rtl'}>
                        <h5 className='no-access-to-data'>
                            اطلاعات جاده ها در دسترس نمی باشد!
                        </h5>
                    </div>
                    : <RoadsCardList
                        roadData={this.state.roads}
                        goToCameraPageClick={this.goToCameraPageClick}/>
                }
            </div>
                <Modal
                    show={this.state.showModal}
                    whichModal={"ایجاد مسیر جدید"}
                    typeOfModal={'road'}
                    modalRegisterHandler={null}
                    modalCloseHandler={this.hideModal}/>
            </div>
        )
    }
}

export default Home;