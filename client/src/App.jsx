import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//icons
import '@fortawesome/fontawesome-free/css/all.min.css';
//Authentication Paths
import LoginOptions from "./components/Authentication/LoginOptions";
import AdminOptions from "./components/Authentication/AdminOptions";
import SignIn from "./components/Authentication/SignIn";
import Login from "./components/Authentication/Login";
import AdminSignIn from "./components/Authentication/AdminSignIn";  
import ManagerSignIn from "./components/Authentication/ManagerSignIn"; 
import OwnerSignIn from "./components/Authentication/OwnerSignIn";

//Owner Paths
import OwnerHome from "../src/components/Owner/OwnerHome";
import OwnerReports from "../src/components/Owner/OwnerReports";
import OwnerPerformance from "../src/components/Owner/OwnerPerformance";
import OwnerSettings from "../src/components/Owner/OwnerSettings";
import OwnerSupport from "../src/components/Owner/OwnerSupport";
import AddRestaurant from "./components/Owner/AddRestaurant";
import OwnerRegister from "./components/Authentication/OwnerRegister";

//User Paths
import UserHome from "./components/User/UserHome";
//footer pages 
import BestRestaurants from "./components/User/categories/BestRestaurants";
import Cafes from "./components/User/categories/Cafes";
import Dinein from "./components/User/categories/Dine-In";
import OutdoorDining from "./components/User/categories/Outdoor-Dining";
import RestaurantHomePage from "./components/User/Restaurant/RestaurantHomePage";


//Admin Paths
import AdminHome from "./components/Admin/AdminHome";
import StaffManagement from "./components/Admin/StaffManagement";
import InventoryManagement from "./components/Admin/InventoryManagement";
import Statistics from "./components/Admin/Statistics";
import MenuAdmin from "./components/Admin/MenuAdmin";
import EditMenuItem from "./components/Admin/MenuAdmin";
import AddMenuItem from "./components/Admin/MenuAdmin";
import ReservationAdmin from "./components/Admin/ReservationAdmin";

//Admin/Setting Paths
import Settings from "./components/Admin/Settings/Settings";
import ProfileSettings from "./components/Admin/Settings/ProfileSettings";
import PasswordSettings from "./components/Admin/Settings/PasswordSettings";
import BusinessSettings from "./components/Admin/Settings/BusinessSettings";
import UserManagement from "./components/Admin/Settings/UserManagementSettings";

//Footer pages
import AboutUs from "./components/Admin/FooterPages/AboutUs";
import Blogs from "./components/Admin/FooterPages/Blogs";
import Career from "./components/Admin/FooterPages/Career";
import TrustCenter from "./components/Admin/FooterPages/TrustCenter";
import Security from "./components/Admin/FooterPages/Security";
import TermsConditions from "./components/Admin/FooterPages/TermsConditions";
import Partnerships from "./components/Admin/FooterPages/Partnerships";
import BusinessOwners from "./components/Admin/FooterPages/BusinessOwners";

import FAQPage from "./components/User/categories/FAQPage";
import ContactUsPage from "./components/User/categories/ContactUsPage";
import HelpCenterPage from "./components/User/categories/HelpCenterPage";


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
        <Route path="/owner/register" element={<OwnerRegister />} />

        <Route path="/userhome" element={<UserHome />} />
        <Route path="/faq" element={<FAQPage/>} />
        <Route path="/contact" element={<ContactUsPage/>} />
        <Route path="/help" element={<HelpCenterPage/>} />
        <Route path="/restaurant/:id" element={<RestaurantHomePage />} />
        <Route path="/bestrestaurants" element={<BestRestaurants />} />
        <Route path="/cafes" element={<Cafes />} />
        <Route path="/dine-in" element={<Dinein />} />
        <Route path="/outdoor-dining" element={<OutdoorDining />} />

        <Route path="/AdminHome" element={<AdminHome />} />
        <Route path="/admin/staff" element={<StaffManagement />} />
        <Route path="/admin/inventory" element={<InventoryManagement />} />
        <Route path="/admin/stats" element={<Statistics />} />
        <Route path="/admin/menu" element={<MenuAdmin />} />
        <Route path="/admin/menu" element={<EditMenuItem />} />
        <Route path="/admin/menu" element={<AddMenuItem />} />
        <Route path="/admin/reservations" element={<ReservationAdmin />} />
        
        <Route path="/admin/settings" element={<Settings />} />
        <Route path="/admin/settings/profile" element={<ProfileSettings />} />
        <Route path="/admin/settings/password" element={<PasswordSettings />} />
        <Route path="/admin/settings/business" element={<BusinessSettings />} />
        <Route path="/admin/settings/users" element={<UserManagement />} />

        <Route path="/owner/dashboard" element={<OwnerHome />} />
        <Route path="/owner/reports" element={<OwnerReports />} />
        <Route path="/owner/performance" element={<OwnerPerformance/>} />
        <Route path="/owner/settings" element={<OwnerSettings/>} />
        <Route path="/owner/add-restaurant" element={<AddRestaurant/>} />
        <Route path="/owner/support" element={<OwnerSupport/>} />

        <Route path="/about" element={<AboutUs />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/career" element={<Career />} />
        <Route path="/trust" element={<TrustCenter />} />
        <Route path="/security" element={<Security />} />
        <Route path="/terms" element={<TermsConditions />} />
        <Route path="/partnerships" element={<Partnerships />} />
        <Route path="/owners" element={<BusinessOwners />} />


      </Routes>
    </Router>
  );
};

export default App;
