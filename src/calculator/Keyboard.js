import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
//
import { KEYBOARD_KEYS_LAYOUT } from "./keyboard.keys";
//
import "./Keyboard.css";

const Key = ({
  children,
  name,
  handleClick,
  disabled = false,
  highlight = false,
  primary = false,
}) => {
  return (
    <div
      className={`key ${highlight ? "highlight" : ""} ${
        primary ? "primary" : ""
      }`}
    >
      <button
        name={name}
        title={name}
        aria-label={name}
        disabled={disabled}
        onClick={handleClick}
      >
        {children}
      </button>
    </div>
  );
};

const Keyboard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const onKeyDown = (event) => {
      const key = event.key;
      const keyboardKey = KEYBOARD_KEYS_LAYOUT.find(
        (k) => k.shortCut.toUpperCase() === key.toUpperCase()
      );
      if (keyboardKey) {
        dispatch(keyboardKey.action);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [dispatch]);

  return (
    <div className="keyboard">
      {KEYBOARD_KEYS_LAYOUT.map((k) => (
        <Key
          key={k.name}
          handleClick={() => dispatch(k.action)}
          name={k.name}
          highlight={!!k.highlight}
          primary={!!k.primary}
        >
          {k.display}
        </Key>
      ))}
    </div>
  );
};

export default Keyboard;
