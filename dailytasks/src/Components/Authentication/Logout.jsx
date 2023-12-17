// Logout.js
import React from "react";
import { useDispatch } from "react-redux";
import { clearUser } from "../../Reducers/authSlice";
import { useNavigate } from "react-router-dom";

const Logout = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  let history = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      // Make a request to the server to clear the authentication token
      const response = await fetch("/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        // Clear user information from Redux store
        dispatch(clearUser());
        history("/");
        onClose();
      } else {
        console.error("Logout failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    isOpen && (
      <div className="logout-popup">
        <div className="logout-popup-content">
          <p>Are you sure you want to logout?</p>
          <button
            type="button"
            className="btn btn-danger"
            onClick={handleLogout}
          >
            Logout
          </button>
          <button
            type="button"
            className="btn btn-secondary ml-2"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    )
  );
};

export default Logout;
