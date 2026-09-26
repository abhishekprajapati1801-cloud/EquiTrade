import React from "react";
import { Link } from "react-router-dom";
import { DASHBOARD_URL } from "../config";

function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer style={{ backgroundColor: "rgb(250, 250, 250)" }}>
      <div className="container border-top mt-5 pt-5">
        <div className="row">
          <div className="col-md-3 mb-4">
            <Link to="/" onClick={scrollToTop}>
              <img src="/media/images/logo.svg" style={{ width: "50%", minWidth: "120px" }} alt="Zerodha Logo" />
            </Link>
            <p className="mt-3 text-muted" style={{ fontSize: "14px" }}>
              &copy; 2010 - 2024, Zerodha Broking Ltd. All rights reserved.
            </p>
          </div>

          <div className="col-md-3 mb-4">
            <h5 className="fs-6 fw-bold mb-3 text-dark">Company</h5>
            <ul className="list-unstyled" style={{ lineHeight: "2.2", fontSize: "15px" }}>
              <li><Link to="/about" onClick={scrollToTop} className="text-decoration-none text-secondary">About</Link></li>
              <li><Link to="/product" onClick={scrollToTop} className="text-decoration-none text-secondary">Products</Link></li>
              <li><Link to="/pricing" onClick={scrollToTop} className="text-decoration-none text-secondary">Pricing</Link></li>
              <li><Link to="/signup" onClick={scrollToTop} className="text-decoration-none text-secondary">Referral programme</Link></li>
              <li><Link to="/about" onClick={scrollToTop} className="text-decoration-none text-secondary">Careers</Link></li>
              <li><Link to="/product" onClick={scrollToTop} className="text-decoration-none text-secondary">Zerodha.tech</Link></li>
              <li><Link to="/about" onClick={scrollToTop} className="text-decoration-none text-secondary">Press & media</Link></li>
              <li><Link to="/about" onClick={scrollToTop} className="text-decoration-none text-secondary">Zerodha cares (CSR)</Link></li>
            </ul>
          </div>

          <div className="col-md-3 mb-4">
            <h5 className="fs-6 fw-bold mb-3 text-dark">Support</h5>
            <ul className="list-unstyled" style={{ lineHeight: "2.2", fontSize: "15px" }}>
              <li><Link to="/support" onClick={scrollToTop} className="text-decoration-none text-secondary">Contact</Link></li>
              <li><Link to="/support" onClick={scrollToTop} className="text-decoration-none text-secondary">Support portal</Link></li>
              <li><Link to="/support" onClick={scrollToTop} className="text-decoration-none text-secondary">Z-Connect blog</Link></li>
              <li><Link to="/pricing" onClick={scrollToTop} className="text-decoration-none text-secondary">List of charges</Link></li>
              <li><Link to="/support" onClick={scrollToTop} className="text-decoration-none text-secondary">Downloads & resources</Link></li>
            </ul>
          </div>

          <div className="col-md-3 mb-4">
            <h5 className="fs-6 fw-bold mb-3 text-dark">Account</h5>
            <ul className="list-unstyled" style={{ lineHeight: "2.2", fontSize: "15px" }}>
              <li><Link to="/signup" onClick={scrollToTop} className="text-decoration-none text-secondary">Open an account</Link></li>
              <li><a href={`${DASHBOARD_URL}/funds`} className="text-decoration-none text-secondary">Fund transfer</a></li>
              <li><Link to="/signup" onClick={scrollToTop} className="text-decoration-none text-secondary">60 day challenge</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-4 text-muted border-top pt-4" style={{ fontSize: "12px", lineHeight: "1.7" }}>
          <p>
            Zerodha Broking Ltd.: Member of NSE​ &​ BSE – SEBI Registration no.:
            INZ000031633 CDSL: Depository services through Zerodha Securities
            Pvt. Ltd. – SEBI Registration no.: IN-DP-100-2015 Commodity Trading
            through Zerodha Commodities Pvt. Ltd. MCX: 46025 – SEBI Registration
            no.: INZ000038238 Registered Address: Zerodha Broking Ltd.,
            #153/154, 4th Cross, Dollars Colony, Opp. Clarence Public School,
            J.P Nagar 4th Phase, Bengaluru - 560078, Karnataka, India. For any
            complaints pertaining to securities broking please write to
            complaints@zerodha.com, for DP related to dp@zerodha.com. Please
            ensure you carefully read the Risk Disclosure Document as prescribed
            by SEBI | ICF
          </p>

          <p>
            Procedure to file a complaint on SEBI SCORES: Register on SCORES
            portal. Mandatory details for filing complaints on SCORES: Name,
            PAN, Address, Mobile Number, E-mail ID. Benefits: Effective
            Communication, Speedy redressal of the grievances
          </p>

          <p>
            Investments in securities market are subject to market risks; read
            all the related documents carefully before investing.
          </p>

          <p>
            "Prevent unauthorised transactions in your account. Update your
            mobile numbers/email IDs with your stock brokers. Receive
            information of your transactions directly from Exchange on your
            mobile/email at the end of the day. Issued in the interest of
            investors. KYC is one time exercise while dealing in securities
            markets - once KYC is done through a SEBI registered intermediary
            (broker, DP, Mutual Fund etc.), you need not undergo the same
            process again when you approach another intermediary." Dear
            Investor, if you are subscribing to an IPO, there is no need to
            issue a cheque. Please write the Bank account number and sign the
            IPO application form to authorize your bank to make payment in case
            of allotment. In case of non allotment the funds will remain in your
            bank account. As a business we don't give stock tips, and have not
            authorized anyone to trade on behalf of others. If you find anyone
            claiming to be part of Zerodha and offering such services, please
            create a ticket here.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
