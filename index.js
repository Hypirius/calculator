const display = document.getElementById("calculator-display");

function addNumpadListeners() {
  const numpad = document.getElementById("numpad");
  numpad.addEventListener("click", function (clickObject) {
    buttonChecker(clickObject.target);
  });
}

function buttonChecker(targetObject) {
  if (
    targetObject.classList.contains("numpad-block") &&
    !(targetObject.matches("#equal") || targetObject.matches("#cancel-btn"))
  ) {
    displayOperation(targetObject.innerText);
  } else if (targetObject.getAttribute("id") === "equal") {
    calculateOperands(display.innerText);
  } else if (targetObject.matches("#cancel-btn")) {
    cancelDisplay();
  }
}

addNumpadListeners();

function displayOperation(operationText) {
  display.append(operationText);
}

function cancelDisplay() {
  display.innerText = "";
}

function InterpolateSigns(operationString) {
  if (operationString.includes("÷") || operationString.includes("x")) {
    operationString = operationString.replaceAll("÷", "/").replaceAll("x", "*");
  }
  return operationString;
}

function showError() {
  cancelDisplay();
  displayOperation("Invalid Syntax");
}

function calculateOperands(displayOperators) {
  try {
    displayOperators = InterpolateSigns(displayOperators);
    const operation = new Function(`return ${displayOperators}`);
    cancelDisplay();
    displayOperation(operation());
    console.log(operation());
  } catch {
    showError();
  }
}
