import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { evaluate } from "mathjs";

/**
 * Create a symbol with unique id
 * @param {*} ({value for the symbol, isOperation indicator})
 * @returns symbol object with unique id
 */
const createSymbol = ({ value, isOperation }) => ({
  id: uuidv4(),
  value: value,
  isOperation: isOperation,
});

/**
 * Get the last element of a list
 * @param {*} list Array of elements
 * @returns Last element or null if list is empty
 */
const getLast = (list) => (list.length > 0 ? list[list.length - 1] : null);

/**
 * Check if is possible to add a decimal point to one expression
 * @param {*} expression Array of symbols
 * @returns Possible or not
 */
const canAddDecimalPoint = (expression) => {
  // if there are no symbols, can not add
  if (expression.length === 0) return false;

  // if last symbol is an operation  // or other point, can not add
  const lastSymbol = getLast(expression);
  if (lastSymbol?.isOperation || lastSymbol?.value === ".") return false;

  // we need to see if we can add one point to the current expressionexpression
  // reverse so we can check from the back
  const reversedexpression = [...expression].reverse();

  // this is the position of the last operation symbol
  const lastOperationIndex = reversedexpression.findIndex(
    (b) => b.isOperation
  );

  // this is the position of the last decimal point
  const lastDecimalPointIndex = reversedexpression.findIndex(
    (b) => !b.isOperation && b.value === "."
  );

  // there are no decimal points in the whole expression
  const thereAreNoDecimalPoints = lastDecimalPointIndex === -1;

  // there are decimal points but they belong to other numbers
  // there is a operation after that last point
  // (we already checked that the last symbol is not operator nor decimal point)
  const thereAreNoDecimalPointsForLastNumber =
    lastOperationIndex > -1 && lastOperationIndex < lastDecimalPointIndex;

  // canAddDecimalPoint
  return thereAreNoDecimalPoints || thereAreNoDecimalPointsForLastNumber;
};

/**
 * Evaluates the an expression's value
 * @param {*} expression Array of symbols
 * @returns The number value, null if something fails
 */
const evaluateExpression = (expression) => {
  // if no symbols, no value
  if (expression.length === 0) return null;

  // if last symbol is an operation, remove
  let newexpression = [...expression];
  if (getLast(newexpression)?.isOperation) {
    newexpression.pop();
  }

  // just join all the symbols
  const expressionString = newexpression.map((e) => e.value).join("");

  // mathjs.evaluate will handle the aritmetic logic
  try {
    return evaluate(expressionString);
  } catch (e) {
    // if the math evaluation fails, no value
    return null;
  }
};

const convertNumberToexpression = (number) => {
  let expression = [];
  try {
    const numberString = number.toString();
    const numberDigitsArray = numberString.split("");
    expression = numberDigitsArray.map((d) =>
      createSymbol({
        value: d,
        isOperation: false,
      })
    );
  } catch (e) {
    console.error("convertNumberToexpression error");
    console.error(e);
  }
  return expression;
};

export const calculatorSlice = createSlice({
  name: "calculator",
  initialState: {
    history: [],
    expression: [],
    evaluatedValue: null,
  },
  reducers: {
    pressNumber: (state, action) => {
      // create new number symbol, the number comes from the action payload
      const numberPressed = action.payload;
      const s = createSymbol({
        value: numberPressed,
        isOperation: false,
      });

      // add symbol to end of array
      state.expression = [...state.expression, s];

      // evaluate expression
      state.evaluatedValue = evaluateExpression(state.expression);
    },
    pressDecimalPoint: (state) => {
      // check rules to see if we can add the decimal point
      if (canAddDecimalPoint(state.expression)) {
        // create new decimalPoint symbol
        const s = createSymbol({
          value: ".",
          isOperation: false,
        });

        // add symbol to end of array
        state.expression = [...state.expression, s];

        // evaluate expression
        state.evaluatedValue = evaluateExpression(state.expression);
      }
    },
    pressOperation: (state, action) => {
      // if there are no symbols, do nothing
      if (!state.expression.length === 0) return;

      // copy the symbols list, we may delete some
      var newexpression = [...state.expression];

      // if the last symbol is an operation, we remove it
      // we will update it with a new operation
      if (getLast(newexpression)?.isOperation) {
        newexpression.pop();
      }

      // create new number symbol, the number comes from the action payload
      const operationPressed = action.payload;
      const s = createSymbol({
        value: operationPressed,
        isOperation: true,
      });

      // add symbol to end of array
      state.expression = [...newexpression, s];

      // evaluate expression
      state.evaluatedValue = evaluateExpression(state.expression);
    },
    pressReverse: (state) => {
      const expression = [...state.expression];

      // if there are no symbols or the last symbol is an operation, do nothing
      if (expression.length === 0 || getLast(expression)?.isOperation) {
        return;
      }

      // we will find the index from where we have to start reversing digits
      let fromIndex = expression.indexOf(
        expression.filter((item) => item.isOperation).pop()
      );

      // this is the static part, we will not touch
      const resto = expression.slice(0, fromIndex + 1);

      // this is the part we will reverse
      let itemsToReverse = expression.slice(fromIndex + 1);

      // take out the first item, and add it to the end
      const firstItem = itemsToReverse.shift();
      const reversedItems = [...itemsToReverse, firstItem];

      // update symbols
      state.expression = [...resto, ...reversedItems];

      // evaluate expression
      state.evaluatedValue = evaluateExpression(state.expression);
    },
    pressClear: (state) => {
      // if there are no symbols, we clear the memory too
      if (state.expression.length === 0) {
        state.history = [];
      }
      // clear the symbols and the value
      state.expression = [];
      state.evaluatedValue = null;
    },
    pressBack: (state) => {
      // if there are no symbols, do nothing
      if (!state.expression.length === 0) return;

      // copy the symbols list
      var newexpression = [...state.expression];

      // remove last symbol
      newexpression.pop();

      // update symbols
      state.expression = [...newexpression];

      // evaluate expression
      state.evaluatedValue = evaluateExpression(state.expression);
    },
    pressEqual: (state) => {
      // if there are no symbols, do nothing
      if (state.expression.length === 0) {
        return;
      }

      // save the expression and the value
      const historyItem = {
        expression: [...state.expression],
        evaluatedValue: state.evaluatedValue,
      };

      // udpate history
      state.history = [...state.history, historyItem];

      const newValue = historyItem.evaluatedValue;

      let newexpression = [];

      if (isFinite(newValue)) {
        // get symbols from expression value
        newexpression = convertNumberToexpression(
          historyItem.evaluatedValue
        );
      }

      // update symbols
      state.expression = [...newexpression];

      // evaluate expression
      state.evaluatedValue = evaluateExpression(state.expression);
    },
    loadExpressionFromHistory: (state, action) => {
      // get the expression history item
      const historyItem = action.payload;

      // update symbols
      state.expression = [...historyItem.expression];

      // evaluate expression
      state.evaluatedValue = evaluateExpression(state.expression);
    },
  },
});

export const {
  pressNumber,
  pressDecimalPoint,
  pressOperation,
  pressReverse,
  pressClear,
  pressBack,
  pressEqual,
  loadExpressionFromHistory,
} = calculatorSlice.actions;

export default calculatorSlice.reducer;
