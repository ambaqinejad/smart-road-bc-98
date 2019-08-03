import React from 'react'
import '../css/components/spinner.css'

const spinner = (props) => {
    return (
        <div>
            {
                (props.isLoading) ?
                    <div className="lds-roller">
                        <div className="face">
                            <div className="circle">

                            </div>
                        </div>
                        <div className="face">
                            <div className="circle">

                            </div>
                        </div>
                    </div> :
                    null
            }
        </div>

    )
};

export default spinner