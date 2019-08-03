import React from 'react'
import '../../../css/components/modal.css'
import {province} from '../../../constants/json/JsonFiles'

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
                                           className="form-control form-control road-creator-form-input"
                                           id="road-creator-form-rad-id"
                                           // ref={}
                                           placeholder="کد"/>
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
                                        // ref={}>
                                        >
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
                                           // ref={}
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
                                           // ref={}
                                           placeholder="مقصد"/>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
};

export default roadCreatorModal