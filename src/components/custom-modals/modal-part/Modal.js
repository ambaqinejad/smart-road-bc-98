import React from 'react'
import ModalHeader from './ModalHeader'
import ModalBody from './ModalBody'
import ModalFooter from './ModalFooter'
import RadCreatorModal from './RoadCreatorModal'


const modal = ({
                   show, whichModal,
                   typeOfModal,
                   modalCloseHandler,
                   modalRegisterHandler,
                   roadCreatorModalInfo
               }) => {
    const showHideModal = show ? 'modal display-block' : 'modal display-none';
    let modalBodyComponent = null;
    if (typeOfModal === 'road') {
        modalBodyComponent = <RadCreatorModal
            roadIdRef={roadCreatorModalInfo.roadIdRef}
            sourceRef={roadCreatorModalInfo.sourceRef}
            destinationRef={roadCreatorModalInfo.destinationRef}
            provinceRef={roadCreatorModalInfo.provinceRef}/>
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