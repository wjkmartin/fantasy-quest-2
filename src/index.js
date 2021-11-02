import React from "react";
import ReactDOM from "react-dom";

import { Provider } from "react-redux";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";

import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import './Assets/css/fontawesome.css';
import './Assets/css/solid.css'

import store from "./DataHandlers/redux/store";

import Layout from "./components/Layout/Layout";
import * as serviceWorker from "./serviceWorker";

library.add(fas);

ReactDOM.render(
  <Provider store={store}>
    <Layout />
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
