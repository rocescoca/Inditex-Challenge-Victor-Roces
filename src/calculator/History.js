import React from "react";
import { useDispatch, useSelector } from "react-redux";
//
import Expression from "./Expression";
import ScrollableFeed from "react-scrollable-feed";
import { loadExpressionFromHistory } from "./calculator.slice";
//
import { VscSymbolOperator } from "react-icons/vsc";
import { AiOutlineCopy } from "react-icons/ai";
//
import "./History.css";

const EmptyHistory = () => {
  return (
    <div className="emptyHistory">
      <VscSymbolOperator
        className="emptyHistory-icon"
        aria-label="emptyHistory-icon"
      />
    </div>
  );
};

const HistoryExpressions = () => {
  const history = useSelector((state) => state.calculator.history);
  const dispatch = useDispatch();
  return (
    <ScrollableFeed forceScroll={true}>
      {history.map((h, index) => (
        <div
          aria-label={`history-expression-${index}`}
          className="expression"
          key={index}
          onClick={() => dispatch(loadExpressionFromHistory(h))}
        >
          <Expression expression={h.expression} />
          <span className="equal">=</span>
          <b>{h.evaluatedValue}</b>
          <span className="expression-iconVisibleOnHover">
            <AiOutlineCopy />
          </span>
        </div>
      ))}

      {history.length === 0 && <EmptyHistory />}
    </ScrollableFeed>
  );
};

const History = ({ history }) => {
  return (
    <div className="history">
      <div className="history-scrollContainer">
        <HistoryExpressions history={history} />
      </div>
    </div>
  );
};

export default History;
