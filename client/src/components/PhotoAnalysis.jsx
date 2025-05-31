// components/PhotoAnalyser.jsx
import { useState } from "react";

const OCCASIONS = [
  "Birthday",
  "Get-together",
  "Anniversary",
  "Graduation",
  "Festival",
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
];

const PhotoAnalyser = ({ images, onImagesChange }) => {
  const [occasion, setOccasion] = useState("");
  const [relation, setRelation] = useState("");
  const [showData, setShowData] = useState("");

  const handleOccasionChange = (e) => setOccasion(e.target.value);
  const handleRelationChange = (e) => setRelation(e.target.value);

  const handleSelectBest = async () => {
    if (!images.length) {
      console.error("Please select at least 2 images");
      return;
    }

    const formData = new FormData();
    images.forEach((img) => formData.append("image_personas", img));
    formData.append("occasion", occasion);
    formData.append("relation", relation);

    const response = await fetch("http://localhost:5000/api/upload", {
      method: "POST",
      body: formData,
    });

    const res = await response.json();
    const formatData = new DOMParser();
    const parsedFormatData = formatData.parseFromString(res.data, "text/html");
    setShowData(parsedFormatData.body.textContent);
  };

  return (
    <>
      <section className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
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
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
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
      </section>

      <div className="mt-10 text-center">
        <button
          onClick={handleSelectBest}
          disabled={images.length === 0 || !occasion || !relation}
          className="px-6 py-3 bg-indigo-600 text-white rounded-full font-semibold shadow-md hover:bg-indigo-700 disabled:opacity-50 transition-all"
        >
          Select Best Photo
        </button>
      </div>

      <div>{showData && <div>{showData}</div>}</div>
    </>
  );
};

export default PhotoAnalyser;
