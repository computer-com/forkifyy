import React from "react";
import { useNavigate } from "react-router-dom";
import "../../../assets/css/style.css";
import RestaurantImage3 from "../../../assets/images/Restaurant_Image_1.png";
import RestaurantImage4 from "../../../assets/images/Restaurant_Image_1.png";

const Cafes = () => {
  const navigate = useNavigate();

  const cafes = [
    {
      id: "cafe-bliss",
      name: "Cafe Bliss",
      description: "Cozy cafe with amazing latte art.",
      image: RestaurantImage3,
    },
    {
      id: "bean-bar",
      name: "The Bean Bar",
      description: "Delicious sandwiches and great coffee.",
      image: RestaurantImage4,
    },
  ];

  const handleViewMenu = (cafeId) => {
    navigate(`/menu?restaurant=${cafeId}`);
  };

  const handleReservation = () => {
    navigate('/make-reservation');
  };

  return (
    <div className="category-page">
      <h1 className="page-title">Cafes</h1>
      <div className="restaurant-list">
        {cafes.map((cafe) => (
          <div className="restaurant-card" key={cafe.id}>
            <img src={cafe.image} alt={cafe.name} />
            <div className="restaurant-info">
              <h3>{cafe.name}</h3>
              <p>{cafe.description}</p>
              <div className="card-buttons">
                <button
                  className="reservation-btn"
                  onClick={() => handleReservation()}
                >
                  Make Reservation
                </button>
                <button
                  className="menu-btn"
                  onClick={() => handleViewMenu(cafe.id)}
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

export default Cafes;
