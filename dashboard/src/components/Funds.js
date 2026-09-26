import React, { useState, useEffect } from "react";
import { FRONTEND_URL } from "../config";

const Funds = () => {
  const [availableMargin, setAvailableMargin] = useState(() => {
    return Number(localStorage.getItem("availableMargin")) || 100000.0;
  });
  const [usedMargin, setUsedMargin] = useState(3757.3);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [amountInput, setAmountInput] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("UPI");
  const [message, setMessage] = useState("");

  useEffect(() => {
    localStorage.setItem("availableMargin", availableMargin);
  }, [availableMargin]);

  const handleAddFunds = (e) => {
    e.preventDefault();
    const val = Number(amountInput);
    if (val > 0) {
      setAvailableMargin((prev) => prev + val);
      setMessage(`Successfully added ₹${val.toFixed(2)} via ${paymentMethod}!`);
      setAmountInput("");
      setTimeout(() => {
        setShowAddModal(false);
        setMessage("");
      }, 1200);
    }
  };

  const handleWithdrawFunds = (e) => {
    e.preventDefault();
    const val = Number(amountInput);
    if (val > 0 && val <= availableMargin) {
      setAvailableMargin((prev) => prev - val);
      setMessage(`Withdrawal request of ₹${val.toFixed(2)} submitted! Cash will be credited within 24 hours.`);
      setAmountInput("");
      setTimeout(() => {
        setShowWithdrawModal(false);
        setMessage("");
      }, 1200);
    }
  };

  return (
    <>
      <div className="funds">
        <p>Instant, zero-cost fund transfers with UPI & Netbanking</p>
        <div>
          <button className="btn btn-green me-2" onClick={() => setShowAddModal(true)}>
            + Add funds
          </button>
          <button className="btn btn-blue" onClick={() => setShowWithdrawModal(true)}>
            Withdraw
          </button>
        </div>
      </div>

      <div className="row">
        <div className="col">
          <span>
            <p className="fw-bold fs-5 text-dark">Equity & Derivatives Margin</p>
          </span>

          <div className="table">
            <div className="data">
              <p>Available margin</p>
              <p className="imp colored">₹{availableMargin.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</p>
            </div>
            <div className="data">
              <p>Used margin</p>
              <p className="imp">₹{usedMargin.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</p>
            </div>
            <div className="data">
              <p>Available cash balance</p>
              <p className="imp">₹{availableMargin.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</p>
            </div>
            <hr />
            <div className="data">
              <p>Opening Balance</p>
              <p>₹{(availableMargin - 4064).toFixed(2)}</p>
            </div>
            <div className="data">
              <p>Payin (Today)</p>
              <p>₹4,064.00</p>
            </div>
            <div className="data">
              <p>Delivery margin</p>
              <p>₹0.00</p>
            </div>
            <div className="data">
              <p>Options premium</p>
              <p>₹0.00</p>
            </div>
            <hr />
            <div className="data">
              <p>Collateral (Equity)</p>
              <p>₹15,000.00</p>
            </div>
            <div className="data">
              <p>Total Collateral</p>
              <p>₹15,000.00</p>
            </div>
          </div>
        </div>

        <div className="col">
          <div className="commodity p-4 border rounded bg-light text-center">
            <h5 className="fw-bold mb-2">Commodity Account</h5>
            <p className="text-muted">You don't have an active commodity segment.</p>
            <a href={`${FRONTEND_URL}/support`} className="btn btn-blue px-4 py-2">
              Activate Segment
            </a>
          </div>
        </div>
      </div>

      {/* Add Funds Modal */}
      {showAddModal && (
        <div className="modal show d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header bg-success text-white">
                <h5 className="modal-title fw-bold">💳 Add Funds (Zero Charges)</h5>
                <button type="button" className="btn-close btn-close-white" onClick={() => setShowAddModal(false)}></button>
              </div>
              <form onSubmit={handleAddFunds}>
                <div className="modal-body text-dark">
                  {message && <div className="alert alert-success">{message}</div>}
                  <div className="mb-3">
                    <label className="form-label fw-bold">Amount (₹)</label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Enter amount to add (e.g. 5000)"
                      min="100"
                      value={amountInput}
                      onChange={(e) => setAmountInput(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-bold">Payment Method</label>
                    <select
                      className="form-select"
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    >
                      <option value="UPI (GPay / PhonePe / Paytm)">Instant UPI (Zero Fee)</option>
                      <option value="Netbanking (HDFC / ICICI / SBI)">Netbanking (HDFC / SBI / ICICI)</option>
                    </select>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowAddModal(false)}>Cancel</button>
                  <button type="submit" className="btn btn-success fw-bold">Deposit Funds</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Withdraw Funds Modal */}
      {showWithdrawModal && (
        <div className="modal show d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header bg-primary text-white">
                <h5 className="modal-title fw-bold">🏦 Withdraw Funds to Bank</h5>
                <button type="button" className="btn-close btn-close-white" onClick={() => setShowWithdrawModal(false)}></button>
              </div>
              <form onSubmit={handleWithdrawFunds}>
                <div className="modal-body text-dark">
                  {message && <div className="alert alert-info">{message}</div>}
                  <p className="text-muted small">Max withdrawable cash: ₹{availableMargin.toFixed(2)}</p>
                  <div className="mb-3">
                    <label className="form-label fw-bold">Withdrawal Amount (₹)</label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Enter amount to withdraw"
                      min="100"
                      max={availableMargin}
                      value={amountInput}
                      onChange={(e) => setAmountInput(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowWithdrawModal(false)}>Cancel</button>
                  <button type="submit" className="btn btn-primary fw-bold">Submit Withdrawal</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Funds;
