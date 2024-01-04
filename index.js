document.addEventListener('DOMContentLoaded', function () {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.digits, .operator');
    const clearButton = document.querySelector('.clear');
    const equalButton = document.getElementById('eq');

    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', buttonClickHandler);
    }

    function buttonClickHandler() {
        appendToDisplay(this.textContent);
    }

    clearButton.addEventListener('click', clearDisplay);
    equalButton.addEventListener('click', calculate);

    function appendToDisplay(value) {
        display.value += value;
    }

    function clearDisplay() {
        display.value = '';
    }

    function calculate() {
        const displayValue = display.value;
        try {
            const result = evaluateExpression(displayValue);
            console.log(result);
            display.value = result;
            localStorage.setItem('ANSWER', result);
            sessionStorage.setItem("result is",result);
        } catch (error) {
            display.value = 'Error';
        }
    }

    function evaluateExpression(expression) {
        const tokens = tokenizeExpression(expression);
        const postfixExpression = infixToPostfix(tokens);
        console.log(postfixExpression);
        const result = evaluatePostfix(postfixExpression);
        console.log(result);
        return result;
    }

    function tokenizeExpression(expression) {
        const spacedExpression = expression.replace(/([+\-*/()])/g, ' $1 ');
        const spacedNegativeExpression = spacedExpression.replace(/-\s(\d+\.\d+|\d+)/g, '-$1');
        return spacedNegativeExpression.match(/(\d+\.\d+|\d+|[+\-*/()])/g);
    }
    
    function infixToPostfix(infixTokens) {
        // console.log(infixTokens);
        const precedence = { '+': 1, '-': 1, '*': 2, '/': 2 };
        const stack = [];
        const postfixTokens = [];

        for (const i of infixTokens) {
            if (!isNaN(i) || i.includes('.')) {
                postfixTokens.push(i);
            } 
            else {
                while (stack.length && precedence[stack[stack.length - 1]] >= precedence[i]) {
                    postfixTokens.push(stack.pop());
                }

                stack.push(i);
            }
        }

        while (stack.length) {
            postfixTokens.push(stack.pop());
        }
        return postfixTokens;
    }

    function evaluatePostfix(postfixTokens) {
        const temp = [];

        for (const token of postfixTokens) {
            if (!isNaN(token) || token.includes('.')) {
                stack.push(parseFloat(token));
            } else {
                const num2 = temp.pop();
                const num1= temp.pop();

                switch (token) {
                    case '+':
                        temp.push(num11 + num2);
                        break;
                    case '-':
                        temp.push(num1 - num2);
                        break;
                    case '*':
                        temp.push(num1 * num2);
                        break;
                    case '/':
                        if (num2 === 0) {
                            throw new Error('Division by zero');
                        }
                        temp.push(num1 / num2);
                        break;
                }
            }
        }

        if (temp.length !== 1) {
            throw new Error('Invalid expression');
        }
        return temp.pop();
    }
});
