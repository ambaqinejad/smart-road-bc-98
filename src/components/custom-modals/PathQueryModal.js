import React from 'react'
import '../../css/components/modal.css'
import {plateChar, day, month} from '../../constants/json/JsonFiles'

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
                                        // ref={}
                                    />
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
                                        // ref={}
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
                                        // ref={}
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
                                        // ref={}
                                    />
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
                                        // ref={}
                                    >
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
                                        // ref={}
                                    >
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
                                        // ref={}
                                    />
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
                                        // ref={}
                                    />
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

export default pathQueryModal