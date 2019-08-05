import React, {Component} from 'react'
import '../css/containers/intersections.css'
import Modal from '../components/custom-modals/modal-part/Modal'
import SearchBox from '../components/SearchBox'
import Spinner from '../components/Spinner'
import CamerasCarsList from '../components/CamerasCardsList'
import {CREATE_CAMERA_URL, GET_CAMERA_URL} from '../constants/api/ApiAddresses'
import {CAMERA_CREATE_SUCCESSFULLY_TEXT} from '../constants/text/TextConstants'


class Camera extends Component {


    constructor(props) {
        super(props);

        this.state = {
            searchBoxContent: "",
            cameras: [],
            spinnerIsLoading: true,
            showModal: false,
            _road_id: -1,
            _province: ''
        };

        this.cameraIdRef = React.createRef();
        this.longitudeRef = React.createRef();
        this.latitudeRef = React.createRef();
        this.sequenceRef = React.createRef();
        this.cameraCreatorModalInfo = {
            cameraIdRef: this.cameraIdRef,
            sequenceRef: this.sequenceRef,
            longitudeRef: this.longitudeRef,
            latitudeRef: this.latitudeRef
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    componentDidMount() {
        try {
            let roadID = this.props.location.state.road_id;
            let province = this.props.location.state.province;
            console.log(roadID, province);
            this.setState({
                road_id: roadID,
                province: province
            }, () => {
                this.getCamerasInfoFromServer()
            });
        } catch (e) {

        }
    }


    showModal = () => {
        this.setState({showModal: true})
    };

    hideModal = () => {
        this.setState({showModal: false})
    };

    modalRegisterHandler = () => {
        if (this.cameraIdRef.current.value === "" ||
            this.longitudeRef.current.value === "" ||
            this.latitudeRef.current.value === "" ||
            this.sequenceRef.current.value === "") {
            alert("لطفا مقادیر خواسته شده را وارد نمایید")
        } else if (isNaN(this.longitudeRef.current.value) ||
            isNaN(this.latitudeRef.current.value)) {
            console.log(isNaN(parseFloat(this.longitudeRef.current.value)));
            console.log(isNaN(parseFloat(this.latitudeRef.current.value)));
            alert("طول و عرض جغرافیایی باید عدد باشد!")

        } else {
            let province = this.state.province;
            let road_id = this.state.road_id;
            let cam_id = this.cameraIdRef.current.value;
            let sequence = this.sequenceRef.current.value;
            let longitude = this.longitudeRef.current.value;
            let latitude = this.latitudeRef.current.value;
            let data = new FormData();
            console.log(province, road_id);
            data.append('roadID', road_id);
            data.append('cam_id', cam_id);
            data.append('province', province);
            data.append('sequence', sequence);
            data.append('longitude', longitude);
            data.append('latitude', latitude);
            console.log(data);
            this.handleQuery(data);
            this.setState({showModal: false});
        }
    };

    handleQuery = (data) => {
        let xhr = new XMLHttpRequest();
        xhr.open('POST', CREATE_CAMERA_URL, true);
        xhr.onload = () => {
            // do something to response
            let object = JSON.parse(xhr.responseText);
            console.log(object["road_id"]);
            if (xhr.responseText === CAMERA_CREATE_SUCCESSFULLY_TEXT) {
                this.getCamerasInfoFromServer()
            } else {

            }
        };
        xhr.send(data);
    };

    getCamerasInfoFromServer = () => {
        let formData = new FormData();
        formData.append("roadID", this.state.road_id);
        let xhr = new XMLHttpRequest();
        xhr.open("POST", GET_CAMERA_URL, true);
        xhr.onload = () => {
            console.log(xhr.responseText);
            this.setState({
                cameras: JSON.parse(xhr.responseText),
                spinnerIsLoading: false
            })
        };
        xhr.send(formData)
    };

    onSearchBoxContentChange = (event) => {
        this.setState({searchBoxContent: event.target.value});
    };


    render() {
        let filterCamera = [...this.state.cameras];
        filterCamera = filterCamera.filter((camera) => {
            return camera.cam_id.toLowerCase().includes(this.state.searchBoxContent);
        });
        return (
            <div>
                <div>
                    <SearchBox
                        whichSearchBox={'جستجو بر اساس کد دوربین'}
                        onChange={this.onSearchBoxContentChange}/>
                    <button
                        className='smart-road-buttons'
                        onClick={this.showModal}>
                        ایجاد دوربین
                    </button>
                    <Spinner isLoading={this.state.spinnerIsLoading}/>
                    {(this.state.cameras.length === 0 && !this.state.spinnerIsLoading)
                        ? <div dir={'rtl'}>
                            <h5 className='no-access-to-data'>
                                اطلاعات دوربین ها در دسترس نمی باشد!
                            </h5>
                        </div>
                        : <CamerasCarsList camerasData={filterCamera}/>
                    }
                </div>
                <div>
                    <Modal
                        show={this.state.showModal}
                        whichModal={"ایجاد دوربین جدید"}
                        typeOfModal={'camera'}
                        modalRegisterHandler={this.modalRegisterHandler}
                        modalCloseHandler={this.hideModal}
                        roadCreatorModalInfo={null}
                        cameraCreatorModalInfo={this.cameraCreatorModalInfo}
                        locationCreatorModalInfo={null}/>
                </div>
            </div>
        )
    }


}

export default Camera;