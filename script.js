const display = document.getElementById("display");

function cleardisplay() {
  display.value = "";
}

function addToDisplay(element) {
  display.value += element;
}

function safeAddToDisplay(element) {
  let displayValue = display.value;
  if (displayValue.endsWith('+') || displayValue.endsWith('-') || displayValue.endsWith('*') || displayValue.endsWith('/')) {
    displayValue = displayValue.slice(0, -1) + element
    display.value = displayValue
  } else if (displayValue.endsWith('.')) {

  }
  else if (display.value !== "") {
    display.value += element
  }
}

function addFloatingPointToDisplay(element) {
  let displayValue = display.value;
  let regex = /(\d+\.?\d*)|([+\-*/%()])/g;
  let displayValueArr = displayValue.match(regex);

  if (displayValueArr != null) {
    if (!isNaN(+displayValueArr[displayValueArr.length - 1])) {
      if (!(displayValueArr[displayValueArr.length - 1]).includes('.'))
        display.value += element;
    }
    else {
      display.value += ("0" + element);
    }
  }
  else {
    display.value += ("0" + element);
  }
}

function perfromDivisonAndMultiplication(expArr) {
  //We will loop through the arry to check whether there is any division operation or not
  let x = 0;
  while (x < expArr.length) {
    if (expArr[x] == '/') {
      //If there is any division operator we will find the number preceeding and succeeding the division operator
      let num1 = parseFloat(expArr[x - 1]);
      let num2 = parseFloat(expArr[x + 1]);
      //We will perform the division operation and assign it to the index of preceeding element.
      let result = num1 / num2;
      if (result == "Infinity") {
        display.value = "Error"
        return;
      }
      expArr[x - 1] = result;
      //We will delete the xth and (x+1)th elements to as they have been operated on
      expArr.splice(x, 2);
      x--;
    }
    if (expArr[x] == '*') {
      //If there is any multiplication operator we will find the number preceeding and succeeding the operator
      let num1 = parseFloat(expArr[x - 1]);
      let num2 = parseFloat(expArr[x + 1]);
      //We will perform the operation and assign it to the index of preceeding element.
      let result = num1 * num2;
      expArr[x - 1] = result;
      //We will delete the xth and (x+1)th elements to as they have been operated on
      expArr.splice(x, 2);
      x--;
    }
    x++;
  }
  return expArr
}


function perfromAditionAndSubtraction(expArr) {
  //We will loop through the arry to check whether there is any operation or not
  let x = 0;
  while (x < expArr.length) {
    if (expArr[x] == '+') {
      //If there is any addition operator we will find the number preceeding and succeeding the operator
      let num1 = parseFloat(expArr[x - 1]);
      let num2 = parseFloat(expArr[x + 1]);
      //We will perform the operation and assign it to the index of preceeding element.
      let result = num1 + num2;
      expArr[x - 1] = result;
      //We will delete the xth and (x+1)th elements as they have been operated on
      expArr.splice(x, 2);
      // Step back one index, in case another '/' follows
      x--;
      continue;
    }
    if (expArr[x] == '-') {
      //If there is any subtraction operator we will find the number preceeding and succeeding the operator
      let num1 = parseFloat(expArr[x - 1]);
      let num2 = parseFloat(expArr[x + 1]);
      //We will perform the operation and assign it to the index of preceeding element.
      let result = num1 - num2;
      expArr[x - 1] = result;
      //We will delete the xth and (x+1)th elements as they have been operated on
      expArr.splice(x, 2);
      x--;
      continue;
    }
    x++;
  }
  return expArr

}


function calculate() {
  //Taking the value from the display and splitting it into array of numbers and operators
  let expression = display.value;
  let regex = /(\d+\.?\d*)|([+\-*/%()])/g;
  let expArr = expression.match(regex);
  //If ok we will proceed to perform operations
  //At first we will perform division and multiplication
  expArr = perfromDivisonAndMultiplication(expArr);
  expArr = perfromAditionAndSubtraction(expArr);
  if (isNaN(expArr[0])) {
    display.value = "Error";
  }
  else {
    display.value = expArr[0];
  }

}