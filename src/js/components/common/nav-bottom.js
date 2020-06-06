import React from 'react';
import { connect } from 'react-redux';
import { useDispatch, useSelector  } from 'react-redux'
import {NAV_BOTTOM_STATUS, NAV_BOTTOM_STATUS_TEXT} from '../../redux/modules/nav-bottom'

const NavBottomComponent = (props) => {
    const nav_bottom_status = useSelector((state) => ({...state.nav_bottom_status}));
    console.log("nav_bottom_status,", nav_bottom_status.mode)
    let colorStatus = ""
    if (nav_bottom_status.mode === NAV_BOTTOM_STATUS.ON_READY) { colorStatus="blue" }
    else if (nav_bottom_status.mode === NAV_BOTTOM_STATUS.WARNING) { colorStatus="orange" }
    else if (nav_bottom_status.mode === NAV_BOTTOM_STATUS.ERROR) { colorStatus="red" }
    else if (nav_bottom_status.mode === NAV_BOTTOM_STATUS.SUCCESS) { colorStatus="green" }
    else { colorStatus="blue" }
    return (
        <div className={`nav-bottom-status ${colorStatus}`}>
            <p className="text-for-nav-bottom">สถานะ: {NAV_BOTTOM_STATUS_TEXT[nav_bottom_status.mode]}</p>
        </div>
    )
}

const mapStateToProps = (state) => {

}


const mapDispatchToProps = (dispatch) => ({
    
})
  
  
const NavBottom = connect(mapStateToProps, mapDispatchToProps)(NavBottomComponent)


export default NavBottom;