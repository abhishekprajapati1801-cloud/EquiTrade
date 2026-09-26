import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../config";

import "./BuyActionWindow.css"; // Share styled action window css

const SellActionWindow = ({ uid, price, onClose }) => {
  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(price || 0.0);

  useEffect(() => {
    if (price) {
      setStockPrice(price);
    }
  }, [price]);

  const handleSellClick = async () => {
    try {
      await axios.post(`${API_URL}/newOrder`, {
        name: uid,
        qty: Number(stockQuantity),
        price: Number(stockPrice),
        mode: "SELL",
      });
      if (onClose) onClose();
      window.location.reload();
    } catch (err) {
      console.error("Failed to sell stock:", err);
    }
  };

  return (
    <div className="container" id="buy-window" style={{ borderColor: "#ff5722" }} draggable="true">
      <div className="regular-order">
        <h4 style={{ marginBottom: "15px", color: "#df514c" }}>Sell {uid}</h4>
        <div className="inputs">
          <fieldset>
            <legend>Qty.</legend>
            <input
              type="number"
              name="qty"
              id="qty"
              min="1"
              onChange={(e) => setStockQuantity(e.target.value)}
              value={stockQuantity}
            />
          </fieldset>
          <fieldset>
            <legend>Price (₹)</legend>
            <input
              type="number"
              name="price"
              id="price"
              step="0.05"
              onChange={(e) => setStockPrice(e.target.value)}
              value={stockPrice}
            />
          </fieldset>
        </div>
      </div>

      <div className="buttons">
        <span>Total credit ₹{(Number(stockQuantity) * Number(stockPrice)).toFixed(2)}</span>
        <div>
          <button className="btn" onClick={handleSellClick} style={{ backgroundColor: "#df514c", color: "#fff", border: "none", cursor: "pointer" }}>
            Sell
          </button>
          <button className="btn btn-grey" onClick={onClose} style={{ border: "none", cursor: "pointer", marginLeft: "10px" }}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default SellActionWindow;
