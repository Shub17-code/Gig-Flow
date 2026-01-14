import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import "./Home.css";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="page">
      <Header />

      <main className="page-content">
        <div className="app-container">
          <h1 className="title">
            Welcome to <span>GigFlow</span>
          </h1>

          <p className="subtitle">
            GigFlow is a modern freelance marketplace where clients post
            projects, freelancers submit bids, and hiring happens smoothly
            through a secure and transparent process.
          </p>

          <div className="features">
            <div className="feature-card">
              <h3>Post Gigs</h3>
              <p>Publish jobs with clear requirements and budgets.</p>
            </div>

            <div className="feature-card">
              <h3>Get Proposals</h3>
              <p>Receive bids from skilled freelancers instantly.</p>
            </div>

            <div className="feature-card">
              <h3>Hire Securely</h3>
              <p>Choose the best bid and assign the project safely.</p>
            </div>
          </div>

          <button className="cta-btn" onClick={() => navigate("/dashboard")}>
            Go to Dashboard
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
}
