import React, { useState } from 'react';
import OwnerSidebar from './OwnerSidebar';
import OwnerFooter from './OwnerFooter';
import { FiMenu, FiDownload } from 'react-icons/fi';
import { FaFilePdf, FaFileExcel } from 'react-icons/fa';
import logo from '../../assets/images/Forkify_Logo.png';
import '../../assets/css/OwnerCSS/OwnerReports.css';

const OwnerReports = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState({ restaurant: '', department: '' });

  const reports = [
    {
      restaurant: 'Choice - Indian Restaurant',
      manager: 'Ravi Sharma',
      department: 'Inventory',
      type: 'PDF',
      date: '2025-03-26',
      file: '/reports/inventory-ravi.pdf',
      status: 'Reviewed',
    },
    {
      restaurant: 'Spice Junction',
      manager: 'Anita Desai',
      department: 'Sales',
      type: 'Excel',
      date: '2025-03-25',
      file: '/reports/sales-anita.xlsx',
      status: 'Pending',
    },
    {
      restaurant: 'Grill House',
      manager: 'Mohit Patel',
      department: 'Customer Service',
      type: 'PDF',
      date: '2025-03-24',
      file: '/reports/feedback-mohit.pdf',
      status: 'Flagged',
    },
  ];

  const filteredReports = reports.filter((report) =>
    report.manager.toLowerCase().includes(search.toLowerCase()) &&
    (filter.restaurant === '' || report.restaurant === filter.restaurant) &&
    (filter.department === '' || report.department === filter.department)
  );

  return (
    <div className={`admin-container ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
      <OwnerSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="top-bar">
        <div className="menu-icon" onClick={() => setSidebarOpen(!sidebarOpen)}>
          <FiMenu size={30} color="#FF8303" />
        </div>
        <div className="logo-container" onClick={() => window.location.reload()}>
          <img src={logo} alt="Forkify Logo" className="logo-img" />
          <h1 className="logo-text">Forkify Owner</h1>
        </div>
      </div>

      <div className="main-content">
        <h1 className="page-title">Manager Reports</h1>

        <div className="filters">
          <input
            type="text"
            placeholder="Search manager..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select onChange={(e) => setFilter({ ...filter, restaurant: e.target.value })}>
            <option value="">All Restaurants</option>
            <option value="Choice - Indian Restaurant">Choice</option>
            <option value="Spice Junction">Spice Junction</option>
            <option value="Grill House">Grill House</option>
          </select>

          <select onChange={(e) => setFilter({ ...filter, department: e.target.value })}>
            <option value="">All Departments</option>
            <option value="Sales">Sales</option>
            <option value="Inventory">Inventory</option>
            <option value="Customer Service">Customer Service</option>
          </select>
        </div>

        <table className="report-table">
          <thead>
            <tr>
              <th>Restaurant</th>
              <th>Manager</th>
              <th>Department</th>
              <th>Report Type</th>
              <th>Submitted On</th>
              <th>File</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredReports.map((report, idx) => (
              <tr key={idx}>
                <td>{report.restaurant}</td>
                <td>{report.manager}</td>
                <td>{report.department}</td>
                <td>
                  {report.type === 'PDF' ? <FaFilePdf className="icon pdf" /> : <FaFileExcel className="icon excel" />}
                </td>
                <td>{report.date}</td>
                <td>
                  <a href={report.file} download>
                    <FiDownload className="download-icon" />
                  </a>
                </td>
                <td>
                  <span className={`status ${report.status.toLowerCase()}`}>{report.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <OwnerFooter />
      </div>
    </div>
  );
};

export default OwnerReports;
