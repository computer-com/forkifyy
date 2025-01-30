import React from "react";
import "../../../assets/css/style.css";
import RestaurantImage3 from "../../../assets/images/Restaurant_Image_1.png";
import RestaurantImage4 from "../../../assets/images/Restaurant_Image_1.png";

const Cafes = () => {
  const cafes = [
    {
      name: "Cafe Bliss",
      description: "Cozy cafe with amazing latte art.",
      image: RestaurantImage3,
    },
    {
      name: "The Bean Bar",
      description: "Delicious sandwiches and great coffee.",
      image: RestaurantImage4,
    },
  ];

  return (
    <div className="category-page">
      <h1 className="page-title">Cafes</h1>
      <div className="restaurant-list">
        {cafes.map((cafe, index) => (
          <div className="restaurant-card" key={index}>
            <img src={cafe.image} alt={cafe.name} />
            <div className="restaurant-info">
              <h3>{cafe.name}</h3>
              <p>{cafe.description}</p>
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

export default Cafes;
