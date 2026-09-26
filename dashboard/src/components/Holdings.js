import React, { useState, useEffect } from "react";
import axios from "axios";
import { VerticalGraph } from "./VerticalGraph";
import { API_URL } from "../config";

const Holdings = () => {
  const [allHoldings, setAllHoldings] = useState([]);

  useEffect(() => {
    axios.get(`${API_URL}/allHoldings`).then((res) => {
      setAllHoldings(res.data);
    });
  }, []);

  const labels = allHoldings.map((subArray) => subArray["name"]);

  const data = {
    labels,
    datasets: [
      {
        label: "Stock Price",
        data: allHoldings.map((stock) => Number(stock.price) || 0),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  // Calculate totals dynamically
  const totalInvestment = allHoldings.reduce((acc, stock) => acc + (Number(stock.avg || 0) * Number(stock.qty || 0)), 0);
  const currentValue = allHoldings.reduce((acc, stock) => acc + (Number(stock.price || 0) * Number(stock.qty || 0)), 0);
  const totalPnL = currentValue - totalInvestment;
  const pnlPercent = totalInvestment > 0 ? ((totalPnL / totalInvestment) * 100).toFixed(2) : "0.00";

  return (
    <>
      <h3 className="title">Holdings ({allHoldings.length})</h3>

      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Avg. cost</th>
              <th>LTP</th>
              <th>Cur. val</th>
              <th>P&L</th>
              <th>Net chg.</th>
              <th>Day chg.</th>
            </tr>
          </thead>
          <tbody>
            {allHoldings.map((stock, index) => {
              const qty = Number(stock.qty) || 0;
              const avg = Number(stock.avg) || 0;
              const price = Number(stock.price) || 0;
              const curValue = price * qty;
              const pnl = curValue - (avg * qty);
              const isProfit = pnl >= 0;
              const profClass = isProfit ? "profit" : "loss";
              const dayClass = stock.isLoss ? "loss" : "profit";

              return (
                <tr key={index}>
                  <td>{stock.name}</td>
                  <td>{qty}</td>
                  <td>{avg.toFixed(2)}</td>
                  <td>{price.toFixed(2)}</td>
                  <td>{curValue.toFixed(2)}</td>
                  <td className={profClass}>{pnl.toFixed(2)}</td>
                  <td className={profClass}>{stock.net || "+0.00%"}</td>
                  <td className={dayClass}>{stock.day || "+0.00%"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="row mt-4">
        <div className="col">
          <h5>
            {totalInvestment.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </h5>
          <p>Total investment</p>
        </div>
        <div className="col">
          <h5>
            {currentValue.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </h5>
          <p>Current value</p>
        </div>
        <div className="col">
          <h5 className={totalPnL >= 0 ? "text-success" : "text-danger"}>
            {totalPnL.toFixed(2)} ({totalPnL >= 0 ? "+" : ""}{pnlPercent}%)
          </h5>
          <p>P&L</p>
        </div>
      </div>
      <VerticalGraph data={data} />
    </>
  );
};

export default Holdings;
