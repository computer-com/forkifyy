import React from "react";
import "../../../assets/css/style.css";
import RestaurantImage1 from "../../../assets/images/Restaurant_Image_1.png";
import RestaurantImage2 from "../../../assets/images/Restaurant_Image_1.png";

const BestRestaurants = () => {
  const restaurants = [
    {
      name: "Sardar Ji - Kitchener",
      description: "Authentic Indian cuisine with a modern twist.",
      image: RestaurantImage1,
    },
    {
      name: "The Italian Table",
      description: "Traditional Italian food with a cozy ambiance.",
      image: RestaurantImage2,
    },
  ];

  return (
    <div className="category-page">
      <h1 className="page-title">Best Restaurants</h1>
      <div className="restaurant-list">
        {restaurants.map((restaurant, index) => (
          <div className="restaurant-card" key={index}>
            <img src={restaurant.image} alt={restaurant.name} />
            <div className="restaurant-info">
              <h3>{restaurant.name}</h3>
              <p>{restaurant.description}</p>
              <div className="card-buttons">
                <button
                  className="reservation-btn"
                  onClick={() =>
                    (window.location.href = "/make-reservation")
                  }
                >
                  Make Reservation
                </button>
                <button
                  className="menu-btn"
                  onClick={() => (window.location.href = "/view-menu")}
                >
                  View Menu
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BestRestaurants;
