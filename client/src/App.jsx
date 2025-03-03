import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginOptions from "./components/LoginOptions";
import AdminOptions from "./components/AdminOptions";
import SignIn from "./components/SignIn";
import Login from "./components/Login";
<<<<<<< Updated upstream
import AdminSignIn from "./components/AdminSignIn";
=======
/*Added new */
import ManagerSignIn from "../src/components/ManagerSignIn";
import OwnerSignIn from "../src/components/OwnerSignIn";
>>>>>>> Stashed changes
import UserHome from "./components/User/UserHome";
/*Added By Viren on 2nd march */
import AdminHome from "./components/Admin/AdminHome";
import StaffManagement from "./components/Admin/StaffManagement/StaffManagement";
import InventoryManagement from "./components/Admin/InventoryManagement";
import Statistics from "./components/Admin/Statistics";
import BestRestaurants from "./components/User/categories/BestRestaurants";
import Cafes from "./components/User/categories/Cafes";
import DineIn from "./components/User/categories/Dine-In";
import Menu from "./components/Menu/Menu";

//bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginOptions />} />
        <Route path="/adminoptions" element={<AdminOptions />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/login" element={<Login />} />
<<<<<<< Updated upstream
        <Route path="/adminsignin" element={<AdminSignIn />} />
=======
        <Route path="/manager/signin" element={<ManagerSignIn />} />
        <Route path="/AdminHome" element={<AdminHome />} />
        <Route path="/admin/staff" element={<StaffManagement />} />
        <Route path="/admin/inventory" element={<InventoryManagement />} />
        <Route path="/admin/stats" element={<Statistics />} />
        <Route path="/owner/signin" element={<OwnerSignIn />} />
>>>>>>> Stashed changes
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
