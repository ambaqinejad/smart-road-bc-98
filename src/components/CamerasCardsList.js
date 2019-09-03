import React from 'react'
import CameraCard from "./CameraCard";

const roadsCardsList = (props) => {
    return (
        <div>
            {props.camerasData.map((camera) => {
                return (
                    <CameraCard
                        key={camera["cam_id"]}
                        cam_id={camera["cam_id"]}
                        longitude={camera['longitude']}
                        latitude={camera['latitude']}
                        province={camera["province"]}
                        sequence={camera["sequence"]}
                        updateOnClick={() => props.updateOnClick(
                            camera["cam_id"],
                            camera["sequence"],
                            camera["latitude"],
                            camera["longitude"])}/>
                )
            })}
        </div>
    )
};

export default roadsCardsList
