const { model } = require("mongoose");
const { TicketSchema } = require("../schemas/TicketSchema");

const TicketModel = model("ticket", TicketSchema);

module.exports = { TicketModel };
