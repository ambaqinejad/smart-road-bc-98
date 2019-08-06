import React, {Component} from 'react'
import '../css/components/buttons.css'
import '../css/containers/query-component.css'
import PathQueryLiveModal from '../components/custom-modals/PathQueryLiveModal'
import Modal from '../components/custom-modals/modal-part/Modal'


class PathQuery extends Component {


    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            spinnerIsLoading: false,
            infoIsNotAvailable: false
            // lat: 0,
            // lng: 0,
            // myMap: null,
            // position_lat: 0,
            // position_lng: 0
        };
        this.marker = {};
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
            hourRef: this.dayRef,
            minuteRef: this.dayRef
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

    modalRegisterHandler = () => {

    };

    modalRegisterHandler1 = () => {

    };

    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    componentDidMount() {
        // this.geoLocation()
        // let popup = L.popup()
        //     .setLatLng([51.5, -0.09])
        //     .setContent("I am a standalone popup.")
        //     .openOn(myMap);
    }

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
                                infoIsNotAvailable={this.state.infoIsNotAvailable}/>
                        </div>
                        <div className='col-sm-12 col-lg-6 map-section-in-queries' style={this.style}>
                            <div id={'map'}>

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