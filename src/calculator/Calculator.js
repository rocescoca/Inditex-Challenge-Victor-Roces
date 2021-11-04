import React from "react";
//
import Keyboard from "./Keyboard";
import History from "./History";
import Display from "./Display";
//
import "./Calculator.css";

const Calculator = () => {
  return (
    <div className="calculator">
      <History />
      <Display />
      <Keyboard />
    </div>
  );
};

export default Calculator;
