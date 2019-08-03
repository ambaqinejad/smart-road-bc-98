import React from 'react'
import '../../../css/components/modal.css'


const modalFooter = ({registerOnClick, closeOnClick}) => {
    return (
        <div className='container'>
            <div className='row'>
                <div className='col-6'>
                    <button
                        className='modal-close-button'
                        onClick={closeOnClick}>
                        بستن
                    </button>
                </div>
                <div className='col-6'>
                    <button
                        className='modal-register-button'
                        onClick={registerOnClick}>
                        ثبت
                    </button>
                </div>
            </div>
        </div>
    )
};

export default modalFooter