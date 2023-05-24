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
import { UserProvider } from "./contexts/userContext";
import { VenuesProvider } from "./contexts/venuesContext";
import ProfilePage from "./routes/ProfilePage";
import UserBookings from "./routes/Bookings";
import ManageVenues from "./routes/ManageVenues";
import ManageBookings from "./routes/ManageBookings";

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
    <UserProvider>
      <VenuesProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/register" element={<SignUpForm />} />
            <Route path="/login" element={<Login />} />
            <Route path="/:id" element={<VenuePage />} />
            <Route path="/manager" element={<HomePageManager />} />
            <Route path="/user" element={<HomePageUser />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/manage-venues" element={<ManageVenues />} />
            <Route path="/bookings" element={<UserBookings />} />
            <Route path="/manage-bookings" element={<ManageBookings />} />
          </Route>
        </Routes>
      </VenuesProvider>
    </UserProvider>
  );
}

export default App;
