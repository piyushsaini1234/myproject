import React, { useState, useEffect } from "react";
import { FaUserCircle, FaCog, FaSignOutAlt, FaPen } from "react-icons/fa";

const ProfileModal = ({
  admin,
  setShowProfileModal,
  setShowUpdateModal,
  handleThemeToggle,
  handleLogout,
  setProfileImage,
}) => {
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);

  // Handle file selection
  const handleFileSelect = (e) => {
    const f = e.target.files[0];
    if (f) {
      setFile(f);
      setPreview(URL.createObjectURL(f));
    }
  };

  // Upload image
  const handleUpload = async () => {
    if (!file) return alert("Please select an image first");

    const formData = new FormData();
    formData.append("image", file);
    formData.append("adminId", admin?.id);

    try {
      const res = await fetch("http://localhost:5000/api/images", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.success) {
        const fullUrl = `http://localhost:5000${data.imageUrl}`;
        setUploadedImage(data.imageUrl);
        localStorage.setItem("profileImage", fullUrl);
        setProfileImage(fullUrl);

        setPreview(null);
        setFile(null);
        alert("Profile photo updated successfully!");
      } else {
        alert("Upload failed. Please try again.");
      }
    } catch (err) {
      console.error("Upload failed", err);
      alert("Error uploading image.");
    }
  };

  // Fetch latest image from DB
  useEffect(() => {
    const fetchImage = async () => {
      if (!admin?.id) return;

      try {
        const res = await fetch(
          `http://localhost:5000/api/images/${admin.id}`
        );
        const data = await res.json();

        if (data.success && data.image?.image_url) {
          setUploadedImage(data.image.image_url);
          const fullUrl = `http://localhost:5000${data.image.image_url}`;
          localStorage.setItem("profileImage", fullUrl);
          setProfileImage(fullUrl);
        }
      } catch (err) {
        console.error("Error fetching image", err);
      }
    };

    fetchImage();
  }, [admin, setProfileImage]);

  // Load from localStorage when modal opens
  useEffect(() => {
    const storedImg = localStorage.getItem("profileImage");
    if (storedImg) {
      setUploadedImage(storedImg.replace("http://localhost:5000", ""));
    }
  }, [setShowProfileModal]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white p-6 rounded-2xl shadow-xl w-96 animate-fadeIn">
        <div className="text-center mb-4">
          {/* Avatar container */}
          <div className="relative w-20 h-20 mx-auto">
            <label className="w-20 h-20 rounded-full flex items-center justify-center shadow-md overflow-hidden cursor-pointer">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />

              {preview ? (
                <img
                  src={preview}
                  alt="preview"
                  className="w-full h-full object-cover"
                />
              ) : uploadedImage ? (
                <img
                  src={`http://localhost:5000${uploadedImage}`}
                  alt="profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <FaUserCircle className="w-10 h-10 text-gray-500" />
              )}
            </label>

            {/* Small Edit Icon */}
            <label className="absolute bottom-0 right-0 bg-blue-600 p-1.5 rounded-full text-white cursor-pointer shadow-md hover:bg-blue-700 transition">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />
              <FaPen className="w-3 h-3" />
            </label>
          </div>

          {/* Change Photo button */}
          {file && (
            <button
              onClick={handleUpload}
              className="mt-3 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              Change Photo
            </button>
          )}

          <h2 className="text-xl font-semibold mt-3 text-gray-800">
            {admin?.name}
          </h2>
          <p className="text-sm text-gray-500">{admin?.email}</p>
        </div>

        <hr className="mb-4 border-gray-300" />

        <div className="space-y-2">
          <button
            className="w-full px-4 py-2 flex items-center justify-center gap-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition"
            onClick={() => {
              setShowProfileModal(false);
              setShowUpdateModal(true);
            }}
          >
            ✏ Update Profile
          </button>

          <button
            className="w-full px-4 py-2 flex items-center justify-center gap-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
            onClick={handleThemeToggle}
          >
            <FaCog /> Settings
          </button>

          <button
            className="w-full px-4 py-2 flex items-center justify-center gap-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition"
            onClick={handleLogout}
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>

        <button
          className="mt-4 w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:opacity-90 transition"
          onClick={() => setShowProfileModal(false)}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ProfileModal;
