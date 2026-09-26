import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import GeneralContext from "./GeneralContext";

import "./BuyActionWindow.css";

const BuyActionWindow = ({ uid, price }) => {
  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(price || 0.0);
  const generalContext = useContext(GeneralContext);

  useEffect(() => {
    if (price) {
      setStockPrice(price);
    }
  }, [price]);

  const handleBuyClick = async () => {
    try {
      await axios.post("http://localhost:3002/newOrder", {
        name: uid,
        qty: Number(stockQuantity),
        price: Number(stockPrice),
        mode: "BUY",
      });
      if (generalContext && generalContext.closeBuyWindow) {
        generalContext.closeBuyWindow();
      }
      window.location.reload();
    } catch (err) {
      console.error("Failed to buy stock:", err);
    }
  };

  const handleCancelClick = () => {
    if (generalContext && generalContext.closeBuyWindow) {
      generalContext.closeBuyWindow();
    }
  };

  return (
    <div className="container" id="buy-window" draggable="true">
      <div className="regular-order">
        <h4 style={{ marginBottom: "15px", color: "#444" }}>Buy {uid}</h4>
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
        <span>Margin required ₹{(Number(stockQuantity) * Number(stockPrice)).toFixed(2)}</span>
        <div>
          <button className="btn btn-blue" onClick={handleBuyClick} style={{ border: "none", cursor: "pointer" }}>
            Buy
          </button>
          <button className="btn btn-grey" onClick={handleCancelClick} style={{ border: "none", cursor: "pointer", marginLeft: "10px" }}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuyActionWindow;
