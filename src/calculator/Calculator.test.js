import React from "react";
import { Provider } from "react-redux";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
//
import store from "../store";
import Calculator from "./Calculator";
import { KEYBOARD_KEYS } from "./keyboard.keys";

describe("Calculator", () => {
  /**
   * clicks a key
   * @param {*} key
   */
  const clickKey = (key) => {
    fireEvent.click(key.element);
  };

  /**
   * splits a number string in symbols and clicks each key
   * @param {*} numberKeysString
   */
  const clickNumberKeysFromString = (numberKeysString) => {
    const symbols = [...numberKeysString];
    symbols.forEach((s) => {
      switch (s) {
        case "1":
          fireEvent.click(kb.KEY_1.element);
          break;
        case "2":
          fireEvent.click(kb.KEY_2.element);
          break;
        case "3":
          fireEvent.click(kb.KEY_3.element);
          break;
        case "4":
          fireEvent.click(kb.KEY_4.element);
          break;
        case "5":
          fireEvent.click(kb.KEY_5.element);
          break;
        case "6":
          fireEvent.click(kb.KEY_6.element);
          break;
        case "7":
          fireEvent.click(kb.KEY_7.element);
          break;
        case "8":
          fireEvent.click(kb.KEY_8.element);
          break;
        case "9":
          fireEvent.click(kb.KEY_9.element);
          break;
        case "0":
          fireEvent.click(kb.KEY_0.element);
          break;
        case ".":
          fireEvent.click(kb.KEY_DECIMAL_POINT.element);
          break;
        default:
          throw Error(`attemped to click a wrong number (${s})`);
      }
    });
  };

  /**
   * Before each test setup the calculator
   * Render calculator
   * get result element reference
   * get keyboard keys elements references
   */
  beforeEach(() => {
    render(
      <Provider store={store}>
        <Calculator></Calculator>
      </Provider>
    );

    result = screen.getByLabelText("result");
    kb = { ...KEYBOARD_KEYS };

    Object.keys(kb).map((key, index) => {
      kb[key].element = screen.getByLabelText(kb[key].name);
      return null;
    });

    clickKey(kb.KEY_CLEAR);
  });

  let kb = [];
  let result = null;

  test("addition (1+2.0+5+10+0.5) = 18.5", () => {
    clickNumberKeysFromString("1");
    clickKey(kb.KEY_ADDITION);
    clickNumberKeysFromString("2.0");
    clickKey(kb.KEY_ADDITION);
    clickNumberKeysFromString("5");
    clickKey(kb.KEY_ADDITION);
    clickNumberKeysFromString("10");
    clickKey(kb.KEY_ADDITION);
    clickNumberKeysFromString("0.5");
    expect(result).toHaveTextContent("=18.5");
  });

  test("subtraction (10.5-10-1.5) = -1", () => {
    clickNumberKeysFromString("10.5");
    clickKey(kb.KEY_SUBTRACTION);
    clickNumberKeysFromString("10");
    clickKey(kb.KEY_SUBTRACTION);
    clickNumberKeysFromString("1.5");
    expect(result).toHaveTextContent("=-1");
  });

  test("multiplication (0.5*2*10.9) = 10.9", () => {
    clickNumberKeysFromString("0.5");
    clickKey(kb.KEY_MULTIPLICATION);
    clickNumberKeysFromString("2");
    clickKey(kb.KEY_MULTIPLICATION);
    clickNumberKeysFromString("10.9");
    expect(result).toHaveTextContent("=10.9");
  });

  test("division (100.5/2.5/2) = 20.1", () => {
    clickNumberKeysFromString("100.5");
    clickKey(kb.KEY_DIVISION);
    clickNumberKeysFromString("2.5");
    clickKey(kb.KEY_DIVISION);
    clickNumberKeysFromString("2");
    expect(result).toHaveTextContent("=20.1");
  });

  test("reverse (12345) = 23451", () => {
    clickNumberKeysFromString("12345");
    clickKey(kb.KEY_REVERSE);
    expect(result).toHaveTextContent("=23451");
  });

  test("reverse (23451) = 34512", () => {
    clickNumberKeysFromString("23451");
    clickKey(kb.KEY_REVERSE);
    expect(result).toHaveTextContent("=34512");
  });

  test("cant add multiple decimal points (5..2) = 5.2", () => {
    clickNumberKeysFromString("5..2");
    expect(result).toHaveTextContent("=5.2");
  });

  test("operation after operation overrides previous (5+-5) = 0", () => {
    clickNumberKeysFromString("5");
    clickKey(kb.KEY_ADDITION);
    clickKey(kb.KEY_SUBTRACTION);
    clickNumberKeysFromString("5");
    expect(result).toHaveTextContent("=0");
  });

  test("1 back removes 1 symbol (123) = 12", () => {
    clickNumberKeysFromString("123");
    clickKey(kb.KEY_BACK);
    expect(result).toHaveTextContent("=12");
  });

  test("2 backs remove 2 symbols (123) = 1", () => {
    clickNumberKeysFromString("123");
    clickKey(kb.KEY_BACK);
    clickKey(kb.KEY_BACK);
    expect(result).toHaveTextContent("=1");
  });

  test("clear empties result (123) = ''", () => {
    clickNumberKeysFromString("123");
    clickKey(kb.KEY_CLEAR);
    expect(result).toHaveTextContent("");
  });
});
