import React, { useState } from "react";
import Button from "../components/Button";
import "./CreateGig.css";

export default function CreateGig({ onGigCreated }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    budget: "",
  });

  const createGig = async (e) => {
    e.preventDefault();

    const res = await fetch("https://gig-flow-ejdn.onrender.com/api/gigs", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: form.title,
        description: form.description,
        budget: Number(form.budget),
      }),
    });

    if (res.ok) {
      setForm({ title: "", description: "", budget: "" });
      onGigCreated(); // refresh dashboard
    } else {
      alert("Failed to create gig");
    }
  };

  return (
    <form className="create-gig-card" onSubmit={createGig}>
      <h2 className="create-gig-title">Post a Gig</h2>

      <input
        type="text"
        placeholder="Title"
        className="create-gig-input"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        required
      />

      <textarea
        placeholder="Description"
        className="create-gig-textarea"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
        required
      />

      <input
        type="number"
        placeholder="Budget"
        className="create-gig-input"
        value={form.budget}
        onChange={(e) => setForm({ ...form, budget: e.target.value })}
        required
      />

      <Button text="Create Gig" type="submit" />
    </form>
  );
}
