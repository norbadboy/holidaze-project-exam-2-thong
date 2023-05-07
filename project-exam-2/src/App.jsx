import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Outlet, Routes, Route } from "react-router-dom";
import Header from "./components/header";
import Footer from "./components/footer";
import SignUpFormUser from "./routes/RegisterPageUser";
import HomePage from "./routes/HomePage";
import VenuePage from "./routes/VenuePage";
import Login from "./routes/LoginPage";

function Layout() {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<SignUpFormUser />} />
        <Route path="/login" element={<Login />} />
        <Route path="/:id" element={<VenuePage />} />
      </Route>
    </Routes>
  );
}

export default App;
