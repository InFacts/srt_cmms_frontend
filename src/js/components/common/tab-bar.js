import React from 'react';

const ActionTabDocument = (e) => {
  var i, tabcontent, tablinks;
  var idElement = e.target.id;
  console.log("idElement", idElement)
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");

  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(idElement+"_content").style.display = "block";
  e.currentTarget.className += " active";
}

const TabDocument = (props) => {
  const {tabNames} = props;
  return (
    <>
      <div className="grid_12">
        <div className="tab grid_11">
          {
            tabNames.map((tabName, index) => 
              <button type="button" className="tablinks" id={tabName.id} onClick={ActionTabDocument}>{tabName.name}</button>
            )
          }
        </div>
      </div>
      {props.children}
    </>
  )
}
export default TabDocument;