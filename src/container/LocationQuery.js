import React, {Component} from 'react'
import '../css/components/buttons.css'
import '../css/containers/query-component.css'
import LocationQueryLiveModal from '../components/custom-modals/LocationQueryLiveModal'
import Modal from "../components/custom-modals/modal-part/Modal";
import L from 'leaflet'
import {CAR_DOES_NT_EXIST_TEXT} from '../constants/text/TextConstants'
import {GET_CURRENT_LOCATION} from '../constants/api/ApiAddresses'
import '../css/components/maps.css'

class LocationQuery extends Component {

    style = {
        marginTop: '20px'
    };

    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            spinnerIsLoading: false,
            infoIsNotAvailable: false,
            lat: 0,
            lng: 0,
            myMap: null,
            position_lat: 0,
            position_lng: 0,
            locationCreatorModalInfo: {
                plateNumber: 11111,
                plateChar: 'الف',
                plateCode: '10',
                year: 1300,
                month: 1,
                day: 1
            }
        };
        this.marker = {};
    }

    componentDidMount() {
        this.geoLocation()
    }


    geoLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                this.setState({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                    position_lat: position.coords.latitude,
                    position_lng: position.coords.longitude,
                }, () => {
                    this.creatingMap()
                })
            });
        } else {
            this.setState({
                lat: 0,
                lng: 0
            }, () => {
                this.creatingMap()
            })
        }
    };

    creatingMap = () => {
        let myMap = L.map('map');
        myMap.setView([this.state.lat, this.state.lng], 13);
        L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiYW1iYXFpbmVqYWQiLCJhIjoiY2p5eXFjZ3ViMHRsNzNubzFjd291ZjdodSJ9.ulv6PXnKPuO_Nl3-kt3R4Q', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox.streets',
            accessToken: 'pk.eyJ1IjoiYW1iYXFpbmVqYWQiLCJhIjoiY2p5eXFjZ3ViMHRsNzNubzFjd291ZjdodSJ9.ulv6PXnKPuO_Nl3-kt3R4Q'
        }).addTo(myMap);
        this.setState({myMap: myMap}, () => {
            this.manipulateMap(this.state.myMap)
        })
    };

    manipulateMap = (myMap) => {
        if (this.marker !== undefined) {
            myMap.removeLayer(this.marker);
        }
        myMap.setView([this.state.lat, this.state.lng], 13);
        this.marker = L.marker([this.state.lat, this.state.lng])
            .addTo(myMap);
    };


    showModal = () => {
        this.setState({showModal: true})
    };

    hideModal = () => {
        this.setState({showModal: false})
    };

    modalRegisterHandler = () => {
        if (this.state.locationCreatorModalInfo.plateNumber < 11111 ||
            this.state.locationCreatorModalInfo.plateNumber > 99999) {
            alert("شماره باید ۵ رقمی باشد")
        } else {
            if (this.state.locationCreatorModalInfo.year < 1300 ||
                this.state.locationCreatorModalInfo.year > 1500) {
                alert("سال باید مقداری بین ۱۳۰۰ تا ۱۵۰۰ داشته باشد")
            } else {
                if (this.state.locationCreatorModalInfo.plateCode === "") {
                    alert("کد پلاک را مشخص کنید")
                } else {
                    this.setState({
                        spinnerIsLoading: true,
                        infoIsNotAvailable: false
                    });
                    let plateNumber = ""+this.state.locationCreatorModalInfo.plateNumber +
                        this.state.locationCreatorModalInfo.plateCode;
                    let plateChar = this.state.locationCreatorModalInfo.plateChar;
                    let year = this.state.locationCreatorModalInfo.year;
                    let month = this.state.locationCreatorModalInfo.month;
                    let day = this.state.locationCreatorModalInfo.day;
                    let data = new FormData();
                    data.append('plate_char', plateChar);
                    data.append('plate_num', plateNumber);
                    data.append('year', year);
                    data.append('month', month);
                    data.append('day', day);
                    console.log(data);
                    this.handleQuery(data);
                }
            }
        }
    };

    handleQuery = (data) => {
        let xhr = new XMLHttpRequest();
        xhr.open('POST', GET_CURRENT_LOCATION, true);
        xhr.onload = () => {
            if (xhr.responseText.toString() === CAR_DOES_NT_EXIST_TEXT) {
                this.setState({
                    lat: this.state.position_lat,
                    lng: this.state.position_lng,
                    infoIsNotAvailable: true,
                    spinnerIsLoading: false
                }, () => {
                    this.manipulateMap(this.state.myMap)
                })
            } else {
                let object = JSON.parse(xhr.responseText);
                this.setState({
                    lng: object["longitude"],
                    lat: object["latitude"],
                    spinnerIsLoading: false,
                    infoIsNotAvailable: false,
                    showModal: false
                }, () => {
                    this.manipulateMap(this.state.myMap)
                })
            }
        };
        xhr.send(data);
    };

    change = (event) => {
        let info = {...this.state.locationCreatorModalInfo};
        switch (event.target.id) {
            case 'plate-query-form-plate-number':
                info.plateNumber = event.target.value; break;
            case 'plate-query-form-plate-code':
                info.plateCode = event.target.value; break;
            case 'plate-query-form-plate-char':
                info.plateChar = event.target.value; break;
            case 'plate-query-form-year':
                info.year = event.target.value; break;
            case 'plate-query-form-month':
                info.month = event.target.value; break;
            case 'plate-query-form-day':
                info.day = event.target.value; break;
            default:
                console.log('default')
        }
        this.setState({locationCreatorModalInfo: info})
    };

    render() {
        return (
            <div>
                <div
                    dir={'rtl'}
                    className='container location-query-container'>
                    <div className='row'>
                        <div className='col-12'>
                            <button
                                className='smart-road-buttons query-buttons'
                                onClick={this.showModal}>
                                استعلام مکان
                            </button>
                        </div>
                    </div>
                    <div className='row' style={this.style}>
                        <div className='col-lg-6 modal-section-in-queries'>
                            <LocationQueryLiveModal
                                spinnerIsLoading={this.state.spinnerIsLoading}
                                infoIsNotAvailable={this.state.infoIsNotAvailable}
                                locationCreatorModalInfo={this.state.locationCreatorModalInfo}
                                modalRegisterHandler={this.modalRegisterHandler}
                                locationCreatorModalChangeHandler={this.change}/>
                        </div>
                        <div className='col-sm-12 col-lg-6 map-section-in-queries' style={this.style}>
                            <div id={'map'}>

                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <Modal
                        show={this.state.showModal}
                        whichModal={"استعلام مکان خودرو"}
                        typeOfModal={'location-query'}
                        modalRegisterHandler={this.modalRegisterHandler}
                        modalCloseHandler={this.hideModal}
                        locationCreatorModalInfo={this.state.locationCreatorModalInfo}
                        spinnerIsLoading={this.state.spinnerIsLoading}
                        infoIsNotAvailaible={this.state.infoIsNotAvailable}
                        locationCreatorModalChangeHandler={this.change}/>
                </div>
            </div>
        )
    }
}

export default LocationQuery