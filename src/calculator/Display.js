import React from "react";
import { useSelector } from "react-redux";
//
import Expression from "./Expression";
//
import "./Display.css";

const CurrentScreen = ({ expression }) => {
  return (
    <div className="display-screen current" aria-label="current">
      <div className="expression">
        <Expression expression={expression} />
      </div>
    </div>
  );
};

const ResultScreen = ({ evaluatedValue }) => {
  return (
    <div className="display-screen result" aria-label="result">
      <div className="expression">
        {evaluatedValue !== null && <span className="equal">=</span>}
        <b>{evaluatedValue}</b>
      </div>
    </div>
  );
};

const Display = () => {
  const expression = useSelector((state) => state.calculator.expression);
  const evaluatedValue = useSelector(
    (state) => state.calculator.evaluatedValue
  );
  return (
    <div className="display">
      <CurrentScreen expression={expression} />
      <ResultScreen evaluatedValue={evaluatedValue} />
    </div>
  );
};

export default Display;
