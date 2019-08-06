import React, {Component} from 'react'
import '../css/components/buttons.css'
import '../css/containers/query-component.css'
import PathQueryLiveModal from '../components/custom-modals/PathQueryLiveModal'
import Modal from '../components/custom-modals/modal-part/Modal'
import L from "leaflet";
import 'leaflet-routing-machine'
import {GET_PATH_URL} from '../constants/api/ApiAddresses'
import {CAR_DOES_NT_EXIST_TEXT} from '../constants/text/TextConstants'


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
            position_lat: 0,
            position_lng: 0
        };
        this.routingControl = null;
        this.marker = null;
        this.plateNumberRef = React.createRef();
        this.plateCharRef = React.createRef();
        this.plateCodeRef = React.createRef();
        this.yearRef = React.createRef();
        this.monthRef = React.createRef();
        this.dayRef = React.createRef();
        this.hourRef = React.createRef();
        this.minuteRef = React.createRef();
        this.pathCreatorModalInfo = {
            plateNumberRef: this.plateNumberRef,
            plateCharRef: this.plateCharRef,
            plateCodeRef: this.plateCodeRef,
            yearRef: this.yearRef,
            monthRef: this.monthRef,
            dayRef: this.dayRef,
            hourRef: this.hourRef,
            minuteRef: this.minuteRef
        };

        this.plateNumberRef1 = React.createRef();
        this.plateCharRef1 = React.createRef();
        this.plateCodeRef1 = React.createRef();
        this.yearRef1 = React.createRef();
        this.monthRef1 = React.createRef();
        this.dayRef1 = React.createRef();
        this.hourRef1 = React.createRef();
        this.minuteRef1 = React.createRef();
        this.pathCreatorModalInfo1 = {
            plateNumberRef: this.plateNumberRef1,
            plateCharRef: this.plateCharRef1,
            plateCodeRef: this.plateCodeRef1,
            yearRef: this.yearRef1,
            monthRef: this.monthRef1,
            dayRef: this.dayRef1,
            hourRef: this.hourRef1,
            minuteRef: this.minuteRef1
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    componentDidMount() {
        // this.geoLocation()
        // let popup = L.popup()
        //     .setLatLng([51.5, -0.09])
        //     .setContent("I am a standalone popup.")
        //     .openOn(myMap);
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

    manipulateMap = (myMap) => {
        if (this.marker !== null) {
            myMap.removeLayer(this.marker);
            this.marker = null
        }
        if (this.routingControl !== null) {
            myMap.removeControl(this.routingControl);
            this.routingControl = null
        }
        if (typeof this.state.path === 'undefined' ||
            this.state.path.length === 0) {
            myMap.setView([this.state.lat, this.state.lng], 13);
            this.marker = L.marker([this.state.lat, this.state.lng])
                .addTo(myMap);
        } else if(this.state.path.length === 1) {
            myMap.setView([this.state.path[0].latitude, this.state.path[0].longitude], 13);
            this.marker = L.marker([this.state.path[0].latitude, this.state.path[0].longitude])
                .addTo(myMap);
        } else if (this.state.path.length > 1) {
            let points = [];
            for(let i = 0; i < this.state.path.length; i++) {
                points.push(L.latLng(this.state.path[i].latitude, this.state.path[i].longitude))
            }
            myMap.setView([this.state.path[0].latitude, this.state.path[0].longitude], 13);
            this.routingControl = L.Routing.control({
                waypoints: points,
                router: L.Routing.mapbox('pk.eyJ1IjoiYW1iYXFpbmVqYWQiLCJhIjoiY2p5eXFjZ3ViMHRsNzNubzFjd291ZjdodSJ9.ulv6PXnKPuO_Nl3-kt3R4Q'),
            }).addTo(myMap);
        }
    };


    modalRegisterHandler = () => {
        this.fetchPathData(this.plateNumberRef, this.plateCharRef,
            this.plateCodeRef, this.yearRef, this.monthRef, this.dayRef,
            this.hourRef, this.minuteRef)
    };

    modalRegisterHandler1 = () => {
        this.fetchPathData(this.plateNumberRef1, this.plateCharRef1,
            this.plateCodeRef1, this.yearRef1, this.monthRef1, this.dayRef1,
            this.hourRef1, this.minuteRef1)
    };


    fetchPathData = (pnRef, pchRef, pcRef, yRef, mRef, dRef, hoRef, miRef) => {
        // console.log(hoRef.current.value)
        this.setState({
            spinnerIsLoading: false,
            infoIsNotAvailable: false
        });
        // console.log(pcRef.current.value === '')
        if (pnRef.current.value < 11111 ||
            pnRef.current.value > 99999) {
            alert("شماره باید ۵ رقمی باشد")
        } else {
            if (yRef.current.value < 1300 ||
                yRef.current.value > 1500) {
                alert("سال باید مقداری بین ۱۳۰۰ تا ۱۵۰۰ داشته باشد")
            } else {
                console.log(pcRef.current.value);
                console.log(hoRef.current.value);
                console.log(miRef.current.value);
                if (pcRef.current.value === '' || hoRef.current.value === '' || miRef.current.value === '') {

                }
                if (pcRef.current.value === '' ||
                    hoRef.current.value === '' ||
                    miRef.current.value === '') {
                    alert("لطفا موارد مورد نیاز را وارد کنید")
                } else {
                    this.setState({
                        spinnerIsLoading: true
                    });
                    let plateNumber = pnRef.current.value +
                        pcRef.current.value;
                    let plateChar = pchRef.current.value;
                    let year = yRef.current.value;
                    let month = mRef.current.value;
                    let day = dRef.current.value;
                    let hour = hoRef.current.value;
                    let minute = miRef.current.value;
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
                console.log('ey vai');
                this.setState({
                    infoIsNotAvailable: true,
                    spinnerIsLoading: false,
                    path: []
                }, ()=> {
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
                                pathCreatorModalInfo={this.pathCreatorModalInfo}
                                modalRegisterHandler={this.modalRegisterHandler}/>
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
                        cameraCreatorModalInfo={null}
                        locationCreatorModalInfo={null}
                        modalRegisterHandler={this.modalRegisterHandler1}
                        roadCreatorModalInfo={null}
                        typeOfModal={'path-query'}
                        modalCloseHandler={this.hideModal}
                        whichModal={'استعلام مسیر'}
                        show={this.state.showModal}
                        pathCreatorModalInfo={this.pathCreatorModalInfo1}/>
                </div>
            </div>
        )
    }

}

export default PathQuery;