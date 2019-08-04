import React from 'react'
import '../css/components/road-card.css'
import RoadCardLogo from '../assets/images/road-card-logo.png'

const roadCard = (props) => {
    return (
        <div
            className="container road-card-container"
            dir={"rtl"}>
            <div className="row">
                <div className="col-12">
                    <img
                        className="img-fluid road-card-logo"
                        src={RoadCardLogo} alt={"RoadCardLogo"}/>
                </div>
            </div>
            <div className="row road-card-info-part">
                <div className="col-12">
                    <div className="row">
                        <div className="col-md-4">
                            <span className="road-card-titles">کد محور:</span>
                        </div>
                        <div className="col-md-8">
                            <span className="road-card-each-info">{props.road_id}</span>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-sm-12 col-md-4">
                            <span className="road-card-titles">نام محور:</span>
                        </div>
                        <div className="col-md-8">
                            <span className="road-card-each-info">{props.way}</span>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-4">
                            <span className="road-card-titles">نام استان:</span>
                        </div>
                        <div className="col-md-8">
                            <span className="road-card-each-info">{props.province}</span>
                        </div>
                    </div>

                </div>
            </div>
            <div className="row">
                <div className="col">

                </div>
                <div className="col-sm-12 col-md-8">
                    <button
                        className="road-card-camera-button"
                        onClick={props.goToCameraPageClick}>
                        مشاهده دوربین ها
                    </button>
                </div>
            </div>

        </div>
    )
};

export default roadCard;