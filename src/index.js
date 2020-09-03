import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import Auth0Provider from "./auth0-provider";

import "./index.css";

ReactDOM.render(
  <Router>
    <Auth0Provider>
    <App />
    </Auth0Provider>
  </Router>,
  document.getElementById("root")
);