import React, {Component} from 'react'
import '../../css/components/modal.css'
import Spinner from "../Spinner";
import InfoNotAvailable from "../InfoNotAvailable";
import '../../css/components/maps.css'
import L from "leaflet";



class CameraCreatorModal extends Component {


    constructor(props) {
        super(props);
        this.state = {
            myMap: null,
            cameraId: 0,
            sequence: 0,
            longitude: NaN,
            latitude: NaN
        };

        this.marker = null;
    }

    componentDidMount() {
        console.log("adsadad");
        this.setState({
            cameraId: this.props.cameraIdRef.current.value,
            sequence: this.props.sequenceRef.current.value,
            longitude: this.props.longitudeRef.current.value,
            latitude: this.props.latitudeRef.current.value,
            lat: 0,
            lng: 0
        }, () => {
            this.geoLocation()
        });
    }

    geoLocation = () => {
        console.log("geolocation");
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                this.setState({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
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
        let myMap = L.map('camera-map');
        L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiYW1iYXFpbmVqYWQiLCJhIjoiY2p5eXFjZ3ViMHRsNzNubzFjd291ZjdodSJ9.ulv6PXnKPuO_Nl3-kt3R4Q', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox.streets',
            accessToken: 'pk.eyJ1IjoiYW1iYXFpbmVqYWQiLCJhIjoiY2p5eXFjZ3ViMHRsNzNubzFjd291ZjdodSJ9.ulv6PXnKPuO_Nl3-kt3R4Q'
        }).addTo(myMap);
        this.mapOnClick(myMap);
        this.setState({
            myMap: myMap
        }, () => {
            this.manipulateMap(this.state.myMap)
        });
    };

    manipulateMap = (myMap) => {
        if(myMap!==null) {
            this.removeMarker(myMap);
            if (isNaN(this.state.latitude) || isNaN(this.state.longitude)) {
                myMap.setView([this.state.lat, this.state.lng], 13);
                this.marker = L.marker([this.state.lat, this.state.lng]);
                this.marker.addTo(myMap)
            } else {
                myMap.setView([this.state.latitude, this.state.longitude], 13);
                this.marker = L.marker([this.state.latitude, this.state.longitude]);
                this.marker.addTo(myMap)
            }
            setInterval(() => {
                myMap.invalidateSize()
            }, 2000);
        }
    };

    mapOnClick = (myMap) => {
        if(myMap!==null) {
            let pressTimer;
            myMap.on('mouseup', () => {
                clearTimeout(pressTimer);
                return false;
            });
            myMap.on('mousedown', (e) => {
                this.removeMarker(myMap);
                pressTimer = window.setTimeout(() => {
                    let coord = e.latlng;
                    let lat = coord.lat.toPrecision(9);
                    let lng = coord.lng.toPrecision(9);
                    this.marker = L.marker([lat, lng]);
                    this.marker.addTo(myMap);
                    this.setState({
                        longitude: lng,
                        latitude: lat
                    });
                    console.log("You clicked the map at latitude: " + lat + " and longitude: " + lng);
                }, 1000);
                return false
            });
        }
    };

    removeMarker = (myMap) => {
        if (this.marker !== null) {
            myMap.removeLayer(this.marker);
            this.marker = null
        }
    };

    cameraIdChange = (event) => {
        this.setState({
            cameraId: event.target.value
        })
    };

    sequenceChange = (event) => {
        this.setState({
            sequence: event.target.value
        })
    };

    longitudeChange = (event) => {
        this.setState({
            longitude: event.target.value
        }, () => {
            this.manipulateMap(this.state.myMap);
        })
    };

    latitudeChange = (event) => {
        this.setState({
            latitude: event.target.value
        }, () => {
            this.manipulateMap(this.state.myMap);
        })
    };

    render() {
        return (
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-12'>
                        <p>با کلیک طولانی روی نقشه مکان مورد نظر را نتخاب نمایید</p>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-12'>
                        <div id={'camera-map'}>

                        </div>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-12'>
                        <form>
                            <div className="row">
                                <div className="col-6">
                                    <div className="form-group">
                                        <label className="camera-creator-form-label"
                                               htmlFor="camera-creator-form-camera-id">
                                            کد دوربین:
                                        </label>
                                        <input type="number"
                                               onChange={this.cameraIdChange}
                                               value={this.state.cameraId}
                                               className="form-control form-control camera-creator-form-input"
                                               id="road-creator-form-camera-id"
                                               ref={this.props.cameraIdRef}
                                               placeholder="کد دوربین:"/>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="form-group">
                                        <label
                                            className="camera-creator-form-label"
                                            htmlFor="camera-creator-form-sequence">
                                            مرتبه:
                                        </label>
                                        <input
                                            type="number"
                                            onChange={this.sequenceChange}
                                            value={this.state.sequence}
                                            className="form-control camera-creator-form-select"
                                            id="camera-creator-form-sequence"
                                            ref={this.props.sequenceRef}
                                            placeholder={"مرتبه"}>
                                        </input>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6">
                                    <div className="form-group">
                                        <label
                                            className="camera-creator-form-label"
                                            htmlFor="camera-creator-form-latitude">
                                            طول جغرافیایی:
                                        </label>
                                        <input type="text"
                                               onChange={this.latitudeChange}
                                               value={this.state.latitude}
                                               className="form-control camera-creator-form-input"
                                               id="camera-creator-form-latitude"
                                               ref={this.props.latitudeRef}
                                               placeholder="طول جغرافیایی"/>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="form-group">
                                        <label className="camera-creator-form-label"
                                               htmlFor="camera-creator-form-longitude">
                                            عرض جغرافیایی:
                                        </label>
                                        <input type="text"
                                               onChange={this.longitudeChange}
                                               value={this.state.longitude}
                                               className="form-control camera-creator-form-input"
                                               id="camera-creator-form-longitude"
                                               ref={this.props.longitudeRef}
                                               placeholder="عرض جغرافیایی"/>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-12'>
                        <Spinner isLoading={this.props.spinnerIsLoading}/>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-12'>
                        {(this.props.infoIsNotAvailaible) ?
                            <InfoNotAvailable
                                message={'وجود دوربین مشابه یا بروز مشکل'}/>
                            : null
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default CameraCreatorModal;