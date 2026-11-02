import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./pages/Home";
import SellVehicle from "./pages/SellVehicle";
import BuyVehicle from "./pages/BuyVehicle";
import Orders from "./pages/Orders";
import Status from "./pages/Status";
import Header from "./components/header";

function AppLayout({ children }) {
  return (
    <div style={{ minHeight: "100vh", background: "#f3f4f6" }}>
      <Header />
      <main
        style={{
          padding: "16px 24px",
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >
        {children}
      </main>
    </div>
  );
}

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected routes with header */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <AppLayout>
                  <Home />
                </AppLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/sell"
            element={
              <ProtectedRoute>
                <AppLayout>
                  <SellVehicle />
                </AppLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/buy"
            element={
              <ProtectedRoute>
                <AppLayout>
                  <BuyVehicle />
                </AppLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/orders"
            element={
              <ProtectedRoute>
                <AppLayout>
                  <Orders />
                </AppLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/status"
            element={
              <ProtectedRoute>
                <AppLayout>
                  <Status />
                </AppLayout>
              </ProtectedRoute>
            }
          />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
