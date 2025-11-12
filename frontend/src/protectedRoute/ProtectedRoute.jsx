import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = useSelector((state) => state.user.token);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) navigate("/login");
  }, [token, navigate]);

  if (!token) return null;
  return children;
};

export default ProtectedRoute;

// why to use useEffect() with navigate : That’s because navigate() changes the route immediately during rendering — before React finishes rendering the current component.
// This interrupts React’s render cycle and can cause weird behavior (like partial UI flashes or double renders).