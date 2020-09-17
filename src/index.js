/* eslint-disable react/react-in-jsx-scope, react/jsx-filename-extension, no-unused-vars */

/* @jsx createElement */

import Calculate from './modules';

function createElement(tagName, props, ...children) {
  const element = document.createElement(tagName);

  Object.entries(props || {}).forEach(([key, value]) => {
    element[key.toLowerCase()] = value;
  });

  children.flat().forEach((child) => {
    if (child instanceof Node) {
      element.appendChild(child);
      return;
    }
    element.appendChild(document.createTextNode(child));
  });

  return element;
}

function render(displayNumber = 0, waitingNumber, waitingOperator, lastInput) {
  function handleClickNumber(number) {
    const afterDisplayNumber = typeof lastInput === 'number'
      ? (displayNumber * 10) + number
      : number;

    render(afterDisplayNumber, waitingNumber, waitingOperator, number);
  }

  function handleClickOperator(operator) {
    const calculatedNumber = waitingOperator && typeof lastInput === 'number'
      ? Calculate[waitingOperator](waitingNumber, displayNumber)
      : displayNumber;

    render(calculatedNumber, calculatedNumber, operator, operator);
  }

  function handleClickEqual() {
    if (waitingOperator) {
      const calculatedNumber = Calculate[waitingOperator](waitingNumber, displayNumber);

      render(calculatedNumber, null, null, '=');
    }
  }

  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{displayNumber}</p>
      <p>
        {
          [1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((number) => (
            <button
              type="button"
              onClick={() => handleClickNumber(number)}
            >
              {number}
            </button>
          ))
        }
      </p>
      <p>
        {
          ['+', '-', '*', '/'].map((operator) => (
            <button type="button" onClick={() => handleClickOperator(operator)}>{operator}</button>
          ))
        }
        <button type="button" onClick={handleClickEqual}>=</button>
      </p>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render();
