import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginOptions from "./components/LoginOptions";
import AdminOptions from "./components/AdminOptions";
import SignIn from "./components/SignIn";
import Login from "./components/Login";
import AdminSignIn from "./components/AdminSignIn";
import AdminHome from  "./components/Admin/AdminHome";
import UserHome from "./components/User/UserHome";
import BestRestaurants from "./components/User/categories/BestRestaurants";
import Cafes from "./components/User/categories/Cafes";
import DineIn from "./components/User/categories/Dine-In";
import Menu from "./components/Menu/Menu";
import TableReservation from "./components/User/Reservation/TableReservation";
import RestaurantHomePage from "./components/Restaurant/RestaurantHomePage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginOptions />} />
        <Route path="/adminoptions" element={<AdminOptions />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/login" element={<Login />} />
        <Route path="/adminsignin" element={<AdminSignIn />} />
        <Route path="/adminhome" element={<AdminHome />} />
        <Route path="/userhome" element={<UserHome />} />
        <Route path="/restaurant/:id" element={<RestaurantHomePage />} />
        <Route path="/restaurant/:id/reservation" element={<TableReservation />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/bestrestaurants" element={<BestRestaurants />} />
        <Route path="/cafes" element={<Cafes />} />
        <Route path="/dinein" element={<DineIn />} />
        <Route path="/make-reservation" element={<TableReservation />} />

      </Routes>
    </Router>
  );
};

export default App;
