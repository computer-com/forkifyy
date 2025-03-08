import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../../assets/css/AdminCSS/Inventory.css"; 
import "../../assets/css/AdminCSS/Footer.css";
import logo from "../../assets/images/Forkify_Logo.png";
import Sidebar from "../Admin/Sidebar";
import Footer from "../Admin/Footer";
import { FiMenu } from "react-icons/fi";

const InventoryManagement = () => {
  const [inventory, setInventory] = useState([]);
  const [newItem, setNewItem] = useState({ name: "", quantity: "", price: "", category: "" });
  const [editMode, setEditMode] = useState(null);
  const [editItem, setEditItem] = useState({});
  const [sidebarOpen, setSidebarOpen] = useState(false);


  // Fetch Inventory Data
  useEffect(() => {
    axios.get("http://localhost:5000/api/inventory")
      .then(response => setInventory(response.data))
      .catch(error => console.error("Error fetching inventory:", error));
  }, []);

  // Handle Input Change for New Item
  const handleChange = (e) => {
    setNewItem({ ...newItem, [e.target.name]: e.target.value });
  };

  // Add New Inventory Item
  const handleAddItem = () => {
    if (newItem.name && newItem.quantity && newItem.price && newItem.category) {
      axios.post("http://localhost:5000/api/inventory", newItem)
        .then(response => {
          setInventory([...inventory, response.data]); 
          setNewItem({ name: "", quantity: "", price: "", category: "" }); 
        })
        .catch(error => console.error("Error adding item:", error));
    } else {
      alert("All fields are required!");
    }
  };

  // Delete Inventory Item
  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/api/inventory/${id}`)
      .then(() => setInventory(inventory.filter(item => item._id !== id)))
      .catch(error => console.error("Error deleting item:", error));
  };

  const handleEdit = (item) => {
    setEditMode(item._id);
    setEditItem({ ...item }); 
  };

  // Handle Edit Input Change
  const handleEditChange = (e) => {
    setEditItem({ ...editItem, [e.target.name]: e.target.value });
  };

  const handleSaveEdit = async () => {
    if (!editItem || !editMode) {
      console.error("Edit mode is not set correctly.");
      return;
    }  
    try {
      const response = await axios.put(`http://localhost:5000/api/inventory/${editMode}`, editItem, {
        headers: { "Content-Type": "application/json" }
      });
  
      console.log("Server Response:", response.data); 
  
      setInventory(inventory.map(item => (item._id === editMode ? response.data : item)));
      setEditMode(null); 
      setEditItem({ name: "", quantity: "", price: "", category: "" });
    } catch (error) {
      console.error("Error updating item:", error.response?.data || error.message);
    }
  };

  return (
    <div className={`admin-container ${sidebarOpen ? "sidebar-open" : "sidebar-closed"}`}>
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} handleRefresh={() => window.location.reload()} />  

      {/* Top Bar with Menu Icon, Logo, and Title */}
      <div className="top-bar">
        {/* Hamburger Menu Icon */}
        <div className="menu-icon" onClick={() => setSidebarOpen(!sidebarOpen)}>
          <FiMenu size={30} color="#FF8303" />
        </div>

        {/* Logo (Reloads Page) */}
        <div className="logo-container" onClick={() => window.location.reload()} style={{ cursor: "pointer" }}>
          <img src={logo} alt="Forkify Logo" className="logo-img" />
          <h1 className="logo-text">Forkify Admin</h1>
        </div>

        {/* Title in the center */}
        <h1 className="page-title">Inventory Management</h1>
      </div>
      <div className="main-content">
        {/* Inventory Management Layout */}
          <div className="inventory-management-container">
            {/* Inventory Form */}
            <div className="form-container">
              <h2>Add New Item</h2>
              <input type="text" name="name" placeholder="Item Name" value={newItem.name} onChange={handleChange} />
              <input type="number" name="quantity" placeholder="Quantity" value={newItem.quantity} onChange={handleChange} />
              <input type="number" name="price" placeholder="Price" value={newItem.price} onChange={handleChange} />
              <input type="text" name="category" placeholder="Category" value={newItem.category} onChange={handleChange} />
              <button onClick={handleAddItem} className="dashboard-btn">Add Item</button>
            </div>
            {/* Inventory List */}
            <div className="inventory-container">
              {inventory.map((item) => (
                <div key={item._id} className="inventory-card">
                  {editMode === item._id ? (
                    <>
                      <input type="text" name="name" value={editItem.name} onChange={handleEditChange} />
                      <input type="number" name="quantity" value={editItem.quantity} onChange={handleEditChange} />
                      <input type="number" name="price" value={editItem.price} onChange={handleEditChange} />
                      <input type="text" name="category" value={editItem.category} onChange={handleEditChange} />
                      <button className="dashboard-btn" onClick={handleSaveEdit}>Save</button>
                      <button className="dashboard-btn delete-btn" onClick={() => setEditMode(null)}>Cancel</button>
                    </>
                  ) : (
                    <>
                      <h2>{item.name}</h2>
                      <p>Quantity: {item.quantity}</p>
                      <p>Price: ${item.price}</p>
                      <p>Category: {item.category}</p>
                      <button className="dashboard-btn" onClick={() => handleEdit(item)}>Edit</button>
                      <button className="dashboard-btn delete-btn" onClick={() => handleDelete(item._id)}>Delete</button>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>  
        </div>
        {/* Back Button */}
        <div className="back-btn-container">
            <Link to="/AdminHome" className="back-btn">Back to Dashboard</Link>
        </div>
      <Footer />
    </div>      
  );
};

export default InventoryManagement;
