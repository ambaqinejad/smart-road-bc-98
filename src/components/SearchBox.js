import React from 'react'
import '../css/components/search-box.css'

const searchBox = (props) => {
    return(
        <div className='container search-box-container'>
            <div className='row'>
                <div className='col'>
                </div>
                <div className="col-sm-12 col-md-8">
                    <input
                        className='search-box-input'
                        type='search'
                        dir='rtl'
                        placeholder={props.whichSearchBox}
                        onChange={props.onChange}/>
                </div>
                <div className='col'>
                </div>
            </div>
        </div>
    )
};

export default searchBox