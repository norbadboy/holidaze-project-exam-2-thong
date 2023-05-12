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
import { UserProvider } from "./contexts/userContext";
import UserInfo from "./routes/ProfilePage";

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
      <UserProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/register" element={<SignUpForm />} />
            <Route path="/login" element={<Login />} />
            <Route path="/:id" element={<VenuePage />} />
            <Route path="/manager" element={<HomePageManager />} />
            <Route path="/user" element={<HomePageUser />} />
            <Route path="/profile" element={<UserInfo />} />
          </Route>
        </Routes>
      </UserProvider>
    </BookingContextProvider>
  );
}

export default App;
