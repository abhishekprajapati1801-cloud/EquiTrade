import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await axios.post("http://localhost:3002/auth/signup", formData);
      if (response.data.success) {
        setSuccess("Signup successful! Redirecting to Dashboard...");
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("username", response.data.username);
        setTimeout(() => {
          window.location.href = "http://localhost:3001";
        }, 1500);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to signup. Please try again.");
    }
  };

  return (
    <div className="container p-5">
      <div className="row justify-content-center align-items-center my-5">
        <div className="col-lg-6 text-center">
          <img
            src="media/images/signup.png"
            alt="Signup Banner"
            style={{ width: "85%", height: "auto" }}
          />
        </div>
        <div className="col-lg-5 p-4 border rounded shadow-sm bg-white">
          <h2 className="text-center mb-4 text-primary">Open a Zerodha Account</h2>
          <p className="text-muted text-center mb-4">Modern online platform to invest in stocks, derivatives, mutual funds, and more.</p>

          {error && <div className="alert alert-danger mb-3">{error}</div>}
          {success && <div className="alert alert-success mb-3">{success}</div>}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label font-weight-bold">Username</label>
              <input
                type="text"
                className="form-control"
                name="username"
                placeholder="Enter your full name / username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label font-weight-bold">Email Address</label>
              <input
                type="email"
                className="form-control"
                name="email"
                placeholder="name@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-4">
              <label className="form-label font-weight-bold">Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                placeholder="Create a strong password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary w-100 py-2 fs-5">
              Continue / Signup
            </button>
          </form>

          <div className="mt-4 text-center">
            <p className="mb-0 text-muted">
              Already have an account? <Link to="/login" className="text-decoration-none font-weight-bold">Log in here</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
