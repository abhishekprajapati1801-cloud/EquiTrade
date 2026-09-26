import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../config";

// Knowledge Base Database
const KNOWLEDGE_BASE = [
  {
    id: 1,
    category: "Segment Activation",
    keywords: ["f&o", "futures", "options", "segment", "activate", "derivatives", "mcx", "commodity"],
    title: "How to activate F&O (Futures & Options) and Commodity segments?",
    solution: "To activate Futures & Options or Commodity segments: 1. Log in to Console. 2. Go to Account > Segments. 3. Select F&O or Commodity and upload your latest 6-month bank statement (or Salary slip / Form 16 / ITR). 4. Verification and activation take 24 to 48 working hours.",
  },
  {
    id: 2,
    category: "Account Opening & KYC",
    keywords: ["account", "open", "kyc", "documents", "aadhaar", "pan", "nri", "huf", "demat"],
    title: "How to open a Zerodha Demat & Trading account online?",
    solution: "Account opening is 100% digital. Click 'Signup' on the top menu, enter your mobile number, verify via OTP, enter PAN & Aadhaar details (linked with DigiLocker), and sign online using Aadhaar eSign. Your account will be active within 24 hours.",
  },
  {
    id: 3,
    category: "Funds & Payment",
    keywords: ["fund", "add", "deposit", "withdraw", "withdrawal", "upi", "netbanking", "bank", "emandate"],
    title: "How to add funds or request a fund withdrawal?",
    solution: "To Add Funds: Open Kite > Funds > Add Funds (Zero charges via UPI or Netbanking). To Withdraw Funds: Go to Funds > Withdraw > Enter amount. Withdrawals placed before 8:30 PM are credited to your bank account by 1:00 PM the next working day.",
  },
  {
    id: 4,
    category: "Login & Passwords",
    keywords: ["login", "password", "pin", "forgot", "credentials", "otp", "2fa", "authenticator", "blocked"],
    title: "Forgot Login Password or 2FA PIN?",
    solution: "Click 'Forgot password/user ID?' on the Login screen. Enter your User ID and registered PAN / email. You will receive an OTP on your mobile & email to reset your password and TOTP authenticator PIN securely.",
  },
  {
    id: 5,
    category: "Charges & Pricing",
    keywords: ["charge", "charges", "pricing", "brokerage", "free", "stt", "gst", "dp", "cost"],
    title: "What are the brokerage charges at Zerodha?",
    solution: "Equity Delivery investments are ₹0 (100% Free). Intraday and F&O trades cost flat ₹20 or 0.03% per executed order (whichever is lower). Direct Mutual Funds on Coin are 100% free with zero commission.",
  },
  {
    id: 6,
    category: "Nominee Addition",
    keywords: ["nominee", "add nominee", "nomination", "family", "legal heir"],
    title: "How to add or update a Nominee in your Zerodha account?",
    solution: "Go to Console > Account > Nominee. Click 'Add Nominee', enter their details (Name, Relationship, DOB, ID proof, and percentage share), and sign with Aadhaar eSign. Approval takes 24 hours.",
  },
  {
    id: 7,
    category: "Trading & Orders",
    keywords: ["order", "gtt", "buy", "sell", "limit", "market", "stoploss", "mis", "cnc", "co", "amo"],
    title: "What are MIS, CNC, Market, Limit, and GTT orders?",
    solution: "CNC is for long-term Equity Delivery. MIS is for Intraday trading (autosquared at 3:20 PM). Market order buys at current price; Limit order buys at specified target price. GTT (Good Till Triggered) orders stay active for 1 year.",
  },
  {
    id: 8,
    category: "Reports & Tax P&L",
    keywords: ["report", "tax", "statement", "pnl", "profit", "loss", "ledger", "taxation", "form 26as"],
    title: "How to download Tax P&L statements and Ledger reports?",
    solution: "Log in to Console > Reports > Tax P&L. Select the financial year and download the comprehensive Excel or PDF report for filing Income Tax Returns (ITR).",
  }
];

function Hero() {
  const [searchQuery, setSearchQuery] = useState("");
  const [tickets, setTickets] = useState([]);
  const [showTrackerModal, setShowTrackerModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [ticketForm, setTicketForm] = useState({
    category: "Account Opening",
    subject: "",
    description: "",
    email: localStorage.getItem("username") ? `${localStorage.getItem("username")}@gmail.com` : "user@example.com",
  });
  const [formSuccess, setFormSuccess] = useState("");

  const fetchTickets = async () => {
    try {
      const res = await axios.get(`${API_URL}/support/tickets`);
      setTickets(res.data);
    } catch (err) {
      console.error("Failed to fetch tickets:", err);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const handleCreateTicket = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_URL}/support/newTicket`, {
        ...ticketForm,
        username: localStorage.getItem("username") || "Abhishek",
      });
      if (res.data.success) {
        setFormSuccess(`Ticket ${res.data.ticket.ticketId} submitted successfully!`);
        fetchTickets();
        setTimeout(() => {
          setShowCreateModal(false);
          setShowTrackerModal(true);
          setFormSuccess("");
        }, 1200);
      }
    } catch (err) {
      console.error("Failed to submit ticket:", err);
    }
  };

  const matchingSolutions = searchQuery.trim()
    ? KNOWLEDGE_BASE.filter((item) =>
        item.keywords.some((kw) => searchQuery.toLowerCase().includes(kw)) ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.solution.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <section className="container-fluid py-5" id="supportHero">
      <div className="container" id="supportWrapper">
        {/* Top Header Row with flex-wrap for 100% Mobile & Desktop Responsiveness */}
        <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 pb-2 border-bottom border-light">
          <div className="d-flex align-items-center mb-2 mb-md-0">
            <h3 className="fw-bold text-white mb-0 me-3">Support Portal</h3>
            <span className="badge bg-light text-primary px-3 py-2 fw-bold">Live Helpdesk</span>
          </div>

          <div className="d-flex gap-2">
            <button
              onClick={() => setShowTrackerModal(true)}
              className="btn btn-outline-light px-3 py-2 fw-semibold"
            >
              📋 Track Tickets ({tickets.length})
            </button>
            <button
              onClick={() => setShowCreateModal(true)}
              className="btn btn-light text-primary px-3 py-2 fw-bold"
            >
              + Create Ticket
            </button>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="row g-4">
          <div className="col-lg-7">
            <h1 className="fs-3 mb-3 fw-bold">
              Search for an answer or browse help topics to create a ticket
            </h1>

            <div className="position-relative mb-3">
              <input
                type="text"
                className="form-control form-control-lg shadow-sm"
                placeholder="Type your question or problem (e.g. activate F&O, add funds, forgot password)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ paddingRight: "40px" }}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="btn btn-sm text-secondary border-0 position-absolute"
                  style={{ right: "12px", top: "12px", fontSize: "16px" }}
                >
                  ✕
                </button>
              )}
            </div>

            <div className="d-flex flex-wrap gap-2 mt-3">
              <span className="text-white me-1 font-weight-bold">Popular topics:</span>
              <button
                onClick={() => setSearchQuery("account opening")}
                className="btn btn-sm btn-outline-light rounded-pill px-3"
              >
                Track account opening
              </button>
              <button
                onClick={() => setSearchQuery("activate F&O")}
                className="btn btn-sm btn-outline-light rounded-pill px-3"
              >
                Track segment activation
              </button>
              <button
                onClick={() => setSearchQuery("intraday margins")}
                className="btn btn-sm btn-outline-light rounded-pill px-3"
              >
                Intraday margins
              </button>
              <button
                onClick={() => setSearchQuery("kite manual")}
                className="btn btn-sm btn-outline-light rounded-pill px-3"
              >
                Kite user manual
              </button>
            </div>
          </div>

          <div className="col-lg-5 ps-lg-4">
            <div className="p-3 rounded" style={{ backgroundColor: "rgba(255,255,255,0.1)" }}>
              <h4 className="fs-5 mb-3 fw-bold">Featured Updates</h4>
              <ol className="ps-3 mb-0" style={{ lineHeight: "2" }}>
                <li className="mb-2">
                  <button
                    onClick={() => setSearchQuery("delisting")}
                    className="btn btn-link p-0 text-white text-decoration-underline text-start border-0"
                  >
                    Current Takeovers and Delisting - January 2024
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setSearchQuery("intraday margins")}
                    className="btn btn-link p-0 text-white text-decoration-underline text-start border-0"
                  >
                    Latest Intraday leverages - MIS & CO
                  </button>
                </li>
              </ol>
            </div>
          </div>
        </div>

        {/* Dynamic Solution Results */}
        {searchQuery.trim() !== "" && (
          <div className="row mt-4 pt-3 border-top border-light">
            <div className="col-12">
              <h4 className="mb-3 text-warning">
                💡 Solutions & Answers for "{searchQuery}"
              </h4>

              {matchingSolutions.length > 0 ? (
                <div className="row g-3">
                  {matchingSolutions.map((item) => (
                    <div key={item.id} className="col-md-6">
                      <div className="p-3 bg-white text-dark rounded shadow-sm h-100">
                        <span className="badge bg-primary mb-2">{item.category}</span>
                        <h5 className="fs-6 fw-bold text-dark mb-2">{item.title}</h5>
                        <p className="text-secondary small mb-3" style={{ lineHeight: "1.6" }}>
                          {item.solution}
                        </p>
                        <button
                          onClick={() => {
                            setTicketForm({ ...ticketForm, category: item.category, subject: item.title });
                            setShowCreateModal(true);
                          }}
                          className="btn btn-outline-primary btn-sm fw-bold"
                        >
                          Need More Help? Create Ticket
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 bg-white text-dark rounded shadow-sm">
                  <h5 className="text-dark fw-bold mb-2">Need personal assistance?</h5>
                  <p className="text-secondary mb-3">
                    We couldn't find an exact automated solution for "{searchQuery}". You can submit a support ticket directly to our compliance team.
                  </p>
                  <button
                    onClick={() => {
                      setTicketForm({ ...ticketForm, subject: searchQuery });
                      setShowCreateModal(true);
                    }}
                    className="btn btn-primary btn-sm px-3"
                  >
                    Submit Ticket for "{searchQuery}"
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Ticket Tracker Modal */}
      {showTrackerModal && (
        <div className="modal show d-block" style={{ backgroundColor: "rgba(0,0,0,0.6)" }} tabIndex="-1">
          <div className="modal-dialog modal-lg modal-dialog-scrollable">
            <div className="modal-content">
              <div className="modal-header bg-primary text-white">
                <h5 className="modal-title fw-bold">📋 My Support Tickets ({tickets.length})</h5>
                <button type="button" className="btn-close btn-close-white" onClick={() => setShowTrackerModal(false)}></button>
              </div>
              <div className="modal-body text-dark">
                {tickets.length === 0 ? (
                  <p className="text-muted text-center py-4">No support tickets found. Create a ticket below!</p>
                ) : (
                  tickets.map((t) => (
                    <div key={t._id} className="card mb-3 border-light shadow-sm">
                      <div className="card-header bg-light d-flex justify-content-between align-items-center">
                        <div>
                          <strong className="text-primary">{t.ticketId}</strong> — <span className="badge bg-secondary">{t.category}</span>
                        </div>
                        <span className={`badge ${t.status === "RESOLVED" ? "bg-success" : t.status === "IN_PROGRESS" ? "bg-warning text-dark" : "bg-info"}`}>
                          {t.status}
                        </span>
                      </div>
                      <div className="card-body">
                        <h6 className="card-title fw-bold">{t.subject}</h6>
                        <p className="card-text text-secondary mb-2">{t.description}</p>
                        <div className="p-3 bg-light rounded text-dark" style={{ borderLeft: "4px solid #0d6efd" }}>
                          <small className="fw-bold text-primary d-block mb-1">💬 Support Specialist Response:</small>
                          <small>{t.response}</small>
                        </div>
                        <div className="mt-2 text-end text-muted" style={{ fontSize: "12px" }}>
                          Created: {new Date(t.createdAt).toLocaleString()}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowTrackerModal(false)}>Close</button>
                <button className="btn btn-primary" onClick={() => { setShowTrackerModal(false); setShowCreateModal(true); }}>+ Create New Ticket</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create Ticket Modal */}
      {showCreateModal && (
        <div className="modal show d-block" style={{ backgroundColor: "rgba(0,0,0,0.6)" }} tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header bg-primary text-white">
                <h5 className="modal-title fw-bold">🎫 Create Support Ticket</h5>
                <button type="button" className="btn-close btn-close-white" onClick={() => setShowCreateModal(false)}></button>
              </div>
              <form onSubmit={handleCreateTicket}>
                <div className="modal-body text-dark">
                  {formSuccess && <div className="alert alert-success">{formSuccess}</div>}
                  <div className="mb-3">
                    <label className="form-label fw-bold">Topic Category</label>
                    <select
                      className="form-select"
                      value={ticketForm.category}
                      onChange={(e) => setTicketForm({ ...ticketForm, category: e.target.value })}
                      required
                    >
                      <option value="Account Opening">Account Opening</option>
                      <option value="Segment Activation">Segment Activation (F&O / Commodity)</option>
                      <option value="Your Zerodha Account">Your Zerodha Account</option>
                      <option value="Trading & Markets">Trading & Markets</option>
                      <option value="Funds & Payments">Funds & Payments</option>
                      <option value="Console & Tax P&L">Console & Tax P&L</option>
                      <option value="Coin Mutual Funds">Coin Mutual Funds</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-bold">Subject / Title</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Brief title of your issue"
                      value={ticketForm.subject}
                      onChange={(e) => setTicketForm({ ...ticketForm, subject: e.target.value })}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-bold">Description of Problem</label>
                    <textarea
                      className="form-control"
                      rows="4"
                      placeholder="Provide full details of your question or issue..."
                      value={ticketForm.description}
                      onChange={(e) => setTicketForm({ ...ticketForm, description: e.target.value })}
                      required
                    ></textarea>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowCreateModal(false)}>Cancel</button>
                  <button type="submit" className="btn btn-primary fw-bold">Submit Ticket</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default Hero;
