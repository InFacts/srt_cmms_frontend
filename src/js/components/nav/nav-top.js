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

        this.toggleSubnav = this.toggleSubnav.bind(this);
        this.closeAllSubnavs = this.closeAllSubnavs.bind(this);
        this.setupSubnavToggle = this.setupSubnavToggle.bind(this);
        this.setupAllSubNav = this.setupAllSubNav.bind(this);
    }


    componentDidMount() {
        this.setupAllContextualMenus('.p-contextual-menu__toggle');
        this.setupAllSubNav();
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

    render() {

        return (
            <div>
                <div id="header">
                    <div className="container_12 clearfix">

                        <ul className="p-navigation__items grid_12" role="menu">
                            <li className="nav-li"><Link to="/main">
                                <img src={logo} alt="logo" width="160px" />
                            </Link></li>

                            <li className="p-navigation__item p-subnav nav-li" style={{ marginRight: "0", marginLeft: "auto" }} role="menuitem" id="link-1">
                                <Link to="#" className="p-subnav__toggle p-navigation__link" aria-controls="account-menu">
                                    <i className="fas fa-bell" style={{ fontSize: "20px", color: "white" }}></i>
                                </Link>
                                <ul className="p-subnav__items--right" id="account-menu" aria-hidden="true">
                                    <li>
                                        <Link to="#" className="p-subnav__item sub">Sign out</Link>
                                    </li>
                                </ul>
                            </li>
                            <li className="p-navigation__item p-subnav nav-li" role="menuitem" id="link-1">
                                <Link to="#" className="p-subnav__toggle p-navigation__link" aria-controls="account-menu">
                                    <i className="fas fa-user-circle" style={{ fontSize: "20px", color: "white" }}></i>
                                </Link>
                                <ul className="p-subnav__items--right" id="account-menu" aria-hidden="true">
                                    <li>
                                        <Link to="/profile" className="p-subnav__item sub">โปรไฟล์</Link>
                                    </li>
                                    <li>
                                        <Link to="/" className="p-subnav__item sub">Sign out</Link>
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


export default NavTop;