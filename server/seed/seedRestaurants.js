const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Restaurant = require('../models/Restaurant');
const MenuItem = require('../models/MenuItem');

dotenv.config(); // Load MongoDB URI from .env

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("MongoDB connected!");
}).catch((err) => {
  console.error("MongoDB connection error:", err);
});

const sampleRestaurants = [
  {
    name: "Graffiti Market",
    cuisine: "Pizza Bar",
    city: "Kitchener",
    image: "https://thecord.ca/wp-content/uploads/2018/11/Graffiti-Market_Yitian-Cai_RGB.jpg",
    reviews: 1323,
    bookedTimes: 36,
    timeSlots: ["7:00 p.m.", "7:15 p.m.", "7:30 p.m."],
    isActive: true,
    description: "Rustic-industrial market for Detroit-style pizza, house-made pastas, rotisserie chicken & beers.",
    tags: ["Lively", "Child-friendly", "Good for groups"],
    ratingBreakdown: {
      food: 4.4,
      service: 4.4,
      ambience: 4.3,
      value: 4.1,
      noise: "Moderate"
    },
    hours: "Mon–Thu, Sun 11:30 am–9:00 pm, Fri, Sat 11:30 am–10:00 pm",
    priceRange: "CAN$31 to CAN$50",
    address: "137 Glasgow St, Suite 385, Kitchener, ON N2G 4X8",
    diningStyle: "Casual Elegant",
    dressCode: "Casual Dress",
    parking: "Private Lot",
    paymentOptions: "Mastercard, Visa",
    chef: "N/A",
    extraInfo: ["Bar/Lounge", "Beer", "BYO Wine", "Cocktails", "Gluten-free Options", "Indoor Dining"],
    menu: [
      { name: "Goudi Fries", description: "Fresh-cut fries, MountainOak gouda, fresh rosemary + thyme, served with spicy ketchup", price: 11, category: "Apps" },
      { name: "Detroit-Style Pizza Sticks", description: "Detroit-style pizza sticks, garlic butter, garlic parmesan dip", price: 14, category: "Apps" },
      { name: "Buffalo Chicken Poutine", description: "Buttermilk fried chicken, fresh-cut fries, cheese curds, buffalo ranch, crispy chicken skin, scallions", price: 19.5, category: "Apps" },
      { name: "Winter Greens", description: "Heritage greens, shaved brussels, chèvre, cranberries, roasted squash, microgreens", price: 15, category: "Salads + Bowls" },
      { name: "Hawaiian", description: "Smoked pork hock, smoked bacon, crispy pancetta, tomato sauce, grilled pineapple, arugula", price: 18, category: "Detroit Style Pizza" },
      { name: "The Spicy Dill-Inquent", description: "Smoked bacon, dill pickles, spicy dill pickle ranch, mozzarella, crispy onion", price: 18, category: "Detroit Style Pizza" },
      { name: "Fried Chicken Wings (1 LB)", description: "Lightly breaded. Choose one of our house-made flavours.", price: 20, category: "Wings" },
      { name: "Power Bowl", description: "Brown rice, baby kale, edamame, roasted carrots, sesame dressing", price: 22, category: "Salads + Bowls" }
    ]
  },
  {
    name: "Milestones Grill + Bar",
    city: "Guelph",
    cuisine: "Global/International",
    image: "https://www.visitniagaracanada.com/wp-content/uploads/2017/06/milestones.jpg", // Replace with working OpenTable image or upload your own
    description: "Casual dining chain with globally inspired dishes, great drinks, and a warm atmosphere.",
    reviews: 1025,
    timeSlots: ["6:00 p.m.", "6:30 p.m.", "7:00 p.m."],
    bookedTimes: 48,
    slug: "milestones-grill-bar",
    menu: [
      {
        name: "Surf & Turf Burger",
        price: 24,
        description: "Grilled beef burger with crispy shrimp, tangy slaw, and spicy aioli."
      },
      {
        name: "Chicken Parmesan",
        price: 21,
        description: "Crispy chicken breast topped with marinara and mozzarella, served with pasta."
      },
      {
        name: "Thai Red Curry Bowl",
        price: 19,
        description: "Coconut curry sauce with jasmine rice, seasonal vegetables, and tofu or chicken."
      }
    ]
  },
  {
    name: "Plaza Sushi Downtown",
    cuisine: "Japanese",
    city: "London",
    image: "https://resizer.otstatic.com/v2/photos/wide-huge/3/59257026.jpg", // Replace if needed
    reviews: 924,
    bookedTimes: 33,
    timeSlots: ["5:30 p.m.", "6:00 p.m.", "6:30 p.m."],
    isActive: true,
    slug: "plaza-sushi-downtown",
    description: "Plaza Sushi Downtown offers authentic Japanese cuisine, fresh sushi, and a cozy dining atmosphere in the heart of London.",
    tags: ["Fresh Sushi", "Quiet", "Good for Date Night"],
    ratingBreakdown: {
      food: 4.6,
      service: 4.5,
      ambience: 4.4,
      value: 4.3,
      noise: "Quiet"
    },
    hours: "Mon–Sun 11:30 am–10:00 pm",
    priceRange: "CAN$11 to CAN$30",
    address: "431 Richmond St, London, ON N6A 3C8",
    diningStyle: "Casual Dining",
    dressCode: "Casual",
    parking: "Street Parking",
    paymentOptions: "Visa, Mastercard, Discover",
    chef: "Chef Kenji Yamamoto",
    extraInfo: ["Sushi Bar", "Takeout Available", "Vegan Options", "Beer and Sake", "Indoor Dining"],
    menu: [
      {
        name: "Salmon Sashimi",
        description: "6 pieces of fresh Atlantic salmon, sliced to perfection.",
        price: 18,
        category: "Sashimi"
      },
      {
        name: "Spicy Tuna Roll",
        description: "Tuna, cucumber, spicy mayo, and tempura flakes.",
        price: 14,
        category: "Rolls"
      },
      {
        name: "Chicken Teriyaki",
        description: "Grilled chicken served with teriyaki sauce, rice, and salad.",
        price: 20,
        category: "Entrées"
      },
      {
        name: "Avocado Maki",
        description: "Fresh avocado roll with seaweed and sushi rice.",
        price: 8,
        category: "Vegetarian"
      },
      {
        name: "Miso Soup",
        description: "Traditional Japanese soup with tofu, seaweed, and green onion.",
        price: 4,
        category: "Soups"
      },
      {
        name: "Dynamite Roll",
        description: "Shrimp tempura, cucumber, avocado, and spicy mayo.",
        price: 16,
        category: "Rolls"
      }
    ]
  },
  
  {
    name: "TWH Social Bar & Bistro",
    cuisine: "Fusion/Canadian",
    city: "Kitchener",
    image: "https://resizer.otstatic.com/v3/photos/24716917-0?webp=true",
    reviews: 723,
    bookedTimes: 18,
    timeSlots: ["8:30 p.m.", "9:00 p.m."],
    isActive: true,
    slug: "twh-social-bar-bistro",
    description: "TWH Social is a cozy and contemporary bistro located in downtown Kitchener offering modern Canadian cuisine in an upscale setting.",
    tags: ["Modern", "Locally Sourced", "Cozy"],
    ratingBreakdown: {
      food: 4.5,
      service: 4.3,
      ambience: 4.4,
      value: 4.2,
      noise: "Moderate"
    },
    hours: "Mon–Sun 11:00 am–10:00 pm",
    priceRange: "CAN$21 to CAN$40",
    address: "1 King St W, Kitchener, ON N2G 1A3",
    diningStyle: "Upscale Casual",
    dressCode: "Smart Casual",
    parking: "Street and Lot Parking",
    paymentOptions: "Visa, Mastercard, AMEX",
    chef: "Chef Jordan Wilkinson",
    extraInfo: ["Bar/Lounge", "Farm-to-Table", "Craft Cocktails", "Outdoor Seating", "Indoor Dining"],
    menu: [
      {
        name: "Lamb Sliders",
        description: "Mini lamb burgers with tzatziki, arugula, and pickled onions.",
        price: 17,
        category: "Appetizers"
      },
      {
        name: "Seared Scallops",
        description: "Pan-seared scallops with cauliflower purée and crispy pancetta.",
        price: 24,
        category: "Appetizers"
      },
      {
        name: "Roasted Chicken Supreme",
        description: "Herb-marinated chicken with truffle mashed potatoes and seasonal vegetables.",
        price: 28,
        category: "Entrées"
      },
      {
        name: "Truffle Risotto",
        description: "Creamy arborio rice with wild mushrooms, parmesan, and black truffle oil.",
        price: 26,
        category: "Mains"
      },
      {
        name: "Maple Glazed Salmon",
        description: "Atlantic salmon fillet with maple glaze and charred asparagus.",
        price: 30,
        category: "Mains"
      },
      {
        name: "Dark Chocolate Tart",
        description: "Rich chocolate ganache with hazelnut crust and raspberry coulis.",
        price: 12,
        category: "Desserts"
      }
    ]
  },
  {
    name: "Isabelle Restaurant + Lounge",
    cuisine: "Mediterranean",
    city: "Burlington",
    image: "https://resizer.otstatic.com/v3/photos/50351785-0?webp=true", // Replace if needed
    reviews: 823,
    bookedTimes: 27,
    timeSlots: ["5:00 p.m.", "6:30 p.m.", "8:00 p.m."],
    isActive: true,
    slug: "isabelle-restaurant-lounge",
    description: "Isabelle Restaurant + Lounge offers a modern Mediterranean dining experience with stunning lakefront views, handcrafted cocktails, and a seasonal menu inspired by coastal cuisine.",
    tags: ["Lakefront Views", "Romantic", "Fresh Ingredients"],
    ratingBreakdown: {
      food: 4.7,
      service: 4.6,
      ambience: 4.8,
      value: 4.3,
      noise: "Moderate"
    },
    hours: "Mon–Sun 11:30 am–10:00 pm",
    priceRange: "CAN$31 to CAN$50",
    address: "2020 Lakeshore Rd, Burlington, ON L7R 4G8",
    diningStyle: "Fine Dining",
    dressCode: "Smart Casual",
    parking: "Underground and Street Parking",
    paymentOptions: "Visa, Mastercard, AMEX, Interac",
    chef: "Chef Ben Heaton",
    extraInfo: [
      "Waterfront Dining",
      "Cocktail Lounge",
      "Vegetarian Options",
      "Outdoor Patio",
      "Private Dining Room"
    ],
    menu: [
      {
        name: "Charred Octopus",
        description: "Served with romesco, confit potatoes, and chorizo vinaigrette.",
        price: 21,
        category: "Appetizers"
      },
      {
        name: "Grilled Halloumi Salad",
        description: "Mixed greens, cherry tomatoes, cucumber, mint, and lemon vinaigrette.",
        price: 17,
        category: "Appetizers"
      },
      {
        name: "Seafood Tagliatelle",
        description: "Fresh pasta with shrimp, mussels, calamari, and white wine saffron cream.",
        price: 34,
        category: "Mains"
      },
      {
        name: "Lamb Kofta",
        description: "Spiced lamb skewers with tzatziki, tabbouleh, and grilled flatbread.",
        price: 28,
        category: "Mains"
      },
      {
        name: "Pan-Roasted Branzino",
        description: "With fennel, citrus salad, and olive oil emulsion.",
        price: 36,
        category: "Mains"
      },
      {
        name: "Baklava Cheesecake",
        description: "Phyllo crust, spiced nuts, and honey syrup.",
        price: 12,
        category: "Desserts"
      }
    ]
  },
  {
    name: "Jacobs Grill",
    cuisine: "Canadian",
    city: "St. Jacobs",
    image: "https://resizer.otstatic.com/v3/photos/50724399-0?webp=true", // Replace if needed
    reviews: 1105,
    bookedTimes: 29,
    timeSlots: ["6:00 p.m.", "6:30 p.m.", "7:30 p.m."],
    isActive: true,
    slug: "jacobs-grill",
    description: "Jacob's Grill offers a rustic yet modern dining experience in the heart of St. Jacobs, serving handcrafted Canadian dishes made with locally sourced ingredients.",
    tags: ["Local Ingredients", "Casual", "Farm-to-Table"],
    ratingBreakdown: {
      food: 4.5,
      service: 4.4,
      ambience: 4.3,
      value: 4.2,
      noise: "Moderate"
    },
    hours: "Tue–Sun 11:00 am–9:00 pm",
    priceRange: "CAN$21 to CAN$40",
    address: "1396 King St N, St. Jacobs, ON N0B 2N0",
    diningStyle: "Casual Dining",
    dressCode: "Casual",
    parking: "Street and Lot Parking",
    paymentOptions: "Visa, Mastercard, Interac",
    chef: "Chef Evan Woods",
    extraInfo: [
      "Locally Sourced",
      "Vegan Options",
      "Family Friendly",
      "Outdoor Patio",
      "Casual Ambience"
    ],
    menu: [
      {
        name: "Beet & Goat Cheese Salad",
        description: "Roasted beets, arugula, goat cheese, candied pecans, citrus vinaigrette.",
        price: 15,
        category: "Starters"
      },
      {
        name: "Pork Belly Sliders",
        description: "Slow-roasted pork belly with maple glaze and house slaw.",
        price: 18,
        category: "Starters"
      },
      {
        name: "Braised Short Ribs",
        description: "Served with mashed potatoes, seasonal vegetables, and red wine reduction.",
        price: 32,
        category: "Mains"
      },
      {
        name: "Maple Glazed Salmon",
        description: "Atlantic salmon fillet with wild rice pilaf and roasted asparagus.",
        price: 29,
        category: "Mains"
      },
      {
        name: "Wild Mushroom Risotto",
        description: "Creamy risotto with forest mushrooms, truffle oil, and parmesan.",
        price: 27,
        category: "Vegetarian"
      },
      {
        name: "Sticky Toffee Pudding",
        description: "Warm date cake with toffee sauce and vanilla bean ice cream.",
        price: 10,
        category: "Desserts"
      }
    ]
  },
  {
    name: "The Spice Route",
    cuisine: "Indian",
    city: "Mississauga",
    image: "https://resizer.otstatic.com/v3/photos/48563605-0?webp=true", // Replace if needed
    reviews: 845,
    bookedTimes: 31,
    timeSlots: ["6:00 p.m.", "7:00 p.m.", "8:30 p.m."],
    isActive: true,
    slug: "spice-route",
    description: "Spice Route blends modern Indian cuisine with vibrant ambiance and a globally inspired twist. From classic curries to contemporary tandoor creations, it's a journey through bold flavours.",
    tags: ["Modern Indian", "Spicy", "Great Cocktails"],
    ratingBreakdown: {
      food: 4.6,
      service: 4.3,
      ambience: 4.7,
      value: 4.2,
      noise: "Energetic"
    },
    hours: "Tue–Sun 12:00 pm–10:00 pm",
    priceRange: "CAN$21 to CAN$50",
    address: "499 Main St, Mississauga, ON L5M 1X4",
    diningStyle: "Casual Elegant",
    dressCode: "Smart Casual",
    parking: "On-site and Street Parking",
    paymentOptions: "Visa, Mastercard, AMEX",
    chef: "Chef Anjali Kapoor",
    extraInfo: [
      "Tandoori Grill",
      "Cocktail Lounge",
      "Vegetarian Friendly",
      "Vegan Options",
      "Live DJ Nights",
      "Indoor and Outdoor Seating"
    ],
    menu: [
      {
        name: "Butter Chicken",
        description: "Creamy tomato-based chicken curry served with naan or rice.",
        price: 22,
        category: "Entrées"
      },
      {
        name: "Paneer Tikka Skewers",
        description: "Grilled marinated paneer with bell peppers and onions.",
        price: 18,
        category: "Appetizers"
      },
      {
        name: "Lamb Rogan Josh",
        description: "Tender lamb cooked in a rich Kashmiri gravy.",
        price: 26,
        category: "Entrées"
      },
      {
        name: "Masala Calamari",
        description: "Spiced, crispy calamari tossed with onions and peppers.",
        price: 17,
        category: "Appetizers"
      },
      {
        name: "Tandoori Mixed Grill",
        description: "Assorted tandoori chicken, lamb chops, shrimp, and kebabs.",
        price: 34,
        category: "Grill"
      },
      {
        name: "Gulab Jamun Cheesecake",
        description: "Fusion dessert blending gulab jamun and classic cheesecake.",
        price: 11,
        category: "Desserts"
      }
    ]
  },
];

const seedRestaurants = async () => {
  try {
    await Restaurant.deleteMany({});
    await MenuItem.deleteMany({});

    for (const res of sampleRestaurants) {
      const { menu, ...restaurantData } = res;

      const newRestaurant = new Restaurant(restaurantData);
      await newRestaurant.save();

      if (Array.isArray(menu)) {
        const menuWithRestaurantId = menu.map(item => ({
          name: item.name,
          description: item.description || '',
          price: item.price || 0,
          category: item.category || 'Uncategorized',
          restaurantId: newRestaurant._id
        }));
        await MenuItem.insertMany(menuWithRestaurantId);
        console.log(`🍴 Seeded ${menu.length} menu items for "${newRestaurant.name}"`);
      }
    }

    console.log("✅ All restaurants and menus seeded successfully!");
    process.exit();
  } catch (err) {
    console.error("❌ Error while seeding:", err);
    process.exit(1);
  }
};

seedRestaurants();
