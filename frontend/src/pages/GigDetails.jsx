import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "./GigDetails.css";

export default function GigDetails() {
  const { gigId } = useParams();
  const navigate = useNavigate();
  const [gig, setGig] = useState(null);

  useEffect(() => {
    fetch(`https://gig-flow-ejdn.onrender.com/api/gigs/${gigId}`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then(setGig);
  }, [gigId]);

  if (!gig) {
    return <p className="gig-loading">Loading gig...</p>;
  }

  return (
    <div className="gig-page">
      <Header />

      <main className="gig-content">
        <button className="gig-back" onClick={() => navigate("/dashboard")}>
          ← Back to Dashboard
        </button>

        <div className="gig-card">
          <h1 className="gig-title">{gig.title}</h1>
          <p className="gig-description">{gig.description}</p>

          <div className="gig-meta">
            <span className="gig-budget">Budget: ₹{gig.budget}</span>
            <span className="gig-status">Status: {gig.status}</span>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
