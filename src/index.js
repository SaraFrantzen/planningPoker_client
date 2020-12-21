import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import axios from "axios";
import "semantic-ui-css/semantic.min.css";
import "./index.css";
import { Provider } from "react-redux";
import configureStore from "./state/store/configureStore";


const store = configureStore();
window.store = store;

let apiUrl;
if (process.env.NODE_ENV === "production") {
  apiUrl = "https://sl-planning-poker-api.herokuapp.com/api";
} else {
  apiUrl = "http://localhost:3000/api";
}
axios.defaults.baseURL = apiUrl;

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);
