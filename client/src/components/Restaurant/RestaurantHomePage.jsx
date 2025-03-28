import React, { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import "../../assets/css/restauranthome.css";

const RestaurantHomePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showMore, setShowMore] = useState(false);

  const handleMenuClick = () => {
    navigate(`/menu?restaurant=${id}`);
  };


  const restaurants = {
    "sardar-ji": {
      name: "Sardar Ji - Kitchener",
      tagline: "Authentic Indian cuisine with a modern twist",
      description: "Simply Indian located in Castlemore, Brampton, We have Wide range of Indian Dishes in our Daily Buffet which is 7 Days a week over 40 items to serve you Veg & Non Veg Dishes, At Simply Indian we also sell Sweets, Cakes & Pastries our aim is...",
      timing: "Daily 10:00 am - 12:00 am",
      neighborhood: "Kitchener",
      parking: "Private Parking Available",
      website: "www.sardarjikitchener.com",
      phone: "(226) 978-0055"
    },
    "italian-table": {
      name: "The Italian Table",
      tagline: "Traditional Italian food with a cozy ambiance",
      description: "Experience authentic Italian cuisine in a warm, family-friendly atmosphere. Our chefs use traditional recipes and the finest ingredients to bring you the true taste of Italy.",
      timing: "Daily 11:00 am - 10:00 pm",
      neighborhood: "Little Italy",
      parking: "Valet Parking",
      website: "www.italiantable.com",
      phone: "(226) 555-0456"
    },
    "spice-house": {
      name: "The Spice House",
      tagline: "Spicy and flavorful dishes from around the world",
      description: "Discover a world of flavors at The Spice House. Our expert chefs bring you authentic spices and cooking techniques from various cuisines around the globe.",
      timing: "Daily 11:30 am - 10:00 pm",
      neighborhood: "Downtown",
      parking: "Street Parking",
      website: "www.spicehouse.com",
      phone: "(226) 555-0789"
    },
    "sushi-spot": {
      name: "The Sushi Spot",
      tagline: "Fresh sushi and sashimi for sushi enthusiasts",
      description: "Experience the finest Japanese cuisine at The Sushi Spot. Our master sushi chefs create beautiful and delicious sushi using the freshest ingredients available.",
      timing: "Daily 12:00 pm - 10:00 pm",
      neighborhood: "Waterfront",
      parking: "Underground Parking",
      website: "www.sushispot.com",
      phone: "(226) 555-0321"
    },
    "cafe-bliss": {
      name: "Cafe Bliss",
      tagline: "Cozy cafe with amazing latte art",
      description: "Welcome to Cafe Bliss, where every cup tells a story. Our skilled baristas craft the perfect brew while you enjoy our cozy atmosphere. We serve a variety of specialty coffees, fresh pastries, and light meals throughout the day.",
      timing: "Daily 7:00 am - 9:00 pm",
      neighborhood: "Downtown",
      parking: "Street Parking Available",
      website: "www.cafebliss.com",
      phone: "(226) 555-0123"
    },
    "bean-bar": {
      name: "The Bean Bar",
      tagline: "Delicious sandwiches and great coffee",
      description: "The Bean Bar is your perfect spot for premium coffee and gourmet sandwiches. Our menu features locally roasted coffee beans and fresh ingredients from local suppliers.",
      timing: "Daily 6:30 am - 8:00 pm",
      neighborhood: "University District",
      parking: "Public Parking Nearby",
      website: "www.beanbar.com",
      phone: "(226) 555-0234"
    },
    "coffee-corner": {
      name: "The Coffee Corner",
      tagline: "Perfect spot for a quick coffee break",
      description: "A charming corner cafe offering a selection of premium coffees, teas, and fresh-baked pastries. The perfect spot to relax or catch up on work.",
      timing: "Daily 7:00 am - 7:00 pm",
      neighborhood: "Business District",
      parking: "Street Parking",
      website: "www.coffeecorner.com",
      phone: "(226) 555-0345"
    },
    "brew-house": {
      name: "The Brew House",
      tagline: "Craft beers and delicious food",
      description: "The Brew House combines exceptional craft beers with delicious pub fare. Our rotating tap selection features local breweries and international favorites.",
      timing: "Daily 11:00 am - 2:00 am",
      neighborhood: "Historic District",
      parking: "Private Lot",
      website: "www.brewhouse.com",
      phone: "(226) 555-0456"
    },
    "garden-bistro": {
      name: "Garden Bistro",
      tagline: "Enjoy your meal surrounded by lush greenery",
      description: "A unique dining experience in our beautiful garden setting. Fresh ingredients, seasonal menus, and a peaceful atmosphere make every meal special.",
      timing: "Daily 11:00 am - 10:00 pm",
      neighborhood: "Garden District",
      parking: "Private Parking",
      website: "www.gardenbistro.com",
      phone: "(226) 555-0789"
    },
    "terrace-spot": {
      name: "The Terrace Spot",
      tagline: "Fresh air and amazing food under the open sky",
      description: "Dine al fresco on our beautiful terrace. Enjoy stunning views while savoring our chef's creative dishes made with locally sourced ingredients.",
      timing: "Daily 11:00 am - 11:00 pm",
      neighborhood: "Rooftop District",
      parking: "Valet Available",
      website: "www.terracespot.com",
      phone: "(226) 555-0890"
    },
    "picnic-spot": {
      name: "The Picnic Spot",
      tagline: "Pack a picnic and enjoy the outdoors",
      description: "We prepare gourmet picnic baskets filled with fresh sandwiches, salads, and treats. Perfect for enjoying in our adjacent park or taking on your outdoor adventure.",
      timing: "Daily 10:00 am - 6:00 pm",
      neighborhood: "Park District",
      parking: "Street Parking",
      website: "www.picnicspot.com",
      phone: "(226) 555-0901"
    }
  };

  const restaurant = restaurants[id] || restaurants["sardar-ji"]; // Default to Sardar Ji if ID not found

  return (
    <div className="restaurant-page">
      <header className="restaurant-header">
        <h1>{restaurant.name}</h1>
        <div className="notification-icon">
          <span className="notification-badge">M</span>
        </div>
      </header>

      <div className="restaurant-banner">
        <img src="https://example.com/restaurant-banner.jpg" alt="Restaurant Banner" className="banner-image" />
        <div className="banner-text">
          <h2>{restaurant.name}</h2>
          <p>{restaurant.tagline}</p>
        </div>
      </div>

      <div className="action-buttons">
        <button className="action-button" onClick={handleMenuClick}>
          View Menu
        </button>
        <button className="action-button" onClick={handleReservationClick}>
          Make Reservation
        </button>
      </div>

      <div className="restaurant-description">
        <p>{restaurant.description}</p>
        <button className="read-more">Read More</button>
      </div>

      <div className="restaurant-gallery">
        {/* Add your gallery images here */}
      </div>

      <div className="view-more">
        <button 
          className="view-more-button"
          onClick={() => setShowMore(!showMore)}
        >
          {showMore ? 'Show Less' : 'View More'}
        </button>
        {showMore && (
          <div className="action-buttons-expanded">
            <button className="action-button-expanded" onClick={handleMenuClick}>
              Full Menu
            </button>
            <button>
              Book Table
            </button>
          </div>
        )}
      </div>

      <div className="map-section">
        <h3>Map Directions</h3>
        <div className="map-container">
          {/* Add your map component here */}
        </div>
      </div>

      <div className="additional-info">
        <h3>Additional Information</h3>
        <div className="info-grid">
          <div className="info-item">
            <div className="info-content">
              <h4>Neighbourhood</h4>
              <p>{restaurant.neighborhood}</p>
            </div>
          </div>
          <div className="info-item">
            <div className="info-content">
              <h4>Restaurant Timing</h4>
              <p>{restaurant.timing}</p>
            </div>
          </div>
          <div className="info-item">
            <div className="info-content">
              <h4>Parking Facility</h4>
              <p>{restaurant.parking}</p>
            </div>
          </div>
          <div className="info-item">
            <div className="info-content">
              <h4>Website</h4>
              <p>{restaurant.website}</p>
            </div>
          </div>
          <div className="info-item">
            <div className="info-content">
              <h4>Phone Number</h4>
              <p>{restaurant.phone}</p>
            </div>
          </div>
        </div>
      </div>

      <footer className="restaurant-footer">
        <div className="footer-section">
          <h4>Discover</h4>
          <Link to="/reserve">Reserve now</Link>
          <Link to="/menu">See Menu</Link>
          <Link to="/order">Order from Menu</Link>
        </div>
        <div className="footer-section">
          <h4>Forkify</h4>
          <Link to="/about">About Us</Link>
          <Link to="/blogs">Blogs</Link>
          <Link to="/career">Career</Link>
        </div>
        <div className="footer-section">
          <h4>More</h4>
          <Link to="/trust">Trust Center</Link>
          <Link to="/security">Security</Link>
          <Link to="/terms">Terms and Conditions</Link>
        </div>
        <div className="footer-section">
          <h4>Business</h4>
          <Link to="/partnerships">Partnerships</Link>
          <Link to="/business">Business Owners</Link>
        </div>
      </footer>
    </div>
  );
};

export default RestaurantHomePage;
