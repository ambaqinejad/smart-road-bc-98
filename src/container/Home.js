import React, {Component} from 'react'
import Modal from '../components/custom-modals/modal-part/Modal'
import SearchBox from '../components/SearchBox'
import Spinner from '../components/Spinner'
import RoadsCardList from '../components/RoadsCardsList'
import InfoNotAvailable from '../components/InfoNotAvailable'
import {CREATE_ROAD_URL, GET_ROADS_URL} from '../constants/api/ApiAddresses'
import {ROAD_CREATE_SUCCESSFULLY_TEXT} from '../constants/text/TextConstants'
import '../css/components/buttons.css'

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchBoxContent: "",
            roads: [],
            spinnerIsLoading: true,
            showModal: false,
            registerSpinnerIsLoading: false,
            infoIsNotAvailable: false,
            roadCreatorModalInfo: {
                roadId: 0,
                source: '',
                destination: '',
                province: 'آذربایجان شرقی'
            }
        };
    }


    componentDidMount() {
        this.getRoadsInfosFromServer()
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
        if (this.state.roadCreatorModalInfo.roadId === "" ||
            this.state.roadCreatorModalInfo.source === "" ||
            this.state.roadCreatorModalInfo.destination === "") {
            alert("لطفا مقادیر خواسته شده را وارد نمایید")
        } else {
            this.setState({
                registerSpinnerIsLoading: true,
                infoIsNotAvailable: false
            });
            let province = this.state.roadCreatorModalInfo.province;
            let road_id = this.state.roadCreatorModalInfo.roadId;
            let source = this.state.roadCreatorModalInfo.source;
            let destination = this.state.roadCreatorModalInfo.destination;
            console.log(province)
            console.log(road_id)
            console.log(source)
            console.log(destination)
            let data = new FormData();
            data.append('road_id', road_id);
            data.append('province', province);
            data.append('source', source);
            data.append('destination', destination);
            console.log(data);
            this.handleQuery(data);
        }
    };

    handleQuery = (data) => {
        let xhr = new XMLHttpRequest();
        xhr.open('POST', CREATE_ROAD_URL, true);
        xhr.onload = () => {
            if (xhr.responseText === ROAD_CREATE_SUCCESSFULLY_TEXT) {
                this.getRoadsInfosFromServer();
                this.setState({
                    registerSpinnerIsLoading: false,
                    showModal: false
                })
            } else {
                this.setState({
                    registerSpinnerIsLoading: false,
                    infoIsNotAvailable: true
                })
            }
        };
        xhr.send(data);
    };

    change = (event) => {
        let info = {...this.state.roadCreatorModalInfo};
        switch (event.target.id) {
            case 'road-creator-form-road-id':
                info.roadId = event.target.value; break;
            case 'road-creator-form-source':
                info.source = event.target.value; break;
            case 'road-creator-form-destination':
                info.destination = event.target.value; break;
            case 'road-creator-form-province':
                info.province = event.target.value; break;
            default:
                console.log('default')
        }
        this.setState({roadCreatorModalInfo: info})
    };

    render() {
        let filterWay = [...this.state.roads];
        filterWay = filterWay.filter((way) => {
            let way_name = way["source"] + "-" + way["destination"];
            return way_name.toLowerCase().includes(this.state.searchBoxContent);
        });
        return (
            <div>
                <div dir={'rtl'}>
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
                        ? <InfoNotAvailable
                            message={'اطلاعات جاده ها در دسترس نمی باشد!'}/>
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
                    roadCreatorModalInfo={this.state.roadCreatorModalInfo}
                    spinnerIsLoading={this.state.registerSpinnerIsLoading}
                    infoIsNotAvailaible={this.state.infoIsNotAvailable}
                    roadCreatorModalChangeHandler={this.change}/>
            </div>
        )
    }
}

export default Home;