import React from 'react'
import Plate1 from '../assets/images/plate-1.png'
import Plate2 from '../assets/images/plate-2.png'
import Plate3 from '../assets/images/plate-3.png'
import '../css/components/fake-plate.css'

const fakePlate = () => {
    return (
        <div className="container">
            <div className="row">
                <div className="col-4">
                    <img
                        src={Plate1} className="img-fluid"
                        alt="Plate"/>
                </div>
                <div className="col-4">
                    <img
                        src={Plate2} className="img-fluid"
                        alt="Plate"/>
                </div>
                <div className="col-4">
                    <img
                        src={Plate3} className="img-fluid"
                        alt="Plate"/>
                </div>
            </div>
        </div>
    )
};

export default fakePlate;