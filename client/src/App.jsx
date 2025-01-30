import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginOptions from "./components/LoginOptions";
import AdminOptions from "./components/AdminOptions";
import SignIn from "./components/SignIn";
import Login from "./components/Login";
import AdminSignIn from "./components/AdminSignIn";
import UserHome from "./components/User/UserHome";
import BestRestaurants from "./components/User/categories/BestRestaurants";
import Cafes from "./components/User/categories/Cafes";
import DineIn from "./components/User/categories/Dine-In";
import Menu from "./components/Menu/Menu";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginOptions />} />
        <Route path="/adminoptions" element={<AdminOptions />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/login" element={<Login />} />
        <Route path="/adminsignin" element={<AdminSignIn />} />
        <Route path="/userhome" element={<UserHome />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/bestrestaurants" element={<BestRestaurants />} />
        <Route path="/cafes" element={<Cafes />} />
        <Route path="/dinein" element={<DineIn />} />
      </Routes>
    </Router>
  );
};

export default App;
