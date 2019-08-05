import React from 'react'
import '../../../css/components/modal.css'
import ModalHeader from './ModalHeader'
import ModalBody from './ModalBody'
import ModalFooter from './ModalFooter'
import RoadCreatorModal from '../RoadCreatorModal'
import CameraCreatorModal from '../CameraCreatorModal'
import LocationQueryModal from '../LocationQueryModal'


const modal = ({
                   show, whichModal,
                   typeOfModal,
                   modalCloseHandler,
                   modalRegisterHandler,
                   roadCreatorModalInfo,
                   cameraCreatorModalInfo,
                   locationCreatorModalInfo
               }) => {
    const showHideModal = show ? 'modal display-block' : 'modal display-none';
    let modalBodyComponent = null;
    if (typeOfModal === 'road') {
        modalBodyComponent = <RoadCreatorModal
            roadIdRef={roadCreatorModalInfo.roadIdRef}
            sourceRef={roadCreatorModalInfo.sourceRef}
            destinationRef={roadCreatorModalInfo.destinationRef}
            provinceRef={roadCreatorModalInfo.provinceRef}/>
    } else if (typeOfModal === 'camera') {
        modalBodyComponent = <CameraCreatorModal
            cameraIdRef={cameraCreatorModalInfo.cameraIdRef}
            longitudeRef={cameraCreatorModalInfo.longitudeRef}
            latitudeRef={cameraCreatorModalInfo.latitudeRef}
            sequenceRef={cameraCreatorModalInfo.sequenceRef}/>
    } else if(typeOfModal === 'location-query') {
        modalBodyComponent = <LocationQueryModal
            plateNumberRef={locationCreatorModalInfo.plateNumberRef}
            plateCodeRef={locationCreatorModalInfo.plateCodeRef}
            plateCharRef={locationCreatorModalInfo.plateCharRef}
            yearRef={locationCreatorModalInfo.yearRef}
            monthRef={locationCreatorModalInfo.monthRef}
            dayRef={locationCreatorModalInfo.dayRef}/>
    }

    return (
        <div
            dir='rtl'
            className={showHideModal}>
            <div className='modal-main'>
                <div className='custom-modal-header'>
                    <ModalHeader
                        closeOnClick={modalCloseHandler}
                        modalTitle={whichModal}/>
                    <ModalBody>
                        {modalBodyComponent}
                    </ModalBody>
                    <ModalFooter
                        closeOnClick={modalCloseHandler}
                        registerOnClick={modalRegisterHandler}/>
                </div>
            </div>
        </div>
    )
};

export default modal