import React, {useState, useEffect} from 'react';

export const TAB_BAR_ACTIVE = {
  ACTIVE: "ACTIVE",
  INACTIVE: "INACTIVE"
}

const TabBar = (props) => {

  // Run only once with checking nothing []
  // 1. Check Tabbar is_active
  useEffect(()=>{
    actionTabDocument();
    console.log("><>>>>>>>>>>>>")
  }, []);

  // Clear & Check initial Tabbar is_active
  const actionTabDocument = (e) => {
    // Clear Class of Tabbar & TabLinks
    clearTabbar()

    // Check initial Tabbar is_active
    if (props.initialTabbar !== true) {
      // Active Tabar
      document.getElementById(e.target.id+"_content").style.display = "block";
      e.currentTarget.className += " active";
    }
    else {
      // Set Initial Tabbar is False
      props.setInitialTabbar(false);

      // Active Tabar
      for (let i = 0; i < props.tabNames.length; i++) {
        if (props.tabNames[i].is_active === TAB_BAR_ACTIVE.ACTIVE) {
          document.getElementById(props.tabNames[i].id+"_content").style.display = "block";

          let tablinks = document.getElementsByClassName("tablinks");
          tablinks[i].className += " active";
        }
      }
    }
  }
  return ( 
    <>
      <div id="blackground-white">
        <div className="container_12">
          <div className="tab grid_11">
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