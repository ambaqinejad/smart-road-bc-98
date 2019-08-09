import React, {Component} from 'react'
import '../css/components/buttons.css'
import '../css/containers/query-component.css'
import PathQueryLiveModal from '../components/custom-modals/PathQueryLiveModal'
import Modal from '../components/custom-modals/modal-part/Modal'
import L from "leaflet";
import 'leaflet-routing-machine'
import {GET_PATH_URL} from '../constants/api/ApiAddresses'
import {CAR_DOES_NT_EXIST_TEXT} from '../constants/text/TextConstants'
import '../css/components/maps.css'


class PathQuery extends Component {

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
            locations: [],
            speeds: [],
            position_lat: 0,
            position_lng: 0,
            pathCreatorModalInfo: {
                plateNumber: 11111, plateChar: 'الف',
                plateCode: 10, year: 1300, month: 1,
                day: 1, hour: 0, minute: 0
            }
        };
        this.routingControl = null;
        this.markers = null;
        this.popups = null;
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
        let myMap = L.map('routing-map');
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

    removeMarkersAndPopups(myMap) {
        myMap.closePopup();
        if (this.markers !== null) {
            for (let i = 0; i < this.markers.length; i++) {
                myMap.removeLayer(this.popups[i]);
                myMap.removeLayer(this.markers[i]);
            }
            this.popups = null;
            this.markers = null
        }
    }

    removeRoutingControl(myMap) {
        if (this.routingControl !== null) {
            myMap.removeControl(this.routingControl);
            this.routingControl = null
        }
    }

    manipulateOnUndefinedOrZeroLength = (myMap) => {
        myMap.setView([this.state.lat, this.state.lng], 13);
        this.markers = [];
        this.popups = [];
        this.markers.push(L.marker([this.state.lat, this.state.lng]));
        this.popups.push(L.popup()
            .setLatLng([this.state.lat, this.state.lng])
            .setContent("شما اینجا هستید!"));
        this.markers[0].addTo(myMap).bindPopup(this.popups[0], {
            closeButton: false,
            closeOnClick: null
        }).openPopup();
    };

    manipulateOnOneLength = (myMap) => {
        let content = "<p dir='rtl' style='text-align: center'>مکان 1<br> سرعت: " +
            this.state.path[0].speed + "km/h</p>";
        this.markers = [];
        this.popups = [];
        this.markers.push(L.marker(
            [this.state.path[0].latitude, this.state.path[0].longitude]
        ));
        this.popups.push(L.popup()
            .setLatLng([this.state.path[0].latitude, this.state.path[0].longitude])
            .setContent(content));
        myMap.setView([this.state.path[0].latitude, this.state.path[0].longitude], 13);
        this.markers[0].addTo(myMap).bindPopup(this.popups[0], {
            closeButton: false,
            closeOnClick: null
        }).openPopup();
    };

    manipulateOnMultipleLocation = (myMap) => {
        let points = [];
        this.markers = [];
        this.popups = [];
        for (let i = 0; i < this.state.path.length; i++) {
            let content = "<p dir='rtl' style='text-align: center'>مکان "
                + (i + 1) + "<br> سرعت: " + this.state.path[i].speed + "km/h</p>";
            points.push(L.latLng(this.state.path[i].latitude, this.state.path[i].longitude));
            this.markers.push(L.marker(
                [this.state.path[i].latitude, this.state.path[i].longitude]
            ));
            this.popups.push(L.popup()
                .setLatLng([this.state.path[i].latitude, this.state.path[i].longitude])
                .setContent(content));
            this.markers[i].addTo(myMap).bindPopup(this.popups[i], {
                closeButton: false,
                closeOnClick: null,
                autoClose: false
            }).openPopup();
        }
        myMap.setView([this.state.path[0].latitude, this.state.path[0].longitude], 13);
        this.routingControl = L.Routing.control({
            waypoints: points,
            router: L.Routing.mapbox('pk.eyJ1IjoiYW1iYXFpbmVqYWQiLCJhIjoiY2p5eXFjZ3ViMHRsNzNubzFjd291ZjdodSJ9.ulv6PXnKPuO_Nl3-kt3R4Q'),
        }).addTo(myMap);
    };


    manipulateMap = (myMap) => {
        this.removeMarkersAndPopups(myMap);
        this.removeRoutingControl(myMap);
        if (typeof this.state.path === 'undefined' ||
            this.state.path.length === 0) {
            this.manipulateOnUndefinedOrZeroLength(myMap)
        } else if (this.state.path.length === 1) {
            this.manipulateOnOneLength(myMap)
        } else if (this.state.path.length > 1) {
            this.manipulateOnMultipleLocation(myMap)
        }
    };


    modalRegisterHandler = () => {
        this.setState({
            spinnerIsLoading: false,
            infoIsNotAvailable: false
        });
        if (this.state.pathCreatorModalInfo.plateNumber < 11111 ||
            this.state.pathCreatorModalInfo.plateNumber > 99999) {
            alert("شماره باید ۵ رقمی باشد")
        } else {
            if (this.state.pathCreatorModalInfo.year < 1300 ||
                this.state.pathCreatorModalInfo.year > 1500) {
                alert("سال باید مقداری بین ۱۳۰۰ تا ۱۵۰۰ داشته باشد")
            } else {
                if (this.state.pathCreatorModalInfo.plateCode === '' ||
                    this.state.pathCreatorModalInfo.hour === '' ||
                    this.state.pathCreatorModalInfo.minute === '') {
                    alert("لطفا موارد مورد نیاز را وارد کنید")
                } else {
                    this.setState({
                        spinnerIsLoading: true
                    });
                    let plateNumber = "" + this.state.pathCreatorModalInfo.plateNumber +
                        this.state.pathCreatorModalInfo.plateCode;
                    let plateChar = this.state.pathCreatorModalInfo.plateChar;
                    let year = this.state.pathCreatorModalInfo.year;
                    let month = this.state.pathCreatorModalInfo.month;
                    let day = this.state.pathCreatorModalInfo.day;
                    let hour = this.state.pathCreatorModalInfo.hour;
                    let minute = this.state.pathCreatorModalInfo.minute;
                    let data = new FormData();
                    data.append("plate_char", plateChar);
                    data.append("plate_num", plateNumber);
                    data.append("year", year);
                    data.append("month", month);
                    data.append("day", day);
                    data.append("hour", hour);
                    data.append("minute", minute);
                    console.log(data);
                    this.handleQuery(data)
                }
            }
        }
    };

    handleQuery = (data) => {
        let xhr = new XMLHttpRequest();
        xhr.open("POST", GET_PATH_URL, true);
        xhr.onload = () => {
            if (xhr.responseText.toString() === CAR_DOES_NT_EXIST_TEXT) {
                this.setState({
                    infoIsNotAvailable: true,
                    spinnerIsLoading: false,
                    path: []
                }, () => {
                    this.manipulateMap(this.state.myMap)
                })
            } else {
                let object = JSON.parse(xhr.responseText);
                console.log(object);
                this.setState({
                    path: object,
                    infoIsNotAvailable: false,
                    spinnerIsLoading: false,
                    showModal: false
                }, () => {
                    this.manipulateMap(this.state.myMap)
                })
            }
        };
        xhr.send(data)
    };

    showModal = () => {
        this.setState({showModal: true})
    };

    hideModal = () => {
        this.setState({showModal: false})
    };

    change = (event) => {
        let info = {...this.state.pathCreatorModalInfo};
        switch (event.target.id) {
            case 'path-query-form-plate-number':
                info.plateNumber = event.target.value; break;
            case 'path-query-form-plate-code':
                info.plateCode = event.target.value; break;
            case 'path-query-form-plate-char':
                info.plateChar = event.target.value; break;
            case 'path-query-form-year':
                info.year = event.target.value; break;
            case 'path-query-form-month':
                info.month = event.target.value; break;
            case 'path-query-form-day':
                info.day = event.target.value; break;
            case 'path-query-form-hour':
                info.hour = event.target.value; break;
            case 'path-query-form-minute':
                info.minute = event.target.value; break;
            default:
                console.log('default')
        }
        this.setState({pathCreatorModalInfo: info})
    };

    render() {
        return (
            <div>
                <div
                    dir={'rtl'}
                    className='container path-query-container'>
                    <div className='row'>
                        <div className='col-12'>
                            <button
                                className='smart-road-buttons query-buttons'
                                onClick={this.showModal}>
                                استعلام مسیر
                            </button>
                        </div>
                    </div>
                    <div className='row' style={this.style}>
                        <div className='col-lg-6 modal-section-in-queries'>
                            <PathQueryLiveModal
                                spinnerIsLoading={this.state.spinnerIsLoading}
                                infoIsNotAvailable={this.state.infoIsNotAvailable}
                                pathCreatorModalInfo={this.state.pathCreatorModalInfo}
                                modalRegisterHandler={this.modalRegisterHandler}
                                pathCreatorModalChangeHandler={this.change}/>
                        </div>
                        <div className='col-sm-12 col-lg-6 map-section-in-queries' style={this.style}>
                            <div id={'routing-map'} style={this.style}>

                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <Modal
                        infoIsNotAvailaible={this.state.infoIsNotAvailable}
                        spinnerIsLoading={this.state.spinnerIsLoading}
                        modalRegisterHandler={this.modalRegisterHandler}
                        typeOfModal={'path-query'}
                        modalCloseHandler={this.hideModal}
                        whichModal={'استعلام مسیر'}
                        show={this.state.showModal}
                        pathCreatorModalInfo={this.state.pathCreatorModalInfo}
                        pathCreatorModalChangeHandler={this.change}/>
                </div>
            </div>
        )
    }

}

export default PathQuery;