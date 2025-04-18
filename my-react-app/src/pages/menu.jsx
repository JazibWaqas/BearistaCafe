import React, { useState } from "react";
import { useCart } from '../context/CartContext';  
import "../styles/commonStyles.css";  
import "../styles/menu.css";
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import DrinkModal from "./DrinkModal";

const Menu = () => {
  const { addToCart } = useCart(); 
  const [selectedDrink, setSelectedDrink] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const openModal = (event) => {
    const drinkBox = event.currentTarget.closest(".box");
    let imagePath = drinkBox.getAttribute("data-image");
  
    if (!imagePath.startsWith("/assets/")) {
      imagePath = `/assets/${imagePath}`;
    }
  
    const drink = {
      id: drinkBox.getAttribute("data-id"),
      name: drinkBox.getAttribute("data-name"),
      basePrice: parseInt(drinkBox.getAttribute("data-price"), 10),
      image: imagePath,
    };
  
    setSelectedDrink(drink);
  };

  const closeModal = () => {
    setSelectedDrink(null);
  };


  const handleSearch = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const matchesSearch = (itemName) => {
    if (!searchTerm) return true;
    return itemName.toLowerCase().includes(searchTerm);
  };

  return (
    <div className="menu-page">
      <Navigation />

      <div className="search-container">
        <input 
          type="text" 
          placeholder="Search..." 
          className="search-bar"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      <div className="content-container">
        <div className="vertical-menu">
          <a href="#Classics">Classics</a>
          <a href="#Lattes">Lattes</a>
          <a href="#Frappes">Frappes</a>
          <a href="#Matcha">Matcha</a>
          <a href="#Coolers">Coolers</a>
          <a href="#Hot">Hot</a>
          <a href="#Bakery_Items">Bakery Items</a>
        </div>

        <div className="gallery">
          <h2 id="Classics">Classics</h2>
          <div className="box" data-id="1" data-name="Americano" data-price="300" data-image="americano.webp"
               style={{ display: matchesSearch("Americano") ? "" : "none" }}>
            <img src="/assets/americano.webp" alt="Americano" />
            <p>Americano</p>
            <button className="add-to-cart" onClick={openModal}>Add to Cart</button>
          </div>

          <div className="box" data-id="2" data-name="Espresso" data-price="250" data-image="espresso_shot.jpg"
               style={{ display: matchesSearch("Espresso") ? "" : "none" }}>
            <img src="/assets/espresso_shot.jpg" alt="Espresso" />
            <p>Espresso</p>
            <button className="add-to-cart" onClick={openModal}>Add to Cart</button>
          </div>

          <div className="box" data-id="3" data-name="Macchiato" data-price="320" data-image="macchiato.webp"
               style={{ display: matchesSearch("Macchiato") ? "" : "none" }}>
            <img src="/assets/macchiato.webp" alt="Macchiato" />
            <p>Macchiato</p>
            <button className="add-to-cart" onClick={openModal}>Add to Cart</button>
          </div>

          <h2 id="Lattes">Lattes</h2>
          <div className="box" data-id="4" data-name="French Vanilla Latte" data-price="400" data-image="teddy2.jpg"
               style={{ display: matchesSearch("French Vanilla Latte") ? "" : "none" }}>
            <img src="/assets/teddy2.jpg" alt="French Vanilla Latte" />
            <p>French Vanilla Latte</p>
            <button className="add-to-cart" onClick={openModal}>Add to Cart</button>
          </div>

          <div className="box" data-id="5" data-name="Hazelnut Latte" data-price="420" data-image="images.jfif"
               style={{ display: matchesSearch("Hazelnut Latte") ? "" : "none" }}>
            <img src="/assets/images.jfif" alt="Hazelnut Latte" />
            <p>Hazelnut Latte</p>
            <button className="add-to-cart" onClick={openModal}>Add to Cart</button>
          </div>

          <div className="box" data-id="6" data-name="Iced Crème brûlée Latte" data-price="450" data-image="creme_brulee_latte.webp"
               style={{ display: matchesSearch("Iced Crème brûlée Latte") ? "" : "none" }}>
            <img src="/assets/creme_brulee_latte.webp" alt="Iced Crème brûlée Latte"/>
            <p>Iced Crème brûlée Latte</p>
            <button className="add-to-cart" onClick={openModal}>Add to Cart</button>
          </div>

          <div className="box" data-id="7" data-name="Teddy Graham Latte" data-price="480" data-image="teddy1.jfif"
            style={{ display: matchesSearch("Teddy Graham Latte") ? "" : "none" }}>
          <img src="/assets/teddy1.jfif" alt="Teddy Graham Latte"/>
          <p>Teddy Graham Latte</p>
          <button className="add-to-cart" onClick={openModal}>Add to Cart</button>
        </div>

          <div className="box" data-id="8" data-name="Iced Rose Cardamom Latte" data-price="470" data-image="rose_card.png"
               style={{ display: matchesSearch("Iced Rose Cardamom Latte") ? "" : "none" }}>
            <img src="/assets/rose_card.png" alt="Iced Rose Cardamom Latte"/>
            <p>Iced Rose Cardamom Latte</p>
            <button className="add-to-cart" onClick={openModal}>Add to Cart</button>
          </div>

          <div className="box" data-id="9" data-name="Iced S'mores Latte" data-price="490" data-image="iced_smores.webp"
               style={{ display: matchesSearch("Iced S'mores Latte") ? "" : "none" }}>
            <img src="/assets/iced_smores.webp" alt="Iced S'mores Latte"/>
            <p>Iced S'mores Latte</p>
            <button className="add-to-cart" onClick={openModal}>Add to Cart</button>
          </div>

          <h2 id="Frappes">Frappes</h2>
          <div className="box" data-id="10" data-name="Vanilla Bean Frappe" data-price="500" data-image="vanilla_frappe.webp"
               style={{ display: matchesSearch("Vanilla Bean Frappe") ? "" : "none" }}>
            <img src="/assets/vanilla_frappe.webp" alt="Vanilla Bean Frappe" />
            <p>Vanilla Bean Frappe</p>
            <button className="add-to-cart" onClick={openModal}>Add to Cart</button>
          </div>

          <div className="box" data-id="11" data-name="Mocha Cookie Crumble Frappe" data-price="520" data-image="mocha_frappe.jpg"
               style={{ display: matchesSearch("Mocha Cookie Crumble") ? "" : "none" }}>
            <img src="/assets/mocha_frappe.jpg" alt="Mocha Cookie Crumble" />
            <p>Mocha Cookie Crumble</p>
            <button className="add-to-cart" onClick={openModal}>Add to Cart</button>
          </div>

          <div className="box" data-id="12" data-name="Banana Bread Frappe" data-price="530" data-image="banana_bread_frappe.png"
               style={{ display: matchesSearch("Banana Bread Frappe") ? "" : "none" }}>
            <img src="/assets/banana_bread_frappe.png" alt="Banana Bread Frappe"/>
            <p>Banana Bread Frappe</p>
            <button className="add-to-cart" onClick={openModal}>Add to Cart</button>
          </div>

          <div className="box" data-id="13" data-name="Salted Caramel Frappe" data-price="540" data-image="salted_caramel_frappe.webp"
               style={{ display: matchesSearch("Salted Caramel Frappe") ? "" : "none" }}>
            <img src="/assets/salted_caramel_frappe.webp" alt="Salted Caramel Frappe"/>
            <p>Salted Caramel Frappe</p>
            <button className="add-to-cart" onClick={openModal}>Add to Cart</button>
          </div>

          <div className="box" data-id="14" data-name="Peanut Butter Frappe" data-price="550" data-image="peanut_butter_frappe.webp"
               style={{ display: matchesSearch("Peanut Butter Frappe") ? "" : "none" }}>
            <img src="/assets/peanut_butter_frappe.webp" alt="Peanut Butter Frappe"/>
            <p>Peanut Butter Frappe</p>
            <button className="add-to-cart" onClick={openModal}>Add to Cart</button>
          </div>

          <div className="box" data-id="15" data-name="Red Velvet Cheese Frappe" data-price="560" data-image="red_velvet_frappe.png"
               style={{ display: matchesSearch("Red Velvet Cheese Frappe") ? "" : "none" }}>
            <img src="/assets/red_velvet_frappe.png" alt="Red Velvet Cheese Frappe"/>
            <p>Red Velvet Cheese Frappe</p>
            <button className="add-to-cart" onClick={openModal}>Add to Cart</button>
          </div>

          <h2 id="Matcha">Matcha</h2>
          <div className="box" data-id="16" data-name="Iced Matcha Latte" data-price="600" data-image="matcha_latte.jpg"
               style={{ display: matchesSearch("Iced Matcha Latte") ? "" : "none" }}>
            <img src="/assets/matcha_latte.jpg" alt="Iced Matcha Latte" />
            <p>Iced Matcha Latte</p>
            <button className="add-to-cart" onClick={openModal}>Add to Cart</button>
          </div>

          <div className="box" data-id="17" data-name="Strawberry Matcha Latte" data-price="610" data-image="strawberry-matcha-latte.jpg"
               style={{ display: matchesSearch("Strawberry Matcha Latte") ? "" : "none" }}>
            <img src="/assets/strawberry-matcha-latte.jpg" alt="Strawberry Matcha Latte"/>
            <p>Strawberry Matcha Latte</p>
            <button className="add-to-cart" onClick={openModal}>Add to Cart</button>
          </div>

          <div className="box" data-id="18" data-name="Iced Honey Lemon Matcha" data-price="620" data-image="iced_honey_lemon_matcha.jpg"
               style={{ display: matchesSearch("Iced Honey Lemon Matcha") ? "" : "none" }}>
            <img src="/assets/iced_honey_lemon_matcha.jpg" alt="Iced Honey Lemon Matcha"/>
            <p>Iced Honey Lemon Matcha</p>
            <button className="add-to-cart" onClick={openModal}>Add to Cart</button>
          </div>

          <h2 id="Coolers">Coolers</h2>
          <div className="box" data-id="19" data-name="Blueberry Lemonade" data-price="630" data-image="blueberry_lemonade.jpg"
               style={{ display: matchesSearch("Blueberry Lemonade") ? "" : "none" }}>
            <img src="/assets/blueberry_lemonade.jpg" alt="Blueberry Lemonade" />
            <p>Blueberry Lemonade</p>
            <button className="add-to-cart" onClick={openModal}>Add to Cart</button>
          </div>

          <div className="box" data-id="20" data-name="Pineapple Ginger Cooler" data-price="640" data-image="pineapple_ginger_cooler.jpg"
               style={{ display: matchesSearch("Pineapple Ginger Cooler") ? "" : "none" }}>
            <img src="/assets/pineapple_ginger_cooler.jpg" alt="Pineapple Ginger Cooler"/>
            <p>Pineapple Ginger Cooler</p>
            <button className="add-to-cart" onClick={openModal}>Add to Cart</button>
          </div>

          <div className="box" data-id="21" data-name="Watermelon Mint Cooler" data-price="650" data-image="watermelon_and_mint_cooler_.jpg"
               style={{ display: matchesSearch("Watermelon Mint Cooler") ? "" : "none" }}>
            <img src="/assets/watermelon_and_mint_cooler_.jpg" alt="Watermelon Mint Cooler"/>
            <p>Watermelon Mint Cooler</p>
            <button className="add-to-cart" onClick={openModal}>Add to Cart</button>
          </div>

          <h2 id="Hot">Hot</h2>
          <div className="box" data-id="22" data-name="Classic Latte" data-price="500" data-image="classic_latte.webp"
               style={{ display: matchesSearch("Classic Latte") ? "" : "none" }}>
            <img src="/assets/classic_latte.webp" alt="Classic Latte" />
            <p>Classic Latte</p>
            <button className="add-to-cart" onClick={openModal}>Add to Cart</button>
          </div>

          <div className="box" data-id="23" data-name="Classic Cappuccino" data-price="510" data-image="classic_cap.jfif"
               style={{ display: matchesSearch("Classic Cappuccino") ? "" : "none" }}>
            <img src="/assets/classic_cap.jfif" alt="Classic Cappuccino"/>
            <p>Classic Cappuccino</p>
            <button className="add-to-cart" onClick={openModal}>Add to Cart</button>
          </div>

          <div className="box" data-id="24" data-name="Teddy Graham Latte (hot)" data-price="480" data-image="teddy1.jfif"
               style={{ display: matchesSearch("Teddy Graham Latte") ? "" : "none" }}>
            <img src="/assets/teddy1.jfif" alt="Teddy Graham Latte (hot)"/>
            <p>Teddy Graham Latte (hot)</p>
            <button className="add-to-cart" onClick={openModal}>Add to Cart</button>
          </div>

          <div className="box" data-id="25" data-name="Honey Bee Latte" data-price="490" data-image="honey_latte.png"
               style={{ display: matchesSearch("Honey Bee Latte") ? "" : "none" }}>
            <img src="/assets/honey_latte.png" alt="Honey Bee Latte"/>
            <p>Honey Bee Latte</p>
            <button className="add-to-cart" onClick={openModal}>Add to Cart</button>
          </div>

          <div className="box" data-id="26" data-name="Spice and Sugar Latte" data-price="500" data-image="spice_and_sugar_latte.webp"
               style={{ display: matchesSearch("Spice and Sugar Latte") ? "" : "none" }}>
            <img src="/assets/spice_and_sugar_latte.webp" alt="Spice and Sugar Latte"/>
            <p>Spice and Sugar Latte</p>
            <button className="add-to-cart" onClick={openModal}>Add to Cart</button>
          </div>

          <div className="box" data-id="27" data-name="Gingerbread Hot Cocoa" data-price="520" data-image="gingerbread_hot_cocoa.jpg"
               style={{ display: matchesSearch("Gingerbread Hot Cocoa") ? "" : "none" }}>
            <img src="/assets/gingerbread_hot_cocoa.jpg" alt="Gingerbread Hot Cocoa"/>
            <p>Gingerbread Hot Cocoa</p>
            <button className="add-to-cart" onClick={openModal}>Add to Cart</button>
          </div>

          <h2 id="Bakery_Items">Bakery Items</h2>
          <div className="box" data-id="28" data-name="Classic Croissant" data-price="350" data-image="classic_croissant.jpg"
               style={{ display: matchesSearch("Classic Croissant") ? "" : "none" }}>
            <img src="/assets/classic_croissant.jpg" alt="Classic Croissant" />
            <p>Classic Croissant</p>
            <button className="add-to-cart" onClick={openModal}>Add to Cart</button>
          </div>

          <div className="box" data-id="29" data-name="Cinnamon Rolls" data-price="360" data-image="cinnamon_rolls.jpg"
               style={{ display: matchesSearch("Cinnamon Rolls") ? "" : "none" }}>
            <img src="/assets/cinnamon_rolls.jpg" alt="Cinnamon Rolls" />
            <p>Cinnamon Rolls</p>
            <button className="add-to-cart" onClick={openModal}>Add to Cart</button>
          </div>

          <div className="box" data-id="30" data-name="Bakery Teddy Bites" data-price="370" data-image="teddy_bites.jpeg"
               style={{ display: matchesSearch("Teddy Bites") ? "" : "none" }}>
            <img src="/assets/teddy_bites.jpeg" alt="Teddy Bites"/>
            <p>Teddy Bites</p>
            <button className="add-to-cart" onClick={openModal}>Add to Cart</button>
          </div>
        </div>
      </div>

      {selectedDrink && (
        <DrinkModal 
          drink={selectedDrink} 
          onClose={closeModal} 
          onAddToCart={(item) => {
            addToCart(item);
            closeModal();
          }} 
        />
      )}

      <Footer />
    </div>
  );
};

export default Menu;