// components/PhotoUploader.jsx
import { useState } from "react";
import PhotoAnalyser from "./PhotoAnalysis";

function PhotoUploader() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    setLoading(true)
    const files = Array.from(e.target.files).slice(0, 4);
    setImages(
      files.map((file) =>
        Object.assign(file, { preview: URL.createObjectURL(file) })
      )
    );
    setLoading(false)
  };

  const handleDragOver = (e) => e.preventDefault();

  const handleDropOver = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    const filePreviews = files.map((file) =>
      Object.assign(file, { preview: URL.createObjectURL(file) })
    );
    setImages(filePreviews);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 text-gray-800 font-sans post-pal-container">
      <main className="md:w-6xl w-full mx-auto p-4 mt-9 rounded-lg">
        <div className="text-center py-10 bg flex gap-3 items-center ms-3.5">
          <img
            className="w-20 h-20 rounded-lg"
            src="https://res.cloudinary.com/dwc1sjsvj/image/upload/v1748714669/apm56mgkrwifowildrfo.png"
            alt="post-pal-logo"
          />
          <div>
            <h1 className="text-4xl font-bold text-indigo-600 text-left">
              PostPal
            </h1>
            <p className="text-lg text-gray-500 mt-2">
              Your AI Photo Selector for Every Social Moment
            </p>
          </div>
        </div>

        <form
          className="bg-white shadow-xl rounded-xl p-6 border border-gray-100"
          encType="multipart/form-data"
        >
          <label
            htmlFor="imageInput"
            className="flex flex-col items-center justify-center border-2 border-dashed border-indigo-300 rounded-lg py-12 px-6 text-center cursor-pointer hover:border-indigo-500 transition-all"
            draggable="true"
            onDragOver={handleDragOver}
            onDrop={handleDropOver}
          >
            <div className="text-indigo-500 text-3xl mb-2">📷</div>
            <p className="text-sm text-gray-600">
              Drag & drop or{" "}
              <span className="text-indigo-600 font-medium">browse</span> up to
              4 photos
            </p>
            <p className="text-xs text-gray-400 mt-1">Max 10MB each</p>
            <input
              id="imageInput"
              type="file"
              accept="image/*"
              multiple
              name="image_personas"
              onChange={handleImageChange}
              hidden
            />
          </label>

          {!loading ? (
            images.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
                {images.map((img, idx) => (
                  <div
                    key={idx}
                    className="relative rounded-lg overflow-hidden shadow-md"
                  >
                    <img
                      src={img.preview}
                      alt={`preview-${idx}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )
          ) : (
            <div className="flex items-center gap-4">
              {Array.from({ length: images.length }).map((index) => {
                return (
                  <img
                    key={index}
                    className="bg-gray-200 animate-pulse rounded-lg mt-4 w-20 h-20 object-cover"
                    alt=""
                    loading="lazy"
                  />
                );
              })}
            </div>
          )}
        </form>

        <PhotoAnalyser images={images} onImagesChange={setImages} />
      </main>

      <div className="text-center text-sm text-amber-300 py-6">
        Made with ❤️ for social moments
      </div>
    </div>
  );
}

export default PhotoUploader;
