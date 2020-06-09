import React, { useEffect } from 'react';
import { connect } from 'react-redux'

import { loadNotify, readNotify } from '../../redux/modules/notify.js';

import { Link } from 'react-router-dom';
import logo from '../../../images/logo.png';
import { useDispatch, useSelector } from 'react-redux'

//Sub Nav
/**
Toggles visibility of given subnav by toggling is-active className to it
and setting aria-hidden attribute on dropdown contents.
@param {HTMLElement} subnav Root element of subnavigation to open.
*/
const toggleSubnav = (subnav, open) => {
    if (open) {
        subnav.classList.add('is-active');
    } else {
        subnav.classList.remove('is-active');
    }

    var toggle = subnav.querySelector('.p-subnav__toggle');

    if (toggle) {
        var dropdown = document.getElementById(toggle.getAttribute('aria-controls'));

        if (dropdown) {
            dropdown.setAttribute('aria-hidden', open ? 'true' : false);
        }
    }
}

/**
Closes all subnavs on the page.
*/
const closeAllSubnavs = () => {
    var subnavs = document.querySelectorAll('.p-subnav');
    for (var i = 0, l = subnavs.length; i < l; i++) {
        toggleSubnav(subnavs[i], false);
    }
}

/**
 Attaches click event listener to subnav toggle.
@param {HTMLElement} subnavToggle Toggle element of subnavigation.
*/
const setupSubnavToggle = (subnavToggle) => {
    subnavToggle.addEventListener('click', function (event) {
        event.preventDefault();
        event.stopPropagation();

        var subnav = subnavToggle.parentElement;
        var isActive = subnav.classList.contains('is-active');

        closeAllSubnavs();
        if (!isActive) {
            toggleSubnav(subnav, true);
        }
    });
}

const setupAllSubNav = () => {
    console.log("SETUP NAV DROP DAWN", new Date())
    // Setup all subnav toggles on the page
    var subnavToggles = document.querySelectorAll('.p-subnav__toggle');
    // console.log(subnavToggles);

    for (var i = 0, l = subnavToggles.length; i < l; i++) {
        setupSubnavToggle(subnavToggles[i]);
    }
    // Close all menus if anything else on the page is clicked
    document.addEventListener('click', function (event) {
        var target = event.target;

        if (target.closest) {
            if (!target.closest('.p-subnav__toggle') && !target.closest('.p-subnav__item')) {
                closeAllSubnavs();
            }
        } else if (target.msMatchesSelector) {
            // IE friendly `Element.closest` equivalent
            // as in https://developer.mozilla.org/en-US/docs/Web/API/Element/closest
            do {
                if (target.msMatchesSelector('.p-subnav__toggle') || target.msMatchesSelector('.p-subnav__item')) {
                    return;
                }
                target = target.parentElement || target.parentNode;
            } while (target !== null && target.nodeType === 1);

            closeAllSubnavs();
        }
    });
}
const MainModule = (props) => {
    const toolbar = useSelector((state) => ({ ...state.toolbar }));
    const footer = useSelector((state) => ({ ...state.footer }));
    console.log("toolbar.mode", toolbar.mode)
    useEffect(() => {
        // Setup SubNav
        setupAllSubNav();
        // Load Notify
        props.loadNotify();
    }, [toolbar.mode]);


    // console.log("nav.mode", toolbar.mode, footer.mode)
    if (toolbar.mode === "INVISIBLE" && footer.mode === "INVISIBLE") {
        return null
    }
    else {
        return (
            <div>
                <div id="header">
                    <div className="container_12 clearfix">

                        <ul className="p-navigation__items" role="menu" style={{ height: "49px" }}>
                            <li className="nav-li">
                                <Link to="/main">
                                    <img src={logo} alt="logo" width="160px" />
                                </Link>
                            </li>

                            <li className="p-navigation__item p-subnav a nav-li" style={{ marginRight: "0", marginLeft: "auto" }} role="menuitem" id="link-1">
                                <Link to="#" className="p-subnav__toggle p-navigation__link" aria-controls="account-menu" style={{ paddingRight: "10px" }} >
                                    <i className="fas fa-bell" style={{ fontSize: "22px", color: "white" }}></i>
                                    {props.notify.not_read_count !== 0
                                        ?
                                        <span className="badge badge-danger badge-counter">{props.notify.not_read_count}</span>
                                        :
                                        <span></span>
                                    }
                                </Link>
                                <ul className="p-subnav__items--right" id="account-menu" aria-hidden="true" style={{ overflowY: "auto", overflowX: "hidden", whiteSpace: "nowrap", height: "270px", backgroundColor: "white" }}>
                                    {props.notify.notify.length === 0
                                        ?
                                        <li>
                                            <Link to="#" className="p-subnav__item sub">ไม่มีข้อมูลการแจ้งเตือนในระบบ</Link>
                                        </li>
                                        :
                                        props.notify.notify.map(function (notify, index) {
                                            return (
                                                <li key={notify.notification_id} id={notify.notification_id}>
                                                    <Link to="#" className="p-subnav__item sub_notify" onClick={(e) => props.readNotify(e)} style={notify.is_read.data[0] === 1 ? {} : { backgroundColor: "#edf2fa" }} >
                                                        <div>
                                                            <i className="fas fa-file-alt float-left" style={{ fontSize: "30px", "marginTop": "16px", "marginLeft": "10px" }}></i>
                                                            <p className="cancel-default_notify">{notify.created_on.replace("T", " เวลา ").slice(0, 21) + " น."}</p>
                                                            <p className="cancel-default_notify">ประเภท: {notify.document_type_name}</p>
                                                            <p className="cancel-default_notify">เลขที่: {notify.internal_document_id}</p>
                                                            <p className="cancel-default_notify">{notify.action_document}</p>
                                                        </div>
                                                    </Link>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                            </li>
                            <li className="p-navigation__item p-subnav a nav-li" role="menuitem" id="link-1">
                                <Link to="#" className="p-subnav__toggle p-navigation__link" aria-controls="account-menu">
                                    <i className="fas fa-user-circle" style={{ fontSize: "22px", color: "white" }}></i>
                                </Link>
                                <ul className="p-subnav__items--right" id="account-menu" aria-hidden="true">
                                    <li>
                                        <Link to="/profile" className="p-subnav__item sub">โปรไฟล์</Link>
                                    </li>
                                    <li>
                                        <Link to="/" className="p-subnav__item sub" onClick={(e) => {if (window.confirm('คุณต้องการออกจากระบบใช่หรือไม่')) {return localStorage.removeItem('token_auth') } else { e.preventDefault(); }}} >ออกจากระบบ</Link>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    notify: state.notify,
    not_read_count: state.not_read_count,
});

const mapDispatchToProps = {
    loadNotify,
    readNotify
}

export default connect(mapStateToProps, mapDispatchToProps)(MainModule);