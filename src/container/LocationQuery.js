import React, {Component} from 'react'
import '../css/components/buttons.css'
import '../css/containers/query-component.css'
import LocationQueryLiveModal from '../components/custom-modals/LocationQueryLiveModal'
import Modal from "../components/custom-modals/modal-part/Modal";
import L from 'leaflet'
import {CAR_DOES_NT_EXIST_TEXT} from '../constants/text/TextConstants'
import {GET_CURRENT_LOCATION} from '../constants/api/ApiAddresses'

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
            position_lng: 0
        };

        this.marker = {};
        this.plateNumberRef = React.createRef();
        this.plateCharRef = React.createRef();
        this.plateCodeRef = React.createRef();
        this.yearRef = React.createRef();
        this.monthRef = React.createRef();
        this.dayRef = React.createRef();
        this.locationCreatorModalInfo = {
            plateNumberRef: this.plateNumberRef,
            plateCharRef: this.plateCharRef,
            plateCodeRef: this.plateCodeRef,
            yearRef: this.yearRef,
            monthRef: this.monthRef,
            dayRef: this.dayRef,
        };

        this.plateNumberRef1 = React.createRef();
        this.plateCharRef1 = React.createRef();
        this.plateCodeRef1 = React.createRef();
        this.yearRef1 = React.createRef();
        this.monthRef1 = React.createRef();
        this.dayRef1 = React.createRef();
        this.locationCreatorModalInfo1 = {
            plateNumberRef: this.plateNumberRef1,
            plateCharRef: this.plateCharRef1,
            plateCodeRef: this.plateCodeRef1,
            yearRef: this.yearRef1,
            monthRef: this.monthRef1,
            dayRef: this.dayRef1
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    componentDidMount() {
        this.geoLocation()
        // let popup = L.popup()
        //     .setLatLng([51.5, -0.09])
        //     .setContent("I am a standalone popup.")
        //     .openOn(myMap);
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
        this.fetchLocationData(this.plateNumberRef, this.plateCharRef,
            this.plateCodeRef, this.yearRef, this.monthRef, this.dayRef)
    };

    modalRegisterHandler1 = () => {
        this.fetchLocationData(this.plateNumberRef1, this.plateCharRef1,
            this.plateCodeRef1, this.yearRef1, this.monthRef1, this.dayRef1)
    };

    fetchLocationData = (pnRef, pchRef, pcRef, yRef, mRef, dRef) => {
        if (pnRef.current.value < 11111 || pnRef.current.value > 99999) {
            alert("شماره باید ۵ رقمی باشد")
        } else {
            if (yRef.current.value < 1300 || yRef.current.value > 1500) {
                alert("سال باید مقداری بین ۱۳۰۰ تا ۱۵۰۰ داشته باشد")
            } else {
                if (pcRef.current.value === "") {
                    alert("کد پلاک را مشخص کنید")
                } else {
                    this.setState({
                        spinnerIsLoading: true,
                        infoIsNotAvailable: false
                    });
                    let plateNumber = pnRef.current.value + pcRef.current.value;
                    let plateChar = pchRef.current.value;
                    let year = yRef.current.value;
                    let month = mRef.current.value;
                    let day = dRef.current.value;
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
            // do something to response
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
                    lng: object["latitude"],
                    lat: object["longitude"],
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
                                locationCreatorModalInfo={this.locationCreatorModalInfo}
                                modalRegisterHandler={this.modalRegisterHandler}/>
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
                        modalRegisterHandler={this.modalRegisterHandler1}
                        modalCloseHandler={this.hideModal}
                        roadCreatorModalInfo={null}
                        locationCreatorModalInfo={this.locationCreatorModalInfo1}
                        cameraCreatorModalInfo={null}
                        spinnerIsLoading={this.state.spinnerIsLoading}
                        infoIsNotAvailaible={this.state.infoIsNotAvailable}
                        pathCreatorModalInfo={null}/>
                </div>
            </div>
        )
    }
}

export default LocationQuery