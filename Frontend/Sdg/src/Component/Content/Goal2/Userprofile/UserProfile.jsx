import React, { useState, useEffect, useRef } from "react";
import { FaUserCircle, FaCog, FaSignOutAlt, FaPen } from "react-icons/fa";

const UserProfileModal = ({
  isOpen,
  onClose,
  user,
  setShowUpdateModal,
  handleThemeToggle,
  handleLogout,
  setProfileImage,
}) => {
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);

  const modalRef = useRef(null);

  // -------- Close modal when clicking outside ----------
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  // -------- Handle File Select ----------
  const handleFileSelect = (e) => {
    const f = e.target.files[0];
    if (f) {
      setFile(f);
      setPreview(URL.createObjectURL(f));
    }
  };

  // -------- Upload Image ----------
  const handleUpload = async () => {
    if (!file) return alert("Please select an image first");

    const formData = new FormData();
    formData.append("image", file);
    formData.append("userId", user?.id);

    try {
      const res = await fetch("http://localhost:5000/api/images", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.success) {
        const fullUrl = `http://localhost:5000${data.imageUrl}`;

        setUploadedImage(data.imageUrl);
        localStorage.setItem("userProfileImage", fullUrl);
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

  // -------- Fetch Latest Image from DB ----------
  useEffect(() => {
    const fetchImage = async () => {
      if (!user?.id) return;

      try {
        const res = await fetch(`http://localhost:5000/api/images/${user.id}`);
        const data = await res.json();

        if (data.success && data.image?.image_url) {
          setUploadedImage(data.image.image_url);

          const fullUrl = `http://localhost:5000${data.image.image_url}`;
          localStorage.setItem("userProfileImage", fullUrl);
          setProfileImage(fullUrl);
        }
      } catch (err) {
        console.error("Error fetching image", err);
      }
    };

    fetchImage();
  }, [user, setProfileImage]);

  // -------- Load from LocalStorage when modal opens ----------
  useEffect(() => {
    const storedImg = localStorage.getItem("userProfileImage");
    if (storedImg) {
      setUploadedImage(storedImg.replace("http://localhost:5000", ""));
    }
  }, [isOpen]);

  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div
        ref={modalRef}
        className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl w-96 relative animate-fadeIn"
      >
        {/* Close Button */}
        <button
          className="absolute top-2 right-3 text-gray-500 text-xl hover:text-gray-800"
          onClick={onClose}
        >
          ×
        </button>

        {/* Profile Section */}
        <div className="text-center mb-4">
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
                <FaUserCircle className="w-10 h-10 text-gray-500 dark:text-gray-300" />
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

          <h2 className="text-xl font-semibold mt-3 text-gray-800 dark:text-gray-100">
            {user?.name}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {user?.email}
          </p>
        </div>

        <hr className="mb-4 border-gray-300 dark:border-gray-600" />

        {/* Action Buttons */}
        <div className="space-y-2">
          <button
            className="w-full px-4 py-2 flex items-center justify-center gap-2 bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800 transition"
            onClick={() => {
              onClose();
              setShowUpdateModal(true);
            }}
          >
            ✏ Update Profile
          </button>

          <button
            className="w-full px-4 py-2 flex items-center justify-center gap-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition"
            onClick={handleThemeToggle}
          >
            <FaCog /> Settings
          </button>

          <button
            className="w-full px-4 py-2 flex items-center justify-center gap-2 bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300 rounded-lg hover:bg-red-200 dark:hover:bg-red-800 transition"
            onClick={handleLogout}
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>

        <button
          className="mt-4 w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:opacity-90 transition"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default UserProfileModal;
