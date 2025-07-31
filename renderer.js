const display = document.getElementById('display');
    const numberButtons = document.querySelectorAll('.number');
    const operatorButtons = document.querySelectorAll('.operator');
    const equalButton = document.getElementById('equal');
    const clearButton = document.getElementById('clear');

    let expression = "";

    // Mouse click events
    numberButtons.forEach(button => {
      button.addEventListener('click', () => appendToExpression(button.textContent));
    });

    operatorButtons.forEach(button => {
      if (button.id !== "clear") {
        button.addEventListener('click', () => appendToExpression(button.textContent));
      }
    });

    equalButton.addEventListener('click', evaluateExpression);

    clearButton.addEventListener('click', clearExpression);

    // Append text to expression
    function appendToExpression(char) {
      expression += char;
      display.textContent = expression;
    }

    // Evaluate expression
    function evaluateExpression() {
      try {
        const result = eval(expression);
        display.textContent = result;
        expression = result.toString();
      } catch {
        display.textContent = "Error";
        expression = "";
      }
    }

    // Clear expression
    function clearExpression() {
      expression = "";
      display.textContent = "0";
    }

    // Keyboard support
    document.addEventListener('keydown', (e) => {
      const allowedKeys = '0123456789.+-*/';
      
      if (allowedKeys.includes(e.key)) {
        appendToExpression(e.key);
      } else if (e.key === 'Enter') {
        evaluateExpression();
      } else if (e.key === 'Backspace') {
        expression = expression.slice(0, -1);
        display.textContent = expression || '0';
      } else if (e.key === 'Escape') {
        clearExpression();
      }
    });