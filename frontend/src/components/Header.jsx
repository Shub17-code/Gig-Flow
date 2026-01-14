import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";

export default function Header() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const logout = async () => {
    await fetch("https://gig-flow-ejdn.onrender.com/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    navigate("/login");
  };

  return (
    <header className="header">
      <h1 className="logo" onClick={() => navigate("/")}>
        GigFlow
      </h1>

      <div className="profile-wrapper">
        <div className="profile-icon" onClick={() => setOpen((prev) => !prev)}>
          👤
        </div>

        {open && (
          <div className="dropdown">
            <button className="dropdown-item" onClick={logout}>
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
