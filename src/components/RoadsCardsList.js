import React from 'react'
import RoadCard from './RoadCard'

const roadsCardsList = (props) => {
    return (
        <div>
            {props.roadData.map((road) => {
                return (
                    <RoadCard
                        key={road["road_id"]}
                        way={road["source"] + " - " + road["destination"]}
                        province={road["province"]}
                        road_id={road["road_id"]}
                        goToCameraPageClick={() => props.goToCameraPageClick(
                            road["road_id"], road["province"])}/>
                )
            })}
        </div>
    )
};

export default roadsCardsList
