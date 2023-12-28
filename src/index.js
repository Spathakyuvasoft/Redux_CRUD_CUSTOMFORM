import React from "react";
import ReactDOM from "react-dom/client";
import store from "./components/Store/store";
import { Provider } from "react-redux";
import {
  createBrowserRouter,
  RouterProvider,
  BrowserRouter,
} from "react-router-dom";
import "./index.css";
import router from "./App.js";
import reportWebVitals from "./reportWebVitals";
import rounter from "./App.js";
import Form from "./components/Form/form";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
