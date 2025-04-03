import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import logo from "../../../assets/images/Forkify_Logo.png";
import Footer from "../UserFooter";
import "../../../assets/css/UserCSS/restauranthome.css";

const tabs = ["Overview", "Menu", "Reviews"];

const RestaurantHomePage = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [activeTab, setActiveTab] = useState("Overview");
  const [menuItems, setMenuItems] = useState([]);
  const [loadingMenu, setLoadingMenu] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    guests: 1,
    dateTime: "",
  });

  // Fetch restaurant details
  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const res = await axios.get(`/api/restaurants/id/${id}`);
        setRestaurant(res.data);
      } catch (error) {
        console.error("Error fetching restaurant:", error);
      }
    };

    fetchRestaurant();
  }, [id]);

  // Fetch menu items for this restaurant
  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await axios.get(`/api/menu?restaurantId=${id}`);
        setMenuItems(res.data);
      } catch (error) {
        console.error("Error fetching menu items:", error);
      } finally {
        setLoadingMenu(false);
      }
    };

    fetchMenu();
  }, [id]);

  const handleReservationSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const customer = JSON.parse(localStorage.getItem("customer"));

      if (!token || !customer) {
        alert("You must be signed in to reserve a table.");
        return;
      }

      const date = new Date(formData.dateTime);
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");
      const time = `${hours}:${minutes}`;

      const reservationPayload = {
        restaurantId: id,
        numberOfGuests: formData.guests,
        date: date.toISOString(),
        time: time,
        name: formData.name,
        email: formData.email,
      };

      await axios.post("/api/reservation", reservationPayload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSuccessMsg("Your reservation was successfully placed!");
      setShowModal(false);
      setFormData({ name: "", email: "", guests: 1, dateTime: "" });

      setTimeout(() => setSuccessMsg(""), 5000);
    } catch (err) {
      console.error("Reservation failed:", err.response?.data || err.message);
      alert("Failed to reserve. Please try again.");
    }
  };

  if (!restaurant) return <div className="loading-text">Loading...</div>;

  return (
    <div className="restaurant-page">
      <header className="user-topbar">
        <div className="user-logo">
          <a href="/userhome"><img src={logo} alt="Forkify Logo"/></a>
          <h2>ForkiFy</h2>
        </div>
      </header>

      <section className="restaurant-hero">
        <img
          className="restaurant-hero-img"
          src={restaurant.image}
          alt={restaurant.name}
        />
        <div className="restaurant-overview">
          <h1>{restaurant.name}</h1>
          <p className="restaurant-meta">
            {restaurant.cuisine} • {restaurant.city}
          </p>
          <p className="restaurant-reviews">⭐ {restaurant.reviews} Reviews</p>
          <p className="restaurant-desc">
            {restaurant.description ||
              "A wonderful dining experience awaits you."}
          </p>
        </div>
      </section>

      <div className="tab-navigation">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`tab-btn ${activeTab === tab ? "active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="tab-content">
        {activeTab === "Overview" && (
          <div className="overview-section">
            <h3>Reserve a Table</h3>
            <button className="reserve-btn" onClick={() => setShowModal(true)}>
              Make a Reservation
            </button>

            {successMsg && (
              <p style={{ color: "#4CAF50", marginTop: "10px" }}>
                {successMsg}
              </p>
            )}

            {showModal && (
              <div className="reservation-modal">
                <div className="reservation-content">
                  <h3>Book a Table</h3>
                  <form onSubmit={handleReservationSubmit}>
                    <input
                      type="text"
                      placeholder="Your Name"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                    />
                    <input
                      type="email"
                      placeholder="Email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                    />
                    <input
                      type="number"
                      placeholder="Number of Guests"
                      min="1"
                      required
                      value={formData.guests || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          guests: e.target.value ? parseInt(e.target.value) : "",
                        })
                      }
                    />
                    <input
                      type="datetime-local"
                      required
                      value={formData.dateTime}
                      onChange={(e) =>
                        setFormData({ ...formData, dateTime: e.target.value })
                      }
                    />
                    <button type="submit">Confirm Reservation</button>
                  </form>
                  <button
                    className="close-btn"
                    onClick={() => setShowModal(false)}
                  >
                    X
                  </button>
                </div>
              </div>
            )}

            <div className="time-slots">
              {restaurant.timeSlots.length > 0 ? (
                restaurant.timeSlots.map((slot, i) => (
                  <button key={i} className="time-btn">
                    {slot}
                  </button>
                ))
              ) : (
                <p>Currently unavailable</p>
              )}
            </div>

            <div className="additional-details">
              <p>
                <strong>Bookings Today:</strong>{" "}
                {restaurant.bookedTimes || 0}
              </p>
              <p>
                <strong>Price Range:</strong> CAN$31–CAN$50
              </p>
              <p>
                <strong>Dining Style:</strong> Casual Elegant
              </p>
              <p>
                <strong>Dress Code:</strong> Casual
              </p>
              <p>
                <strong>Neighborhood:</strong> {restaurant.city}
              </p>
              <p>
                <strong>Hours:</strong> Mon–Thu 11:30am–9pm, Fri–Sat
                11:30am–10pm
              </p>
              <p>
                <strong>Parking:</strong> Private Lot
              </p>
              <p>
                <strong>Payment Options:</strong> Visa, Mastercard
              </p>
            </div>
          </div>
        )}

        {activeTab === "Menu" && (
          <div className="menu-section">
            <h2>Menu Highlights</h2>
            {loadingMenu ? (
              <p className="menu-empty">Loading menu...</p>
            ) : menuItems.length > 0 ? (
              <ul className="menu-items">
                {menuItems.map((item, idx) => (
                  <li key={item._id || idx} className="menu-item">
                    <h4>{item.name} - ${item.price}</h4>
                    <p>{item.description}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="menu-empty">Menu is being updated...</p>
            )}
          </div>
        )}

        {activeTab === "Reviews" && (
          <div className="reviews-section">
            <h2>What people are saying</h2>
            <p>⭐ 4.4 average rating based on 1,323 reviews</p>
            <p>Food: 4.4 | Service: 4.4 | Ambience: 4.1 | Value: 4.1</p>
            <p>Noise Level: Moderate</p>
            <p>
              Only verified diners can leave a review. This section will be
              dynamically enhanced in future.
            </p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default RestaurantHomePage;
