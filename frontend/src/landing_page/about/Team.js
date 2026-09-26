import React from "react";

function Team() {
  return (
    <div className="container">
      <div className="row p-3 mt-5 border-top">
        <h1 className="text-center fw-bold text-dark">People</h1>
      </div>

      <div
        className="row p-3 align-items-center"
        style={{ lineHeight: "1.8", fontSize: "1.15em", color: "#222222" }}
      >
        <div className="col-md-5 p-3 text-center">
          <img
            src="/media/images/abhishek.jpg"
            alt="Abhishek"
            style={{ borderRadius: "50%", width: "240px", height: "240px", objectFit: "cover", boxShadow: "0 4px 14px rgba(0,0,0,0.18)" }}
          />
          <h3 className="mt-4 text-dark fw-bold mb-1">Abhishek</h3>
          <h6 className="text-secondary fw-semibold">Founder, Software Engineer</h6>
        </div>
        <div className="col-md-7 p-3">
          <p className="mb-3 text-dark fw-normal">
            Abhishek is a Computer Science Engineering student at Parul University, Vadodara, with a background in computer science and a passion for building technology.
          </p>
          <p className="mb-3 text-dark fw-normal">
            He enjoys working with Java, DSA, full-stack development, and AI/ML.
          </p>
          <p className="mb-3 text-dark fw-normal">
            His goal is to build products that solve real problems and keep pushing himself to become a better software engineer.
          </p>
          <p className="fw-bold text-primary mb-4">
            Gaming is his zen.
          </p>
          <div className="pt-2 border-top">
            <span className="me-3 fw-bold text-dark">Connect on:</span>
            <a
              href="https://www.linkedin.com/in/abhishek-prajapati-5333a3349/"
              target="_blank"
              rel="noreferrer"
              className="btn btn-primary btn-sm px-3 py-1 fw-bold text-decoration-none"
            >
              <i className="fa-brands fa-linkedin me-2"></i>LinkedIn Profile
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Team;
