// ============================================================
//  SPENDSMART — App.jsx
//  Routes setup
//  Author  : Hassan Javed
//  © 2026 Hassan Javed — All Rights Reserved
// ============================================================

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute   from "./components/ui/ProtectedRoute";
import LoginPage        from "./pages/LoginPage";
import DashboardPage    from "./pages/DashboardPage";
import NotFound         from "./pages/NotFound";

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public routes */}
          <Route path="/login"  element={<LoginPage />} />

          {/* Protected routes */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          } />

          {/* Redirects */}
          <Route path="/"   element={<Navigate to="/dashboard" replace />} />
          <Route path="*"   element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;

// © 2026 Hassan Javed — All Rights Reserved