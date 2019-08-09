import React from 'react'
import '../../../css/components/modal.css'
import ModalHeader from './ModalHeader'
import ModalBody from './ModalBody'
import ModalFooter from './ModalFooter'
import RoadCreatorModal from '../RoadCreatorModal'
import CameraCreatorModal from '../CameraCreatorModal'
import LocationQueryModal from '../LocationQueryModal'
import PathQueryModal from '../PathQueryModal'


const modal = (props) => {
    const showHideModal = props.show ? 'modal display-block' : 'modal display-none';
    let modalBodyComponent = null;
    if (props.typeOfModal === 'road') {
        modalBodyComponent = <RoadCreatorModal
            roadId={props.roadCreatorModalInfo.roadId}
            source={props.roadCreatorModalInfo.source}
            destination={props.roadCreatorModalInfo.destination}
            province={props.roadCreatorModalInfo.province}
            spinnerIsLoading={props.spinnerIsLoading}
            infoIsNotAvailaible={props.infoIsNotAvailaible}
            roadCreatorModalChangeHandler={props.roadCreatorModalChangeHandler}/>
    } else if (props.typeOfModal === 'camera') {
        modalBodyComponent = <CameraCreatorModal
            cameraIdRef={props.cameraCreatorModalInfo.cameraIdRef}
            longitudeRef={props.cameraCreatorModalInfo.longitudeRef}
            latitudeRef={props.cameraCreatorModalInfo.latitudeRef}
            sequenceRef={props.cameraCreatorModalInfo.sequenceRef}
            spinnerIsLoading={props.spinnerIsLoading}
            infoIsNotAvailaible={props.infoIsNotAvailaible}
        />
    } else if (props.typeOfModal === 'location-query') {
        modalBodyComponent = <LocationQueryModal
            plateNumber={props.locationCreatorModalInfo.plateNumber}
            plateCode={props.locationCreatorModalInfo.plateCode}
            plateChar={props.locationCreatorModalInfo.plateChar}
            year={props.locationCreatorModalInfo.year}
            month={props.locationCreatorModalInfo.month}
            day={props.locationCreatorModalInfo.day}
            spinnerIsLoading={props.spinnerIsLoading}
            infoIsNotAvailaible={props.infoIsNotAvailaible}
            locationCreatorModalChangeHandler={props.locationCreatorModalChangeHandler}/>
    } else if (props.typeOfModal === 'path-query') {
        modalBodyComponent = <PathQueryModal
            plateNumber={props.pathCreatorModalInfo.plateNumber}
            plateCode={props.pathCreatorModalInfo.plateCode}
            plateChar={props.pathCreatorModalInfo.plateChar}
            year={props.pathCreatorModalInfo.year}
            month={props.pathCreatorModalInfo.month}
            day={props.pathCreatorModalInfo.day}
            hour={props.pathCreatorModalInfo.hour}
            minute={props.pathCreatorModalInfo.minute}
            spinnerIsLoading={props.spinnerIsLoading}
            infoIsNotAvailable={props.infoIsNotAvailaible}
            pathCreatorModalChangeHandler={props.pathCreatorModalChangeHandler}/>
    }

    return (
        <div
            dir='rtl'
            className={showHideModal}>
            <div className='modal-main'>
                <div className='custom-modal-header'>
                    <ModalHeader
                        closeOnClick={props.modalCloseHandler}
                        modalTitle={props.whichModal}/>
                    <ModalBody>
                        {modalBodyComponent}
                    </ModalBody>
                    <ModalFooter
                        closeOnClick={props.modalCloseHandler}
                        registerOnClick={props.modalRegisterHandler}/>
                </div>
            </div>
        </div>
    )
};

export default modal