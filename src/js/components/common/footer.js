import React from 'react';
import { connect } from 'react-redux';

import {FOOTER_MODE, FOOTER_ACTIONS, FOOTER_ACTIONS_TEXT, clickApproval, clickSend, clickSave, clickReject, clickBack, clickCheckApproval, clickApprovalOrder, clickFastTrack, clickCancleApprovalProcess, clickVoid} from '../../redux/modules/footer.js';

import '../../../vender/fontawesome-free/css/all.css';
import '../../../css/style-nav.css';

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
  [FOOTER_ACTIONS.VOID]: clickVoid
}

const ALL_DISABLED_PROP = {}
Object.keys(FOOTER_ACTIONS).map((key, index) => ALL_DISABLED_PROP[key] = {
  name: FOOTER_ACTIONS[key],
  styleButton: "Text",
  isVisiable: false,
}); 

function getPropSelectAndEnabled(isButton, enabledActions){
  let footerProp = {...ALL_DISABLED_PROP};
  enabledActions.map(enabledAction => {
    footerProp[enabledAction] = {
      isVisiable: true
    }
  })
  if(isButton !== null){
    footerProp[isButton] = {
      styleButton: "Button",
      isVisiable: true
    }
  }
  return footerProp
}

const FooterItemComponent = (props) => {
  let {keyFooter, buttonName, buttonType, isVisiable, handleClick} = props;
  if (isVisiable) {
    return(
      <button type="button" title={keyFooter} className={buttonType == "Button" ? "button-blue edit float-right mr-2":"p-button--base edit float-right"} onClick={handleClick}>{buttonName}</button>
    )
  }
  return null;
}

const FooterComponent = (props) => {
  return (
    <div id="footer">
      <div className="container_12 clearfix">
        <div className="grid_12 nav-footer">
          { Object.keys(FOOTER_ACTIONS).map((key, index) => (
              <FooterItemComponent keyFooter={key} buttonName={FOOTER_ACTIONS_TEXT[key]} buttonType={props[key].styleButton} isVisiable={props[key].isVisiable} handleClick={props.handleClick}/>
            ))}
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  switch(state.footer.mode){
    case FOOTER_MODE.NONE:
      console.log(">>>>> NONE")
      return {...ALL_DISABLED_PROP};
    case FOOTER_MODE.SEARCH:
      console.log(">>>>> SEARCH")
      return getPropSelectAndEnabled(null, [FOOTER_ACTIONS.BACK]);
    case FOOTER_MODE.EDIT:
      console.log(">>>>> EDIT")
      return getPropSelectAndEnabled(FOOTER_ACTIONS.SEND, [FOOTER_ACTIONS.SEND, FOOTER_ACTIONS.SAVE, FOOTER_ACTIONS.CANCEL_APPROVAL_PROCESS, FOOTER_ACTIONS.VOID, FOOTER_ACTIONS.BACK]);
    case FOOTER_MODE.ADD_DRAFT:
      console.log(">>>>> ADD_DRAFT")
      return getPropSelectAndEnabled(FOOTER_ACTIONS.SEND, [FOOTER_ACTIONS.SEND, FOOTER_ACTIONS.SAVE, FOOTER_ACTIONS.BACK]);
    case FOOTER_MODE.AP_APPROVAL:
      console.log(">>>>> AP_APPROVAL")
      return getPropSelectAndEnabled(FOOTER_ACTIONS.APPROVAL, [FOOTER_ACTIONS.APPROVAL, FOOTER_ACTIONS.REJECT, FOOTER_ACTIONS.BACK]);
    case FOOTER_MODE.AP_CHECK_APPROVAL:
      console.log(">>>>> AP_CHECK_APPROVAL")
      return getPropSelectAndEnabled(FOOTER_ACTIONS.CHECK_APPROVAL, [FOOTER_ACTIONS.CHECK_APPROVAL, FOOTER_ACTIONS.REJECT, FOOTER_ACTIONS.BACK]);
    case FOOTER_MODE.AP_GOT_IT:
      console.log(">>>>> AP_GOT_IT")
      return getPropSelectAndEnabled(FOOTER_ACTIONS.GOT_IT, [FOOTER_ACTIONS.GOT_IT, FOOTER_ACTIONS.BACK]);
    case FOOTER_MODE.AP_CHECK_ORDER:
      console.log(">>>>> AP_CHECK_ORDER")
      return getPropSelectAndEnabled(FOOTER_ACTIONS.APPROVAL_ORDER, [FOOTER_ACTIONS.APPROVAL_ORDER, FOOTER_ACTIONS.FAST_TRACK, FOOTER_ACTIONS.BACK]);
    case FOOTER_MODE.AP_CHECK_MAINTENANCE:
      console.log(">>>>> AP_CHECK_MAINTENANCE")
      return getPropSelectAndEnabled(FOOTER_ACTIONS.CHECK_APPROVAL, [FOOTER_ACTIONS.CHECK_APPROVAL, FOOTER_ACTIONS.REJECT, FOOTER_ACTIONS.BACK]);
    case FOOTER_MODE.AP_GUARANTEE_MAINTENANCE:
      console.log(">>>>> AP_GUARANTEE_MAINTENANCE")
      return getPropSelectAndEnabled(FOOTER_ACTIONS.CHECK_APPROVAL, [FOOTER_ACTIONS.CHECK_APPROVAL, FOOTER_ACTIONS.REJECT, FOOTER_ACTIONS.BACK]);
    default:
      return {...ALL_DISABLED_PROP};
  }
}

const mapDispatchToProps = (dispatch) => ({
  handleClick: (e) => {
    let footerAction = e.target.title;
    return dispatch(FOOTER_ACTIONS_TO_ACTION_CREATOR[footerAction]());
  }
})


const Footer = connect(
  mapStateToProps, mapDispatchToProps
)(FooterComponent)


export default Footer;