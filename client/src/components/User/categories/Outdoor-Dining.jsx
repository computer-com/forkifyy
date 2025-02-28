import React from "react";
import { useNavigate } from "react-router-dom";
import "../../../assets/css/userhome.css";
import RestaurantImage1 from "../../../assets/images/Restaurant_Image_1.png";
import RestaurantImage2 from "../../../assets/images/Restaurant_Image_1.png";

const OutdoorDining = () => {
    const navigate = useNavigate();

    const restaurants = [
        {
            id: "sardar-ji",
            name: "Sardar Ji - Kitchener",
            description: "Authentic Indian cuisine with a modern twist.",
            image: RestaurantImage1,
        },
        {
            id: "italian-table",
            name: "The Italian Table",
            description: "Traditional Italian food with a cozy ambiance.",
            image: RestaurantImage2,
        },
    ];

    const handleViewMenu = (restaurantId) => {
        navigate(`/menu?restaurant=${restaurantId}`);
    };

    const handleReservation = () => {
        navigate('/make-reservation');
    };

    return (
        <div className="category-page">
          <h1 className="page-title">Outdoor Dining</h1>
          <div className="restaurant-list">
            {restaurants.map((restaurant) => (
              <div className="restaurant-card" key={restaurant.id}>
                <img src={restaurant.image} alt={restaurant.name} />
                <div className="restaurant-info">
                  <h3>{restaurant.name}</h3>
                  <p>{restaurant.description}</p>
                  <div className="card-buttons">
                    <button
                      className="reservation-btn"
                      onClick={() => handleReservation()}
                    >
                      Make Reservation
                    </button>
                    <button
                      className="menu-btn"
                      onClick={() => handleViewMenu(restaurant.id)}
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

export default OutdoorDining;