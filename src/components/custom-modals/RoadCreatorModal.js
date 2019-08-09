import React from 'react'
import '../../css/components/modal.css'
import {province} from '../../constants/json/JsonFiles'
import Spinner from "../Spinner";
import InfoNotAvailable from "../InfoNotAvailable";


const roadCreatorModal = (props) => {
    return (
        <div className='container-fluid'>
            <div className='row'>
                <div className='col-12'>
                    <form>
                        <div className="row">
                            <div className="col-4">
                                <div className="form-group">
                                    <label className="road-creator-form-label"
                                           htmlFor="road-creator-form-road-id">
                                        کد مسیر:
                                    </label>
                                    <input type="number"
                                           value={props.roadId}
                                           onChange={props.roadCreatorModalChangeHandler}
                                           className="form-control road-creator-form-input"
                                           id="road-creator-form-road-id"
                                           placeholder="کد مسیر:"/>
                                </div>
                            </div>
                            <div className="col-8">
                                <div className="form-group">
                                    <label
                                        className="road-creator-form-label"
                                        htmlFor="road-creator-form-province">
                                        استان:
                                    </label>
                                    <select
                                        className="form-control road-creator-form-select"
                                        id="road-creator-form-province"
                                        value={props.province}
                                        onChange={props.roadCreatorModalChangeHandler}>
                                        {province.map(el => {
                                            return <option
                                                className="">
                                                {el}
                                            </option>
                                        })}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <div className="form-group">
                                    <label className="road-creator-form-label"
                                           htmlFor="road-creator-form-source">
                                        مبدا:
                                    </label>
                                    <input type="text"
                                           className="form-control road-creator-form-input"
                                           id="road-creator-form-source"
                                           value={props.source}
                                           onChange={props.roadCreatorModalChangeHandler}
                                           placeholder="مبدا"/>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="form-group">
                                    <label
                                        className="road-creator-form-label"
                                        htmlFor="road-creator-form-destination">
                                        مقصد:
                                    </label>
                                    <input type="text"
                                           className="form-control road-creator-form-input"
                                           id="road-creator-form-destination"
                                           value={props.destination}
                                           onChange={props.roadCreatorModalChangeHandler}
                                           placeholder="مقصد"/>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div className='row'>
                <div className='col-12'>
                    <Spinner isLoading={props.spinnerIsLoading}/>
                </div>
            </div>
            <div className='row'>
                <div className='col-12'>
                    {(props.infoIsNotAvailaible) ?
                        <InfoNotAvailable
                            message={'وجود محور مشابه یا بروز مشکل'}/>
                        : null
                    }
                </div>
            </div>
        </div>
    )
};

export default roadCreatorModal