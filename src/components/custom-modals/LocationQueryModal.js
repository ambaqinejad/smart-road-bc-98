import React from 'react'
import '../../css/components/modal.css'
import {plateChar, day, month} from '../../constants/json/JsonFiles'


const locationQueryModal = (props) => {
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
                                    <label className="plate-query-form-label"
                                           htmlFor="plate-query-form-plate-number">
                                        شماره پلاک:
                                    </label>
                                    <input type="number"
                                           className="form-control plate-query-form-input"
                                           id="plate-query-form-plate-number"
                                           min="11111"
                                           max="99999"
                                        ref={props.plateNumberRef}
                                           placeholder="شماره پلاک"/>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <div className="form-group">
                                    <label
                                        className="plate-query-form-label"
                                        htmlFor="plate-query-form-plate-code">
                                        کد پلاک:
                                    </label>
                                    <input type="number"
                                           className="form-control plate-query-form-input"
                                           id="plate-query-form-plate-code"
                                           min="10"
                                           max="99"
                                        ref={props.plateCodeRef}
                                           placeholder="کد پلاک"/>
                                </div>
                            </div>

                            <div className="col-6">
                                <div className="form-group">
                                    <label
                                        className="plate-query-form-label"
                                        htmlFor="plate-query-form-plate-char">
                                        حرف پلاک:
                                    </label>
                                    <select
                                        className="form-control plate-query-form-select"
                                        id="plate-query-form-plate-char"
                                        ref={props.plateCharRef}
                                    >
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
                                    <label className="plate-query-form-label"
                                           htmlFor="plate-query-form-year">
                                        سال
                                    </label>
                                    <input type="number"
                                           min="1300"
                                           max="1500"
                                           className="form-control plate-query-form-input"
                                           id="plate-query-form-year"
                                        ref={props.yearRef}
                                           placeholder="سال"/>
                                </div>
                            </div>

                            <div className="col-4">
                                <div className="form-group">
                                    <label
                                        className="plate-query-form-label"
                                        htmlFor="plate-query-form-month">
                                        ماه
                                    </label>
                                    <select
                                        className="form-control plate-query-form-select"
                                        id="plate-query-form-month"
                                        placeholder="ماه"
                                        ref={props.monthRef}
                                    >
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
                                        className="plate-query-form-label"
                                        htmlFor="plate-query-form-day">
                                        روز
                                    </label>
                                    <select
                                        className="form-control plate-query-form-select"
                                        id="plate-query-form-day"
                                        placeholder="روز"
                                        ref={props.dayRef}
                                    >
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
        </div>
    )
};

export default locationQueryModal