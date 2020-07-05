import React, {useEffect} from 'react';
import { fetchPositionPermissionData, changeTheam } from '../../helper.js'
const TabBar = (props) => {

  // Run only once with checking nothing []
  // 1. Check Tabbar is_active
  useEffect(()=>{
    if(props.initialTabID){
      document.getElementById(props.initialTabID+"_content").style.display = "block";
      document.getElementById(props.initialTabID).className += " active";
    }
  }, []);

  // Clear & Check initial Tabbar is_active
  const actionTabDocument = (e) => {
    // Clear Class of Tabbar & TabLinks
    clearTabbar()
    // Active Tabar
    document.getElementById(e.target.id+"_content").style.display = "block";
    e.currentTarget.className += " active";
  }
  return ( 
    <>
      <div id={changeTheam() === true ? "" : "blackground-white"}>
        <div className="container_12" id={changeTheam() === true ? "blackground-white" : ""} style={ changeTheam() === true ? { marginTop: "10px", borderRadius: "25px", border: "1px solid gray" } : {} }>
          <div className="tab grid_12">
            {props.tabNames.map((tabName, index) => 
                <button type="button" className="tablinks" id={tabName.id} onClick={actionTabDocument}>{tabName.name}</button>
            )}
          </div>
        </div>
      </div>
      {props.children}
    </>
  )
}
export default TabBar;

// Clear Class of Tabbar & TabLinks
const clearTabbar = () => {
  let tabcontent = document.getElementsByClassName("tabcontent");
  for (let i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  let tablinks = document.getElementsByClassName("tablinks");
  for (let i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
}