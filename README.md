# 📈 EquiTrade – Full-Stack Zerodha Stock Trading Platform

[![MERN Stack](https://img.shields.io/badge/Stack-MERN-blue.svg)](https://reactjs.org/)
[![Live Frontend](https://img.shields.io/badge/Landing_Page-Vercel-success.svg)](https://equi-trade-coral.vercel.app)
[![Live Dashboard](https://img.shields.io/badge/Kite_Dashboard-Vercel-orange.svg)](https://equitrade-dashboard.vercel.app)
[![Backend API](https://img.shields.io/badge/Backend_API-Render-brightgreen.svg)](https://equitrade-iz18.onrender.com)

**EquiTrade** is a high-performance, full-stack stock trading and investment platform inspired by **Zerodha Kite**. Built using the MERN stack (MongoDB, Express.js, React.js, Node.js), EquiTrade enables users to trade stocks in real-time, track portfolio holdings and orders, manage funds, and submit support tickets through an intelligent query-resolution engine.

---

## 🚀 Live Demo Links

| Component | Live URL | Tech Stack |
| :--- | :--- | :--- |
| **Landing Page** | 🌐 [https://equi-trade-coral.vercel.app](https://equi-trade-coral.vercel.app) | React.js, Bootstrap 5 |
| **Kite Trading Dashboard** | 📈 [https://equitrade-dashboard.vercel.app](https://equitrade-dashboard.vercel.app) | React.js, Chart.js, Context API |
| **Backend REST API** | ⚡ [https://equitrade-iz18.onrender.com](https://equitrade-iz18.onrender.com) | Node.js, Express, MongoDB Atlas |

---

## ✨ Core Features

### 💼 1. Kite Trading Terminal
- **Watchlist & Stock Tracking**: Search and track real-time stocks (RELIANCE, HDFCBANK, INFY, TCS, Wipro, etc.).
- **Order Execution**: Place Instant **BUY** and **SELL** orders at market or specified limit prices.
- **Holdings & Positions**: Real-time recalculation of average prices, quantity, net profit/loss %, and daily performance.
- **Order Book**: Filter executed vs pending orders with interactive status tracking.
- **Funds Management**: Simulated instant deposit via UPI/Netbanking and zero-charge cash withdrawal system.

### 🔐 2. Authentication & User Profile
- **JWT & Bcrypt**: Secure signup and login flow with token-based session persistence.
- **Custom Profile Page**: Integrated developer profile featuring **Abhishek Prajapati** (Founder & Software Engineer) with profile photo and direct [LinkedIn Profile](https://www.linkedin.com/in/abhishek-prajapati-5333a3349/).

### 🛠️ 3. Support Ticket Tracking System
- **Knowledge-Base Search**: Interactive keyword search to resolve common trading queries (F&O activation, KYC, fund transfers).
- **Ticket Tracking System**: Submit custom support queries and receive structured solution responses with live tracking.

---

## 🛠️ Tech Stack

- **Frontend**: React.js (v18), React Router v6, Bootstrap 5, FontAwesome, Chart.js, Axios
- **Backend**: Node.js, Express.js, Mongoose, JWT, Bcrypt.js, CORS
- **Database**: MongoDB Atlas Cloud Cluster
- **Hosting & Infrastructure**: Render.com (Backend REST API), Vercel (Frontend & Trading Dashboard)

---

## 💻 Local Setup & Installation

### 1. Clone Repository
```bash
git clone https://github.com/abhishekprajapati1801-cloud/EquiTrade.git
cd EquiTrade
```

### 2. Setup & Run Backend
```bash
cd Backend
npm install
npm start
```
*Backend runs on `http://localhost:3002`*

### 3. Setup & Run Landing Page
```bash
cd ../frontend
npm install
npm start
```
*Frontend runs on `http://localhost:3000`*

### 4. Setup & Run Kite Dashboard
```bash
cd ../dashboard
npm install
npm start
```
*Dashboard runs on `http://localhost:3001`*

---

## 👤 Author

**Abhishek Prajapati**
- **Role**: Founder & Full-Stack Developer
- **LinkedIn**: [https://www.linkedin.com/in/abhishek-prajapati-5333a3349/](https://www.linkedin.com/in/abhishek-prajapati-5333a3349/)
- **GitHub**: [@abhishekprajapati1801-cloud](https://github.com/abhishekprajapati1801-cloud)
