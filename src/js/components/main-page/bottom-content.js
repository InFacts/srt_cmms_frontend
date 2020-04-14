import React from 'react';

import '../../../css/style.css'

class BottomContent extends React.Component {
    render() {
        return (
            <div>
                <h4 className="head-title-bottom mt-2">bottom</h4>
                <form>
                    <label for="username">Username</label>
                    <input type="text" id="username" className="is-dense" required="" />
                    <label for="address2">Email address</label>
                    <input type="text" id="address2" className="is-dense" required="" />
                    <label for="exampleSelect">Ubuntu releases</label>
                    <select name="exampleSelect" id="exampleSelect" className="is-dense">
                        <option value="" selected>Select an option</option>
                        <option value="1">Cosmic Cuttlefish</option>
                        <option value="2">Bionic Beaver</option>
                        <option value="3">Xenial Xerus</option>
                    </select>
                </form>
                
                <table className="p-table-expanding mt-3" role="grid">
                    <thead className="blackground-gray-for-head-table">
                        <tr role="row">
                            <th id="t-name" aria-sort="none">Name</th>
                            <th id="t-users" aria-sort="none">Mac address</th>
                            <th id="t-units" aria-sort="none">IP</th>
                            <th id="t-units" aria-sort="none">Rack</th>
                            <th id="t-units" aria-sort="none">Last seen</th>
                            <th id="t-revenue" aria-sort="none" className="u-align--right">Actions</th>
                            <th className="u-hide">
                            </th>
                        </tr>
                    </thead>
                    <tbody className="blackground-white-for-table">
                        <tr role="row">
                            <td role="rowheader" aria-label="Name">Unknown</td>
                            <td role="gridcell" aria-label="Users">2c:44:fd:80:3f:25</td>
                            <td role="gridcell" aria-label="Units">10.249.0.1</td>
                            <td role="gridcell" aria-label="Units">karura</td>
                            <td role="gridcell" aria-label="Units">Thu, 25 Oct. 2018 13:55:21</td>
                            <td role="gridcell" className="u-align--right">
                                <button className="u-toggle is-dense" aria-controls="expanded-row" aria-expanded="false" data-shown-text="Hide" data-hidden-text="Show">Show</button>
                            </td>
                        </tr>
                        <tr role="row">
                            <td role="rowheader" aria-label="Name">Unknown</td>
                            <td role="gridcell" aria-label="Users">52:54:00:3a:fe:e9</td>
                            <td role="gridcell" aria-label="Units">172.16.99.191</td>
                            <td role="gridcell" aria-label="Units">karura</td>
                            <td role="gridcell" aria-label="Units">Wed, 3 Oct. 2018 23:08:06</td>
                            <td role="gridcell" className="u-align--right">
                                <button className="u-toggle is-dense" aria-controls="expanded-row-2" aria-expanded="false" data-shown-text="Hide" data-hidden-text="Show">Show</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    };
}

export default BottomContent;