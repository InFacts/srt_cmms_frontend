import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux'

import { loadNotify, readNotify } from '../../redux/modules/notify.js';

import { Link } from 'react-router-dom';
import logo from '../../../images/home.svg';
import { useDispatch, useSelector, shallowEqual } from 'react-redux'

import { fetchPositionPermissionData } from '../../helper';
import { identifyEndpoinsHelper } from '../../helper';
const MainModule = (props) => {
    const toolbar = useSelector((state) => ({ ...state.toolbar }));
    const footer = useSelector((state) => ({ ...state.footer }));
    const [checkNav, setCheckNav] = useState(false);
    const [checkNav2, setCheckNav2] = useState(false);

    const [checkPermission, setCheckPermission] = useState([]);
    const fact = useSelector((state) => ({ ...state.api.fact }), shallowEqual);
    const decoded_token = useSelector((state) => ({ ...state.token.decoded_token }), shallowEqual);

    let module = [];
    useEffect(() => {
        if (decoded_token.has_position) {
            fetchPositionPermissionData(decoded_token.has_position[0].position_id)
                .then((position_permission) => {
                    // console.log("position_permission", position_permission)
                    position_permission.map((list_module) => {
                        module.push({
                            position_id: list_module.position_id,
                            name: list_module.name,
                            abbreviation: list_module.abbreviation,
                            module_spare: list_module.function.indexOf(1) !== -1,
                            module_pmt: list_module.function.indexOf(2) !== -1,
                            module_als: list_module.function.indexOf(3) !== -1,
                            module_track_document: list_module.function.indexOf(4) !== -1,
                            module_admin: list_module.function.indexOf(5) !== -1,
                        })
                    })
                    setCheckPermission(module);
                })
        }
    }, [decoded_token.has_position]);

    useEffect(() => {
        // Load Notify
        props.loadNotify();
    }, [toolbar.mode]);

    // useEffect(() => {
    //     // Setup SubNav
    // setupAllSubNav();
    // }, [checkNav, checkNav2]);

    const identifyEndpoins = (document_type_id) => identifyEndpoinsHelper(document_type_id)

    let url = window.location.pathname;

    useEffect(() => {
        // Setup SubNav
        colorTopBar();
    }, [url]);

    const colorTopBar = () => {
        if (url === "/main" || url === "/profile") {
            return "#FFFFFF";
        }
        if (url === "/main-spare" || url === "/spare-item-master-data"
            || url === "/spare-goods-receipt2" || url === "/spare-goods-receipt-no-po"
            || url === "/spare-goods-return" || url === "/spare-goods-fix"
            || url === "/spare-goods-receipt-fix" || url === "/spare-goods-usage"
            || url === "/spare-goods-issue" || url === "/spare-inventory-transfer"
            || url === "/spare-salvage-return" || url === "/spare-salvage-sold"
            || url === "/spare-physical-count" || url === "/spare-inventory-adjustment"
            || url === "/spare-report-s-1" || url === "/spare-warehouse"
            || url === "/spare-report-b22") {
            return "#F6A79B";
        }
        if (url === "/main-pmt" || url === "/pmt-work-request"
            || url === "/pmt-work-order" || url === "/pmt-maitenant-item"
            || url === "/pmt-ss-101" || url === "/pmt-equipment-master"
            || url === "/pmt-equipment-installation" || url === "/pmt-fixed-asset"
            || url === "/pmt-create-checklist" || url === "/pmt-all-checklist"
            || url === "/pmt-create-schedule-checklist" || url === "/pmt-report"
            || url === "/pmt-list-fixed-asset" || url === "/pmt-all-checklist-fixed-asset") {
            return "#9ADFF9";
        }
        if (url === "/main-als" || url === "/als-spare"
            || url === "/als-equipment-status" || url === "/als-summary-ss101"
            || url === "/als-preventive-maintenance" || url === "/als-plan-preventive-maintenance") {
            return "#CCE7B2";
        }
        if (url === "/main-admin" || url === "/user-management"
            || url === "/permissiton-admin" || url === "/activity-log"
            || url === "/register") {
            return "#EBE0F8";
        }
        if (url === "/approval-flow" || url === "/approval-flow-step") {
            return "#F8CFDC";
        }
        if (url === "/track") {
            return "#F5F8BF";
        }
    }

    // console.log("nav.mode", toolbar.mode, footer.mode)
    if (toolbar.mode === "INVISIBLE" && footer.mode === "INVISIBLE") {
        return null
    }
    else {
        return (
            <div>
                <div id="header" style={{ backgroundColor: `${colorTopBar()}` }}>
                    <div className="container_12 clearfix">

                        <ul className="p-navigation__items" role="menu" style={{ height: "49px" }}>
                            <li className="nav-li">
                                <Link to="/main">
                                    <img src={logo} alt="logo" width="200px" />

                                </Link>
                            </li>

                            {url !== "/main"
                                ?
                                <>
                                    <li className="nav-li box-red-top-bar">
                                        <Link to={checkPermission.length !== 0 && checkPermission[0].module_spare ? "/main-spare" : "#"}>ระบบบริหารข้อมูลอะไหล่</Link>
                                    </li>
                                    <li className="nav-li box-blue-top-bar">
                                        <Link to={checkPermission.length !== 0 && checkPermission[0].module_pmt ? "/main-pmt" : "#"}>ระบบบริหารงานซ่อมบำรุง</Link>
                                    </li>

                                    <li className="nav-li box-green-top-bar">
                                        <Link to={checkPermission.length !== 0 && checkPermission[0].module_als ? "/main-als" : "#"}>ระบบวิเคราะห์วางแผนทรัพยากรซ่อมบำรุง</Link>
                                    </li>

                                    <li className="nav-li box-yellow-top-bar">
                                        <Link to={checkPermission.length !== 0 && checkPermission[0].module_track_document ? "/track" : "#"}>สถานะรออนุมัติ</Link>
                                    </li>
                                </>
                                :
                                null}

                            <li className={`p-navigation__item p-subnav a nav-li ${checkNav ? `is-active` : ``}`} style={{ marginRight: "0", marginLeft: "auto" }}
                                role="menuitem" id="link-1" onClick={() => setCheckNav(true)}
                                onBlur={() =>
                                    document.addEventListener('click', function (e) {
                                        var currentElement = null;
                                        currentElement = e.target.id;
                                        if (currentElement === "dropDawnNoti") {
                                            return setCheckNav(true)
                                        } else {
                                            return setCheckNav(false)
                                        }
                                    })}
                            >
                                <Link to="#" className="p-subnav__toggle p-navigation__link" id="dropDawnNoti" aria-controls="account-menu" style={{ padding: "10px 12px 0 0" }}
                                >
                                    <i className="fas fa-bell" style={{ fontSize: "24px", color: "#823D35" }} id="dropDawnNoti"></i>
                                    {props.notify.not_read_count !== 0
                                        ?
                                        <span className="badge badge-danger badge-counter" id="dropDawnNoti">{props.notify.not_read_count}</span>
                                        :
                                        <span></span>
                                    }
                                </Link>
                                <ul className="p-subnav__items--right" id="dropDawnNoti" aria-hidden="true" style={{ overflowY: "auto", overflowX: "hidden", whiteSpace: "nowrap", height: "270px", backgroundColor: "white" }} >
                                    {props.notify.notify.length === 0
                                        ?
                                        <li>
                                            <Link to="#" className="p-subnav__item sub" id="dropDawnNoti">ไม่มีข้อมูลการแจ้งเตือนในระบบ</Link>
                                        </li>
                                        :
                                        props.notify.notify.map(function (notify) {
                                            return (
                                                <li key={notify.notification_id} id={notify.notification_id}>
                                                    <Link className="p-subnav__item sub_notify" onClick={(e) => {
                                                        props.readNotify(e)
                                                        setCheckNav(true)
                                                    }
                                                    }
                                                        to={identifyEndpoins(notify.document_type_id) + "?internal_document_id=" + notify.internal_document_id + "&document_id=" + notify.document_id} 
                                                        style={notify.is_read.data[0] === 1 ? {} : { backgroundColor: "#edf2fa" }} id="dropDawnNoti">
                                                        <div id="dropDawnNoti">
                                                            <i className="fas fa-file-alt float-left" id="dropDawnNoti" style={{ fontSize: "30px", "marginTop": "16px", "marginLeft": "10px", "color": "#111" }}></i>
                                                            <p className="cancel-default_notify" id="dropDawnNoti" style={{ "color": "#111" }}>{notify.created_on.replace("T", " เวลา ").slice(0, 21) + " น."}</p>
                                                            <p className="cancel-default_notify" id="dropDawnNoti" style={{ "color": "#111" }}>ประเภท: {notify.document_type_name}</p>
                                                            <p className="cancel-default_notify" id="dropDawnNoti" style={{ "color": "#111" }}>เลขที่: {notify.internal_document_id}</p>
                                                            <p className="cancel-default_notify" id="dropDawnNoti" style={{ "color": "#111" }}>{notify.action_document}</p>
                                                        </div>
                                                    </Link>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                            </li>

                            <li className={`p-navigation__item p-subnav a nav-li ${checkNav2 ? `is-active` : ``}`} style={{ marginLeft: "15px" }} role="menuitem" id="link-1"
                                onClick={() => setCheckNav2(true)} id="dropDawnNoti2" onBlur={() =>
                                    document.addEventListener('click', function (e) {
                                        var currentElement2 = null;
                                        currentElement2 = e.target.id;
                                        if (currentElement2 === "dropDawnNoti2") {
                                            return setCheckNav2(true)
                                        } else {
                                            return setCheckNav2(false)
                                        }
                                    })
                                }>
                                <Link to="#" id="dropDawnNoti2" className="p-subnav__toggle p-navigation__link" aria-controls="account-menu" style={{ padding: "10px 0 0 0" }}>
                                    <i id="dropDawnNoti2" className="fas fa-user-circle" style={{ fontSize: "24px", color: "#823D35" }}></i>
                                </Link>
                                <ul id="dropDawnNoti2" className="p-subnav__items--right" id="account-menu" aria-hidden="true">
                                    <li id="dropDawnNoti2">
                                        <Link id="dropDawnNoti2" to="/profile" className="p-subnav__item sub" style={{ color: "#111" }}>โปรไฟล์</Link>
                                    </li>
                                    <li id="dropDawnNoti2">
                                        <Link id="dropDawnNoti2" to="/" className="p-subnav__item sub" style={{ color: "#111" }} onClick={(e) => { if (window.confirm('คุณต้องการออกจากระบบใช่หรือไม่')) { return localStorage.removeItem('token_auth') } else { e.preventDefault(); } }} >ออกจากระบบ</Link>
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