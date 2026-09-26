require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const { HoldingsModel } = require("./model/HoldingsModel");
const { PositionsModel } = require("./model/PositionsModel");
const { OrdersModel } = require("./model/OrdersModel");
const { TicketModel } = require("./model/TicketModel");
const authRoute = require("./routes/AuthRoute");

const PORT = process.env.PORT || 3002;
const uri = process.env.MONGO_URL || "mongodb://127.0.0.1:27017/zerodha_clone";

const app = express();

app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001", "http://127.0.0.1:3000", "http://127.0.0.1:3001"],
    credentials: true,
  })
);
app.use(bodyParser.json());

// Auth routes
app.use("/auth", authRoute);

// Seed database with initial demo data if empty
const seedDatabase = async () => {
  try {
    const holdingsCount = await HoldingsModel.countDocuments();
    if (holdingsCount === 0) {
      console.log("Seeding holdings data...");
      const tempHoldings = [
        { name: "BHARTIARTL", qty: 2, avg: 538.05, price: 541.15, net: "+0.58%", day: "+2.99%" },
        { name: "HDFCBANK", qty: 2, avg: 1383.4, price: 1522.35, net: "+10.04%", day: "+0.11%" },
        { name: "HINDUNILVR", qty: 1, avg: 2335.85, price: 2417.4, net: "+3.49%", day: "+0.21%" },
        { name: "INFY", qty: 1, avg: 1350.5, price: 1555.45, net: "+15.18%", day: "-1.60%", isLoss: true },
        { name: "ITC", qty: 5, avg: 202.0, price: 207.9, net: "+2.92%", day: "+0.80%" },
        { name: "KPITTECH", qty: 5, avg: 250.3, price: 266.45, net: "+6.45%", day: "+3.54%" },
        { name: "M&M", qty: 2, avg: 809.9, price: 779.8, net: "-3.72%", day: "-0.01%", isLoss: true },
        { name: "RELIANCE", qty: 1, avg: 2193.7, price: 2112.4, net: "-3.71%", day: "+1.44%" },
        { name: "SBIN", qty: 4, avg: 324.35, price: 430.2, net: "+32.63%", day: "-0.34%", isLoss: true },
        { name: "SGBMAY29", qty: 2, avg: 4727.0, price: 4719.0, net: "-0.17%", day: "+0.15%" },
        { name: "TATAPOWER", qty: 5, avg: 104.2, price: 124.15, net: "+19.15%", day: "-0.24%", isLoss: true },
        { name: "TCS", qty: 1, avg: 3041.7, price: 3194.8, net: "+5.03%", day: "-0.25%", isLoss: true },
        { name: "WIPRO", qty: 4, avg: 489.3, price: 577.75, net: "+18.08%", day: "+0.32%" },
      ];
      await HoldingsModel.insertMany(tempHoldings);
      console.log("Holdings seeded!");
    }

    const positionsCount = await PositionsModel.countDocuments();
    if (positionsCount === 0) {
      console.log("Seeding positions data...");
      const tempPositions = [
        { product: "CNC", name: "EVEREADY", qty: 2, avg: 316.27, price: 312.35, net: "+0.58%", day: "-1.24%", isLoss: true },
        { product: "CNC", name: "JUBLFOOD", qty: 1, avg: 3124.75, price: 3082.65, net: "+10.04%", day: "-1.35%", isLoss: true },
      ];
      await PositionsModel.insertMany(tempPositions);
      console.log("Positions seeded!");
    }

    const ticketsCount = await TicketModel.countDocuments();
    if (ticketsCount === 0) {
      console.log("Seeding sample support ticket...");
      await TicketModel.create({
        ticketId: "#TK-84920",
        username: "Abhishek",
        email: "abhishek@example.com",
        category: "Segment Activation",
        subject: "F&O Segment Activation Request",
        description: "I have uploaded my 6-month bank statement for F&O activation. Please review.",
        status: "IN_PROGRESS",
        response: "Your bank statement is verified by our compliance team. F&O segment activation will be enabled by 5:00 PM today.",
      });
      console.log("Support ticket seeded!");
    }
  } catch (err) {
    console.error("Database seeding error:", err);
  }
};

app.get("/addHoldings", async (req, res) => {
  await seedDatabase();
  res.send("Done!");
});

app.get("/allHoldings", async (req, res) => {
  try {
    let allHoldings = await HoldingsModel.find({});
    res.json(allHoldings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/allPositions", async (req, res) => {
  try {
    let allPositions = await PositionsModel.find({});
    res.json(allPositions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/allOrders", async (req, res) => {
  try {
    let allOrders = await OrdersModel.find({}).sort({ createdAt: -1 });
    res.json(allOrders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create BUY or SELL Order and update Holdings & Orders
app.post("/newOrder", async (req, res) => {
  try {
    const qty = Number(req.body.qty) || 1;
    const price = Number(req.body.price) || 0;
    const mode = (req.body.mode || "BUY").toUpperCase();
    const name = req.body.name;
    const orderId = "#ORD-" + Math.floor(100000 + Math.random() * 900000);

    let newOrder = new OrdersModel({
      orderId,
      name,
      qty,
      price,
      mode,
      status: "EXECUTED",
    });
    await newOrder.save();

    if (mode === "BUY") {
      let existingHolding = await HoldingsModel.findOne({ name });
      if (existingHolding) {
        const oldQty = Number(existingHolding.qty) || 0;
        const oldAvg = Number(existingHolding.avg) || 0;
        const totalQty = oldQty + qty;
        const totalCost = (oldAvg * oldQty) + (price * qty);
        const newAvg = totalQty > 0 ? totalCost / totalQty : price;

        existingHolding.qty = totalQty;
        existingHolding.avg = newAvg;
        existingHolding.price = price > 0 ? price : existingHolding.price;
        await existingHolding.save();
      } else {
        let newHolding = new HoldingsModel({
          name,
          qty,
          avg: price,
          price: price,
          net: "+0.00%",
          day: "+0.00%",
        });
        await newHolding.save();
      }
    } else if (mode === "SELL") {
      let existingHolding = await HoldingsModel.findOne({ name });
      if (existingHolding) {
        const currentQty = Number(existingHolding.qty) || 0;
        if (currentQty <= qty) {
          await HoldingsModel.deleteOne({ name });
        } else {
          existingHolding.qty = currentQty - qty;
          existingHolding.price = price > 0 ? price : existingHolding.price;
          await existingHolding.save();
        }
      }
    }

    res.status(201).json({
      message: `Order ${orderId} executed successfully!`,
      success: true,
      order: newOrder,
    });
  } catch (err) {
    console.error("Error executing order:", err);
    res.status(500).json({ message: "Failed to execute order", error: err.message });
  }
});

// Support Ticket APIs
app.get("/support/tickets", async (req, res) => {
  try {
    const tickets = await TicketModel.find({}).sort({ createdAt: -1 });
    res.json(tickets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/support/newTicket", async (req, res) => {
  try {
    const { category, subject, description, username, email } = req.body;
    if (!category || !subject || !description) {
      return res.status(400).json({ message: "Category, subject, and description are required", success: false });
    }

    const ticketId = "#TK-" + Math.floor(10000 + Math.random() * 90000);
    const newTicket = await TicketModel.create({
      ticketId,
      username: username || "Guest User",
      email: email || "user@zerodha.com",
      category,
      subject,
      description,
      status: "OPEN",
    });

    res.status(201).json({
      message: "Support ticket created successfully!",
      success: true,
      ticket: newTicket,
    });
  } catch (err) {
    console.error("Error creating support ticket:", err);
    res.status(500).json({ message: "Failed to create support ticket", error: err.message });
  }
});

const startServer = async () => {
  try {
    console.log("Connecting to MongoDB at:", uri);
    await mongoose.connect(uri);
    console.log("DB connected successfully!");
    await seedDatabase();
  } catch (error) {
    console.error("Local MongoDB connection error, launching in-memory Mongo server...", error.message);
    try {
      const { MongoMemoryServer } = require("mongodb-memory-server");
      const mongoServer = await MongoMemoryServer.create();
      const mongoUri = mongoServer.getUri();
      console.log("In-memory MongoDB started at:", mongoUri);
      await mongoose.connect(mongoUri);
      console.log("DB connected to in-memory instance successfully!");
      await seedDatabase();
    } catch (memErr) {
      console.error("Failed to start in-memory MongoDB:", memErr.message);
    }
  }

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
};

startServer();
