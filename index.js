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
    !(
      targetObject.matches("#equal") ||
      targetObject.matches("#cancel-btn") ||
      targetObject.matches("#numpad-back")
    )
  ) {
    displayOperation(targetObject.innerText);
  } else if (targetObject.getAttribute("id") === "equal") {
    calculateOperands(display.innerText);
  } else if (targetObject.matches("#cancel-btn")) {
    cancelDisplay();
  } else if (targetObject.matches("#numpad-back")) {
    console.log(display.lastChild);
    backOperation();
  }
}

addNumpadListeners();

function displayOperation(operationText) {
  display.append(operationText);
}

function backOperation() {
  try {
    display.removeChild(display.lastChild);
  } catch {
    showError("No more deletion target");
  }
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

function showError(errorString) {
  cancelDisplay();
  displayOperation(errorString);
}

function calculateOperands(displayOperators) {
  try {
    displayOperators = InterpolateSigns(displayOperators);
    const operation = new Function(`return ${displayOperators}`);
    cancelDisplay();
    displayOperation(operation());
    console.log(operation());
  } catch {
    showError("Invalid Syntax");
  }
}
