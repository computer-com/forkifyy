import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import '../../assets/css/Menu.css';

const menuData = {
  'sardar-ji': {
    name: 'Sardar Ji - Kitchener',
    categories: {
      'Starters': [
        { name: 'Samosa', price: '6.99', description: 'Crispy pastry filled with spiced potatoes and peas' },
        { name: 'Paneer Tikka', price: '12.99', description: 'Grilled cottage cheese with Indian spices' }
      ],
      'Main Course': [
        { name: 'Butter Chicken', price: '16.99', description: 'Tender chicken in rich tomato-based curry' },
        { name: 'Dal Makhani', price: '14.99', description: 'Black lentils cooked overnight with cream' }
      ]
    }
  },
  'italian-table': {
    name: 'The Italian Table',
    categories: {
      'Antipasti': [
        { name: 'Bruschetta', price: '8.99', description: 'Toasted bread with tomatoes and basil' },
        { name: 'Caprese', price: '10.99', description: 'Fresh mozzarella with tomatoes and basil' }
      ],
      'Pasta': [
        { name: 'Spaghetti Carbonara', price: '18.99', description: 'Classic pasta with eggs and pancetta' },
        { name: 'Fettuccine Alfredo', price: '16.99', description: 'Creamy pasta with parmesan' }
      ]
    }
  },
  'cafe-bliss': {
    name: 'Cafe Bliss',
    categories: {
      'Cafe': [
        { name: 'Latte', price: '6.99', description: 'Espresso with milk' },
        { name: 'Mocha', price: '8.99', description: 'Espresso with chocolate and milk' }
      ]
    }
  },
  // Add more restaurant menus as needed
};

const Menu = () => {
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const location = useLocation();

  useEffect(() => {
    // Get restaurant ID from URL parameters
    const params = new URLSearchParams(location.search);
    const restaurantId = params.get('restaurant');
    if (restaurantId && menuData[restaurantId]) {
      setSelectedRestaurant(menuData[restaurantId]);
    }
  }, [location]);

  if (!selectedRestaurant) {
    return <div className="menu-container">Restaurant not found</div>;
  }

  return (
    <div className="menu-container">
      <h1>{selectedRestaurant.name} Menu</h1>
      {Object.entries(selectedRestaurant.categories).map(([category, items]) => (
        <div key={category} className="menu-category">
          <h2>{category}</h2>
          <div className="menu-items">
            {items.map((item, index) => (
              <div key={index} className="menu-item">
                <div className="item-header">
                  <h3>{item.name}</h3>
                  <span className="price">${item.price}</span>
                </div>
                <p className="description">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Menu;
