import React from "react";
import "./App.css";
import Header from "./components/header";
import { Outlet, Routes, Route } from "react-router-dom";

function Layout() {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}></Route>
    </Routes>
  );
}

export default App;
