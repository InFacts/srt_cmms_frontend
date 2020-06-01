import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../images/logo.png';

import { connect } from 'react-redux'

import axios from "axios";

import { API_PORT_DATABASE } from '../../config_port.js';
import { API_URL_DATABASE } from '../../config_url.js';

class NavTop extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        }

        this.toggleMenu = this.toggleMenu.bind(this);
        this.setupContextualMenu = this.setupContextualMenu.bind(this);
        this.setupAllContextualMenus = this.setupAllContextualMenus.bind(this);

        this.toggleSubnav = this.toggleSubnav.bind(this);
        this.closeAllSubnavs = this.closeAllSubnavs.bind(this);
        this.setupSubnavToggle = this.setupSubnavToggle.bind(this);
        this.setupAllSubNav = this.setupAllSubNav.bind(this);
    }

    componentDidMount() {
        this.setupAllContextualMenus('.p-contextual-menu__toggle');
        this.setupAllSubNav();
        // this.props.loadNotify();
    }

    // Function DropDawn
    toggleMenu(element, show, top) {
        var target = document.getElementById(element.getAttribute('aria-controls'));
        if (target) {
            element.setAttribute('aria-expanded', show);
            target.setAttribute('aria-hidden', !show);

            if (typeof top !== 'undefined') {
                target.style.top = top + 'px';
            }
        }
    }

    setupContextualMenu(menuToggle) {
        var curent = this;
        menuToggle.addEventListener('click', function (event) {
            event.preventDefault();
            var menuAlreadyOpen = menuToggle.getAttribute('aria-expanded') === 'true';

            var top = menuToggle.offsetHeight;

            if (window.getComputedStyle(menuToggle).display === 'inline') {
                top += 5;
            }

            curent.toggleMenu(menuToggle, !menuAlreadyOpen, top);
        });
    }

    setupAllContextualMenus(contextualMenuToggleSelector) {
        var toggles = document.querySelectorAll(contextualMenuToggleSelector);
        for (var i = 0, l = toggles.length; i < l; i++) {
            // console.log(toggles[i])

            this.setupContextualMenu(toggles[i]);
        }

        document.addEventListener('click', function (event) {
            for (var i = 0, l = toggles.length; i < l; i++) {

                // var toggle = toggles[i];
                // var contextualMenu = document.getElementById(toggle.getAttribute('aria-controls'));

                // var clickOutside = !(toggle.contains(event.target) || contextualMenu.contains(event.target));

                // if (clickOutside) {
                //     this.toggleMenu(toggle, false);
                // }
            }
        });
        var curent = this;
        document.addEventListener('keydown', function (e) {
            e = e || window.event;

            if (e.keyCode === 27) {
                for (var i = 0, l = toggles.length; i < l; i++) {
                    curent.toggleMenu(toggles[i], false);
                }
            }
        });
    }

    //Sub Nav
    /**
Toggles visibility of given subnav by toggling is-active className to it
and setting aria-hidden attribute on dropdown contents.
@param {HTMLElement} subnav Root element of subnavigation to open.
*/
    toggleSubnav(subnav, open) {
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
    closeAllSubnavs() {
        var subnavs = document.querySelectorAll('.p-subnav');
        for (var i = 0, l = subnavs.length; i < l; i++) {
            this.toggleSubnav(subnavs[i], false);
        }
    }

    /**
      Attaches click event listener to subnav toggle.
      @param {HTMLElement} subnavToggle Toggle element of subnavigation.
    */
    setupSubnavToggle(subnavToggle) {
        const current = this;
        subnavToggle.addEventListener('click', function (event) {
            event.preventDefault();
            event.stopPropagation();

            var subnav = subnavToggle.parentElement;
            var isActive = subnav.classList.contains('is-active');

            current.closeAllSubnavs();
            if (!isActive) {
                current.toggleSubnav(subnav, true);
            }
        });
    }

    setupAllSubNav() {
        // Setup all subnav toggles on the page
        var subnavToggles = document.querySelectorAll('.p-subnav__toggle');
        // console.log(subnavToggles);

        for (var i = 0, l = subnavToggles.length; i < l; i++) {
            this.setupSubnavToggle(subnavToggles[i]);
        }
        const current = this;
        // Close all menus if anything else on the page is clicked
        document.addEventListener('click', function (event) {
            var target = event.target;

            if (target.closest) {
                if (!target.closest('.p-subnav__toggle') && !target.closest('.p-subnav__item')) {
                    current.closeAllSubnavs();
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

                current.closeAllSubnavs();
            }
        });
    }

    colorReadOrNotRead = (notify) => {
        if (notify.is_read.data[0] === 1) {
            return (
                <Link to="#" className="p-subnav__item sub_notify" onClick={(e) => this.props.readNotify(e)} >
                    <div>
                        <i className="fas fa-file-alt float-left" style={{ fontSize: "30px", "marginTop": "16px", "marginLeft": "10px" }}></i>
                        <p className="cancel-default_notify">{notify.created_on.replace("T", " เวลา ").slice(0, 21) + " น."}</p>
                        <p className="cancel-default_notify">ประเภท: {notify.document_type_name}</p>
                        <p className="cancel-default_notify">เลขที่: {notify.internal_document_id}</p>
                        <p className="cancel-default_notify">{notify.action_document}</p>
                        {/* <p className="cancel-default_notify">ได้รับการอนุมัติจากหัวหน้าแขวงแล้ว - สสญ.</p> */}
                    </div>
                </Link>
            )
        }
        else {
            return (
                <Link to="#" className="p-subnav__item sub_notify" onClick={(e) => this.props.readNotify(e)} style={{ backgroundColor: "#edf2fa" }}>
                    <div>
                        <i className="fas fa-file-alt float-left" style={{ fontSize: "30px", "marginTop": "16px", "marginLeft": "10px" }}></i>
                        <p className="cancel-default_notify">{notify.created_on.replace("T", " เวลา ").slice(0, 21) + " น."}</p>
                        <p className="cancel-default_notify">ประเภท: {notify.document_type_name}</p>
                        <p className="cancel-default_notify">เลขที่: {notify.internal_document_id}</p>
                        <p className="cancel-default_notify">{notify.action_document}</p>
                        {/* <p className="cancel-default_notify">ได้รับการอนุมัติจากหัวหน้าแขวงแล้ว - สสญ.</p> */}
                    </div>
                </Link>
            )
        }
    }

    checkZeroNotify = (notify) => {
        const current = this;
        console.log(notify)
        if (notify.length === 0) {
            return (
                <ul className="p-subnav__items--right" id="account-menu" aria-hidden="true">
                    <li>
                        <Link to="#" className="p-subnav__item sub">ไม่มีข้อมูลการแจ้งเตือนในระบบ</Link>
                    </li>
                </ul>
            )
        }
        else {
            return (
                <ul className="p-subnav__items--right" id="account-menu" aria-hidden="true" style={{ overflowY: "auto", overflowX: "hidden", whiteSpace: "nowrap", height: "270px", backgroundColor: "white" }}>
                    {notify.map(function (notify, index) {
                        return (
                            <li key={notify.notification_id} id={notify.notification_id}>
                                {current.colorReadOrNotRead(notify)}
                            </li>
                        )
                    })}
                </ul>
            )
        }
    }

    countNotify = (not_read_count) => {
        if (not_read_count !== 0) {
            // console.log("in")
            return <span className="badge badge-danger badge-counter">{not_read_count}</span>
        }
        else {
            // console.log("out")
            return <span></span>
        }
    }

    render() {
        const current = this;
        return (
            <div>
                <div id="header">
                    <div className="container_12 clearfix">

                        <ul className="p-navigation__items" role="menu" style={{ height: "49px" }}>
                            <li className="nav-li"><Link to="/main">
                                <img src={logo} alt="logo" width="160px" />
                            </Link></li>

                            <li className="p-navigation__item p-subnav a nav-li" style={{ marginRight: "0", marginLeft: "auto" }} role="menuitem" id="link-1">
                                <Link to="#" className="p-subnav__toggle p-navigation__link" aria-controls="account-menu" style={{ paddingRight: "10px" }} >
                                    <i className="fas fa-bell" style={{ fontSize: "22px", color: "white" }}></i>
                                    {/* {this.countNotify(this.props.not_read_count)} */}
                                </Link>
                                {/* {this.checkZeroNotify(this.props.notify)} */}
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
                                        <Link to="/" className="p-subnav__item sub" onClick={(e) => this.props.logOut(e)} >ออกจากระบบ</Link>
                                    </li>
                                </ul>
                            </li>

                        </ul>
                    </div>
                </div>
            </div>
        )
    };
}

const mapStateToProps = (state) => ({
    notify: state.notify,
    not_read_count: state.not_read_count
})
const mapDispatchToProps = (dispatch) => ({
    // loadNotify: (e) => dispatch(loadNotify(e)),
    // readNotify: (e) => dispatch(readNotify(e)),
    // logOut: (e) => dispatch(logOut(e)),
})
export default connect(mapStateToProps, mapDispatchToProps)(NavTop);

// export const loadNotify = (e) => {
//     return function (dispatch) {
//         return axios.get(`http://${API_URL_DATABASE}:${API_PORT_DATABASE}/user/notification/plus`, { headers: { "x-access-token": localStorage.getItem('token_auth') } }).then((res) => {
//             // console.log(res)
//             dispatch({
//                 type: "LOAD NOTIFY",
//                 value: res.data.results
//             })

//         });
//     };
// }
// export const readNotify = (e) => {
//     const data = {
//         "notification_id": e.target.parentNode.parentNode.parentNode.id,
//         "is_read": true
//     }
//     console.log("data", data)
//     return function (dispatch) {
//         return axios.patch(`http://${API_URL_DATABASE}:${API_PORT_DATABASE}/user/notifications`, data, { headers: { "x-access-token": localStorage.getItem('token_auth') } }).then((res) => {
//             console.log(res)
//             dispatch({
//                 type: "",
//             })
//         });
//     };
// }
// export const logOut = (e) => {
//     localStorage.removeItem('token_auth');
//     const data = {

//     }
//     return function (dispatch) {
//         return axios.post(`http://${API_URL_DATABASE}:${API_PORT_DATABASE}/user/logout`, data, { headers: { "x-access-token": localStorage.getItem('token_auth') } }).then((res) => {
//             console.log(res)
//             dispatch({
//                 type: "",
//             })
//         });
//     };
// }