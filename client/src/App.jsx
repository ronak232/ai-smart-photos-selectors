import "./App.css";
import Navbar from "./components/Navbar";
import PhotoUploader from "./components/PhotoUploader";
import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

export default function App() {
  const getUser = localStorage.getItem("user");

  const PublicRoute = ({ children }) => {
    const user = getUser && getUser !== "null" ? JSON.parse(getUser) : null;

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
      <Navbar />
      <Routes>
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route path="/" element={<PhotoUploader />} />
        <Route
          path="/dashboard"
          element={<PrivateRoutes children={<Dashboard />} />}
        />
      </Routes>
    </>
  );
}
