import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Outlet, Routes, Route } from "react-router-dom";
import Header from "./components/header";
import Footer from "./components/footer";
import SignUpForm from "./routes/RegisterPage";
import HomePage from "./routes/HomePage";
import VenuePage from "./routes/VenuePage";
import Login from "./routes/LoginPage";
import HomePageManager from "./routes/LoggedInManager";
import HomePageUser from "./routes/LoggedInUser";
import BookingContextProvider from "./contexts/bookingContext";

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
    <BookingContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<SignUpForm />} />
          <Route path="/login" element={<Login />} />
          <Route path="/:id" element={<VenuePage />} />
          <Route path="/manager" element={<HomePageManager />} />
          <Route path="/user" element={<HomePageUser />} />
        </Route>
      </Routes>
    </BookingContextProvider>
  );
}

export default App;
