import React from "react";
//
import "./Expression.css";

const Expression = ({ expression }) => {
  return (
    <>
      {expression.map((e) => (
        <span key={e.id} className={e.isOperation ? "operation" : ""}>
          {(() => {
            switch (e.value) {
              case "*":
                return "×";
              case "/":
                return "÷";
              default:
                return e.value;
            }
          })()}
        </span>
      ))}
    </>
  );
};

export default Expression;
