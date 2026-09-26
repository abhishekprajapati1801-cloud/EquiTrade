const { Schema } = require("mongoose");

const OrdersSchema = new Schema({
  orderId: { type: String },
  name: { type: String, required: true },
  qty: { type: Number, required: true },
  price: { type: Number, required: true },
  mode: { type: String, enum: ["BUY", "SELL"], default: "BUY" },
  status: { type: String, enum: ["EXECUTED", "PENDING", "CANCELLED"], default: "EXECUTED" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = { OrdersSchema };
