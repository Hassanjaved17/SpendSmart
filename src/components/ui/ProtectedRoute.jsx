// ============================================================
//  SPENDSMART — ProtectedRoute.jsx
//  Redirects to login if not authenticated
//  Author  : Hassan Javed
//  © 2026 Hassan Javed — All Rights Reserved
// ============================================================

import { Navigate } from "react-router-dom";
import { useAuth }  from "../../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;

// © 2026 Hassan Javed — All Rights Reserved