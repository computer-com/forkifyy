import React, { useState, useEffect } from "react";
import OwnerSidebar from "./OwnerSidebar";
import OwnerFooter from "./OwnerFooter";
import { FiMenu } from "react-icons/fi";
import logo from "../../assets/images/Forkify_Logo.png";
import jsPDF from "jspdf";
import "../../assets/css/OwnerCSS/OwnerReports.css";

const OwnerReports = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false); // Default to closed for consistency
  const [reports, setReports] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const token = localStorage.getItem("ownerToken");
        const response = await fetch("http://localhost:5000/api/restaurants/owner/reports", {
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch reports");
        }
        const data = await response.json();
        setReports(data);
      } catch (err) {
        console.error("Error fetching reports:", err);
        setError(err.message);
      }
    };

    fetchReports();
  }, []);

  const generatePDF = async (restaurantId, restaurantName) => {
    try {
      const token = localStorage.getItem("ownerToken");
      const response = await fetch(`http://localhost:5000/api/restaurants/owner/report/${restaurantId}`, {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to fetch report data");
        } else {
          throw new Error("Received an unexpected response from the server");
        }
      }

      const reportData = await response.json();

      const doc = new jsPDF();
      
      // Set theme colors
      doc.setFillColor(28, 28, 28); // Dark background similar to #1c1c1c
      doc.rect(0, 0, 210, 297, "F"); // A4 size background

      // Title
      doc.setTextColor(255, 131, 3); // #FF8303
      doc.setFontSize(20);
      doc.text("Restaurant Report", 20, 20);

      // Restaurant Details
      doc.setTextColor(255, 255, 255); // White text
      doc.setFontSize(12);
      doc.text(`Restaurant Name: ${reportData.restaurantName}`, 20, 40);
      doc.text(`Cuisine: ${reportData.cuisine}`, 20, 50);
      doc.text(`City: ${reportData.city}`, 20, 60);
      doc.text(`Address: ${reportData.address}`, 20, 70);
      doc.text(`Hours: ${reportData.hours}`, 20, 80);
      doc.text(`Price Range: ${reportData.priceRange}`, 20, 90);

      // Manager Details
      doc.setTextColor(255, 131, 3); // #FF8303
      doc.setFontSize(16);
      doc.text("Manager Details", 20, 110);
      doc.setTextColor(255, 255, 255); // White text
      doc.setFontSize(12);
      doc.text(`Name: ${reportData.managerName}`, 20, 120);
      doc.text(`Email: ${reportData.managerEmail}`, 20, 130);
      doc.text(`Manager ID: ${reportData.managerId}`, 20, 140);

      // Business Statistics
      doc.setTextColor(255, 131, 3); // #FF8303
      doc.setFontSize(16);
      doc.text("Business Statistics", 20, 160);
      doc.setTextColor(255, 255, 255); // White text
      doc.setFontSize(12);
      doc.text(`Item Quantity: ${reportData.itemQuantity}`, 20, 170);
      doc.text(`Price: ${reportData.price}`, 20, 180);
      doc.text(`Total Value: ${reportData.totalValue}`, 20, 190);
      doc.text(`Total Inventory Value: ${reportData.totalInventoryValue}`, 20, 200);
      doc.text(`Total Stock Available: ${reportData.totalStockAvailable}`, 20, 210);
      doc.text(`Total Revenue: ${reportData.totalRevenue}`, 20, 220);

      // Save the PDF
      doc.save(`${reportData.restaurantName}_Report.pdf`);
    } catch (err) {
      console.error("Error generating PDF:", err);
      setError(err.message || "Failed to generate PDF report");
    }
  };

  return (
    <div className="reports-container">
      <OwnerSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="reports-top-bar">
        <div className="reports-menu-icon" onClick={() => setSidebarOpen(!sidebarOpen)}>
          <FiMenu size={30} color="#FF8303" />
        </div>
        <div className="reports-logo-container">
          <a href="/owner/dashboard">
            <img src={logo} alt="Forkify Logo" className="reports-logo-img" />
          </a>
          <h1 className="reports-logo-text">Forkify Owner</h1>
        </div>
        <h1 className="reports-page-title">Manage Reports</h1>
      </div>
      <div className={`reports-main-content ${sidebarOpen ? "sidebar-open" : ""}`}>
        <div className="reports-content-section">
          <h2>Restaurant Reports</h2>
          {error && <p className="reports-error">{error}</p>}
          {reports.length === 0 ? (
            <p>No reports available.</p>
          ) : (
            <table className="reports-table">
              <thead>
                <tr>
                  <th>Restaurant</th>
                  <th>Manager</th>
                  <th>Department</th>
                  <th>Type</th>
                  <th>Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {reports.map((report, index) => (
                  <tr key={index}>
                    <td>{report.restaurant}</td>
                    <td>{report.manager}</td>
                    <td>{report.department}</td>
                    <td>{report.type}</td>
                    <td>{report.date}</td>
                    <td>
                      <button
                        onClick={() => generatePDF(report.restaurantId, report.restaurant)}
                        className="reports-download-btn"
                      >
                        Download PDF
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
      <div className="reports-footer">
        <OwnerFooter />
      </div>
    </div>
  );
};

export default OwnerReports;