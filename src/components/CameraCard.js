import React from 'react'
import '../css/components/camera-card.css'
// import CameraCardLogo from '../assets/images/camera-logo.png'
import CameraCardLogo from '../assets/images/camera-logo.png'

const cameraCard = (props) => {
    return (
        <div
            className="container camera-card-container"
            dir={"rtl"}>
            <div className="row">
                <div className="col-12">
                    <img
                        className="img-fluid camera-card-logo"
                        src={CameraCardLogo} alt={"CameraCardLogo"}/>
                </div>
            </div>
            <div className="row camera-card-info-part">
                <div className="col-12">
                    <div className="row">
                        <div className="col-sm-12 col-md-5">
                            <span className="camera-card-titles">کد دوربین:</span>
                        </div>
                        <div className="col-sm-12 col-md-7">
                            <span className="camera-card-each-info">
                                {props.cam_id}
                            </span>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-sm-12 col-md-5">
                            <span className="camera-card-titles">طول جغرافیایی:</span>
                        </div>
                        <div className="col-sm-12 col-md-7">
                            <span className="camera-card-each-info">
                                {props.longitude}
                            </span>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-sm-12 col-md-5">
                            <span className="camera-card-titles">عرض جغرافیایی:</span>
                        </div>
                        <div className="col-sm-12 col-md-7">
                            <span className="camera-card-each-info">
                                {props.latitude}
                            </span>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-sm-12 col-md-5">
                            <span className="camera-card-titles">مرتبه دوربین:</span>
                        </div>
                        <div className="col-sm-12 col-md-7">
                            <span className="camera-card-each-info">
                                {props.sequence}
                            </span>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-sm-12 col-md-5">
                            <span className="camera-card-titles">استان:</span>
                        </div>
                        <div className="col-sm-12 col-md-7">
                            <span className="camera-card-each-info">
                                {props.province}
                            </span>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
};

export default cameraCard;