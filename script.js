const display = document.getElementById("display");

function cleardisplay() {
  display.value = "";
}

function addtodisplay(character) {
  display.value += character;
}

function checkZeroDivisionError(expArr) {
  for (let x in expArr) {
    if (expArr[x] == '/') {
      if (expArr[x + 1] == '0') {
        return false
      }
    }
  }
  return true
}

function checkIsNotNumberError(expArr) {
  if (expArr[0] == '/' || expArr[0] == '*') {
    return false;
  }
  if (expArr[-1] == '/' || expArr[-1] == '*' || expArr[-1] == '+' || expArr[-1] == '-') {
    return false;
  }
  for (let x in expArr) {
    if (expArr[x] == '/' || expArr[x] == '*') {
      if (isNaN(+expArr[x - 1]) && isNaN(+expArr[x + 1])) {
        return false;
      }
    }
  }
  return true
}

function validate(expArr) {
  let validty = checkZeroDivisionError(expArr);
  validty = checkIsNotNumberError(expArr);
  return validty;
}

function perfromDivison(expArr) {
  //We will loop through the arry to check whether there is any division operation or not
  let x = 0;
  while (x < expArr.length) {
    if (expArr[x] == '/') {
      //If there is any division operator we will find the number preceeding and succeeding the division operator
      let num1 = Number(expArr[x - 1]);
      let num2 = Number(expArr[x + 1]);
      //We will perform the division operation and assign it to the index of preceeding element.
      let result = num1 / num2;
      expArr[x - 1] = result;
      //Now we will assign rest of the elements after the result 
      let i = x; //index after the result
      let j = x + 2; //index after the second operand 
      while (j < expArr.length) {
        expArr[i] = expArr[j]; //copying the element that succeeds the second operand
        i++;
        j++;
      }
      //We will delete the elements after th ith index to avoid duplcate value
      expArr.splice(i, expArr.length);
      //We will continue looping from the xth location as it may now bare the '/' operator again
      continue;
    }
    x++;
  }
  return expArr
}

function perfromMultiplication(expArr) {
  //We will loop through the arry to check whether there is any operation or not
  let x = 0;
  while (x < expArr.length) {
    if (expArr[x] == '*') {
      //If there is any division operator we will find the number preceeding and succeeding the operator
      let num1 = Number(expArr[x - 1]);
      let num2 = Number(expArr[x + 1]);
      //We will perform the division operation and assign it to the index of preceeding element.
      let result = num1 * num2;
      expArr[x - 1] = result;
      //Now we will assign rest of the elements after the result 
      let i = x; //index after the result
      let j = x + 2; //index after the second operand 
      while (j < expArr.length) {
        expArr[i] = expArr[j]; //copying the element that succeeds the second operand
        i++;
        j++;
      }
      //We will delete the elements after th ith index to avoid duplcate value
      expArr.splice(i, expArr.length);
      //We will continue looping from the xth location as it may now bare the operator again
      continue;
    }
    x++;
  }
  return expArr

}

function perfromAdition(expArr) {
  //We will loop through the arry to check whether there is any operation or not
  let x = 0;
  while (x < expArr.length) {
    if (expArr[x] == '+') {
      //If there is any division operator we will find the number preceeding and succeeding the operator
      let num1 = Number(expArr[x - 1]);
      let num2 = Number(expArr[x + 1]);
      //We will perform the division operation and assign it to the index of preceeding element.
      let result = num1 + num2;
      expArr[x - 1] = result;
      //Now we will assign rest of the elements after the result 
      let i = x; //index after the result
      let j = x + 2; //index after the second operand 
      while (j < expArr.length) {
        expArr[i] = expArr[j]; //copying the element that succeeds the second operand
        i++;
        j++;
      }
      //We will delete the elements after th ith index to avoid duplcate value
      expArr.splice(i, expArr.length);
      //We will continue looping from the xth location as it may now bare the operator again
      continue;
    }
    x++;
  }
  return expArr

}

function perfromSubtraction(expArr) {
  //We will loop through the arry to check whether there is any - operation or not
  let x = 0;
  while (x < expArr.length) {
    if (expArr[x] == '-') {
      //If there is any division operator we will find the number preceeding and succeeding the operator
      let num1 = Number(expArr[x - 1]);
      let num2 = Number(expArr[x + 1]);
      //We will perform the division operation and assign it to the index of preceeding element.
      let result = num1 - num2;
      expArr[x - 1] = result;
      //Now we will assign rest of the elements after the result 
      let i = x; //index after the result
      let j = x + 2; //index after the second operand 
      while (j < expArr.length) {
        expArr[i] = expArr[j]; //copying the element that succeeds the second operand
        i++;
        j++;
      }
      //We will delete the elements after th ith index to avoid duplcate value
      expArr.splice(i, expArr.length);
      //We will continue looping from the xth location as it may now bare the operator again
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
  //At frist we will validate whether the expression is ok or not
  let valid = validate(expArr);
  //If ok we will proceed to perform operations
  if (valid == true) {
    //At first we will perform division
    expArr = perfromDivison(expArr);
    //Then multiplication 
    expArr = perfromMultiplication(expArr);
    //Then Addition 
    expArr = perfromAdition(expArr);
    //Then Subtraction
    expArr = perfromSubtraction(expArr);

    display.value = expArr[0];
  }
  //Or else give error message
  else {
    display.value = "Error"
  }

}