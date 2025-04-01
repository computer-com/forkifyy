import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import '../../../assets/css/UserCSS/Menu.css';

const menuData = {
  'sardar-ji': {
    name: 'Sardar Ji - Kitchener',
    categories: {
      'Starters': [
        { id: 's1', name: 'Samosa', price: '6.99', description: 'Crispy pastry filled with spiced potatoes and peas', image: 'samosa.jpg' },
        { id: 's2', name: 'Paneer Tikka', price: '12.99', description: 'Grilled cottage cheese with Indian spices', image: 'paneer_tikka.jpg' },
        { id: 's3', name: 'Onion Bhaji', price: '7.99', description: 'Crispy onion fritters with Indian spices', image: 'onion_bhaji.jpg' }
      ],
      'Main Course': [
        { id: 'm1', name: 'Butter Chicken', price: '16.99', description: 'Tender chicken in rich tomato-based curry', image: 'butter_chicken.jpg' },
        { id: 'm2', name: 'Dal Makhani', price: '14.99', description: 'Black lentils cooked overnight with cream', image: 'dal_makhani.jpg' },
        { id: 'm3', name: 'Palak Paneer', price: '15.99', description: 'Cottage cheese in creamy spinach gravy', image: 'palak_paneer.jpg' },
        { id: 'm4', name: 'Chicken Biryani', price: '18.99', description: 'Fragrant rice dish with spiced chicken', image: 'chicken_biryani.jpg' }
      ],
      'Breads': [
        { id: 'b1', name: 'Butter Naan', price: '3.99', description: 'Soft Indian bread brushed with butter', image: 'butter_naaan.jpg' },
        { id: 'b2', name: 'Garlic Naan', price: '4.99', description: 'Naan bread topped with garlic and herbs', image: 'garlic_naaan.jpg' }
      ]
    }
  },
  'italian-table': {
    name: 'The Italian Table',
    categories: {
      'Antipasti': [
        { id: 'i1', name: 'Bruschetta', price: '8.99', description: 'Toasted bread with tomatoes and basil', image: 'bruschetta.jpg' },
        { id: 'i2', name: 'Caprese', price: '10.99', description: 'Fresh mozzarella with tomatoes and basil', image: 'caprese.jpg' },
        { id: 'i3', name: 'Calamari Fritti', price: '12.99', description: 'Crispy fried calamari with marinara sauce', image: 'calamari_fritti.jpg' }
      ],
      'Pasta': [
        { id: 'p1', name: 'Spaghetti Carbonara', price: '18.99', description: 'Classic pasta with eggs and pancetta', image: 'spaghetti_carbonara.jpg' },
        { id: 'p2', name: 'Fettuccine Alfredo', price: '16.99', description: 'Creamy pasta with parmesan', image: 'fettuccine_alfredo.jpg' },
        { id: 'p3', name: 'Penne Arrabbiata', price: '15.99', description: 'Spicy tomato sauce with garlic', image: 'penne_arrabbiata.jpg' }
      ],
      'Pizza': [
        { id: 'z1', name: 'Margherita', price: '14.99', description: 'Classic tomato and mozzarella', image: 'margherita.jpg' },
        { id: 'z2', name: 'Pepperoni', price: '16.99', description: 'Spicy pepperoni with mozzarella', image: 'pepperoni.jpg' }
      ]
    }
  },
  'cafe-bliss': {
    name: 'Cafe Bliss',
    categories: {
      'Beverages': [
        { id: 'c1', name: 'Latte', price: '6.99', description: 'Espresso with steamed milk', image: 'latte.jpg' },
        { id: 'c2', name: 'Mocha', price: '8.99', description: 'Espresso with chocolate and milk', image: 'mocha.jpg' },
        { id: 'c3', name: 'Cappuccino', price: '7.99', description: 'Espresso topped with foamy milk', image: 'cappuccino.jpg' }
      ],
      'Pastries': [
        { id: 'pa1', name: 'Croissant', price: '4.99', description: 'Buttery layered pastry', image: 'croissant.jpg' },
        { id: 'pa2', name: 'Chocolate Muffin', price: '5.99', description: 'Rich chocolate muffin', image: 'chocolate_muffin.jpg' }
      ]
    }
  }
};

const Menu = () => {
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [cart, setCart] = useState([]);
  const [isCartVisible, setIsCartVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const restaurant = new URLSearchParams(location.search).get('restaurant');
    setSelectedRestaurant(restaurant);
  }, [location]);

  if (!menuData[selectedRestaurant]) {
    return <div className="menu-container">Restaurant not found</div>;
  }

  const addToCart = (item) => {
    setCart((prev) => {
      const existingItem = prev.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        // Increment quantity if the item already exists in the cart
        return prev.map(cartItem => 
          cartItem.id === item.id ? { ...cartItem, quantity: (cartItem.quantity || 1) + 1 } : cartItem
        );
      }
      // Add new item with quantity 1
      return [...prev, { ...item, quantity: 1 }];
    });
    setIsCartVisible(true);
  };

  const toggleCart = () => {
    setIsCartVisible(!isCartVisible);
  };

  return (
    <div className="menu-container full-width">
      {/* Cart Section */}
      <div className={`cart-section ${isCartVisible ? 'visible' : ''}`}>
        <h2>Cart</h2>
        {cart.length === 0 ? (
          <p>No items in cart</p>
        ) : (
          cart.map(item => (
            <div key={item.id} className="cart-item">
              <div className="cart-item-details">
                <h4>{item.name}</h4>
                <span>${item.price} x {item.quantity || 1}</span>
              </div>
              <div className="quantity-controls">
                <button>-</button>
                <span>{item.quantity || 1}</span>
                <button>+</button>
              </div>
              <button className="remove-btn">Remove</button>
            </div>
          ))
        )}
        <div className="cart-total">
          <h3>Total: ${cart.reduce((acc, item) => acc + (parseFloat(item.price) * (item.quantity || 1)), 0).toFixed(2)}</h3>
          <button className="checkout-btn">Checkout</button>
        </div>
      </div>

      {/* Menu Content */}
      <div className="menu-content full-width">
        <div className="menu-sections">
          {Object.entries(menuData[selectedRestaurant].categories).map(([category, items]) => (
            <div key={category} className="menu-category">
              <h2>{category}</h2>
              <div className="menu-items">
                {items.map(item => (
                  <div key={item.id} className="menu-item" onClick={() => addToCart(item)}>
                    <img src={item.image} alt={item.name} className="item-image" />
                    <div className="item-content">
                      <div className="item-header">
                        <h3>{item.name}</h3>
                        <span className="price">${item.price}</span>
                      </div>
                      <p className="description">{item.description}</p>
                      <button className="add-to-cart-btn">+</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Menu;
