const mongoose = require("mongoose");

const TicketSchema = new mongoose.Schema({
  ticketId: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    default: "Guest User",
  },
  email: {
    type: String,
    default: "user@zerodha.com",
  },
  category: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["OPEN", "IN_PROGRESS", "RESOLVED"],
    default: "OPEN",
  },
  response: {
    type: String,
    default: "Your ticket has been received and assigned to a Zerodha support specialist. Expected resolution within 24 hours.",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = { TicketSchema };
