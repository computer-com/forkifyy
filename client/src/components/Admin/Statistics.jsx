import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";  
import autoTable from "jspdf-autotable";  
import "../../assets/css/AdminCSS/Statistics.css";
import logo from "../../assets/images/Forkify_Logo.png";
import Sidebar from "../Admin/Sidebar";  
import { FiMenu } from "react-icons/fi";  
import Footer from "./Footer";
import "../../assets/css/AdminCSS/Footer.css";

const Statistics = () => {
  const [inventory, setInventory] = useState([]);
  const [sales, setSales] = useState([]);
  const [ledger, setLedger] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);  

  // Fetch Inventory & Sales Data
  useEffect(() => {
    axios.get("http://localhost:5000/api/inventory")
      .then(response => setInventory(response.data))
      .catch(error => console.error("Error fetching inventory:", error));

    axios.get("http://localhost:5000/api/sales")
      .then(response => setSales(response.data))
      .catch(error => console.error("Error fetching sales:", error));

    axios.get("http://localhost:5000/api/ledger")
      .then(response => setLedger(response.data))
      .catch(error => console.error("Error fetching ledger:", error));
  }, []);

  // Calculate Business Analytics
  const totalStock = inventory.reduce((acc, item) => acc + item.quantity, 0);
  const totalInventoryValue = inventory.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const totalRevenue = sales.reduce((acc, sale) => acc + sale.totalAmount, 0);

  //  Top-Selling Items
  const topSellingItems = [...sales].sort((a, b) => b.quantitySold - a.quantitySold).slice(0, 5);

  //  Generate Business Report as PDF
  const generatePDFReport = () => {
    const doc = new jsPDF();
    doc.text("Business Statistics Report", 20, 10);
    let finalY = 20; 

    // Inventory Table
    autoTable(doc, {
      startY: finalY,
      head: [["Item", "Quantity", "Price", "Total Value"]],
      body: inventory.map(item => [item.itemName, item.quantity, `$${item.price}`, `$${item.price * item.quantity}`])
    });

    finalY = doc.lastAutoTable.finalY + 10; 

    doc.text("Total Inventory Value: $" + totalInventoryValue, 20, finalY);
    doc.text("Total Stock Available: " + totalStock, 20, finalY + 10);

    // Sales Table
    autoTable(doc, {
      startY: finalY + 20,
      head: [["Item", "Quantity Sold", "Total Sales"]],
      body: sales.map(sale => [sale.itemName, sale.quantitySold, `$${sale.totalAmount}`])
    });

    finalY = doc.lastAutoTable.finalY + 10;

    doc.text("Total Revenue: $" + totalRevenue, 20, finalY);

    // Ledger Table
    autoTable(doc, {
      startY: finalY + 20,
      head: [["Transaction Type", "Item", "Amount", "Date"]],
      body: ledger.map(entry => [entry.type, entry.item, `$${entry.amount}`, entry.date])
    });

    doc.save("Business_Statistics_Report.pdf");
  };

  return (
    <div className={`admin-container ${sidebarOpen ? "sidebar-open" : "sidebar-closed"}`}>
      {/* Sidebar Component */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} handleRefresh={() => window.location.reload()} />  

      {/* Top Bar with Sidebar Toggle & Logo */}
      <div className="top-bar">
        <div className="menu-icon" onClick={() => setSidebarOpen(!sidebarOpen)}>
          <FiMenu size={30} color="#FF8303" />
        </div>
        <div className="logo-container" onClick={() => window.location.reload()} style={{ cursor: "pointer" }}>
          <img src={logo} alt="Forkify Logo" className="logo-img" />
          <h1 className="logo-text">Forkify Admin</h1>
        </div>
        <h1 className="page-title">Business Statistics</h1>
      </div>

      <div className="main-content">
        {/*  Stats Overview Section */}
        <div className="stats-overview">
          <div className="stats-card">
            <h3>Total Stock</h3>
            <p>{totalStock} items</p>
          </div>
          <div className="stats-card">
            <h3>Total Inventory Value</h3>
            <p>${totalInventoryValue}</p>
          </div>
          <div className="stats-card">
            <h3>Total Revenue</h3>
            <p>${totalRevenue}</p>
          </div>
        </div>

        {/* Top Selling Items Section */}
        <div className="top-selling">
          <h2>Top Selling Items</h2>
          <ul>
            {topSellingItems.map((item, index) => (
              <li key={index}>{item.itemName} - Sold: {item.quantitySold}</li>
            ))}
          </ul>
        </div>
      </div>
      {/* Generate Report Button */}
      <div className="report-btn-container">
          <button onClick={generatePDFReport} className="dashboard-btn">Generate Report (PDF)</button>
      </div>
      {/* Back to Dashboard */}
      <div className="back-btn-container">
        <Link to="/AdminHome" className="back-btn">Back to Dashboard</Link>
      </div>
      <Footer />
    </div>
  );
};

export default Statistics;
