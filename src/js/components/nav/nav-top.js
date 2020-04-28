import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../images/logo.png';

import '../../../vender/fontawesome-free/css/all.css';
import '../../../css/style-nav.css'

class NavTop extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        }

        this.toggleMenu = this.toggleMenu.bind(this);
        this.setupContextualMenu = this.setupContextualMenu.bind(this);
        this.setupAllContextualMenus = this.setupAllContextualMenus.bind(this);
    }

    componentDidMount() {
        this.setupAllContextualMenus('.p-contextual-menu__toggle');
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
            console.log(toggles[i])

            this.setupContextualMenu(toggles[i]);
        }

        document.addEventListener('click', function (event) {
            for (var i = 0, l = toggles.length; i < l; i++) {

                var toggle = toggles[i];
                var contextualMenu = document.getElementById(toggle.getAttribute('aria-controls'));

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

    render() {
        return (
            <div>
                <div id="header">
                    <div className="container_12 clearfix">
                        <ul className="grid_12 nav-ul">
                            <li className="nav-li"><Link to="/main">
                                <img src={logo} alt="logo" width="160px" />
                            </Link></li>

                            <li className="nav-li" style={{ float: "right" }}><Link className="mt-12" to="/main"><i className="fas fa-user-circle" style={{ fontSize: "20px", color: "white" }}></i></Link></li>
                            <li className="nav-li" style={{ float: "right" }}><Link className="mt-12" to="/main"><i className="fas fa-bell" style={{ fontSize: "20px", color: "white" }}></i></Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    };
}


export default NavTop;