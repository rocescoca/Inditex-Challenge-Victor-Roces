import React from "react";

import {
  pressNumber,
  pressDecimalPoint,
  pressOperation,
  pressReverse,
  pressClear,
  pressBack,
  pressEqual,
} from "./calculator.slice";
//
import { GoReply } from "react-icons/go";
//
import "./Keyboard.css";

export const KEY_CLEAR = {
  action: pressClear(),
  name: "key clear",
  display: "C",
  shortCut: "C",
  highlight: true,
};

export const KEY_BACK = {
  action: pressBack(),
  name: "key back",
  display: <GoReply />,
  shortCut: "Backspace",
  highlight: true,
};

export const KEY_REVERSE = {
  action: pressReverse(),
  name: "key reverse digits",
  display: "«",
  shortCut: "ArrowLeft",
  highlight: true,
};

export const KEY_MULTIPLICATION = {
  action: pressOperation("*"),
  name: "key multiplication",
  display: "x",
  shortCut: "*",
  highlight: true,
};

export const KEY_1 = {
  action: pressNumber(1),
  name: "key 1",
  display: "1",
  shortCut: "1",
};

export const KEY_2 = {
  action: pressNumber(2),
  name: "key 2",
  display: "2",
  shortCut: "2",
};

export const KEY_3 = {
  action: pressNumber(3),
  name: "key 3",
  display: "3",
  shortCut: "3",
};

export const KEY_DIVISION = {
  action: pressOperation("/"),
  name: "key division",
  display: "÷",
  highlight: true,
  shortCut: "/",
};

export const KEY_4 = {
  action: pressNumber(4),
  name: "key 4",
  display: "4",
  shortCut: "4",
};
export const KEY_5 = {
  action: pressNumber(5),
  name: "key 5",
  display: "5",
  shortCut: "5",
};
export const KEY_6 = {
  action: pressNumber(6),
  name: "key 6",
  display: "6",
  shortCut: "6",
};
export const KEY_ADDITION = {
  action: pressOperation("+"),
  name: "key addition",
  display: "+",
  highlight: true,
  shortCut: "+",
};
export const KEY_7 = {
  action: pressNumber(7),
  name: "key 7",
  display: "7",
  shortCut: "7",
};
export const KEY_8 = {
  action: pressNumber(8),
  name: "key 8",
  display: "8",
  shortCut: "8",
};
export const KEY_9 = {
  action: pressNumber(9),
  name: "key 9",
  display: "9",
  shortCut: "9",
};
export const KEY_SUBTRACTION = {
  action: pressOperation("-"),
  name: "key subtraction",
  display: "-",
  highlight: true,
  shortCut: "-",
};
export const KEY_0 = {
  action: pressNumber(0),
  name: "key 0",
  display: "0",
  shortCut: "0",
};
export const KEY_DECIMAL_POINT = {
  action: pressDecimalPoint(0),
  name: "key decimal point",
  display: ".",
  shortCut: ".",
};

export const KEY_EQUAL = {
  action: pressEqual(),
  name: "key equal",
  display: "=",
  primary: true,
  shortCut: "Enter",
};

export const KEYBOARD_KEYS_LAYOUT = [
  //
  KEY_CLEAR,
  KEY_BACK,
  KEY_REVERSE,
  KEY_MULTIPLICATION,
  //
  KEY_1,
  KEY_2,
  KEY_3,
  KEY_DIVISION,
  //
  KEY_4,
  KEY_5,
  KEY_6,
  KEY_ADDITION,
  //
  KEY_7,
  KEY_8,
  KEY_9,
  KEY_SUBTRACTION,
  //
  KEY_DECIMAL_POINT,
  KEY_0,
  KEY_EQUAL,
];

export const KEYBOARD_KEYS = {
  KEY_CLEAR,
  KEY_BACK,
  KEY_REVERSE,
  KEY_MULTIPLICATION,
  //
  KEY_1,
  KEY_2,
  KEY_3,
  KEY_DIVISION,
  //
  KEY_4,
  KEY_5,
  KEY_6,
  KEY_ADDITION,
  //
  KEY_7,
  KEY_8,
  KEY_9,
  KEY_SUBTRACTION,
  //
  KEY_DECIMAL_POINT,
  KEY_0,
  KEY_EQUAL,
};
