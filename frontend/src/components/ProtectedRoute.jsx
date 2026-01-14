import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    fetch(https://gig-flow-ejdn.onrender.com/api/auth/check", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setAuthenticated(data.authenticated);
        setLoading(false);
      })
      .catch(() => {
        setAuthenticated(false);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p style={{ padding: "24px" }}>Checking authentication...</p>;
  }

  if (!authenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
