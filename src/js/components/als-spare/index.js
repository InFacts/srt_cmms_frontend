import React, { useState, useEffect } from 'react';
import { scaleLinear } from "d3-scale";
import { extent } from "d3-array"
import { useFormik, withFormik, useFormikContext } from 'formik';

import { footerToModeInvisible } from '../../redux/modules/footer.js';
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom';

import { useToolbarChangeModeInitializer } from '../../hooks/toolbar-initializer';
import { TOOLBAR_MODE, TOOLBAR_ACTIONS, MODE_TO_ACTION_CREATOR } from '../../redux/modules/toolbar.js';
import useFactInitializer from '../../hooks/fact-initializer';
import useTokenInitializer from '../../hooks/token-initializer';

import ScatterPlot from './d3-scatter-plot';
import LineGraph from './d3-line-graph';
import MultiLineGraph from './d3-multi-line-graph';
import BarDivergingGraph from './d3-bar-diverging';

import AdjustmentBarComponent from './adjustment-bar';
import SimpleGrayCardComponent from '../als-equipment-status/simple-gray-card';
import SimpleCard2ValuesComponent from './simple-card-2values';
import { getAnnualInventoryMonthData, randomDivergingBarGraphData, randomScatterPlotData } from './mockup-data';

import BgGreen from '../../../images/als/bg_als.jpg';
import { fetchPositionPermissionData, changeTheam } from '../../helper.js'
const AlsSpareComponent = () => {
  const dispatch = useDispatch();
  const loggedIn = useSelector(state => state.token.isLoggedIn);

  // Initializer: Change Toolbar to Mode None
  useToolbarChangeModeInitializer(TOOLBAR_MODE.NONE_HOME); // TODO: Needs to find where to go when we press "HOME"!!
  useTokenInitializer();
  useFactInitializer();
  useEffect(() => {
    dispatch(footerToModeInvisible());
  }, []);

  const [IVMonthData, setIVMonthData] = useState([])
  const [BarDivergingGraphData, setBarDivergingGraphData] = useState([])
  useEffect(() => {
    const interval = setTimeout(() => {
      var randomMonthData = getAnnualInventoryMonthData()
      setIVMonthData(randomMonthData);
    }, 1000);
    return () => clearInterval(interval);
  }, [])
  useEffect(() => {
    const interval = setTimeout(() => {
      // var randomMonthData = randomDivergingBarGraphData()
      setBarDivergingGraphData(randomDivergingBarGraphData());
    }, 1500);
    return () => clearInterval(interval);
  }, [])

  return (
    <>
      {/* {!loggedIn ? <Redirect to="/" /> : null} */}

      <div id={changeTheam() === true ? "" : "blackground-white"} style={changeTheam() === true ? { backgroundImage: `url(${BgGreen})`, width: "100vw", height: "100vh" } : { height: "100vh" }}>
        <div className="bootstrap-wrapper">
          <div class="container" style={{ marginTop: "80px" }}>
            {/* Section Title */}
            <h4 className="head-title mb-0">ระบบวิเคราะห์การวางแผนสำรองอะไหล่</h4>


            {/* Columns have horizontal padding to create the gutters between individual columns, however, you can remove the margin from rows and padding from columns with .no-gutters on the .row. */}
            <div className="row_bootstrap no-gutters">
              {/* === Annual Average Inventory Month Line Graph :1st Row, 1st Column === */}
              <div class="col-4">
                <LineGraph
                  title="Average Inventory Month ของทุกๆปี"
                  data={IVMonthData}
                  chartSettings={{
                    marginTop: 20,
                    height: 230,
                  }}
                />
              </div>


              {/* === Current Average Inventory Month Text :1st Row, 2nd Column === */}
              <div className="col-4"
                style={{ padding: 5 }}
              // style={{ border: "1px red solid" }}
              >
                <div className="row_bootstrap"
                  style={{ marginBottom: 5 }}
                >
                  <div className="col-12">
                    <SimpleGrayCardComponent
                      name="Average Inventory Month ปัจจุบัน"
                      value={`7.5 เดือน `}
                    />
                  </div>
                </div>

                <div className="row_bootstrap no-gutters">
                  <div className="col-4">
                    <SimpleGrayCardComponent
                      name="อะไหล่ต่ำกว่าเกณฑ์"
                      value={52}
                    />
                  </div>
                  <div className="col-4">
                    <SimpleGrayCardComponent
                      name="อะไหล่ตามเกณฑ์"
                      value={200}
                    />
                  </div>
                  <div className="col-4">
                    <SimpleGrayCardComponent
                      name="อะไหล่สูงกว่าเกณฑ์"
                      value={367}
                    />
                  </div>
                </div>

                {/* <LineGraph /> */}
              </div>

              {/* === Current Inventory Month vs Planned Inventory Month Scatter Plot :1st Row, 2nd Column === */}
              <div className="col-4">
                <ScatterPlot
                  title="Inventory Month ปัจจุบัน vs. แผนของแต่ละอะไหล่"
                  data={randomScatterPlotData()}
                  chartSettings={{
                    marginTop: 40,
                    marginBottom: 30,
                    marginLeft: 30,
                    height: 250,
                  }}
                />
              </div>
            </div>
            {/*=== Second Row ===*/}
            <div className="row_bootstrap no-gutters">
              <div className="col-2">
                <AdjustmentBarComponent />
              </div>
              <div className="col-5">
                <BarDivergingGraph
                  title="การนำออกและนำเข้าอะไหล่"
                  data={BarDivergingGraphData}
                />
              </div>
              <div className="col-5">
                <div className="row_bootstrap no-gutters">
                  <div className="col-12">
                    <h5 style={{marginBottom:0 , 
                      backgroundColor: "white",
                      fontSize: 20,
                      fontWeight:600}}>{"อะไหล่ Relay 5V SPDF 240"}</h5>
                  </div>
                  <div className="col-7">
                    <div className="row_bootstrap no-gutters">
                      <div className="col-12">
                        <MultiLineGraph
                          title="การใช้งานและการนำเข้า"
                          data={IVMonthData}
                          chartSettings={{
                            marginTop: 20,
                            height: 150,
                          }}
                        />
                      </div>
                    </div>
                    <div className="row_bootstrap no-gutters">
                      <div className="col-12">
                        <MultiLineGraph
                          title="คงคลัง/Inventory Month"
                          data={IVMonthData}
                          chartSettings={{
                            marginTop: 20,
                            height: 150,
                          }}
                        />
                      </div>
                    </div>
                    <div className="row_bootstrap no-gutters">
                      <div className="col-12">
                        <MultiLineGraph
                          title="Inventory Turnover Rate"
                          data={IVMonthData}
                          chartSettings={{
                            marginTop: 20,
                            height: 150,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-5">
                    <div className="row_bootstrap no-gutters">
                      <div className="col-12">
                        <SimpleCard2ValuesComponent
                          name1="อัตราการนำออก"
                          value1="200/ปี"
                          name2="อัตราการนำเข้า"
                          value2="200/ปี"
                        />
                      </div>
                    </div>
                    <div className="row_bootstrap no-gutters">
                      <div className="col-12">
                        <SimpleCard2ValuesComponent
                          name1="คงคลัง ปัจจุบัน"
                          value1={125}
                          name2="คงคลังเป้าหมาย"
                          value2={110}

                        />
                        <SimpleCard2ValuesComponent
                          name1="Iv. Month ปัจจุบัน"
                          value1={6.5}
                          name2="Iv. Month เป้าหมาย"
                          value2={6}
                        />
                      </div>
                    </div>
                    <div className="row_bootstrap no-gutters">
                      <div className="col-12">
                        <SimpleCard2ValuesComponent
                          name1="Turnover Rate ปัจจุบัน"
                          value1={22}
                          name2="Turnover Rate เป้าหมาย"
                          value2={2}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

const EnhancedAlsSpareComponent = withFormik({
  mapPropsToValues: () => ({
    year: 2563,
    fix_type: '',
    division_id: '',
    district_id: '',
    node_id: '',
  })
})(AlsSpareComponent);

export default EnhancedAlsSpareComponent;
