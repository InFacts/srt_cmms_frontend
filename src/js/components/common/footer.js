import React from 'react';
import { connect } from 'react-redux';

import {FOOTER_MODE, FOOTER_ACTIONS, FOOTER_ACTIONS_TEXT, clickApproval, clickSend, clickSave, clickReject, clickBack, clickCheckApproval, clickApprovalOrder, clickFastTrack, clickCancleApprovalProcess, clickVoid, clickApprovalDone, clickGotIt} from '../../redux/modules/footer.js';
import { useDispatch, useSelector  } from 'react-redux'

const FOOTER_ACTIONS_TO_ACTION_CREATOR = {
  [FOOTER_ACTIONS.APPROVAL]: clickApproval,
  [FOOTER_ACTIONS.SEND]: clickSend,
  [FOOTER_ACTIONS.SAVE]: clickSave, 
  [FOOTER_ACTIONS.REJECT]: clickReject, 
  [FOOTER_ACTIONS.BACK]: clickBack, 
  [FOOTER_ACTIONS.CHECK_APPROVAL]: clickCheckApproval,
  [FOOTER_ACTIONS.APPROVAL_ORDER]: clickApprovalOrder, 
  [FOOTER_ACTIONS.FAST_TRACK]: clickFastTrack,
  [FOOTER_ACTIONS.CANCEL_APPROVAL_PROCESS]: clickCancleApprovalProcess,
  [FOOTER_ACTIONS.VOID]: clickVoid,
  [FOOTER_ACTIONS.APPROVAL_DONE]: clickApprovalDone,
  [FOOTER_ACTIONS.GOT_IT]:clickGotIt
}

const ALL_DISABLED_PROP = {}
Object.keys(FOOTER_ACTIONS).map((key, index) => ALL_DISABLED_PROP[key] = {
  name: FOOTER_ACTIONS[key],
  styleButton: "Button-White",
  isVisible: false,
}); 

function getPropButtonVisible(isButtonBlue, enabledActions){
  let footerProp = {...ALL_DISABLED_PROP};
  enabledActions.map(enabledAction => {
    footerProp[enabledAction] = {
      isVisible: true
    }
  })
  if(isButtonBlue !== null){
    footerProp[isButtonBlue] = {
      styleButton: "Button-Blue",
      isVisible: true
    }
  }
  return footerProp
}

const FooterItemComponent = (props) => {
  let {keyFooter, buttonName, buttonType, isVisible, handleClick} = props;
  if (isVisible) {
    if (FOOTER_ACTIONS_TEXT.APPROVED === buttonName){
      return(
        <button type="button" title={keyFooter} className={buttonType == "Button-Blue" ? "button-blue edit float-right mr-2":"p-button--base edit float-right"} onClick={handleClick}>{buttonName}</button>
      )
    } else {
      return(
        <button type="button" title={keyFooter} className={buttonType == "Button-Blue" ? "button-blue edit float-right mr-2":"p-button--base edit float-right"} onClick={handleClick}>{buttonName}</button>
      )
    }
  }
  return null;
}

const FooterComponent = (props) => {
  const footer = useSelector((state) => ({...state.footer}));
  if (footer.mode !== "INVISIBLE") {
    try {
      return (
        <div id="footer">
          <div className="container_12 clearfix">
            <div className="grid_12 nav-footer">
              { Object.keys(FOOTER_ACTIONS).map((key, index) => (
                  <FooterItemComponent 
                    key={`footer-item-${index}`}
                    keyFooter={key} 
                    buttonName={FOOTER_ACTIONS_TEXT[key]} 
                    buttonType={props[key].styleButton} 
                    isVisible={props[key].isVisible} 
                    handleClick={props.handleClick}
                  />
                ))}
            </div>
          </div>
        </div>
      )
    } catch (error) {
      return null
    }
  }
  return null
}

const mapStateToProps = (state) => {
  switch(state.footer.mode){
    case FOOTER_MODE.INVISIBLE:
      return {};
    case FOOTER_MODE.NONE:
      // console.log(">>>>> NONE")
      return {...ALL_DISABLED_PROP};
    case FOOTER_MODE.SEARCH:
      // console.log(">>>>> SEARCH")
      return getPropButtonVisible(null, [FOOTER_ACTIONS.BACK]);
    case FOOTER_MODE.EDIT:
      // console.log(">>>>> EDIT")
      return getPropButtonVisible(FOOTER_ACTIONS.SEND, [FOOTER_ACTIONS.SEND, FOOTER_ACTIONS.SAVE, FOOTER_ACTIONS.VOID, FOOTER_ACTIONS.BACK]);
    case FOOTER_MODE.SAVE:
      // console.log(">>>>> SAVE")
      return getPropButtonVisible(FOOTER_ACTIONS.SAVE, [FOOTER_ACTIONS.SAVE, FOOTER_ACTIONS.BACK]);
    case FOOTER_MODE.OWN_DOCUMENT:
      // console.log(">>>>> OWN_DOCUMENT")
      return getPropButtonVisible(FOOTER_ACTIONS.CANCEL_APPROVAL_PROCESS, [FOOTER_ACTIONS.CANCEL_APPROVAL_PROCESS, FOOTER_ACTIONS.BACK]);
    case FOOTER_MODE.ADD_DRAFT:
      // console.log(">>>>> ADD_DRAFT")
      return getPropButtonVisible(FOOTER_ACTIONS.SEND, [FOOTER_ACTIONS.SEND, FOOTER_ACTIONS.SAVE, FOOTER_ACTIONS.BACK]);
    case FOOTER_MODE.VOID:
      // console.log(">>>>> VOID")
      return getPropButtonVisible(null, [FOOTER_ACTIONS.BACK]);
    case FOOTER_MODE.FAST_TRACK:
      // console.log(">>>>> FAST_TRACK")
      return getPropButtonVisible(FOOTER_ACTIONS.SEND, [FOOTER_ACTIONS.FAST_TRACK, FOOTER_ACTIONS.BACK]);
    case FOOTER_MODE.AP_APPROVAL:
      // console.log(">>>>> AP_APPROVAL")
      return getPropButtonVisible(FOOTER_ACTIONS.APPROVAL, [FOOTER_ACTIONS.APPROVAL, FOOTER_ACTIONS.REJECT, FOOTER_ACTIONS.BACK]);
    case FOOTER_MODE.AP_CHECK_APPROVAL:
      // console.log(">>>>> AP_CHECK_APPROVAL")
      return getPropButtonVisible(FOOTER_ACTIONS.CHECK_APPROVAL, [FOOTER_ACTIONS.CHECK_APPROVAL, FOOTER_ACTIONS.REJECT, FOOTER_ACTIONS.BACK]);
    case FOOTER_MODE.AP_GOT_IT:
      // console.log(">>>>> AP_GOT_IT")
      return getPropButtonVisible(FOOTER_ACTIONS.GOT_IT, [FOOTER_ACTIONS.GOT_IT, FOOTER_ACTIONS.BACK]);
    case FOOTER_MODE.AP_CHECK_ORDER:
      // console.log(">>>>> AP_CHECK_ORDER")
      return getPropButtonVisible(FOOTER_ACTIONS.APPROVAL_ORDER, [FOOTER_ACTIONS.APPROVAL_ORDER, FOOTER_ACTIONS.FAST_TRACK, FOOTER_ACTIONS.BACK]);
    case FOOTER_MODE.AP_CHECK_MAINTENANCE:
      // console.log(">>>>> AP_CHECK_MAINTENANCE")
      return getPropButtonVisible(FOOTER_ACTIONS.CHECK_APPROVAL, [FOOTER_ACTIONS.CHECK_APPROVAL, FOOTER_ACTIONS.REJECT, FOOTER_ACTIONS.BACK]);
    case FOOTER_MODE.AP_GUARANTEE_MAINTENANCE:
      // console.log(">>>>> AP_GUARANTEE_MAINTENANCE")
      return getPropButtonVisible(FOOTER_ACTIONS.CHECK_APPROVAL, [FOOTER_ACTIONS.CHECK_APPROVAL, FOOTER_ACTIONS.REJECT, FOOTER_ACTIONS.BACK]);
    case FOOTER_MODE.AP_APPROVAL_DONE:
      // console.log(">>>>> AP_APPROVAL_END")
      return getPropButtonVisible(null, [FOOTER_ACTIONS.VOID, FOOTER_ACTIONS.BACK]);
    default:
      return {...ALL_DISABLED_PROP};
  }
}

const mapDispatchToProps = (dispatch) => ({
  handleClick: (e) => {
    let footerAction = e.target.title;
    console.log("footerAction", footerAction)
    return dispatch(FOOTER_ACTIONS_TO_ACTION_CREATOR[footerAction]());
  }
})


const Footer = connect(
  mapStateToProps, mapDispatchToProps
)(FooterComponent)


export default Footer;