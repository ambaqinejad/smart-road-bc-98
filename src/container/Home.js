import React, {Component} from 'react'
import Modal from '../components/custom-modals/modal-part/Modal'
import SearchBox from '../components/SearchBox'
import Spinner from '../components/Spinner'
import RoadsCardList from '../components/RoadsCardsList'
import {CREATE_ROAD_URL, GET_ROADS_URL} from '../constants/api/ApiAddresses'
import {ROAD_CREATE_SUCCESSFULLY_TEXT} from '../constants/text/TextConstants'
import '../css/containers/intersections.css'
import '../css/components/buttons.css'


class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            searchBoxContent: "",
            roads: [],
            spinnerIsLoading: true,
            showModal: false
        };

        this.roadIdRef = React.createRef();
        this.sourceRef = React.createRef();
        this.destinationRef = React.createRef();
        this.provinceRef = React.createRef();
        this.roadCreatorModalInfo = {
            roadIdRef: this.roadIdRef,
            sourceRef: this.sourceRef,
            destinationRef: this.destinationRef,
            provinceRef: this.provinceRef
        }
    }


    componentDidMount() {
        this.getRoadsInfosFromServer()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

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
        console.log(id);
        this.props.history.push({
                pathname: '/camera',
                state: {road_id: id, province: province}
            }
        );
    };

    showModal = () => {
        this.setState({showModal: true})
    };

    hideModal = () => {
        this.setState({showModal: false})
    };

    modalRegisterHandler = () => {
        if (this.roadIdRef.value === ""
            || this.sourceRef.value === "" || this.destinationRef.value === "") {
            alert("لطفا مقادیر خواسته شده را وارد نمایید")
        } else {
            let province = this.provinceRef.current.value;
            let road_id = this.roadIdRef.current.value;
            let source = this.sourceRef.current.value;
            let destination = this.destinationRef.current.value;
            let data = new FormData();
            data.append('road_id', road_id);
            data.append('province', province);
            data.append('source', source);
            data.append('destination', destination);
            console.log(data);
            this.handleQuery(data);
            this.setState({showModal: false})
        }
    };

    handleQuery = (data) => {
        let xhr = new XMLHttpRequest();
        xhr.open('POST', CREATE_ROAD_URL, true);
        xhr.onload = () => {
            // do something to response
            let object = JSON.parse(xhr.responseText);
            if (xhr.responseText === ROAD_CREATE_SUCCESSFULLY_TEXT) {
                this.getRoadsInfosFromServer()
            } else {

            }
        };
        xhr.send(data);
    };

    render() {
        let filterWay = [...this.state.roads];
        filterWay = filterWay.filter((way) => {
            let way_name = way["source"] + "-" + way["destination"];
            return way_name.toLowerCase().includes(this.state.searchBoxContent);
        });
        return (
            <div>
                <div>

                    <SearchBox
                        whichSearchBox={'جستجو بر اساس نام محور'}
                        onChange={this.onSearchBoxContentChange}/>
                    <button
                        className='smart-road-buttons'
                        onClick={this.showModal}>
                        ایجاد محور
                    </button>
                    <Spinner isLoading={this.state.spinnerIsLoading}/>
                    {(this.state.roads.length === 0 && !this.state.spinnerIsLoading)
                        ? <div dir={'rtl'}>
                            <h5 className='no-access-to-data'>
                                اطلاعات جاده ها در دسترس نمی باشد!
                            </h5>
                        </div>
                        : <RoadsCardList
                            roadData={filterWay}
                            goToCameraPageClick={this.goToCameraPageClick}/>
                    }
                </div>
                <Modal
                    show={this.state.showModal}
                    whichModal={"ایجاد مسیر جدید"}
                    typeOfModal={'road'}
                    modalRegisterHandler={this.modalRegisterHandler}
                    modalCloseHandler={this.hideModal}
                    roadCreatorModalInfo={this.roadCreatorModalInfo}
                    locationCreatorModalInfo={null}
                    cameraCreatorModalInfo={null}/>
            </div>
        )
    }
}

export default Home;