import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../assets/css/AdminCSS/reservationadmin.css";
import Sidebar from "../Admin/Sidebar";
import Footer from "../Admin/Footer";
import logo from "../../assets/images/Forkify_Logo.png";
import axios from "axios";
import { FiMenu } from "react-icons/fi";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; 


const ReservationAdmin = () => {
  const [reservations, setReservations] = useState([]);
  const [filteredReservations, setFilteredReservations] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [newReservation, setNewReservation] = useState({
    name: "",
    phone: "",
    email: "",
    people: "",
    time: "",
    date: "",
  });

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/reservations");
      setReservations(response.data);
      filterReservations(response.data);
    } catch (error) {
      console.error("Error fetching reservations:", error);
    }
  };

  const filterReservations = (data) => {
    setFilteredReservations(data);
  };

  const handleAddReservation = async (e) => {
    e.preventDefault();
    try {
      const formattedDate = newReservation.date.toISOString().split("T")[0];
      const response = await axios.post("http://localhost:5000/api/reservations",{...newReservation,  date: formattedDate });
      setReservations([...reservations, response.data]);
      setNewReservation({ name: "", phone: "", email: "", people: "", time: "", date: new Date() });
    } catch (error) {
      console.error("Error adding reservation:", error);
    }
  };

  const handleEditReservation = (reservation) => {
    setIsEditing(true);
    setEditItem({ ...reservation, date: new Date(reservation.date) });
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    try {
      const formattedDate = editItem.date.toISOString().split("T")[0]; // Format date
      await axios.put(`http://localhost:5000/api/reservations/${editItem._id}`, {
        ...editItem,
        date: formattedDate,
      });
      setReservations(reservations.map((res) => (res._id === editItem._id ? editItem : res)));
      setIsEditing(false);
      setEditItem(null);
    } catch (error) {
      console.error("Error updating reservation:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this reservation?")) {
      try {
        await axios.delete(`http://localhost:5000/api/reservations/${id}`);
        setReservations(reservations.filter((res) => res._id !== id));
      } catch (error) {
        console.error("Error deleting reservation:", error);
      }
    }
  };

  return (
    <div className={`admin-container ${sidebarOpen ? "sidebar-open" : "sidebar-closed"}`}>
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="top-bar">
        <div className="menu-icon" onClick={() => setSidebarOpen(!sidebarOpen)}>
          <FiMenu size={30} color="#FF8303" />
        </div>
        <div className="logo-container">
          <img src={logo} alt="Forkify Logo" className="logo-img" />
          <h1 className="logo-text">Forkify Admin</h1>
        </div>
        <h1 className="page-title">Reservations</h1>
      </div>

      <div className="main-content">
        <div className="reservation-layout">
          {/* Filter Section */}
          <div className="filter-section">
            <h3>Filters</h3>
            <label><input type="radio" name="filter" /> All</label>
            <label><input type="radio" name="filter" /> Today</label>
            <label><input type="radio" name="filter" /> Tomorrow</label>
            <label><input type="radio" name="filter" /> This Week</label>
            <label><input type="radio" name="filter" /> Custom</label>

            <h3>Sort By</h3>
            <label><input type="radio" name="sort" /> Time</label>
            <label><input type="radio" name="sort" /> Name</label>
          </div>

          {/* Reservation List */}
          <div className="reservation-list">
            <h2>Reservations</h2>
            {filteredReservations.length === 0 ? (
              <p>No reservations found.</p>
            ) : (
              filteredReservations.map((res) => (
                <div key={res._id} className="reservation-card">
                  <h3>{res.name}</h3>
                  <p>{res.people} people - {res.time}</p>
                  <div className="reservation-actions">
                    <button className="edit-btn" onClick={() => handleEditReservation(res)}>✏️</button>
                    <button className="delete-btn" onClick={() => handleDelete(res._id)}>🗑️</button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Add or Edit Reservation Form */}
          <div className="reservation-form">
            <h2>{isEditing ? "Edit Reservation" : "Add New Reservation"}</h2>
            <form onSubmit={isEditing ? handleSaveEdit : handleAddReservation}>
              <input type="text" placeholder="Name" value={isEditing ? editItem.name : newReservation.name}
                onChange={(e) => isEditing ? setEditItem({ ...editItem, name: e.target.value }) : setNewReservation({ ...newReservation, name: e.target.value })} required />
              <input type="text" placeholder="Phone" value={isEditing ? editItem.phone : newReservation.phone}
                onChange={(e) => isEditing ? setEditItem({ ...editItem, phone: e.target.value }) : setNewReservation({ ...newReservation, phone: e.target.value })} required />
              <input type="email" placeholder="Email" value={isEditing ? editItem.email : newReservation.email}
                onChange={(e) => isEditing ? setEditItem({ ...editItem, email: e.target.value }) : setNewReservation({ ...newReservation, email: e.target.value })} required />
              <DatePicker selected={isEditing ? editItem.date : newReservation.date}
                onChange={(date) => isEditing ? setEditItem({ ...editItem, date }) : setNewReservation({ ...newReservation, date })} 
                dateFormat="yyyy-MM-dd" className="date-picker" />
              <button type="submit">{isEditing ? "Save Changes" : "Confirm Booking"}</button>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ReservationAdmin;
