import "./App.css";
import Navbar from "./components/Navbar";
import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import { useEffect } from "react";
import { useState } from "react";

export default function App() {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser && storedUser !== "null" ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    if (!user) localStorage.removeItem("user");
  }, [user]);

  const PublicRoute = ({ children }) => {
    if (user) {
      return <Navigate to="/dashboard" replace />;
    }

    return children;
  };

  const PrivateRoutes = ({ children }) => {
    return localStorage.getItem("user") ? (
      children
    ) : (
      <Navigate to={"/login"} replace />
    );
  };

  return (
    <>
      <Navbar user={user}/>
      <Routes>
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login setUser={setUser} />
            </PublicRoute>
          }
        />
        <Route path="/" element={<Home />} />
        <Route
          path="/dashboard"
          element={<PrivateRoutes children={<Dashboard />} />}
        />
      </Routes>
    </>
  );
}
