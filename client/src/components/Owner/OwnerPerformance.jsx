import React, { useState } from "react";
import OwnerSidebar from "./OwnerSidebar";
import OwnerFooter from "./OwnerFooter";
import { FiMenu } from "react-icons/fi";
import logo from "../../assets/images/Forkify_Logo.png";
import "../../assets/css/OwnerCSS/OwnerPerformance.css";

const OwnerPerformance = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Performance data based on seed managers
  const managerStats = [
    { 
      name: "Manager One", 
      restaurant: "Graffiti Market", 
      role: "General Manager", 
      sales: 12500, 
      inventory: "94%",
      laborCost: "22%",
      customerSatisfaction: 4.7,
      efficiency: "88%"
    },
    { 
      name: "Manager Two", 
      restaurant: "Milestones Grill + Bar", 
      role: "Operations Manager", 
      sales: 9800, 
      inventory: "91%",
      laborCost: "25%",
      customerSatisfaction: 4.3,
      efficiency: "82%"
    },
    { 
      name: "Manager Three", 
      restaurant: "Plaza Sushi Downtown", 
      role: "Sushi Bar Manager", 
      sales: 8700, 
      inventory: "89%",
      laborCost: "27%",
      customerSatisfaction: 4.5,
      efficiency: "85%"
    },
    { 
      name: "Manager Four", 
      restaurant: "TWH Social Bar & Bistro", 
      role: "Bar Manager", 
      sales: 10500, 
      inventory: "93%",
      laborCost: "23%",
      customerSatisfaction: 4.2,
      efficiency: "87%"
    },
    { 
      name: "Manager Five", 
      restaurant: "Isabelle Restaurant + Lounge", 
      role: "Head Chef", 
      sales: 11200, 
      inventory: "95%",
      laborCost: "28%",
      customerSatisfaction: 4.8,
      efficiency: "90%"
    },
    { 
      name: "Manager Six", 
      restaurant: "Jacobs Grill", 
      role: "Grill Master", 
      sales: 7600, 
      inventory: "88%",
      laborCost: "24%",
      customerSatisfaction: 4.1,
      efficiency: "83%"
    },
    { 
      name: "Manager Seven", 
      restaurant: "The Spice Route", 
      role: "Front of House Manager", 
      sales: 9200, 
      inventory: "90%",
      laborCost: "26%",
      customerSatisfaction: 4.4,
      efficiency: "86%"
    }
  ];

  // Restaurant performance summary
  const restaurantPerformance = [
    {
      name: "Graffiti Market",
      monthlySales: 12500,
      monthlyGrowth: "+12%",
      popularItems: ["Burger", "Cocktails", "Pasta"],
      tableTurnover: "1.8 hrs"
    },
    {
      name: "Milestones Grill + Bar",
      monthlySales: 9800,
      monthlyGrowth: "+8%",
      popularItems: ["Steak", "Wine", "Salads"],
      tableTurnover: "2.1 hrs"
    },
    {
      name: "Plaza Sushi Downtown",
      monthlySales: 8700,
      monthlyGrowth: "+15%",
      popularItems: ["Sushi Platter", "Sashimi", "Ramen"],
      tableTurnover: "1.5 hrs"
    }
  ];

  return (
    <div className={`admin-container ${sidebarOpen ? "sidebar-open" : "sidebar-closed"}`}>
      <OwnerSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="top-bar">
        <div className="menu-icon" onClick={() => setSidebarOpen(!sidebarOpen)}>
          <FiMenu size={30} color="#FF8303" />
        </div>
        <div className="logo-container" onClick={() => window.location.reload()} style={{ cursor: "pointer" }}>
          <a href="/owner/dashboard"><img src={logo} alt="Forkify Logo" className="logo-img" /></a>
          <h1 className="logo-text">Forkify Owner</h1>
        </div>
        <h1 className="page-title">Performance Overview</h1>
      </div>

      <div className="main-content">
        {/* Summary Cards */}
        <div className="summary-cards">
          <div className="summary-card">
            <h3>Total Monthly Sales</h3>
            <p className="summary-value">$68,700</p>
            <p className="summary-change positive">+12% from last month</p>
          </div>
          <div className="summary-card">
            <h3>Average Rating</h3>
            <p className="summary-value">4.4 ⭐</p>
            <p className="summary-change positive">+0.2 from last month</p>
          </div>
          <div className="summary-card">
            <h3>Inventory Accuracy</h3>
            <p className="summary-value">91.4%</p>
            <p className="summary-change positive">+1.5% from last month</p>
          </div>
          <div className="summary-card">
            <h3>Labor Cost</h3>
            <p className="summary-value">24.7%</p>
            <p className="summary-change negative">+0.8% from last month</p>
          </div>
        </div>

        {/* Restaurant Performance */}
        <div className="restaurant-performance">
          <h2>Restaurant Performance</h2>
          <div className="restaurant-cards">
            {restaurantPerformance.map((restaurant, index) => (
              <div className="restaurant-card" key={index}>
                <h3>{restaurant.name}</h3>
                <div className="performance-metrics">
                  <div>
                    <p className="metric-label">Monthly Sales</p>
                    <p className="metric-value">${restaurant.monthlySales}</p>
                    <p className={`metric-change ${restaurant.monthlyGrowth.includes('+') ? 'positive' : 'negative'}`}>
                      {restaurant.monthlyGrowth}
                    </p>
                  </div>
                  <div>
                    <p className="metric-label">Popular Items</p>
                    <p className="metric-value">{restaurant.popularItems.join(', ')}</p>
                  </div>
                  <div>
                    <p className="metric-label">Table Turnover</p>
                    <p className="metric-value">{restaurant.tableTurnover}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Manager Cards */}
        <div className="managers-section">
          <h2>Manager Performance</h2>
          <div className="manager-cards">
            {managerStats.map((mgr, index) => (
              <div className="manager-card" key={index}>
                <h3>{mgr.name}</h3>
                <p><strong>Restaurant:</strong> {mgr.restaurant}</p>
                <p><strong>Role:</strong> {mgr.role}</p>
                <div className="performance-grid">
                  <div>
                    <p className="metric-label">Sales</p>
                    <p className="metric-value">${mgr.sales}</p>
                  </div>
                  <div>
                    <p className="metric-label">Inventory</p>
                    <p className="metric-value">{mgr.inventory}</p>
                  </div>
                  <div>
                    <p className="metric-label">Labor Cost</p>
                    <p className="metric-value">{mgr.laborCost}</p>
                  </div>
                  <div>
                    <p className="metric-label">Satisfaction</p>
                    <p className="metric-value">{mgr.customerSatisfaction} ⭐</p>
                  </div>
                </div>
                <div className="efficiency-bar">
                  <div className="efficiency-label">Efficiency:</div>
                  <div className="efficiency-fill" style={{ width: mgr.efficiency }}></div>
                  <div className="efficiency-value">{mgr.efficiency}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <OwnerFooter />
    </div>
  );
};

export default OwnerPerformance;