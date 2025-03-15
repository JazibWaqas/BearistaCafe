import React, { useState } from "react";
import "../styles/DrinkModal.css";


const DrinkModal = ({ drink, onClose, onAddToCart }) => {
  if (!drink) return null;

  const { name, image, basePrice } = drink;

  // Define drinks that require a milk option
  const milkDrinks = ["latte", "frappe", "cappuccino", "hot cocoa"];
  const classicDrinks = ["americano", "espresso", "macchiato"];
  const bakeryDrinks = ["croissant", "cinnamon roll", "teddy bites"];
  const hasMilkOption = milkDrinks.some(type => name.toLowerCase().includes(type));
  const hasSweetnessOption = classicDrinks.some(type => name.toLowerCase().includes(type))
  const isBakeryItem = bakeryDrinks.some(type => name.toLowerCase().includes(type));

  // Define pricing for different sizes
  const smallPrice = basePrice - 100;
  const mediumPrice = basePrice;
  const largePrice = basePrice + 100;

  const [selectedSize, setSelectedSize] = useState("Medium");
  const [selectedMilk, setSelectedMilk] = useState("Full Fat");
  const [selectedSweetness, setSelectedSweetness] = useState("Unsweetened");
  const [specialInstructions, setSpecialInstructions] = useState("");

  const getPrice = () => {
    switch (selectedSize) {
      case "Small":
        return smallPrice;
      case "Large":
        return largePrice;
      default:
        return mediumPrice;
    }
  };

  const handleAddToCart = () => {
    const cartItem = {
      id: drink.id,
      name,
      price: isBakeryItem ? basePrice : getPrice(),
      image,
      size: isBakeryItem ? "N/A" : selectedSize,
      milk: hasMilkOption ? selectedMilk : "None",
      sweetness: hasSweetnessOption ? selectedSweetness : "None",
      instructions: specialInstructions,
      quantity: 1,
    };
    onAddToCart(cartItem);
    onClose();
  };

  return (
    <div className="modal-container">
      <div className="modal-header">
        <h2>{name}</h2>
        <button className="close-btn" onClick={onClose}>✖</button>
      </div>
      <div className="modal-body">
        <div className="modal-image-container">
          <img src={image || "/assets/fallback.jpg"} alt={name} className="modal-image" />
          <p className="price-overlay">Price: Rs. {getPrice()}</p>
        </div>

        <div className="modal-content">
          {/* Only show Size, Milk, and Sweetness for non-bakery items */}
          {!isBakeryItem && (
            <>
              <p><strong>Select Size:</strong></p>
              <div className="size-options">
                {["Small", "Medium", "Large"].map((size) => (
                  <label key={size}>
                    <input
                      type="radio"
                      name="size"
                      value={size}
                      checked={selectedSize === size}
                      onChange={() => setSelectedSize(size)}
                    />
                    {size} (Rs. {size === "Small" ? smallPrice : size === "Large" ? largePrice : mediumPrice})
                  </label>
                ))}
              </div>
            </>
          )}

          {/* Show Milk Option Only for Certain Drinks */}
          {hasMilkOption && (
            <>
              <p><strong>Select Milk Type:</strong></p>
              <div className="milk-options">
                {["Full Fat", "Skimmed", "Lactose-Free"].map((milk) => (
                  <label key={milk}>
                    <input
                      type="radio"
                      name="milk"
                      value={milk}
                      checked={selectedMilk === milk}
                      onChange={() => setSelectedMilk(milk)}
                    />
                    {milk}
                  </label>
                ))}
              </div>
            </>
          )}

     {/* Show Sweetness Option Only for Classics */}
     {hasSweetnessOption && (
            <>
              <p><strong>Sweetness:</strong></p>
              <div className="sweetness-options">
                {["Unsweetened", "Sweetened"].map((option) => (
                  <label key={option}>
                    <input
                      type="radio"
                      name="sweetness"
                      value={option}
                      checked={selectedSweetness === option}
                      onChange={() => setSelectedSweetness(option)}
                    />
                    {option}
                  </label>
                ))}
              </div>
            </>
          )}


          <p><strong>Special Instructions:</strong></p>
          <textarea
            className="special-instructions"
            placeholder="Enter any special instructions..."
            value={specialInstructions}
            onChange={(e) => setSpecialInstructions(e.target.value)}
          />

          <button onClick={handleAddToCart}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default DrinkModal;
