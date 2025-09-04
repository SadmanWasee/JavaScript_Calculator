const display = document.getElementById("display");
let flag = 0;

let clearDisplay = () => {
  display.value = "";
}

let checkZeroDivisionError = (expArr) => {
  let count = expArr.length - 1

  for (let i = 0; i < count; i++) {
    if (expArr[i] == "/" && (parseFloat(expArr[i + 1])) == 0) {
      return true;
    }
  }

  return false;
}

let addToDisplay = (element) => {
  let operators = ['+', '-', '*', '/'];
  let displayValue = display.value;
  if(flag==1){
    clearDisplay();
    flag=0;
  }

  //Handling decimal point case 
  if (element == ".") {

    let regex = /(\d+\.?\d*)|([+\-*/%()])/g;
    let displayValueArr = displayValue.match(regex);

    //If the display value arr is not null
    if (displayValueArr != null) {

      
      last_element = displayValueArr[displayValueArr.length - 1]
      //we will check if the last element is a number or an operator
      if (!isNaN(+last_element)) {

        //we will check if the number does not include decimal point
        if (!last_element.includes('.')) {
          //Then we will add the decimal point to the display
          display.value += element;
        }
          
      }

      //Otherwise the last element must be an operator so we will put zero before putting the element/'.'
      else {
        display.value += ("0" + element);
      }
    }

    //Otherwise the display value must be null so we need to add a zero before the decimal point at first
    else {
      display.value += ("0" + element);
    }
  }

  //Handling operators case
  else if (operators.includes(element)) {

    //Check if the displayValue endswith operator
    let ends_with_operator = operators.some(op => displayValue.endsWith(op));

    if ((displayValue.length > 1) && ends_with_operator) {
      //If yes then replace the old operator with the newly pressed operator
      displayValue = displayValue.slice(0, -1) + element
      display.value = displayValue
    }

    else if (displayValue.endsWith('.')) {
      //If the display value ends with a decimal point. No need to add the element.
    }

    //If display value not equal to empty string and '-' add the element
    else if ((displayValue !== "") && (displayValue != "-")) {
      display.value += element;
    }

    //If the display value is empty and we want to enter '-' we can do so 
    else if ((displayValue == "") && (element == "-")) {
      display.value += element;
    }
  }

  //This else block fills for the digits case.
  else {
    display.value += element
  }

}

let addition = (num1, num2) => {
  return num1 + num2;
}

let subtraction = (num1, num2) => {
  return num1 - num2;
}

let multiplication = (num1, num2) => {
  return num1 * num2;
}

let division = (num1, num2) => {
  return num1 / num2;
}

let operate = (expArr, x) => {
  let operator = expArr[x]//operator
  let num1 = parseFloat(expArr[x - 1]);//first operand
  let num2 = parseFloat(expArr[x + 1]);//second operand
  let result;

  //Using switch case to peform the desired operation according to the operator
  switch (operator) {
    case '/':
      result = division(num1, num2);
      break;
    case '*':
      result = multiplication(num1, num2);
      break;
    case '+':
      result = addition(num1, num2);
      break;
    case '-':
      result = subtraction(num1, num2);
      break;
  }

  expArr[x - 1] = result;//The result will be placed on the index of the first operand
  expArr.splice(x, 2);//We will delete the xth and (x+1)th elements as they have been operated on

  return expArr;
}

let nextOperation = (expArr,operator1,operator2) => {
  let x = 0;
  let count = expArr.length;
  let operator_exist = ((expArr.includes(operator1)) || (operator2))

  if (operator_exist) {
  //Accroding to the PEMDAS we will calculate left most division and multiplication at first.
  //So we will loop until the end of the array and see which operator comes first from the left side 
  while (x < count) {

    let operator_exist = ((expArr.includes(operator1)) || (operator2))
    if (!operator_exist) {
      break;
    }

    if (expArr[x] == operator1) {
      expArr = operate(expArr, x)
      x--;
    }

    if (expArr[x] == operator2) {
      expArr = operate(expArr, x)
      x--;
    }
    x++;
  }
  }
  return expArr;
}

//Perfroming PEMDAS, which stands for Parentheses, Exponents, Multiplication/Division, Addition/Subtraction. 
let nextCalculation = (expArr) => {
  
  //According to PEMDAS Multiplication/Division comes first
  let operatorExists = (expArr.includes('/')||expArr.includes('*'));

  if(operatorExists) {
    expArr = nextOperation(expArr,'/','*');
  }

  //Next Addition/Subtraction is performed
  operatorExists = ((expArr.includes('+'))||(expArr.includes('-')));

  if(operatorExists) {
    expArr = nextOperation(expArr,'+','-');
  }
  
  return expArr
}


let calculate = () => {
  //Taking the value from the display and splitting it into array of numbers and operators
  let expression = display.value;
  let regex = /(\d+\.?\d*)|([+\-*/%()])/g;
  let expArr = expression.match(regex) || [];

  //assiging the last expression and finding whether it is an operator 
  let last_element = expArr[expArr.length - 1];
  let last_element_is_operator = ["+", "-", "*", "/"].includes(last_element);

  //Checking for zero division error
  let has_zero_division_error = checkZeroDivisionError(expArr)

  //We will calculate only if a valid expression has been entered & last element is not an operator & does not have zero division error
  if (expArr.length >= 3 && !last_element_is_operator && !has_zero_division_error) {

    //If the first element is '-' we will unshift/put zero at first
    if (expArr[0] == '-') {
      expArr.unshift('0')
    }

    //We are enforcing the PEMDAS rule for simplification using this function
    expArr = nextCalculation(expArr);

    //If the element on 0th index is Not A Number we will display error message
    if (isNaN(expArr[0])) {
      display.value = "Error";
    }

    //Else we will find if the result is a decicmal number, if it is then we will make it two decimal places 
    //If it is not a decimal number then just print it in display
    else {
      let result = parseFloat(expArr[0]);
      
      display.value = result;
      flag=1
    }
  }
}