import React from 'react'
import '../../../css/components/modal.css'

const modalBody = (props) => {
    return (
        <div className='custom-modal-body'>
            {props.children}
        </div>
    )
};

export default modalBody