import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginOptions from "./components/LoginOptions";
import AdminOptions from "./components/AdminOptions";
import SignIn from "./components/SignIn";
import Login from "./components/Login";
import AdminSignIn from "./components/AdminSignIn";  
import ManagerSignIn from "../src/components/ManagerSignIn"; 
import OwnerSignIn from "../src/components/OwnerSignIn";  
import UserHome from "./components/User/UserHome";
import AdminHome from "./components/Admin/AdminHome";
import StaffManagement from "./components/Admin/StaffManagement";
import InventoryManagement from "./components/Admin/InventoryManagement";
import Statistics from "./components/Admin/Statistics";
import BestRestaurants from "./components/User/categories/BestRestaurants";
import Cafes from "./components/User/categories/Cafes";
import DineIn from "./components/User/categories/Dine-In";
import Menu from "./components/Menu/Menu";
import RestaurantHomePage from "./components/Restaurant/RestaurantHomePage";
import TableReservation from "./components/User/Reservation/TableReservation";
import MenuAdmin from "./components/Admin/MenuAdmin";
import EditMenuItem from "./components/Admin/MenuAdmin";
import AddMenuItem from "./components/Admin/MenuAdmin";
import ReservationAdmin from "./components/Admin/ReservationAdmin";

import Settings from "./components/Admin/Settings/Settings";
import ProfileSettings from "./components/Admin/Settings/ProfileSettings";
import PasswordSettings from "./components/Admin/Settings/PasswordSettings";
import BusinessSettings from "./components/Admin/Settings/BusinessSettings";
import UserManagement from "./components/Admin/Settings/UserManagementSettings";



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
        <Route path="/adminsignin" element={<AdminSignIn />} />
        <Route path="/manager/signin" element={<ManagerSignIn />} />
        <Route path="/owner/signin" element={<OwnerSignIn />} />
        <Route path="/AdminHome" element={<AdminHome />} />
        <Route path="/admin/staff" element={<StaffManagement />} />
        <Route path="/admin/inventory" element={<InventoryManagement />} />
        <Route path="/admin/stats" element={<Statistics />} />
        <Route path="/userhome" element={<UserHome />} />
        <Route path="/restaurant/:id" element={<RestaurantHomePage />} />
        <Route path="/restaurant/:id/reservation" element={<TableReservation />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/bestrestaurants" element={<BestRestaurants />} />
        <Route path="/cafes" element={<Cafes />} />
        <Route path="/dinein" element={<DineIn />} />
        <Route path="/make-reservation" element={<TableReservation />} />
        <Route path="/admin/menu" element={<MenuAdmin />} />
        <Route path="/admin/menu" element={<EditMenuItem />} />
        <Route path="/admin/menu" element={<AddMenuItem />} />
        <Route path="/admin/reservations" element={<ReservationAdmin />} />

        <Route path="/admin/settings" element={<Settings />} />
        <Route path="/admin/settings/profile" element={<ProfileSettings />} />
        <Route path="/admin/settings/password" element={<PasswordSettings />} />
        <Route path="/admin/settings/business" element={<BusinessSettings />} />
        <Route path="/admin/settings/users" element={<UserManagement />} />

      </Routes>
    </Router>
  );
};

export default App;
