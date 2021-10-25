const upperTextElement = document.getElementById('upperText');
const lowerTextElement = document.getElementById('lowerText');
const numButtons = document.querySelectorAll('.numButton');
const operatorButtons = document.querySelectorAll('.operatorButton');
const miscButtons = document.querySelectorAll('.miscButton');
var lowerText = "";
var upperText = "";
var operands = [];
var activeOperand = 0;
var lastButton
var addDot = '';
var operator
var operatorString = ''
var clearOnNextNumber = false;
var calcLastAction = false;
var operandStrings = [];


for (let i = 0; i < numButtons.length; i++) {
  numButtons[i].addEventListener('click', function() {
    const input = this.innerHTML;
    numberInput(input);
    lastButton = input;
  })
}

// + - * / are operator buttons

for (let i = 0; i < operatorButtons.length; i++) {
  operatorButtons[i].addEventListener('click', function() {
    const input = this.innerHTML;
    operatorInput(input);
    lastButton = input;
  })
}

// C, +/-, %, = are miscButtons

for (let i = 0; i < miscButtons.length; i++) {
  miscButtons[i].addEventListener('click', function() {
    const input = this.innerHTML;
    lastButton = input;
    switch (input) {
      case 'C':
        clear()
        break;
      case '+/-':
        plusMinus()
        break;
      case ',':
        comma();
        break;
      case '=':
        calculate('equalInput');
        break;
    }
  })
}


const numberInput = function(input) {
  calcLastAction = false;
  if (clearOnNextNumber) {
    clear();
  };
  if (operands[activeOperand] == null) {
    operands[activeOperand] = parseFloat(input);
  } else {
    if (operands[activeOperand].toString().length < 13) {
      operands[activeOperand] = parseFloat(operands[activeOperand].toString() + addDot + input.toString());
      addDot = "";
    }

  }
  updateLowerText('numberInput')
}

const operatorInput = function(input) {
  clearOnNextNumber = false;
  if (calcLastAction) {
    activeOperand = 1;
    operands[1] = null;
    calcLastAction = false;
    operatorString = input;
    updateUpperText('operatorInput');
    updateLowerText(); //will clear lower text
  } else {
    if (activeOperand == 0) {
      activeOperand = 1;
      operatorString = input;
      updateLowerText('operatorInput');
      updateUpperText('operatorInput');
    } else if (activeOperand == 1) {
      calculate('operatorInput')
      operatorString = input;
    }
  }


}

//functions for controlling the screen
const updateLowerText = function(mode) {
  switch (mode) {
    case 'numberInput':
      lowerTextElement.innerHTML = dotToComma(operands[activeOperand].toString());
      break;
    case 'operatorInput':
      lowerTextElement.innerHTML = "";
      break;
    case 'clear':
      lowerTextElement.innerHTML = "";
      break;
    case 'plusMinus':
      lowerTextElement.innerHTML = dotToComma(operands[activeOperand].toString());
      break;
    case 'comma':
      lowerTextElement.innerHTML = operands[activeOperand] + ',';
      break;
    case 'calculate':
      lowerTextElement.innerHTML = dotToComma(checkLength(result.toString(), 'sig'))
      break;
    case 'divByZero':
      lowerTextElement.innerHTML = 'Error divide by 0';
      break;
    default:
      lowerTextElement.innerHTML = "";
      break;
  }
}

const updateUpperText = function(mode) {
  switch (mode) {
    case 'operatorInput':
      upperTextElement.innerHTML = operands[0].toString() + operatorString;
      break;
    case 'clear':
      upperTextElement.innerHTML = "";
      break;
    case 'operatorResult':
      upperTextElement.innerHTML = checkLength(operands[0].toString() + operatorString + operands[1].toString() + "=", 'short');
      break;
    default:
      upperTextElement.innerHTML = "";
      break;
  }
}


//misc button functions
const clear = function() {
  operands = [];
  activeOperand = 0;
  updateLowerText('clear');
  updateUpperText('clear');
  operator = '';
  addDot = '';
  clearOnNextNumber = false;
  calcLastAction = false;

}

const plusMinus = function() {
  operands[activeOperand] = operands[activeOperand] * -1
  updateLowerText('plusMinus');
}
//adds a decimal unless the screen is empty or active operand already has decimal
const comma = function() {
  if (operands[activeOperand] != null && operands[activeOperand] % 1 == 0) {
    updateLowerText('comma');
    addDot = '.'
  }

  return
}

const dotToComma = function(operandString) {
  return operandString.replace(/\./g, ',')
}

// calculation function
const calculate = function(mode) {
  switch (mode) {
    case 'operatorInput':
      result = compute();
      if (result != 'error') {
        updateLowerText('calculate');
        clearOnNextNumber = true;
        calcLastAction = true;
        if (Number(result)) {
          updateUpperText('operatorResult')
          operands[0] = result
        }

      }
      break;
    case 'equalInput':
      result = compute();
      if (result != 'error') {
        updateLowerText('calculate');
        clearOnNextNumber = true;
        calcLastAction = true;
        if (Number(result)) {
          updateUpperText('operatorResult')
          operands[0] = result
        }

        break;
      }
  }
}
const compute = function() {
  switch (operatorString) {
    case '+':
      return operands[0] + operands[1];
      break;
    case '-':
      return operands[0] - operands[1];
      break;
    case '×':
      return operands[0] * operands[1];
      break;
    case '÷':
      if (operands[1] == 0) {
        updateLowerText('divByZero');
        updateUpperText();
        return 'error'
      } else {
        return operands[0] / operands[1];
      }

  }
}

const checkLength = function(input, mode) {

  if (input.length > 12) {
    switch (mode) {
      case 'sig':
        return parseFloat(input).toPrecision(6);
        break;
      case 'short':
        for (var i = 0; i < 2; i++) {
          if (operands[i] > 99999 || operands[i].toString().length > 6) {
            operandStrings[i] = operands[i].toPrecision(3);
          } else operandStrings[i] = operands[i].toString();
        }

        return operandStrings[0] + operatorString + operandStrings[1] + "="
        break;
    }
  } else {
    return input;
  }

}
