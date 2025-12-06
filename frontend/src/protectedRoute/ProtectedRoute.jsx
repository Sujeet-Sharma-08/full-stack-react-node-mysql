import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { userData, isAuthLoading } = useSelector((state) => state.user);

  // ✅ WAIT FOR BACKEND AUTH CHECK
  if (isAuthLoading) {
    return <div className="text-center mt-10">Checking session...</div>;
  }

  // ✅ NOT LOGGED IN
  if (!userData) {
    return <Navigate to="/login" replace />;
  }

  // ✅ USER VERIFIED
  return children;
};

export default ProtectedRoute;



// why to use useEffect() with navigate : That’s because navigate() changes the route immediately during rendering — before React finishes rendering the current component.
// This interrupts React’s render cycle and can cause weird behavior (like partial UI flashes or double renders).