import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState("ALL");

  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:3002/allOrders");
      setOrders(res.data);
    } catch (err) {
      console.error("Failed to fetch orders:", err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const filteredOrders = orders.filter((o) => {
    if (activeTab === "EXECUTED") return o.status === "EXECUTED";
    if (activeTab === "PENDING") return o.status === "PENDING";
    return true;
  });

  return (
    <div className="orders-container p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="title mb-0">Order History ({orders.length})</h3>

        <div className="btn-group" role="group">
          <button
            type="button"
            className={`btn btn-sm ${activeTab === "ALL" ? "btn-primary" : "btn-outline-primary"}`}
            onClick={() => setActiveTab("ALL")}
          >
            All Orders ({orders.length})
          </button>
          <button
            type="button"
            className={`btn btn-sm ${activeTab === "EXECUTED" ? "btn-success" : "btn-outline-success"}`}
            onClick={() => setActiveTab("EXECUTED")}
          >
            Executed ({orders.filter(o => o.status === "EXECUTED").length})
          </button>
        </div>
      </div>

      {orders.length === 0 ? (
        <div className="orders">
          <div className="no-orders text-center py-5">
            <p className="text-muted fs-5">You haven't placed any orders today</p>
            <Link to="/" className="btn btn-blue px-4 py-2">
              Get started / Browse Watchlist
            </Link>
          </div>
        </div>
      ) : (
        <div className="order-table shadow-sm rounded bg-white">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th>Time</th>
                <th>Order ID</th>
                <th>Type</th>
                <th>Instrument</th>
                <th>Qty</th>
                <th>Avg. Price</th>
                <th>Total Value</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order, index) => {
                const totalVal = (Number(order.qty) * Number(order.price)).toFixed(2);
                const isBuy = (order.mode || "BUY").toUpperCase() === "BUY";
                const timeStr = order.createdAt ? new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }) : "Just now";

                return (
                  <tr key={index}>
                    <td className="text-muted" style={{ fontSize: "13px" }}>{timeStr}</td>
                    <td className="fw-bold text-secondary" style={{ fontSize: "13px" }}>{order.orderId || "#ORD-" + (100000 + index)}</td>
                    <td>
                      <span className={`badge ${isBuy ? "bg-primary" : "bg-danger"}`} style={{ minWidth: "50px" }}>
                        {isBuy ? "BUY" : "SELL"}
                      </span>
                    </td>
                    <td className="fw-bold">{order.name}</td>
                    <td>{order.qty}</td>
                    <td>₹{Number(order.price).toFixed(2)}</td>
                    <td>₹{totalVal}</td>
                    <td>
                      <span className="badge bg-success" style={{ minWidth: "75px" }}>
                        {order.status || "EXECUTED"}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Orders;
