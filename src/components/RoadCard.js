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
                            <span className="titles-in-road-card">کد محور:</span>
                        </div>
                        <div className="col-md-8">
                            <span className="road-card-each-info">{props.road_id}</span>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-sm-12 col-md-4">
                            <span className="titles-in-road-card">نام محور:</span>
                        </div>
                        <div className="col-md-8">
                            <span className="road-card-each-info">{props.way}</span>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-4">
                            <span className="titles-in-road-card">نام استان:</span>
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
// card - height = 220.032
// card - width = 195.072
// card - border = 2
// from - right - to - first - of - title = 21.6
// logo - height = 92.928
// logo - width = 62.208
// top-to-logo=7.392
// from - logo - to - first - title = 6.912
// distance - between - lines = 9.6;
// from - last - line - to - button = 19.2
// button - height = 22.848
// button - width = 101.088
// button - to - end - height = 101.088
// from - right - to - button = 83.232
// from button to left = 10.752
