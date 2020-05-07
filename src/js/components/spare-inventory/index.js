import React from 'react';

import NavTopbar from '../nav/nav-top.js';
import ToolBar from '../nav/nav-toolbar.js';
import TopContent from './top-content';
import BottomContent from './bottom-content';
import NavBottom from '../nav/nav-bottom.js';

class Inventory extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            mockUpData: {}
        };
        this.onConfirm = this.onConfirm.bind(this);
    }
    onConfirm (order) {
        this.setState({
            mockUpData: order
        })
    }

    render() {
        const type = 'default';
        return (
            <div>
                <NavTopbar />
                <ToolBar />
                <form>
                    <TopContent confirm={this.onConfirm} />
                    <BottomContent mockUpData={this.state.mockUpData} />
                    <NavBottom type={type} />
                </form>
            </div>
        )
    };
}

export default Inventory;
