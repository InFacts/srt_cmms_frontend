import React from 'react';
import { connect } from 'react-redux'
import { useDispatch, useSelector } from 'react-redux'

import {
    TOOLBAR_MODE, TOOLBAR_ACTIONS, clickHome, clickAdd, clickSave,
    clickRefresh, clickBackward, clickForward, clickExportPDF, toModeSearch, toModeInvisible
} from '../../redux/modules/toolbar.js';


import '../../../vender/fontawesome-free/css/all.css';
import '../../../css/style-nav.css'

import HomeSvg from '../../../images/toolbar/home.svg'
import SearchSvg from '../../../images/toolbar/search.svg'
import AddSvg from '../../../images/toolbar/add-document.svg'
import SaveSvg from '../../../images/toolbar/save.svg'
import RefreshSvg from '../../../images/toolbar/retry.svg'
import BackwardSvg from '../../../images/toolbar/back.svg'
import ForwardSvg from '../../../images/toolbar/forward.svg'
import ExportPdfSvg from '../../../images/toolbar/pdf.svg'

const TOOLBAR_ORDER = [TOOLBAR_ACTIONS.HOME,
TOOLBAR_ACTIONS.SEARCH,
TOOLBAR_ACTIONS.ADD,
// TOOLBAR_ACTIONS.SAVE, 
TOOLBAR_ACTIONS.REFRESH,
TOOLBAR_ACTIONS.BACKWARD,
TOOLBAR_ACTIONS.FORWARD,
TOOLBAR_ACTIONS.EXPORT_PDF];

const TOOLBAR_TO_ICON = {
    [TOOLBAR_ACTIONS.HOME]: HomeSvg,
    [TOOLBAR_ACTIONS.SEARCH]: SearchSvg,
    [TOOLBAR_ACTIONS.ADD]: AddSvg,
    [TOOLBAR_ACTIONS.SAVE]: SaveSvg,
    [TOOLBAR_ACTIONS.REFRESH]: RefreshSvg,
    [TOOLBAR_ACTIONS.BACKWARD]: BackwardSvg,
    [TOOLBAR_ACTIONS.FORWARD]: ForwardSvg,
    [TOOLBAR_ACTIONS.EXPORT_PDF]: ExportPdfSvg
}

const TOOLBAR_ACTIONS_TO_ACTION_CREATOR = {
    [TOOLBAR_ACTIONS.HOME]: clickHome,
    [TOOLBAR_ACTIONS.SEARCH]: toModeSearch,
    [TOOLBAR_ACTIONS.ADD]: clickAdd,
    [TOOLBAR_ACTIONS.SAVE]: clickSave,
    [TOOLBAR_ACTIONS.REFRESH]: clickRefresh,
    [TOOLBAR_ACTIONS.BACKWARD]: clickBackward,
    [TOOLBAR_ACTIONS.FORWARD]: clickForward,
    [TOOLBAR_ACTIONS.EXPORT_PDF]: clickExportPDF
}

const ToolbarItemComponent = (props) => {
    let { isDisabled, isSelecting, toolbarAction, handleClick } = props;
    let a_className = "toolbar";
    let img_className = "img-toolbar"
    if (isDisabled) {
        a_className += " disabled";
        img_className += " filter-green"
    }
    if (isSelecting) {
        img_className += " selecting";
        // handleClick = null; Make it handle click!!
    }
    return (
        <li className="nav-li">
            <a className={a_className}>
                <div className="p-tooltip--btm-center edit" aria-describedby="btm-cntr" >
                    <img className={img_className} alt={toolbarAction} src={TOOLBAR_TO_ICON[toolbarAction]} onClick={handleClick} />
                    <span className="p-tooltip__message edit_p_tooltip__message tooltip1" role="tooltip" id="btm-cntr">Spare 1</span>
                </div>
            </a>
        </li>
    )
};


const ToolbarComponent = (props) => {
    const toolbar = useSelector((state) => ({ ...state.toolbar }));
    if (toolbar.mode !== "INVISIBLE") {
        return (
            <div id="toolbar">
                <div className="container_12 clearfix" style={{ marginTop: "3px" }}>
                    <ul className="grid_12 nav-ul ">
                        {TOOLBAR_ORDER.map((toolbar_action, toolbar_action_index) => (
                            <ToolbarItemComponent
                                key={`toolbar-item-${toolbar_action_index}`}
                                toolbarAction={toolbar_action}
                                isDisabled={props[toolbar_action].isDisabled}
                                isSelecting={props[toolbar_action].isSelecting}
                                handleClick={props.handleClick}
                            />
                        ))}
                    </ul>
                </div>
            </div>
        )
    }
    return null
};

const ALL_DISABLED_PROP = {}
Object.keys(TOOLBAR_ACTIONS).map((key, index) => {
    return (ALL_DISABLED_PROP[key] = { isDisabled: true, isSelecting: false })
});

function getPropSelectAndEnabled(selectedAction, enabledActions) {
    let toolbarProp = { ...ALL_DISABLED_PROP };
    if (selectedAction !== null) {
        toolbarProp[selectedAction] = {
            isDisabled: false,
            isSelecting: true
        }
    }
    enabledActions.map(enabledAction => {
        toolbarProp[enabledAction] = {
            isDisabled: false,
            isSelecting: false
        }
    })
    return toolbarProp
}

const mapStateToProps = (state) => {
    switch (state.toolbar.mode) {
        case TOOLBAR_MODE.INVISIBLE:
            return { toolbar: state.toolbar };
        case TOOLBAR_MODE.NONE:
            return { ...ALL_DISABLED_PROP };
        case TOOLBAR_MODE.NONE_HOME:
            return getPropSelectAndEnabled(null, [TOOLBAR_ACTIONS.HOME]);
        case TOOLBAR_MODE.SEARCH:
            return getPropSelectAndEnabled(TOOLBAR_ACTIONS.SEARCH,
                [TOOLBAR_ACTIONS.HOME, TOOLBAR_ACTIONS.ADD, TOOLBAR_ACTIONS.REFRESH, TOOLBAR_ACTIONS.BACKWARD, TOOLBAR_ACTIONS.FORWARD, TOOLBAR_ACTIONS.EXPORT_PDF]);
        case TOOLBAR_MODE.ADD:
            return getPropSelectAndEnabled(TOOLBAR_ACTIONS.ADD,
                [TOOLBAR_ACTIONS.HOME, TOOLBAR_ACTIONS.SEARCH, TOOLBAR_ACTIONS.SAVE, TOOLBAR_ACTIONS.REFRESH, TOOLBAR_ACTIONS.BACKWARD, TOOLBAR_ACTIONS.FORWARD]);
        default:
            return { ...ALL_DISABLED_PROP };
    }
}

const mapDispatchToProps = (dispatch) => ({
    handleClick: (e) => {
        let toolbarAction = e.target.alt;
        return dispatch(TOOLBAR_ACTIONS_TO_ACTION_CREATOR[toolbarAction]());
    }
})

const Toolbar = connect(
    mapStateToProps, mapDispatchToProps
)(ToolbarComponent)


export default Toolbar;