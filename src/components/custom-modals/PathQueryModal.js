import React from 'react'
import '../../css/components/modal.css'
import {plateChar, day, month} from '../../constants/json/JsonFiles'
import Spinner from "../Spinner";
import InfoNotAvailable from "../InfoNotAvailable";

const pathQueryModal = (props) => {
    return (
        <div className='container'>
            <div className="row">
                <div className="col">

                </div>
                <div className="col-9">
                    <form>
                        <div className="row">
                            <div className="col-12">
                                <div className="form-group">
                                    <label className="path-query-form-label"
                                           htmlFor="path-query-form-plate-number">
                                        شماره پلاک:
                                    </label>
                                    <input type="number"
                                           className="form-control path-query-form-input"
                                           id="path-query-form-plate-number"
                                           min="11111"
                                           max="99999"
                                           placeholder="شماره پلاک"
                                           value={props.plateNumber}
                                           onChange={props.pathCreatorModalChangeHandler}/>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <div className="form-group">
                                    <label
                                        className="path-query-form-label"
                                        htmlFor="path-query-form-plate-code">
                                        کد پلاک:
                                    </label>
                                    <input type="number"
                                           className="form-control path-query-form-input"
                                           id="path-query-form-plate-code"
                                           min="10"
                                           max="99"
                                           placeholder="کد پلاک"
                                           value={props.plateCode}
                                           onChange={props.pathCreatorModalChangeHandler}
                                    />
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="form-group">
                                    <label
                                        className="path-query-form-label"
                                        htmlFor="plate-query-form-plate-char">
                                        حرف پلاک:
                                    </label>
                                    <select className="form-control path-query-form-select"
                                            id="path-query-form-plate-char"
                                            value={props.plateCharChange}
                                            onChange={props.pathCreatorModalChangeHandler}
                                    >
                                        {plateChar.map(el => {
                                            return <option
                                                className="path-query-form-select">
                                                {el}
                                            </option>
                                        })}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-4">
                                <div className="form-group">
                                    <label className="path-query-form-label"
                                           htmlFor="path-query-form-year">
                                        سال
                                    </label>
                                    <input type="number"
                                           min="1300"
                                           max="1500"
                                           className="form-control path-query-form-input"
                                           id="path-query-form-year"
                                           placeholder="سال"
                                           value={props.year}
                                           onChange={props.pathCreatorModalChangeHandler}/>
                                </div>
                            </div>
                            <div className="col-4">
                                <div className="form-group">
                                    <label
                                        className="path-query-form-label"
                                        htmlFor="path-query-form-month">
                                        ماه
                                    </label>
                                    <select
                                        className="form-control path-query-form-select"
                                        id="path-query-form-month"
                                        placeholder="ماه"
                                        value={props.month}
                                        onChange={props.pathCreatorModalChangeHandler}>
                                        {month.map(el => {
                                            return <option
                                                className="path-query-form-select">
                                                {el}
                                            </option>
                                        })}
                                    </select>
                                </div>
                            </div>

                            <div className="col-4">
                                <div className="form-group">
                                    <label
                                        className="path-query-form-label"
                                        htmlFor="path-query-form-day">
                                        روز
                                    </label>
                                    <select
                                        className="form-control path-query-form-select"
                                        id="path-query-form-day"
                                        placeholder="روز"
                                        value={props.day}
                                        onChange={props.pathCreatorModalChangeHandler}>
                                        {day.map(el => {
                                            return <option
                                                className="path-query-form-select">
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
                                    <label className="path-query-form-label"
                                           htmlFor="path-query-form-hour">
                                        ساعت:
                                    </label>
                                    <input type="number"
                                           className="form-control path-query-form-input"
                                           id="path-query-form-hour"
                                           min="0"
                                           max="23"
                                           placeholder="ساعت"
                                           value={props.hour}
                                           onChange={props.pathCreatorModalChangeHandler}/>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="form-group">
                                    <label className="path-query-form-label"
                                           htmlFor="path-query-form-minute">
                                        دقیقه:
                                    </label>
                                    <input type="number"
                                           className="form-control path-query-form-input"
                                           id="path-query-form-minute"
                                           min="0"
                                           max="59"
                                           placeholder="دقیقه"
                                           value={props.minute}
                                           onChange={props.pathCreatorModalChangeHandler}/>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="col">
                </div>
            </div>
            <div className='row'>
                <div className='col-12'>
                    <Spinner isLoading={props.spinnerIsLoading}/>
                </div>
            </div>
            <div className='row'>
                <div className='col-12'>
                    {(props.infoIsNotAvailable) ?
                        <InfoNotAvailable
                            message={'عدم وجود اطلاعات یا بروز مشکل'}/>
                        : null
                    }
                </div>
            </div>
        </div>
    )
};

export default pathQueryModal