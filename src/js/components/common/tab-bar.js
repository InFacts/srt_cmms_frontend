import React, {useEffect} from 'react';

const changeTabDocument = (e) => {
  var i, tabcontent, tablinks;
  var idElement = e.target.id;
  // Make the Bottom content gone
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  // Reset all tablinks to without the active classname
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  // Make the Bottom content active
  document.getElementById(idElement+"_content").style.display = "block";
  e.currentTarget.className += " active";
}

const TabDocument = (props) => {
  const {tabNames, activeTabName} = props;
  console.log("this is children")
  console.log(props.children)

  useEffect(() => {
    document.getElementById(activeTabName).className += " active";
    document.getElementById(activeTabName+"_content").style.display = "block";
  }, []);

  return (
    <>
      <div className="grid_12">
        <div className="tab grid_11">
          {
            tabNames.map((tabName, index) => 
              <button type="button" className="tablinks" id={tabName.id} onClick={changeTabDocument}>{tabName.name}</button>
            )
          }
        </div>
      </div>
      {/* {props.children.id === "listReport" && props.children} */}
      {props.children}
    </>
  )
}
export default TabDocument;