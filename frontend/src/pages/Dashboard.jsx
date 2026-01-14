import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CreateGig from "./CreateGig";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "./Dashboard.css";

export default function Dashboard() {
  const [gigs, setGigs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchGigs = async () => {
    setLoading(true);
    const res = await fetch("http://localhost:5000/api/gigs", {
      credentials: "include",
    });
    const data = await res.json();
    setGigs(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchGigs();
  }, []);

  return (
    <div className="dashboard-page">
      <Header />

      <main className="dashboard-content">
        <h1 className="dashboard-title">Open Gigs</h1>

        {/* Create Gig */}
        <CreateGig onGigCreated={fetchGigs} />

        {/* Gigs */}
        {loading ? (
          <p className="dashboard-info">Loading gigs...</p>
        ) : gigs.length === 0 ? (
          <p className="dashboard-info">No gigs available</p>
        ) : (
          <div className="gig-grid">
            {gigs.map((gig) => (
              <div
                key={gig._id}
                className="gig-card"
                onClick={() => navigate(`/gigs/${gig._id}`)}
              >
                <h2 className="gig-title">{gig.title}</h2>
                <p className="gig-description">{gig.description}</p>

                <div className="gig-footer">
                  <span className="gig-budget">₹{gig.budget}</span>
                  <span className="gig-status">Open</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
