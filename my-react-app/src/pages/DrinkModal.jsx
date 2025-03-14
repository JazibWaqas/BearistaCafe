import React, { useState } from "react";

const DrinkModal = ({ drink, onClose, onAddToCart }) => {
  if (!drink) return null;

  const { name, image, basePrice } = drink;

  // Price calculation
  const smallPrice = basePrice - 100;
  const mediumPrice = basePrice;
  const largePrice = basePrice + 100;

  const [selectedSize, setSelectedSize] = useState("Medium");
  const [selectedMilk, setSelectedMilk] = useState("Full Fat");
  const [selectedSweetness, setSelectedSweetness] = useState("Unsweetened");
  const [specialInstructions, setSpecialInstructions] = useState("");

  // Update price dynamically
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
      price: getPrice(),
      image,
      size: selectedSize,
      milk: selectedMilk,
      sweetness: selectedSweetness,
      instructions: specialInstructions,
      quantity: 1,
    };
    onAddToCart(cartItem);
    onClose(); // Close modal after adding to cart
  };

  return (
    <div className="modal-container">
      <div className="modal-header">
        <h2>{name}</h2>
        <button className="close-btn" onClick={onClose}>
          ✖
        </button>
      </div>
      <div className="modal-body">
        <div className="modal-image-container">
          <img
            src={image || "fallback.jpg"}
            alt={name}
            className="modal-image"
          />
          <p id="modal-price" className="price-overlay">
            Price: Rs. {getPrice()}
          </p>
        </div>

        <div className="modal-content">
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

          <p><strong>Select Sweetness:</strong></p>
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

          <p><strong>Special Instructions:</strong></p>
          <textarea
            className="special-instructions"
            placeholder="Enter any special instructions..."
            value={specialInstructions}
            onChange={(e) => setSpecialInstructions(e.target.value)}
          />

          <button id="addToCart" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default DrinkModal;
