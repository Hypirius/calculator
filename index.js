function addNumpadListeners() {
  const numpad = document.getElementById("numpad");
  numpad.addEventListener("click", function (clickObject) {
    if (clickObject.target.classList.contains("numpad-block")) {
      displayNumbers(clickObject);
    } else if(clickObject.target.getAttribute("id") === "equal") {
        
    }
  });
}

addNumpadListeners();

function displayNumbers(clickElement) {
  const display = document.getElementById("calculator-display");
  if (clickElement.target.getAttribute("id") === "cancel-btn") {
    cancelDisplay(display);
    console.log("Cleared display");
    return;
  }
  display.append(clickElement.target.innerText);
}

function cancelDisplay(display) {
  display.innerText = "";
}
