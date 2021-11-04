import React from "react";
import { Provider } from "react-redux";
//
import store from "./store";
import Container from "./container/Container";
import Calculator from "./calculator/Calculator";
//
import "./styles.css";

export default function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Container>
          <Calculator />
        </Container>
      </div>
    </Provider>
  );
}
