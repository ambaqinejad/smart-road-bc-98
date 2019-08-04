import React, {Component} from 'react'

class Camera extends Component{


    componentDidMount() {
        try {
            let roadID = this.props.location.state.road_id;
            let province = this.props.location.state.province;
            console.log(roadID, province)
        }  catch (e) {
            
        }
    }

    render() {
        return (
            <div>Hello Camera</div>
        )
    }


}

export default Camera;