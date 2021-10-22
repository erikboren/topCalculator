const buttons = document.querySelectorAll('.button');
const upperText = document.getElementById('upperText')
var lowerText = document.getElementById('lowerText')
var terms = []
var operator = null;
var result = null;

// States: 0 => no inputs yet, awaiting first term and operator
// 1 ==> recieved first term and operator, awaiting second term and calculate
// 2==> recieved second term and calculate, display result, first term = result,
// if number is pressed overwrite term1, if operator is pressed => state 1




for (let i = 0; i < buttons.length; i++) {

  buttons[i].addEventListener('click', function() {

      const input = this.innerHTML;
      const isOperator = isNaN(input);
      console.log(getState())

      if (getState() == 0 && isOperator == false) {
        lowerText.innerHTML = lowerText.innerHTML + input;
        terms[0] = lowerText.innerHTML;
      } else if (getState() == 1 && isOperator == false) {
        lowerText.innerHTML = lowerText.innerHTML + input;
        terms[0] = lowerText.innerHTML;
      } else if (getState() == 1 && isOperator == true) {
        upperText.innerHTML = terms[0] + input;
        operator = input;
      } else if (getState() == 2 && isOperator == false) {
        lowerText.innerHTML = input;
        terms[1] = lowerText.innerHTML;
      } else if (getState() == 2 && isOperator == true) {
        upperText.innerHTML = terms[0] + input;
        operator = input;
      }
      else if (getState() == 3 && isOperator == false) {
        lowerText.innerHTML = lowerText.innerHTML + input;
        terms[1] = lowerText.innerHTML;
      } else if (getState() == 3 && isOperator == true) {
        result = calculate(terms, operator)
        upperText.innerHTML = terms[0] + operator + terms[1]+ "=";
        lowerText.innerHTML = result;
        operator = input;
        terms[0] = result
        terms.pop();
        if (input != '=') {
          lowerText.innerHTML = lowerText.innerHTML + input;
          operator = null;
        }

      } else if (getState() == 4 && isOperator == true) {
        result = calculate(terms, operator)
        upperText.innerHTML = terms[0] + operator + terms[1] + "=";
        lowerText.innerHTML = result;
        terms[0] = result;
      } else if (getState() == 4 && isOperator == false) {
        clear()
        terms[0] = input
        lowerText.innerHTML = lowerText.innerHTML + input;
      }


    if (input == 'C') {
      clear();
    }


  })
};


const getState = function() {
  if (terms.length == 0) {
    return 0;
  } else if (terms.length == 1 && operator == null) {
    return 1;
  } else if (terms.length == 1 && operator != null) {
    return 2;
  } else if (terms.length == 2 && result == null) {
    return 3;
  } else if (result = !null) {
    return 4;
  }
}

const clear = function() {
  terms = []
  operator = null;
  upperText.innerHTML = ""
  lowerText.innerHTML = ""
  result = null;
}

const calculate = function() {
  term0 = Number(terms[0]);
  term1 = parseFloat(terms[1]);
  switch (operator) {
    case '+':
      result = term0 + term1;
      break;
    case '-':
      result = term0 - term1;
      break;
    case '×':
      result = term0 * term1;
      break;
    case '÷':
      result = term0 / term1;
      break;
  }

  return result
}


const inputField = function(input) {

}

const displayResult = function() {

}
