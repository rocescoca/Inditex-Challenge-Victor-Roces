import React, { useState } from "react";
//
import Div100vh from "react-div-100vh";
import "./Container.css";

const Container = ({ children }) => {
  const [theme, setTheme] = useState("theme-Default");
  const availableThemes = ["theme-Default", "theme-Blue-Steel", "theme-Forest"];
  return (
    <Div100vh className={`container ${theme}`}>
      {children}
      <div className="theme-selector">
        {availableThemes
          .filter((t) => t !== theme)
          .map((t) => (
            <button
              title={t}
              key={t}
              name={t}
              onClick={() => setTheme(t)}
              className={t}
            ></button>
          ))}
      </div>
    </Div100vh>
  );
};

export default Container;
