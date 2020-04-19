/**
  Toggles visibility of modal dialog.
  @param {HTMLElement} modal Modal dialog to show or hide.
*/
function toggleModal(modal) {
  console.log("test",modal.style.display)
  console.log("test",modal.classList.contains('p-modal'))
  if (modal && modal.classList.contains('p-modal')) {
    if (modal.style.display === 'flex') {
      console.log("flex")
      modal.style.display = 'none';
    } else {
      console.log("none")
      modal.style.display = 'flex';
      // modal.style.display = 'none';
    }
  }
}

// Add click handler for clicks on elements with aria-controls
document.addEventListener('click', function(event) {
  console.log(event.target.id);
  //var targetControls = event.target.getAttribute('aria-controls');
  // var targetControls = document.getElementById('aria-controls');
  //document.getElementById(targetControls).style.display = 'flex';
  if (event.target.id=="aria-controls") {
    console.log("sdsdsd")
    var modal = document.getElementById('modal');
    toggleModal(modal);
  }
});