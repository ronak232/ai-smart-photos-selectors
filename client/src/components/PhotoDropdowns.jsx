// components/PhotoAnalyser.jsx
import { useEffect } from "react";
import { useState } from "react";
import DOMPurify from "dompurify";
import { useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { baseURL } from "../constant/variables";

const OCCASIONS = [
  "Birthday",
  "Get-together",
  "Anniversary",
  "Graduation",
  "Festival",
  "Artistic",
  "Travel",
  "Other",
];
const RELATIONS = [
  "Friend",
  "Family",
  "Colleague",
  "Partner",
  "Instagram",
  "WhatsApp",
  "Facebook",
  "College",
  "Kid",
];

const PhotoDropdown = ({ images }) => {
  const [occasion, setOccasion] = useState("");
  const [relation, setRelation] = useState("");
  const [loader, setLoader] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [userPrompt, setUserPrompt] = useState("");
  const navigate = useNavigate();

  const [open, setOpen] = useState({
    open: false,
    message: "",
    severity: "info",
  });

  const showToast = (message, severity = "info") => {
    setOpen({ open: true, message, severity });
  };

  function load(key) {
    const item = window.sessionStorage.getItem(key);
    return item != null ? JSON.parse(item) : "";
  }
  const [showData, setShowData] = useState(() => load("data"));

  useEffect(() => {
    const user = localStorage.getItem("user");
    const pasrseInfo = JSON.parse(user);
    setUserInfo(pasrseInfo);
  }, []);

  useEffect(() => {
    const handleStorage = () => {
      const userInfo = localStorage.getItem("user");
      setUserInfo(userInfo ? JSON.parse(userInfo) : null);
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const handleOccasionChange = (e) => setOccasion(e.target.value);
  const handleRelationChange = (e) => setRelation(e.target.value);

  const handleSelectBest = async (e) => {
    e.preventDefault();
    if (!userInfo) {
      navigate("/login");
    }
    setLoader(true);

    try {
      const formData = new FormData();
      images.forEach((img) => {
        formData.append("image_persona", img);
      });
      formData.append("occasion", occasion);
      formData.append("relation", relation);
      formData.append("prompt", userPrompt);
      const response = await fetch(`${baseURL}/api/upload`, {
        method: "POST",
        body: formData,
      });

      const res = await response.json();
      const parsedFormatData = res.data
        .replace(/[`{}]+html/g, "")
        .replace(/[{}]+/g, "")
        .trim();
      // santized the data
      const santizedData = DOMPurify.sanitize(parsedFormatData);
      setShowData(santizedData);
      console.log("show data ", showData);
      window.sessionStorage.setItem("data", JSON.stringify(santizedData));
      setLoader(false);
    } catch (error) {
      showToast(error, "high");
    }
  };

  const handleUserPrompt = (e) => {
    setUserPrompt(e.target.value);
  };

  return (
    <>
      <form onSubmit={handleSelectBest}>
        <div className="mt-8 flex gap-4 justify-between">
          <div className="w-full">
            <label className="block text-md font-medium text-gray-700 mb-1 w-full">
              Occasion
            </label>
            <select
              value={occasion}
              onChange={handleOccasionChange}
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Select occasion</option>
              {OCCASIONS.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          </div>
          <div className="w-full">
            <label className="block text-md font-medium text-gray-700 mb-1">
              Relation
            </label>
            <select
              value={relation}
              onChange={handleRelationChange}
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Select relation</option>
              {RELATIONS.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>
        </div>
        <p className="text-center mt-4 mb-4">Or</p>

        <div>
          <label
            className="block text-md font-medium text-gray-700 mb-1"
            htmlFor="user prompt"
          >
            Enter your prompt for images{" "}
          </label>
          <input
            className="p-2.5 border-[1px] border-black w-full rounded-md"
            type="text"
            aria-describedby="user-prompt"
            value={userPrompt}
            placeholder="How can i help you..."
            onChange={handleUserPrompt}
          />
        </div>

        <div className="mt-10 text-center">
          <button
            // onClick={handleSelectBest}
            type="submit"
            disabled={images?.length === 0}
            className="px-6 py-3 bg-indigo-600 text-white rounded-full font-semibold shadow-md hover:bg-indigo-700 disabled:opacity-50 transition-all cursor-pointer"
          >
            Select Best Photo
          </button>
        </div>
      </form>
      <Snackbar
        open={open.open}
        autoHideDuration={5000}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert>{open.message}</Alert>
      </Snackbar>
      <div className="mt-10 post-pal-reply">
        {!loader ? (
          showData && <div dangerouslySetInnerHTML={{ __html: showData }} />
        ) : (
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-yellow-500 mx-auto"></div>
            <h2 className="text-zinc-900 dark:text-white mt-4">Loading...</h2>
            <p className="text-zinc-600 dark:text-zinc-400">
              Your adventure is about to begin
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default PhotoDropdown;
