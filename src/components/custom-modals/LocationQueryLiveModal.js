import React from 'react'
import '../../css/components/modal.css'
import {plateChar, day, month} from '../../constants/json/JsonFiles'
import Spinner from '../../components/Spinner'
import InfoNotAvailable from '../../components/InfoNotAvailable'


const locationQueryLieModal = (props) => {
    return (
        <div className='container live-modal-container'>
            <div className="row">
                <div className="col">

                </div>
                <div className="col-9">
                    <form>
                        <div className="row">
                            <div className="col-12">
                                <div className="form-group">
                                    <label className="live-query-label"
                                           htmlFor="plate-query-form-plate-number">
                                        شماره پلاک:
                                    </label>
                                    <input type="number"
                                           className="form-control plate-query-form-input"
                                           id="plate-query-form-plate-number"
                                           min="11111"
                                           max="99999"
                                           value={props.locationCreatorModalInfo.plateNumber}
                                           onChange={props.locationCreatorModalChangeHandler}
                                           placeholder="شماره پلاک"/>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <div className="form-group">
                                    <label
                                        className="live-query-label"
                                        htmlFor="plate-query-form-plate-code">
                                        کد پلاک:
                                    </label>
                                    <input type="number"
                                           className="form-control plate-query-form-input"
                                           id="plate-query-form-plate-code"
                                           min="10"
                                           max="99"
                                           value={props.locationCreatorModalInfo.plateCode}
                                           onChange={props.locationCreatorModalChangeHandler}
                                           placeholder="کد پلاک"/>
                                </div>
                            </div>

                            <div className="col-6">
                                <div className="form-group">
                                    <label
                                        className="live-query-label"
                                        htmlFor="plate-query-form-plate-char">
                                        حرف پلاک:
                                    </label>
                                    <select
                                        className="form-control plate-query-form-select"
                                        id="plate-query-form-plate-char"
                                        value={props.locationCreatorModalInfo.plateChar}
                                        onChange={props.locationCreatorModalChangeHandler}>
                                        {plateChar.map(el => {
                                            return <option
                                                className="plate-query-form-select">
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
                                    <label className="live-query-label"
                                           htmlFor="plate-query-form-year">
                                        سال
                                    </label>
                                    <input type="number"
                                           min="1300"
                                           max="1500"
                                           className="form-control plate-query-form-input"
                                           id="plate-query-form-year"
                                           value={props.locationCreatorModalInfo.year}
                                           onChange={props.locationCreatorModalChangeHandler}
                                           placeholder="سال"/>
                                </div>
                            </div>
                            <div className="col-4">
                                <div className="form-group">
                                    <label
                                        className="live-query-label"
                                        htmlFor="plate-query-form-month">
                                        ماه
                                    </label>
                                    <select
                                        className="form-control plate-query-form-select"
                                        id="plate-query-form-month"
                                        placeholder="ماه"
                                        value={props.locationCreatorModalInfo.month}
                                        onChange={props.locationCreatorModalChangeHandler}>
                                        {month.map(el => {
                                            return <option
                                                className="plate-query-form-select">
                                                {el}
                                            </option>
                                        })}
                                    </select>
                                </div>
                            </div>
                            <div className="col-4">
                                <div className="form-group">
                                    <label
                                        className="live-query-label"
                                        htmlFor="plate-query-form-day">
                                        روز
                                    </label>
                                    <select
                                        className="form-control plate-query-form-select"
                                        id="plate-query-form-day"
                                        placeholder="روز"
                                        value={props.locationCreatorModalInfo.day}
                                        onChange={props.locationCreatorModalChangeHandler}>
                                        {day.map(el => {
                                            return <option
                                                className="plate-query-form-select">
                                                {el}
                                            </option>
                                        })}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </form>

                </div>
                <div className="col">
                </div>
            </div>
            <div className='row'>
                <div className='col-2'>

                </div>
                <div className='col-8'>
                    <button
                        className='live-modal-register-button'
                        onClick={props.modalRegisterHandler}>
                        ثبت
                    </button>
                </div>
                <div className='col-2'>

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

export default locationQueryLieModal