import { useState } from "react";
import PhotoDropdown from "./PhotoDropdowns";
import { X } from "lucide-react";

function PhotoUploader() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    setLoading(true);
    if (e.target.files.length >= 6) {
      alert("You can only upload upto 6 photos...");
      return;
    }
    const files = e.target.files;
    setImages((images) => [...images, ...files]);
    setLoading(false);
  };

  const handleDragOver = (e) => e.preventDefault();

  const handleDropOver = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    setImages([...images, ...files]);
    setLoading(false);
  };

  const removePhoto = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 text-gray-800 font-sans post-pal-container">
      <main className="w-full md:max-w-4xl mx-auto p-4 mt-9 rounded-lg">
        <h1 className="text-4xl font-bold text-black text-center">PostPal</h1>
        <p className="text-lg text-gray-500 mt-2 text-center">
          Your AI Photo Selector for Every Social Moment
        </p>
        <div className="text-center py-10 mt-4 flex gap-3 items-center post-pal-hero-bg rounded-lg"></div>

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
              6 photos
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
              <div className="flex gap-4 mt-6">
                {images.map((img, index) => (
                  <div
                    key={index}
                    className="relative rounded-lg overflow-hidden shadow-md w-30 h-30"
                  >
                    <img
                      src={URL.createObjectURL(img)}
                      alt={`preview-${index}`}
                      className="w-full h-full object-cover"
                    />
                    <button
                      className="absolute right-0 top-[-5px] rounded-full bg-blue-500 text-white cursor-pointer"
                      onClick={() => removePhoto(index)}
                      type="button"
                    >
                      <X />
                    </button>
                  </div>
                ))}
              </div>
            )
          ) : (
            <div className="flex items-center gap-4 overflow-hidden">
              {Array.from({ length: images.length }).map((index) => {
                return (
                  <img
                    key={index}
                    className="bg-gray-200 animate-pulse rounded-lg mt-4 w-20 h-20 object-cover border-0 overflow-hidden"
                    alt=""
                    loading="lazy"
                  />
                );
              })}
            </div>
          )}
        </form>
        <PhotoDropdown images={images} />
      </main>

      <div className="text-center text-sm text-amber-300 py-6">
        Made with ❤️ for social moments
      </div>
    </div>
  );
}

export default PhotoUploader;
