import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { Container } from "react-bootstrap";
import GlobalStyle from "./styles/globalStyle";
import Theme from "./styles/theme";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Container fluid="lg">
    <BrowserRouter>
      <Theme>
        <GlobalStyle />
        <App />
      </Theme>
    </BrowserRouter>
  </Container>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
