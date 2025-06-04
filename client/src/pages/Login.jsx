import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Dashboard from "./Dashboard";

function Login() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const userInfo = localStorage.getItem("user");
    if (userInfo) {
      navigate("/dashboard");
    }
  }, [navigate]);
  const handleGoogleLogin = async (authResponse) => {
    try {
      if (authResponse.code) {
        const response = await axios.post("http://localhost:5000/api/google", {
          code: authResponse.code,
        });
        localStorage.setItem("user", JSON.stringify(response.data));
        setUser(response.data);
        navigate("/dashboard")
      }
    } catch (error) {
      console.error("Google login failed", error.message);
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: handleGoogleLogin,
    onError: handleGoogleLogin,
    flow: "auth-code",
    access_type: "offline",
  });

  return !user ? (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      <div className="bg-white shadow-xl rounded-xl p-10 max-w-sm w-full text-center animate-fade-in">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h2>
        <p className="text-gray-500 mb-6">Sign in to continue</p>

        <button
          onClick={googleLogin}
          className="w-full flex items-center justify-center gap-3 px-4 py-2 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg hover:shadow-md transition cursor-pointer"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google Logo"
            className="w-5 h-5"
          />
          Sign in with Google
        </button>
      </div>
    </div>
  ) : (
    <Dashboard />
  );
}

export default Login;
