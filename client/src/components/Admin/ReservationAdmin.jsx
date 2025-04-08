import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../assets/css/AdminCSS/reservationadmin.css";
import Sidebar from "../Admin/Sidebar";
import Footer from "../Admin/Footer";
import logo from "../../assets/images/forkify_logo.png";
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
  const [filterType, setFilterType] = useState("All");
  const [sortBy, setSortBy] = useState("Time");
  const [newReservation, setNewReservation] = useState({
    name: "",
    phone: "",
    email: "",
    numberOfGuests: "",
    time: "",
    date: new Date(),
  });

  useEffect(() => {
    fetchReservations();
  }, []);

  useEffect(() => {
    applyFilterAndSort(reservations);
  }, [reservations, filterType, sortBy]);

  const fetchReservations = async () => {
    try {
      const token = localStorage.getItem("managerToken");
      const manager = JSON.parse(localStorage.getItem("manager"));
      const restaurantId = manager?.restaurantId;

      if (!token || !restaurantId) return;

      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/reservation/restaurant/${restaurantId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setReservations(response.data);
    } catch (error) {
      console.error("Error fetching reservations:", error);
    }
  };

  const applyFilterAndSort = (data) => {
    let filtered = [...data];
    const today = new Date();
    const isSameDay = (date1, date2) =>
      new Date(date1).toISOString().split("T")[0] === new Date(date2).toISOString().split("T")[0];

    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    switch (filterType) {
      case "Today":
        filtered = filtered.filter((r) => isSameDay(r.date, today));
        break;
      case "Tomorrow":
        filtered = filtered.filter((r) => isSameDay(r.date, tomorrow));
        break;
      case "ThisWeek":
        const startOfWeek = new Date(today);
        startOfWeek.setDate(today.getDate() - today.getDay());
        const endOfWeek = new Date(today);
        endOfWeek.setDate(today.getDate() - today.getDay() + 6);
        filtered = filtered.filter((r) => {
          const d = new Date(r.date);
          return d >= startOfWeek && d <= endOfWeek;
        });
        break;
      default:
        break;
    }

    if (sortBy === "Name") {
      filtered.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
    } else {
      filtered.sort((a, b) => (a.time || "").localeCompare(b.time || ""));
    }

    setFilteredReservations(filtered);
  };

  const handleAddReservation = async (e) => {
    e.preventDefault();
    try {
      const formattedDate = newReservation.date.toISOString().split("T")[0];
      const token = localStorage.getItem("managerToken");
      const manager = JSON.parse(localStorage.getItem("manager"));
      const restaurantId = manager?.restaurantId;

      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/reservation/manual`,
        {
          ...newReservation,
          date: formattedDate,
          restaurantId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setReservations([...reservations, response.data]);
      setNewReservation({
        name: "",
        phone: "",
        email: "",
        numberOfGuests: "",
        time: "",
        date: new Date(),
      });
    } catch (error) {
      console.error("Error adding reservation:", error.response?.data || error.message);
    }
  };

  const handleEditReservation = (reservation) => {
    setIsEditing(true);
    setEditItem({ ...reservation, date: new Date(reservation.date) });
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    try {
      const formattedDate = editItem.date.toISOString().split("T")[0];
      const token = localStorage.getItem("managerToken");
      await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/api/reservation/${editItem._id}`,
        { ...editItem, date: formattedDate },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const updated = reservations.map((res) => (res._id === editItem._id ? editItem : res));
      setReservations(updated);
      setIsEditing(false);
      setEditItem(null);
      await fetchReservations();
      applyFilterAndSort(reservations);
    } catch (error) {
      console.error("Error updating reservation:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this reservation?")) {
      try {
        const token = localStorage.getItem("managerToken");
        await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/reservation/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setReservations(reservations.filter((res) => res._id !== id));
        await fetchReservations();
        applyFilterAndSort(reservations);
      } catch (error) {
        console.error("Error deleting reservation:", error);
      }
    }
  };

  // Popper modifiers to prevent calendar clipping
  const popperModifiers = [
    {
      name: "offset",
      options: {
        offset: [0, 10], // Add some space between the input and the calendar
      },
    },
    {
      name: "preventOverflow",
      options: {
        boundariesElement: "viewport", // Ensure the calendar stays within the viewport
        padding: 10,
      },
    },
    {
      name: "flip",
      options: {
        behavior: ["top", "bottom"], // Prefer flipping to top if there's not enough space below
      },
    },
  ];

  return (
    <div className="admin-reservations-container">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="admin-reservations-top-bar">
        <div className="admin-reservations-menu-icon" onClick={() => setSidebarOpen(!sidebarOpen)}>
          <FiMenu size={30} color="#FF8303" />
        </div>
        <div className="admin-reservations-logo-container">
          <a href="/AdminHome">
            <img src={logo} alt="Forkify Logo" className="admin-reservations-logo-img" />
          </a>
          <h1 className="admin-reservations-logo-text">Forkify Admin</h1>
        </div>
        <h1 className="admin-reservations-page-title">Reservations</h1>
      </div>
      <div className={`admin-reservations-main-content ${sidebarOpen ? "sidebar-open" : ""}`}>
        <div className="admin-reservations-content-section">
          <div className="admin-reservations-layout">
            <div className="admin-reservations-filter-section">
              <h3>Filters</h3>
              {["All", "Today", "Tomorrow", "ThisWeek"].map((label) => (
                <label key={label}>
                  <input
                    type="radio"
                    name="filter"
                    checked={filterType === label}
                    onChange={() => setFilterType(label)}
                  />{" "}
                  {label}
                </label>
              ))}
              <h3>Sort By</h3>
              {["Time", "Name"].map((label) => (
                <label key={label}>
                  <input
                    type="radio"
                    name="sort"
                    checked={sortBy === label}
                    onChange={() => setSortBy(label)}
                  />{" "}
                  {label}
                </label>
              ))}
            </div>
            <div className="admin-reservations-list">
              <h2>Reservations</h2>
              {filteredReservations.length === 0 ? (
                <p>No reservations found.</p>
              ) : (
                <table className="admin-reservations-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Date</th>
                      <th>Time</th>
                      <th>Guests</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredReservations.map((res) => (
                      <tr key={res._id}>
                        <td>{res.name || res.userId?.name || "Guest"}</td>
                        <td>{res.email || res.userId?.email || "N/A"}</td>
                        <td>{new Date(res.date).toLocaleDateString()}</td>
                        <td>{res.time}</td>
                        <td>{res.numberOfGuests}</td>
                        <td>{res.status}</td>
                        <td>
                          <button
                            className="admin-reservations-edit-btn"
                            onClick={() => handleEditReservation(res)}
                          >
                            ✏️
                          </button>
                          <button
                            className="admin-reservations-delete-btn"
                            onClick={() => handleDelete(res._id)}
                          >
                            🗑️
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
            <div className="admin-reservations-form">
              <h2>{isEditing ? "Edit Reservation" : "Add New Reservation"}</h2>
              <form onSubmit={isEditing ? handleSaveEdit : handleAddReservation}>
                <input
                  type="text"
                  placeholder="Name"
                  value={isEditing ? editItem.name : newReservation.name}
                  onChange={(e) =>
                    isEditing
                      ? setEditItem({ ...editItem, name: e.target.value })
                      : setNewReservation({ ...newReservation, name: e.target.value })
                  }
                  required
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={isEditing ? editItem.email : newReservation.email}
                  onChange={(e) =>
                    isEditing
                      ? setEditItem({ ...editItem, email: e.target.value })
                      : setNewReservation({ ...newReservation, email: e.target.value })
                  }
                  required
                />
                <input
                  type="number"
                  placeholder="Number of Guests"
                  value={isEditing ? editItem.numberOfGuests : newReservation.numberOfGuests}
                  onChange={(e) =>
                    isEditing
                      ? setEditItem({ ...editItem, numberOfGuests: e.target.value })
                      : setNewReservation({ ...newReservation, numberOfGuests: e.target.value })
                  }
                  required
                />
                <input
                  type="text"
                  placeholder="Time (e.g. 18:00)"
                  value={isEditing ? editItem.time : newReservation.time}
                  onChange={(e) =>
                    isEditing
                      ? setEditItem({ ...editItem, time: e.target.value })
                      : setNewReservation({ ...newReservation, time: e.target.value })
                  }
                  required
                />
                <DatePicker
                  selected={isEditing ? editItem.date : newReservation.date}
                  onChange={(date) =>
                    isEditing
                      ? setEditItem({ ...editItem, date })
                      : setNewReservation({ ...newReservation, date })
                  }
                  dateFormat="yyyy-MM-dd"
                  className="admin-reservations-date-picker"
                  popperModifiers={popperModifiers} // Add popper modifiers to prevent clipping
                  popperPlacement="top-start" // Prefer top-start placement
                />
                <button type="submit">{isEditing ? "Save Changes" : "Confirm Booking"}</button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="admin-reservations-footer">
        <Footer />
      </div>
    </div>
  );
};

export default ReservationAdmin;