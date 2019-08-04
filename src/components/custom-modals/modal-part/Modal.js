import React from 'react'
import '../../../css/components/modal.css'
import ModalHeader from './ModalHeader'
import ModalBody from './ModalBody'
import ModalFooter from './ModalFooter'
import RoadCreatorModal from '../RoadCreatorModal'
import CameraCreatorModal from '../CameraCreatorModal'


const modal = ({
                   show, whichModal,
                   typeOfModal,
                   modalCloseHandler,
                   modalRegisterHandler,
                   roadCreatorModalInfo,
                   cameraCreatorModalInfo
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