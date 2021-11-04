import { configureStore } from "@reduxjs/toolkit";
//
import calculatorReducer from "./calculator/calculator.slice";

export default configureStore({
  reducer: {
    calculator: calculatorReducer
  }
});
