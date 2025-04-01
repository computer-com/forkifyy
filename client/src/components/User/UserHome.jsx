import React, { useEffect, useRef, useState } from "react";
import "../../assets/css/UserCSS/UserHome.css";
import logo from "../../assets/images/Forkify_Logo.png";
import Footer from "./UserFooter";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserHome = () => {
  const [restaurants, setRestaurants] = useState([]);
  const restaurantCarouselRef = useRef(null);
  const outdoorCarouselRef = useRef(null);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");



  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const res = await axios.get("/api/restaurants");
        setRestaurants(Array.isArray(res.data) ? res.data : []);
        console.log("Fetched data:", res.data);
      } catch (error) {
        console.error("Failed to fetch restaurants:", error);
      }
    };

    fetchRestaurants();
  }, []);

  const scrollCarousel = (ref, direction) => {
    if (ref.current) {
      ref.current.scrollBy({
        left: direction === "left" ? -300 : 300,
        behavior: "smooth",
      });
    }
  };
  const filteredRestaurants = restaurants.filter((res) => {
    const term = searchTerm.toLowerCase();
    return (
      res.name.toLowerCase().includes(term) ||
      res.cuisine.toLowerCase().includes(term) ||
      res.city.toLowerCase().includes(term)
    );
  });

  return (
    <div className="user-homepage">
      {/* Top Bar */}
      <header className="user-topbar">
        <div className="user-logo">
          <img src={logo} alt="logo" />
          <h2>ForkiFy</h2>
        </div>
        <div className="search-controls">
          <input
            type="text"
            placeholder="Location, Restaurant, or Cuisine"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button onClick={() => setSearchTerm(searchTerm.trim())}>Let’s go</button>
        </div>
      </header>

      {/* Hero Banner */}
      <section className="hero-banner">
        <h1>Visa Dining Collection</h1>
        <p>Get exclusive access to primetime reservations and special events at top restaurants.</p>
        <button>Explore Restaurants</button>
      </section>

      {/* Available for Dinner */}
      <section className="restaurant-carousel">
        <h2>Available for dinner now</h2>
        <div className="carousel-wrapper">
          <button className="scroll-btn" onClick={() => scrollCarousel(restaurantCarouselRef, "left")}>←</button>
          <div className="restaurant-cards" ref={restaurantCarouselRef}>
          {filteredRestaurants.length === 0 ? (
              <p style={{ padding: "1rem", color: "gray" }}>No restaurants found.</p>
            ) : (
              filteredRestaurants.map((res, idx) => (
                <div className="restaurant-card" key={idx}>
                  <img
                    src={res.image || "https://source.unsplash.com/featured/?restaurant"}
                    alt={res.name}
                  />
                  <div className="restaurant-info">
                    <h3>{res.name}</h3>
                    <p>{res.cuisine} • {res.city || "Ontario"}</p>
                    <p>⭐ {res.reviews} reviews</p>
                    {res.timeSlots && res.timeSlots.slice(0, 2).map((slot, i) => (
                      <h3 key={i}>{slot}</h3>
                    ))}
                    <button onClick={() => navigate(`/restaurant/${res._id}`)}>Checkout</button>
                  </div>
                </div>
              ))
            )
          }
          </div>
          <button className="scroll-btn" onClick={() => scrollCarousel(restaurantCarouselRef, "right")}>→</button>
        </div>
      </section>

      {/* Outdoor Dining */}
      <section className="restaurant-carousel">
        <h2>Outdoor Dining</h2>
        <div className="carousel-wrapper">
          <button className="scroll-btn" onClick={() => scrollCarousel(outdoorCarouselRef, "left")}>←</button>
          <div className="restaurant-cards" ref={outdoorCarouselRef}>
          {filteredRestaurants.length === 0 ? (
              <p style={{ padding: "1rem", color: "gray" }}>No restaurants found.</p>
            ) : (
              filteredRestaurants.map((res, idx) => (
                <div className="restaurant-card" key={`outdoor-${idx}`}>
                  <img
                    src={res.image || "https://source.unsplash.com/featured/?restaurant"}
                    alt={res.name}
                  />
                  <div className="restaurant-info">
                    <h3>{res.name}</h3>
                    <p>{res.cuisine} • {res.city || "Ontario"}</p>
                    <p>⭐ {res.reviews} reviews</p>
                    {res.timeSlots && res.timeSlots.slice(0, 2).map((slot, i) => (
                      <button key={i}>{slot}</button>
                    ))}
                  </div>
                </div>
              ))
            )
          }
          </div>
          <button className="scroll-btn" onClick={() => scrollCarousel(outdoorCarouselRef, "right")}>→</button>
        </div>
      </section>

      {/* Top Rated Reviews */}
      <section className="top-rated-reviews">
        <h2>See what locals rave about in Ontario</h2>
        <div className="reviews-row">
          <div className="review-card">
            <h4>Melanie</h4>
            <p>"The pizza was phenomenal and deceivingly filling. Loved the spicy dill and interactive table!"</p>
            <span>⭐ 5.0 • Graffiti Market • Kitchener</span>
          </div>
          <div className="review-card">
            <h4>Pearl</h4>
            <p>"Service was the BEST. Our server was very attentive and even accommodated special requests!"</p>
            <span>⭐ 4.8 • Milestones Grill • Waterloo</span>
          </div>
          <div className="review-card">
            <h4>Jan</h4>
            <p>"Great service and meal. We will definitely be back for another one. Thank you!"</p>
            <span>⭐ 4.7 • State & Main • Waterloo</span>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default UserHome;
