import React from "react";
//Importing the useNavigate hook from react-router-dom
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/css/userhome.css";
import logo from "../../assets/images/Forkify_Logo.png";
import BannerImage from "../../assets/images/User_Home_Banner.png";
import RestaurantImage1 from "../../assets/images/Restaurant_Image_1.png";
import RestaurantImage2 from "../../assets/images/Restaurant_Image_1.png";
import RestaurantImage3 from "../../assets/images/Restaurant_Image_1.png";
import RestaurantImage4 from "../../assets/images/Restaurant_Image_1.png";

const UserHome = () => {
  const navigate = useNavigate();

  const navigateToCategory = (link) => {
    navigate(link);
  };

  const navigateToMenu = (restaurantId) => {
    navigate(`/menu?restaurant=${restaurantId}`);
  };

  //Search functionality 
  const restaurantSectionRef = useRef(null); //Reference to the restaurant section
  const [searchTerm, setSearchTerm] = useState(""); //State for the search term

  const handleExploreClick = () => {
    restaurantSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  
  const categories = [
    {
      name: "Best Restaurants",
      link: "/bestrestaurants",
      restaurants: [
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
        {
          id: "spice-house",
          name: "The Spice House",
          description: "Spicy and flavorful dishes from around the world.",
          image: RestaurantImage3,
        },
        {
          id: "sushi-spot",
          name: "The Sushi Spot",
          description: "Fresh sushi and sashimi for sushi enthusiasts.",
          image: RestaurantImage4,
        },
      ],
    },
    {
      name: "Cafes",
      link: "/cafes",
      restaurants: [
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
        {
          id: "coffee-corner",
          name: "The Coffee Corner",
          description: "Perfect spot for a quick coffee break.",
          image: RestaurantImage1,
        },
        {
          id: "brew-house",
          name: "The Brew House",
          description: "Craft beers and delicious food.",
          image: RestaurantImage2,
        },
      ],
    },
    {
      name: "Dine In",
      link: "/dinein",
      restaurants: [
        {
          id: "maison-moderne",
          name: "Maison Moderne",
          description: "Sophisticated dining experience in the city.",
          image: RestaurantImage2,
        },
        {
          id: "prime-grills",
          name: "Prime Grills",
          description: "Fine cuts and exquisite flavors await.",
          image: RestaurantImage3,
        },
        {
          id: "bistro",
          name: "The Bistro",
          description: "Classic French cuisine with a modern twist.",
          image: RestaurantImage4,
        }, 
        {
          id: "bistro-2",
          name: "The Bistro",
          description: "Classic French cuisine with a modern twist.",
          image: RestaurantImage1,
        },
      ],
    },
    {
      name: "Outdoor Dining",
      link: "/outdoordining",
      restaurants: [
        {
          id: "garden-bistro",
          name: "Garden Bistro",
          description: "Enjoy your meal surrounded by lush greenery.",
          image: RestaurantImage4,
        },
        {
          id: "terrace-spot",
          name: "The Terrace Spot",
          description: "Fresh air and amazing food under the open sky.",
          image: RestaurantImage1,
        },
        {
          id: "picnic-spot",
          name: "The Picnic Spot",
          description: "Pack a picnic and enjoy the outdoors.",
          image: RestaurantImage2,
        },
        {
          id: "picnic-spot-2",
          name: "The Picnic Spot",
          description: "Pack a picnic and enjoy the outdoors.",
          image: RestaurantImage3,
        },
      ],
    },
  ];

  return (
    <div className="user-home">
      {/* Header Section */}
      <div className="top-bar">
        <div className="logo-container">
          <img src={logo} alt="logo" className="logo-img" />
          <span className="logo-text">ForkiFy</span>
        </div>
        <h1 className="site-title">Discover Great Food</h1>
        {/* User icon commented out for now*/}
        {/* <div className="user-icon">M</div> */}
        {/*Adding a search bar to the banner*/}
        <div className="header-search">
          <input type="text" placeholder="Search for cafes, dining, or cuisine..." className="search-bar" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          <button className="search-btn">Search</button>
        </div>
      </div>

      {/* Banner Section */}
      <div className="banner">
        <img src={BannerImage} alt="Banner" />
        <div className="banner-content">
          <h2>Find Your Perfect Dining Experience</h2>
          <p>Explore the best restaurants in your area</p>
          {/*Adding a explore button to the banner*/}
          <button className="explore-btn" onClick={handleExploreClick}>Explore</button>
        </div>
      </div>

      {/* Categories Section */}
      <div className="categories-container">
        {searchTerm ? (
          <div className="category-section">
            <h2 className="search-results-title">Search Results</h2>
            <div className="search-results-container">
            <div className="restaurant-list">
              {categories.flatMap(category =>
                category.restaurants.filter((restaurant) =>
                  restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  restaurant.description.toLowerCase().includes(searchTerm.toLowerCase())
                )
              ).map((restaurant, idx) => (
                <div className="restaurant-card" key={idx}>
                  <img src={restaurant.image} alt={restaurant.name} />
                  <div className="restaurant-info">
                    <h3>{restaurant.name}</h3>
                    <p>{restaurant.description}</p>
                    <div className="card-buttons">
                      <button className="reservation-btn" onClick={() => (window.location.href = "/make-reservation")}>Make Reservation</button>
                      <button className="view-menu-btn" onClick={() => navigateToMenu(restaurant.id)}>View Menu</button>
                    </div>
                  </div>
                </div>
              ))}
              </div>
            </div>
          </div>
        ) : (
          categories.map((category, index) => (
            <div className="category-section" key={index}>
              <div className="category-header">
                <h2>{category.name}</h2>
                <button className="view-all-btn" onClick={() => navigateToCategory(category.link)}>View All →</button>
              </div>
              <div className="restaurant-list">
                {category.restaurants.map((restaurant, idx) => (
                  <div className="restaurant-card" key={idx}>
                    <img src={restaurant.image} alt={restaurant.name} />
                    <div className="restaurant-info">
                      <h3>{restaurant.name}</h3>
                      <p>{restaurant.description}</p>
                      <div className="card-buttons">
                        <button className="reservation-btn" onClick={() => (window.location.href = "/make-reservation")}>Make Reservation</button>
                        <button className="view-menu-btn" onClick={() => navigateToMenu(restaurant.id)}>View Menu</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default UserHome;
