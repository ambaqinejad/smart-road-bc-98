import React from 'react'
import {NavLink} from 'react-router-dom'
import '../css/components/navigation-bar.css'
import LocationIcon from '../assets/images/location.png'

const nav_bar = () => {
    return (
        <div dir={'rtl'}>
            <nav className="navbar navbar-expand-lg navbar-dark
                            navbar-custom navigation-bar-bg smart-road-navigation-bar">
                <a className="navbar-brand" href="#">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <img src={LocationIcon} className="img-fluid navbar-logo"/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <span className="navbar-logo-span">Smart Road</span>
                            </div>
                        </div>
                    </div>

                </a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <a className="nav-link" href="#">
                                <NavLink
                                    className="nav-link"
                                    to={'/'}>
                                    خانه
                                </NavLink>
                                <span className="sr-only">(current)</span>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                                <NavLink
                                    className="nav-link"
                                    to={'/plate-query'}>
                                    استعلام پلاک
                                </NavLink>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                                <NavLink
                                    className="nav-link"
                                    to={'/path-query'}>
                                    استعلام مسیر
                                </NavLink>
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    )
};
export default nav_bar;