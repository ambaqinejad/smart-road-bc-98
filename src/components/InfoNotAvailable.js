import React from 'react'
import '../css/components/info-not-available.css'

const infoNotAvailable = ({message}) => {
    return (
        <div dir={'rtl'}>
            <h5 className='no-access-to-data'>
                {message}
            </h5>
        </div>
    )
};

export default infoNotAvailable


