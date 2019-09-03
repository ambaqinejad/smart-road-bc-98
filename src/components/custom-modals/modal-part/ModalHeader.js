import React from 'react'
import '../../../css/components/modal.css'

const modalHeader = ({modalTitle, closeOnClick}) => {
    return (
        <div className='container'>
            <div className='row'>
                <div className='col-10'>
                    <h5 className='modal-header-title'>
                        {modalTitle}
                    </h5>
                </div>
                <div className='col-2'>
                    <h5
                        className='modal-header-close'
                        onClick={closeOnClick}>
                        &times;
                    </h5>
                </div>
            </div>
            <div className='row'>
                <div className='col-12'>
                    <hr className='modal-header-hr'/>
                </div>
            </div>
        </div>
    )
};

export default modalHeader