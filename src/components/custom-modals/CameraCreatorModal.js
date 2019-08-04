import React from 'react'
import '../../css/components/modal.css'


const cameraCreatorModal = (props) => {

    return (
        <div className='container-fluid'>
            <div className='row'>
                <div className='col-12'>
                    <form>
                        <div className="row">
                            <div className="col-6">
                                <div className="form-group">
                                    <label className="camera-creator-form-label"
                                           htmlFor="camera-creator-form-camera-id">
                                        کد دوربین:
                                    </label>
                                    <input type="number"
                                           className="form-control form-control camera-creator-form-input"
                                           id="road-creator-form-camera-id"
                                           ref={props.cameraIdRef}
                                           placeholder="کد دوربین:"/>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="form-group">
                                    <label
                                        className="camera-creator-form-label"
                                        htmlFor="camera-creator-form-sequence">
                                        مرتبه:
                                    </label>
                                    <input
                                        type="number"
                                        className="form-control camera-creator-form-select"
                                        id="camera-creator-form-sequence"
                                        ref={props.sequenceRef}
                                        placeholder={"مرتبه"}>
                                    </input>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <div className="form-group">
                                    <label
                                        className="camera-creator-form-label"
                                        htmlFor="camera-creator-form-latitude">
                                        طول جغرافیایی:
                                    </label>
                                    <input type="text"
                                           className="form-control camera-creator-form-input"
                                           id="camera-creator-form-latitude"
                                           ref={props.latitudeRef}
                                           placeholder="طول جغرافیایی"/>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="form-group">
                                    <label className="camera-creator-form-label"
                                           htmlFor="camera-creator-form-longitude">
                                        عرض جغرافیایی:
                                    </label>
                                    <input type="text"
                                           className="form-control camera-creator-form-input"
                                           id="camera-creator-form-longitude"
                                           ref={props.longitudeRef}
                                           placeholder="عرض جغرافیایی"/>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
};

export default cameraCreatorModal;