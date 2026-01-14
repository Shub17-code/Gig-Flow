import React from "react";

export default function Button({ text, onClick, type = "submit" }) {
  const buttonStyle = {
    width: "100%",
    backgroundColor: "#4f46e5", // indigo
    color: "#ffffff",
    fontWeight: "600",
    padding: "10px 16px",
    borderRadius: "10px",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
    transition: "background-color 0.2s ease",
  };

  const hoverStyle = {
    backgroundColor: "#4338ca",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      style={buttonStyle}
      onMouseOver={(e) =>
        (e.currentTarget.style.backgroundColor = hoverStyle.backgroundColor)
      }
      onMouseOut={(e) =>
        (e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor)
      }
    >
      {text}
    </button>
  );
}
