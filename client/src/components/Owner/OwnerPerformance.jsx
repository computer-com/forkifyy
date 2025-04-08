import React, { useState } from "react";
import OwnerSidebar from "./OwnerSidebar";
import OwnerFooter from "./OwnerFooter";
import { FiMenu } from "react-icons/fi";
import logo from "../../assets/images/forkify_logo.png";
import "../../assets/css/OwnerCSS/OwnerPerformance.css";

const OwnerPerformance = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false); // Default to closed for consistency

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
    <div className="performance-container">
      <OwnerSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="performance-top-bar">
        <div className="performance-menu-icon" onClick={() => setSidebarOpen(!sidebarOpen)}>
          <FiMenu size={30} color="#FF8303" />
        </div>
        <div className="performance-logo-container">
          <a href="/owner/dashboard">
            <img src={logo} alt="Forkify Logo" className="performance-logo-img" />
          </a>
          <h1 className="performance-logo-text">Forkify Owner</h1>
        </div>
        <h1 className="performance-page-title">Performance Overview</h1>
      </div>
      <div className={`performance-main-content ${sidebarOpen ? "sidebar-open" : ""}`}>
        <div className="performance-content-section">
          {/* Summary Cards */}
          <div className="performance-summary-cards">
            <div className="performance-summary-card">
              <h3>Total Monthly Sales</h3>
              <p className="performance-summary-value">$68,700</p>
              <p className="performance-summary-change positive">+12% from last month</p>
            </div>
            <div className="performance-summary-card">
              <h3>Average Rating</h3>
              <p className="performance-summary-value">4.4 ⭐</p>
              <p className="performance-summary-change positive">+0.2 from last month</p>
            </div>
            <div className="performance-summary-card">
              <h3>Inventory Accuracy</h3>
              <p className="performance-summary-value">91.4%</p>
              <p className="performance-summary-change positive">+1.5% from last month</p>
            </div>
            <div className="performance-summary-card">
              <h3>Labor Cost</h3>
              <p className="performance-summary-value">24.7%</p>
              <p className="performance-summary-change negative">+0.8% from last month</p>
            </div>
          </div>

          {/* Restaurant Performance */}
          <div className="performance-restaurant-section">
            <h2>Restaurant Performance</h2>
            <div className="performance-restaurant-cards">
              {restaurantPerformance.map((restaurant, index) => (
                <div className="performance-restaurant-card" key={index}>
                  <h3>{restaurant.name}</h3>
                  <div className="performance-metrics">
                    <div>
                      <p className="performance-metric-label">Monthly Sales</p>
                      <p className="performance-metric-value">${restaurant.monthlySales}</p>
                      <p className={`performance-metric-change ${restaurant.monthlyGrowth.includes('+') ? 'positive' : 'negative'}`}>
                        {restaurant.monthlyGrowth}
                      </p>
                    </div>
                    <div>
                      <p className="performance-metric-label">Popular Items</p>
                      <p className="performance-metric-value">{restaurant.popularItems.join(', ')}</p>
                    </div>
                    <div>
                      <p className="performance-metric-label">Table Turnover</p>
                      <p className="performance-metric-value">{restaurant.tableTurnover}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Manager Cards */}
          <div className="performance-managers-section">
            <h2>Manager Performance</h2>
            <div className="performance-manager-cards">
              {managerStats.map((mgr, index) => (
                <div className="performance-manager-card" key={index}>
                  <h3>{mgr.name}</h3>
                  <p><strong>Restaurant:</strong> {mgr.restaurant}</p>
                  <p><strong>Role:</strong> {mgr.role}</p>
                  <div className="performance-grid">
                    <div>
                      <p className="performance-metric-label">Sales</p>
                      <p className="performance-metric-value">${mgr.sales}</p>
                    </div>
                    <div>
                      <p className="performance-metric-label">Inventory</p>
                      <p className="performance-metric-value">{mgr.inventory}</p>
                    </div>
                    <div>
                      <p className="performance-metric-label">Labor Cost</p>
                      <p className="performance-metric-value">{mgr.laborCost}</p>
                    </div>
                    <div>
                      <p className="performance-metric-label">Satisfaction</p>
                      <p className="performance-metric-value">{mgr.customerSatisfaction} ⭐</p>
                    </div>
                  </div>
                  <div className="performance-efficiency-bar">
                    <div className="performance-efficiency-label">Efficiency:</div>
                    <div className="performance-efficiency-fill" style={{ width: mgr.efficiency }}></div>
                    <div className="performance-efficiency-value">{mgr.efficiency}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="performance-footer">
        <OwnerFooter />
      </div>
    </div>
  );
};

export default OwnerPerformance;