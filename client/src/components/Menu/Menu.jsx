import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import '../../assets/css/Menu.css';

const menuData = {
  'sardar-ji': {
    name: 'Sardar Ji - Kitchener',
    categories: {
      'Starters': [
        { id: 's1', name: 'Samosa', price: '6.99', description: 'Crispy pastry filled with spiced potatoes and peas', image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=200' },
        { id: 's2', name: 'Paneer Tikka', price: '12.99', description: 'Grilled cottage cheese with Indian spices', image: 'https://images.unsplash.com/photo-1599487488170-b09ffa7efe2b?q=80&w=200' },
        { id: 's3', name: 'Onion Bhaji', price: '7.99', description: 'Crispy onion fritters with Indian spices', image: 'https://images.unsplash.com/photo-1626132647523-66f3bf15be46?q=80&w=200' }
      ],
      'Main Course': [
        { id: 'm1', name: 'Butter Chicken', price: '16.99', description: 'Tender chicken in rich tomato-based curry', image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?q=80&w=200' },
        { id: 'm2', name: 'Dal Makhani', price: '14.99', description: 'Black lentils cooked overnight with cream', image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?q=80&w=200' },
        { id: 'm3', name: 'Palak Paneer', price: '15.99', description: 'Cottage cheese in creamy spinach gravy', image: 'https://images.unsplash.com/photo-1618449840665-9ed506d73a34?q=80&w=200' },
        { id: 'm4', name: 'Chicken Biryani', price: '18.99', description: 'Fragrant rice dish with spiced chicken', image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=200' }
      ],
      'Breads': [
        { id: 'b1', name: 'Butter Naan', price: '3.99', description: 'Soft Indian bread brushed with butter', image: 'https://images.unsplash.com/photo-1626132647523-66f3bf15be46?q=80&w=200' },
        { id: 'b2', name: 'Garlic Naan', price: '4.99', description: 'Naan bread topped with garlic and herbs', image: 'https://images.unsplash.com/photo-1626132647523-66f3bf15be46?q=80&w=200' }
      ]
    }
  },
  'italian-table': {
    name: 'The Italian Table',
    categories: {
      'Antipasti': [
        { id: 'i1', name: 'Bruschetta', price: '8.99', description: 'Toasted bread with tomatoes and basil', image: 'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?q=80&w=200' },
        { id: 'i2', name: 'Caprese', price: '10.99', description: 'Fresh mozzarella with tomatoes and basil', image: 'https://images.unsplash.com/photo-1608644168287-b09ffa7efe2b?q=80&w=200' },
        { id: 'i3', name: 'Calamari Fritti', price: '12.99', description: 'Crispy fried calamari with marinara sauce', image: 'https://images.unsplash.com/photo-1668207009741-c82a8adb177c?q=80&w=200' }
      ],
      'Pasta': [
        { id: 'p1', name: 'Spaghetti Carbonara', price: '18.99', description: 'Classic pasta with eggs and pancetta', image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?q=80&w=200' },
        { id: 'p2', name: 'Fettuccine Alfredo', price: '16.99', description: 'Creamy pasta with parmesan', image: 'https://images.unsplash.com/photo-1645112411341-6c4fd023714a?q=80&w=200' },
        { id: 'p3', name: 'Penne Arrabbiata', price: '15.99', description: 'Spicy tomato sauce with garlic', image: 'https://images.unsplash.com/photo-1608219992759-8d74ed8d76eb?q=80&w=200' }
      ],
      'Pizza': [
        { id: 'z1', name: 'Margherita', price: '14.99', description: 'Classic tomato and mozzarella', image: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?q=80&w=200' },
        { id: 'z2', name: 'Pepperoni', price: '16.99', description: 'Spicy pepperoni with mozzarella', image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?q=80&w=200' }
      ]
    }
  },
  'cafe-bliss': {
    name: 'Cafe Bliss',
    categories: {
      'Beverages': [
        { id: 'c1', name: 'Latte', price: '6.99', description: 'Espresso with steamed milk', image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=200' },
        { id: 'c2', name: 'Mocha', price: '8.99', description: 'Espresso with chocolate and milk', image: 'https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?q=80&w=200' },
        { id: 'c3', name: 'Cappuccino', price: '7.99', description: 'Espresso topped with foamy milk', image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?q=80&w=200' }
      ],
      'Pastries': [
        { id: 'pa1', name: 'Croissant', price: '4.99', description: 'Buttery layered pastry', image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=200' },
        { id: 'pa2', name: 'Chocolate Muffin', price: '5.99', description: 'Rich chocolate muffin', image: 'https://images.unsplash.com/photo-1607958996333-41785c42e42e?q=80&w=200' }
      ]
    }
  }
};

const Menu = () => {
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [cart, setCart] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const restaurantId = params.get('restaurant');
    if (restaurantId && menuData[restaurantId]) {
      setSelectedRestaurant(menuData[restaurantId]);
    }
  }, [location]);

  const addToCart = (item) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== itemId));
  };

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(itemId);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      return total + (parseFloat(item.price) * item.quantity);
    }, 0).toFixed(2);
  };

  if (!selectedRestaurant) {
    return <div className="menu-container">Restaurant not found</div>;
  }

  return (
    <div className="menu-container">
      <h1>{selectedRestaurant.name} Menu</h1>
      
      <div className="menu-content">
        <div className="menu-sections">
          {Object.entries(selectedRestaurant.categories).map(([category, items]) => (
            <div key={category} className="menu-category">
              <h2>{category}</h2>
              <div className="menu-items">
                {items.map((item) => (
                  <div key={item.id} className="menu-item">
                    <img src={item.image} alt={item.name} className="item-image" />
                    <div className="item-content">
                      <div className="item-header">
                        <h3>{item.name}</h3>
                        <span className="price">${item.price}</span>
                      </div>
                      <p className="description">{item.description}</p>
                      <button 
                        className="add-to-cart-btn"
                        onClick={() => addToCart(item)}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="cart-section">
          <h2>Your Cart</h2>
          {cart.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            <>
              {cart.map((item) => (
                <div key={item.id} className="cart-item">
                  <div className="cart-item-details">
                    <h4>{item.name}</h4>
                    <div className="quantity-controls">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                    </div>
                    <span>${(item.quantity * parseFloat(item.price)).toFixed(2)}</span>
                  </div>
                  <button 
                    className="remove-btn"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </button>
                </div>
              ))}
              <div className="cart-total">
                <h3>Total: ${calculateTotal()}</h3>
                <button className="checkout-btn">Proceed to Checkout</button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Menu;
