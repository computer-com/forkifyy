import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../assets/css/AdminCSS/menuadmin.css";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import logo from "../../assets/images/Forkify_Logo.png";
import axios from "axios";
import { FiMenu } from "react-icons/fi"; 

const manager = JSON.parse(localStorage.getItem("manager"));
const restaurantId = manager?.restaurantId;

const MenuAdmin = () => {
  const [menu, setMenu] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [newItem, setNewItem] = useState({ name: "", price: "", category: "", description: "" });

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    try {
      const token = localStorage.getItem("managerToken");
      const response = await axios.get(`http://localhost:5000/api/menu?restaurantId=${restaurantId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMenu(response.data);
    } catch (error) {
      console.error("Error fetching menu:", error);
    }
  };
  
  const handleAddItem = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("managerToken");
      const response = await axios.post("http://localhost:5000/api/menu", {
        ...newItem,
        restaurantId,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMenu([...menu, response.data]);
      setNewItem({ name: "", price: "", category: "", description: "" });
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  const handleEditItem = (item) => {
    setIsEditing(true);
    setEditItem(item);
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("managerToken");
      await axios.put(`http://localhost:5000/api/menu/${editItem._id}`, editItem, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const updated = menu.map(item => (item._id === editItem._id ? editItem : item));
      setMenu(updated);
      setIsEditing(false);
      setEditItem(null);
    } catch (error) {
      console.error("Error updating menu item:", error);
    }
  };
  

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        const token = localStorage.getItem("managerToken");
        await axios.delete(`http://localhost:5000/api/menu/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMenu(menu.filter(item => item._id !== id));
      } catch (error) {
        console.error("Error deleting menu item:", error);
      }
    }
  };
  

  return (
    <div className="admin-menu-container">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="admin-menu-top-bar">
        <div className="admin-menu-menu-icon" onClick={() => setSidebarOpen(!sidebarOpen)}>
          <FiMenu size={30} color="#FF8303" />
        </div>
        <div className="admin-menu-logo-container">
          <a href="/AdminHome">
            <img src={logo} alt="Forkify Logo" className="admin-menu-logo-img" />
          </a>
          <h1 className="admin-menu-logo-text">Forkify Admin</h1>
        </div>
        <h1 className="admin-menu-page-title">Menu Management</h1>
      </div>
      <div className={`admin-menu-main-content ${sidebarOpen ? "sidebar-open" : ""}`}>
        <div className="admin-menu-content-section">
          <div className="menu-management-container">
            {/* Menu Form - Placed on Left */}
            <div className="menu-form-container">
              <h2>{isEditing ? "Edit Menu Item" : "Add New Item"}</h2>
              <form onSubmit={isEditing ? handleSaveEdit : handleAddItem}>
                <input
                  type="text"
                  placeholder="Item Name"
                  value={isEditing ? editItem.name : newItem.name}
                  onChange={(e) => isEditing ? setEditItem({ ...editItem, name: e.target.value }) : setNewItem({ ...newItem, name: e.target.value })}
                  required
                />
                <input
                  type="text"
                  placeholder="Category"
                  value={isEditing ? editItem.category : newItem.category}
                  onChange={(e) => isEditing ? setEditItem({ ...editItem, category: e.target.value }) : setNewItem({ ...newItem, category: e.target.value })}
                  required
                />
                <input
                  type="number"
                  placeholder="Price"
                  value={isEditing ? editItem.price : newItem.price}
                  onChange={(e) => isEditing ? setEditItem({ ...editItem, price: e.target.value }) : setNewItem({ ...newItem, price: e.target.value })}
                  required
                />
                <textarea
                  placeholder="Description"
                  value={isEditing ? editItem.description : newItem.description}
                  onChange={(e) => isEditing ? setEditItem({ ...editItem, description: e.target.value }) : setNewItem({ ...newItem, description: e.target.value })}
                  required
                />
                <button type="submit" className="dashboard-btn">
                  {isEditing ? "Save Changes" : "Add Item"}
                </button>
                {isEditing && (
                  <button 
                    className="dashboard-btn delete-btn"
                    onClick={() => { setIsEditing(false); setEditItem(null); }}
                  >
                    Cancel
                  </button>
                )}
              </form>
            </div>

            {/* Menu List */}
            <div className="menu-list">
              {menu.length === 0 ? (
                <p>No menu items found.</p>
              ) : (
                menu.map(item => (
                  <div key={item._id} className="menu-card">
                    <h2>{item.name}</h2>
                    <p><strong>Price:</strong> ${item.price}</p>
                    <p><strong>Category:</strong> {item.category}</p>
                    <p><strong>Description:</strong> {item.description}</p>
                    <div className="menu-card-actions">
                      <button className="dashboard-btn" onClick={() => handleEditItem(item)}>
                        Edit
                      </button>
                      <button 
                        className="dashboard-btn delete-btn" 
                        onClick={() => handleDelete(item._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="admin-menu-footer">
        <Footer />
      </div>
    </div>
  );
};

export default MenuAdmin;