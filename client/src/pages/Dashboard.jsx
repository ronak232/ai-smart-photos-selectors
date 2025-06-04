import { useState, useEffect } from "react";
import { googleLogout } from "@react-oauth/google";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = localStorage.getItem("user");
    const user = JSON.parse(userInfo);
    setUserInfo(user);
  }, []);

  useEffect(() => {
    const handleStorage = () => {
      const userInfo = localStorage.getItem("user");
      setUserInfo(userInfo ? JSON.parse(userInfo) : null);
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    googleLogout();
    setUserInfo(null);
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e0e7ff] via-[#f5f3ff] to-[#f0f5ff] relative overflow-hidden p-6">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute w-80 h-80 bg-purple-300 opacity-30 rounded-full mix-blend-multiply filter blur-3xl animate-pulse top-[-5rem] left-[-5rem]"></div>
        <div className="absolute w-80 h-80 bg-indigo-300 opacity-30 rounded-full mix-blend-multiply filter blur-3xl animate-pulse top-[50%] left-[60%]"></div>
        <div className="absolute w-80 h-80 bg-pink-200 opacity-20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse bottom-[-5rem] right-[-5rem]"></div>
      </div>

      <div className="relative z-10 max-w-3xl mx-auto backdrop-blur-md bg-white/80 shadow-2xl rounded-3xl p-8 border border-white/30">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">
          Welcome back {userInfo?.user?.userName}
        </h1>

        <Card className="mb-6 bg-white/60 backdrop-blur-lg rounded-xl border border-white/30 shadow-md">
          <CardContent>
            <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center pb-4">
              👤 User Information
            </h2>
            {userInfo ? (
              <div className="flex gap-6 items-center justify-center flex-col">
                <img
                  src={
                    userInfo?.user?.image ||
                    "https://avatar.iran.liara.run/public"
                  }
                  alt="User Avatar"
                  className="w-24 h-24 rounded-full ring-4 ring-indigo-200 shadow-md"
                />
                <div className="text-gray-700 space-y-1">
                  <p className="text-2xl font-bold">
                    <strong>Name:</strong> {userInfo?.user?.userName}
                  </p>
                  <p className="text-xl font-bold">
                    <strong>Email:</strong> {userInfo?.user?.email}
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-gray-500 italic">
                No user information available.
              </p>
            )}
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button
            onClick={handleLogout}
            className="bg-gradient-to-r from-indigo-400 to-purple-400 text-indigo-700 px-4 py-2 rounded-md shadow-sm hover:shadow-md hover:bg-opacity-90 transition-all duration-300 ease-in-out"
          >
            🚪 Logout
          </Button>
        </div>
      </div>
    </div>
  );
}
export default Dashboard;
