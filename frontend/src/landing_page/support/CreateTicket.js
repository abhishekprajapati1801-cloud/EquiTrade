import React from "react";
import { Link } from "react-router-dom";

function CreateTicket() {
  return (
    <div className="container py-5" id="create-ticket">
      <h2 className="fs-3 mb-5 text-secondary">
        To create a ticket, select a relevant topic
      </h2>

      <div className="row g-4">
        {/* Topic 1: Account Opening */}
        <div className="col-md-4 mb-4">
          <h4 className="fs-5 fw-bold mb-3 text-dark">
            <i className="fa fa-plus-circle me-2 text-primary" aria-hidden="true"></i> Account Opening
          </h4>
          <div className="d-flex flex-column gap-2" style={{ fontSize: "0.95em" }}>
            <Link to="/signup" className="text-decoration-none text-muted">Getting Started</Link>
            <Link to="/signup" className="text-decoration-none text-muted">Online Account Opening</Link>
            <Link to="/signup" className="text-decoration-none text-muted">Offline Account Opening</Link>
            <Link to="/signup" className="text-decoration-none text-muted">Company, Partnership and HUF Account</Link>
            <Link to="/signup" className="text-decoration-none text-muted">NRI Account Opening</Link>
            <Link to="/pricing" className="text-decoration-none text-muted">Charges at Zerodha</Link>
          </div>
        </div>

        {/* Topic 2: Your Zerodha Account */}
        <div className="col-md-4 mb-4">
          <h4 className="fs-5 fw-bold mb-3 text-dark">
            <i className="fa fa-user me-2 text-primary" aria-hidden="true"></i> Your Zerodha Account
          </h4>
          <div className="d-flex flex-column gap-2" style={{ fontSize: "0.95em" }}>
            <Link to="/login" className="text-decoration-none text-muted">Login Credentials & Passwords</Link>
            <Link to="/login" className="text-decoration-none text-muted">Account Modification & Details</Link>
            <Link to="/login" className="text-decoration-none text-muted">CMR & DP ID Details</Link>
            <Link to="/login" className="text-decoration-none text-muted">Nominee Addition</Link>
            <Link to="/login" className="text-decoration-none text-muted">Transfer and Conversion of Shares</Link>
          </div>
        </div>

        {/* Topic 3: Trading and Markets */}
        <div className="col-md-4 mb-4">
          <h4 className="fs-5 fw-bold mb-3 text-dark">
            <i className="fa fa-line-chart me-2 text-primary" aria-hidden="true"></i> Trading and Markets
          </h4>
          <div className="d-flex flex-column gap-2" style={{ fontSize: "0.95em" }}>
            <Link to="/product" className="text-decoration-none text-muted">Trading FAQs & Orders</Link>
            <Link to="/product" className="text-decoration-none text-muted">Kite User Manual</Link>
            <Link to="/product" className="text-decoration-none text-muted">Margins & Product Types</Link>
            <Link to="/product" className="text-decoration-none text-muted">Corporate Actions & Delisting</Link>
            <Link to="/product" className="text-decoration-none text-muted">Kite Connect APIs</Link>
          </div>
        </div>

        {/* Topic 4: Funds */}
        <div className="col-md-4 mb-4">
          <h4 className="fs-5 fw-bold mb-3 text-dark">
            <i className="fa fa-credit-card me-2 text-primary" aria-hidden="true"></i> Funds
          </h4>
          <div className="d-flex flex-column gap-2" style={{ fontSize: "0.95em" }}>
            <a href="http://localhost:3001/funds" className="text-decoration-none text-muted">Adding Funds</a>
            <a href="http://localhost:3001/funds" className="text-decoration-none text-muted">Fund Withdrawal</a>
            <a href="http://localhost:3001/funds" className="text-decoration-none text-muted">eMandates & Bank Accounts</a>
          </div>
        </div>

        {/* Topic 5: Console */}
        <div className="col-md-4 mb-4">
          <h4 className="fs-5 fw-bold mb-3 text-dark">
            <i className="fa fa-bar-chart me-2 text-primary" aria-hidden="true"></i> Console
          </h4>
          <div className="d-flex flex-column gap-2" style={{ fontSize: "0.95em" }}>
            <Link to="/product" className="text-decoration-none text-muted">Reports & Statements</Link>
            <Link to="/product" className="text-decoration-none text-muted">Ledger & Portfolio</Link>
            <Link to="/product" className="text-decoration-none text-muted">P&L Reports & Tax Statements</Link>
            <Link to="/product" className="text-decoration-none text-muted">IPO Applications</Link>
          </div>
        </div>

        {/* Topic 6: Coin */}
        <div className="col-md-4 mb-4">
          <h4 className="fs-5 fw-bold mb-3 text-dark">
            <i className="fa fa-circle-thin me-2 text-primary" aria-hidden="true"></i> Coin
          </h4>
          <div className="d-flex flex-column gap-2" style={{ fontSize: "0.95em" }}>
            <Link to="/product" className="text-decoration-none text-muted">Direct Mutual Funds</Link>
            <Link to="/product" className="text-decoration-none text-muted">National Pension Scheme (NPS)</Link>
            <Link to="/product" className="text-decoration-none text-muted">Fixed Income & Bonds</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateTicket;
