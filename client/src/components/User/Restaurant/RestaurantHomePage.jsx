import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import logo from "../../../assets/images/forkify_logo.png";
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
      const token = localStorage.getItem("token"); // Retrieve the token from localStorage
      if (!token) {
        alert("You must be signed in to reserve a table.");
        return;
      }
 
      const date = new Date(formData.dateTime);
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");
      const time = `${hours}:${minutes}`;
 
      const reservationPayload = {
        restaurantId: restaurant._id,
        numberOfGuests: formData.guests,
        date: date.toISOString(),
        time: time,
        name: formData.name,
        email: formData.email,
      };

      console.log("Reservation Payload:", reservationPayload);  // Log the payload

      await axios.post(`/api/reservation`, reservationPayload, {
        headers: {
          Authorization: `Bearer ${token}`, // Send the token in headers
        },
      });
 
      setSuccessMsg("Your reservation was successfully placed!");
      setShowModal(false);
      setFormData({ name: "", email: "", guests: 1, dateTime: "" });
 
      setTimeout(() => setSuccessMsg(""), 5000);
    } catch (err) {
      console.error("Reservation failed:", err.response?.data || err.message);
      alert(err.response?.data?.error || "Login failed. Please try again.");
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
        <img className="restaurant-hero-img" src={restaurant.image} alt={restaurant.name} />
        <div className="restaurant-overview">
          <h1>{restaurant.name}</h1>
          <p className="restaurant-meta">{restaurant.cuisine} • {restaurant.city}</p>
          <p className="restaurant-reviews">⭐ {restaurant.reviews} Reviews</p>
          <p className="restaurant-desc">{restaurant.description || "A wonderful dining experience awaits you."}</p>
        </div>
      </section>

      <div className="tab-navigation">
        {tabs.map((tab) => (
          <button key={tab} className={`tab-btn ${activeTab === tab ? "active" : ""}`} onClick={() => setActiveTab(tab)}>
            {tab}
          </button>
        ))}
      </div>

      <div className="tab-content">
        {activeTab === "Overview" && (
          <div className="overview-enhanced-container">
            <div className="overview-left-panel">
              <div className="stat-strip">
                <div className="stat-card">📅 Bookings Today: {restaurant.bookedTimes || 0}</div>
                <div className="stat-card">💰 Price: CAN$31–CAN$50</div>
                <div className="stat-card">🍽 Style: Casual Elegant</div>
              </div>
              <div className="info-cards">
                <div className="info-card">🎽 Dress Code: Casual</div>
                <div className="info-card">🏙️ Neighborhood: {restaurant.city}</div>
                <div className="info-card">🕒 Hours: Mon–Thu 11:30am–9pm, Fri–Sat 11:30am–10pm</div>
                <div className="info-card">🅿️ Parking: Private Lot</div>
                <div className="info-card">💳 Payment: Visa, Mastercard</div>
              </div>
            </div>

            <div className="overview-right-panel">
              <h3>Reserve a Table</h3>
              <button className="reserve-btn" onClick={() => setShowModal(true)}>Make a Reservation</button>
              {successMsg && <p style={{ color: "#4CAF50", marginTop: "10px" }}>{successMsg}</p>}
              {showModal && (
                <div className="reservation-modal">
                  <div className="reservation-content">
                    <h3>Book a Table</h3>
                    <form onSubmit={handleReservationSubmit}>
                      <input type="text" placeholder="Your Name" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                      <input type="email" placeholder="Email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                      <input type="number" placeholder="Number of Guests" min="1" required value={formData.guests || ""} onChange={(e) => setFormData({ ...formData, guests: e.target.value ? parseInt(e.target.value) : "" })} />
                      <input type="datetime-local" required value={formData.dateTime} onChange={(e) => setFormData({ ...formData, dateTime: e.target.value })} />
                      <button type="submit">Confirm Reservation</button>
                    </form>
                    <button className="close-btn" onClick={() => setShowModal(false)}>X</button>
                  </div>
                </div>
              )}
              {/* Chef Quote */}
              <div className="chef-quote">
                <p>“We source locally, craft passionately, and serve with love.”</p>
                <span>- Chef {restaurant.chef || "Our Head Chef"}</span>
              </div>

              {/* Signature Dishes */}
              {restaurant.signatureDishes && restaurant.signatureDishes.length > 0 && (
                <div className="signature-dishes">
                  <h4>Signature Dishes</h4>
                  <div className="signature-grid">
                    {restaurant.signatureDishes.map((dish, i) => (
                      <div className="signature-card" key={i}>
                        <img
                          src={dish.image}
                          alt={dish.name}
                          className="signature-img"
                        />
                        <p>{dish.name}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Feature Tags */}
              {restaurant.tags?.length > 0 && (
                <div className="tag-list">
                  <h4>Features</h4>
                  <div className="tag-badges">
                    {restaurant.tags.map((tag, idx) => (
                      <span className="tag-badge" key={idx}>#{tag}</span>
                    ))}
                  </div>
                </div>
              )}
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
            <h2>What People Are Saying</h2>

            {restaurant.ratingBreakdown && (
              <>
                <p className="review-summary">
                  ⭐ {restaurant.ratingBreakdown.food.toFixed(1)} avg based on {restaurant.reviews} reviews
                </p>
                <p className="review-summary">
                  Food: {restaurant.ratingBreakdown.food} | Service: {restaurant.ratingBreakdown.service} | Ambience: {restaurant.ratingBreakdown.ambience} | Value: {restaurant.ratingBreakdown.value}
                </p>
                <p className="review-summary">Noise Level: {restaurant.ratingBreakdown.noise}</p>
              </>
            )}

            {restaurant.reviewsList && restaurant.reviewsList.length > 0 ? (
              <div className="review-cards-container">
                {restaurant.reviewsList.map((review, index) => (
                  <div className="review-card" key={index}>
                    <div className="reviewer">
                      <span>{review.name}</span>
                      <span className="rating">⭐ {review.rating}</span>
                    </div>
                    <div className="comment">“{review.comment}”</div>
                    <div className="date">{new Date(review.date).toLocaleDateString()}</div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="menu-empty">No reviews available yet.</p>
            )}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default RestaurantHomePage;
