const mongoose = require('mongoose');
const Menu = require('../models/Menu');

mongoose.connect('mongodb://localhost:27017/bearista-cafe', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const menuItems = [
  { name: "Americano", image: "/assets/americano.webp", price: 300 },
  { name: "Espresso", image: "/assets/espresso_shot.jpg", price: 250 },
  { name: "Macchiato", image: "/assets/macchiato.webp", price: 320 },
  { name: "French Vanilla Latte", image: "/assets/teddy2.jpg", price: 400 },
  { name: "Hazelnut Latte", image: "/assets/images.jfif", price: 420 },
  { name: "Iced Crème brûlée Latte", image: "/assets/creme_brulee_latte.webp", price: 450 },
  { name: "Teddy Graham Latte", image: "/assets/teddy1.jfif", price: 480 },
  { name: "Iced Rose Cardamom Latte", image: "/assets/rose_card.png", price: 470 },
  { name: "Iced S'mores Latte", image: "/assets/iced_smores.webp", price: 490 },
  { name: "Vanilla Bean Frappe", image: "/assets/vanilla_frappe.webp", price: 500 },
  { name: "Mocha Cookie Crumble Frappe", image: "/assets/mocha_frappe.jpg", price: 520 },
  { name: "Banana Bread Frappe", image: "/assets/banana_bread_frappe.png", price: 530 },
  { name: "Salted Caramel Frappe", image: "/assets/salted_caramel_frappe.webp", price: 540 },
  { name: "Peanut Butter Frappe", image: "/assets/peanut_butter_frappe.webp", price: 550 },
  { name: "Red Velvet Cheese Frappe", image: "/assets/red_velvet_frappe.png", price: 560 },
  { name: "Iced Matcha Latte", image: "/assets/matcha_latte.jpg", price: 600 },
  { name: "Strawberry Matcha Latte", image: "/assets/strawberry-matcha-latte.jpg", price: 610 },
  { name: "Iced Honey Lemon Matcha", image: "/assets/iced_honey_lemon_matcha.jpg", price: 620 },
  { name: "Blueberry Lemonade", image: "/assets/blueberry_lemonade.jpg", price: 630 },
  { name: "Pineapple Ginger Cooler", image: "/assets/pineapple_ginger_cooler.jpg", price: 640 },
  { name: "Watermelon Mint Cooler", image: "/assets/watermelon_and_mint_cooler_.jpg", price: 650 },
  { name: "Classic Latte", image: "/assets/classic_latte.webp", price: 500 },
  { name: "Classic Cappuccino", image: "/assets/classic_cap.jfif", price: 510 },
  { name: "Teddy Graham Latte (hot)", image: "/assets/teddy1.jfif", price: 480 },
  { name: "Honey Bee Latte", image: "/assets/honey_latte.png", price: 490 },
  { name: "Spice and Sugar Latte", image: "/assets/spice_and_sugar_latte.webp", price: 500 },
  { name: "Gingerbread Hot Cocoa", image: "/assets/gingerbread_hot_cocoa.jpg", price: 520 },
  { name: "Classic Croissant", image: "/assets/classic_croissant.jpg", price: 350 },
  { name: "Cinnamon Rolls", image: "/assets/cinnamon_rolls.jpg", price: 360 },
  { name: "Bakery Teddy Bites", image: "/assets/teddy_bites.jpeg", price: 370 }
];

async function updateMenuImages() {
  try {
    for (const item of menuItems) {
      await Menu.findOneAndUpdate(
        { name: item.name },
        { $set: { image: item.image } },
        { upsert: true } // This will create the item if it doesn't exist
      );
      console.log(`Updated/Created menu item: ${item.name}`);
    }
    console.log('All menu items updated successfully');
  } catch (error) {
    console.error('Error updating menu items:', error);
  } finally {
    mongoose.connection.close();
  }
}

updateMenuImages();