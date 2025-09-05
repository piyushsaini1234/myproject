// import React, { useState, useEffect } from "react";
// import { Link, Outlet, useNavigate } from "react-router-dom";
// import {
//   FaUserCircle,
//   FaBars,
//   FaTimes,
//   FaTachometerAlt,
//   FaDonate,
//   FaClipboardList,
//   FaHandsHelping,
//   FaCog,
//   FaSignOutAlt,
// } from "react-icons/fa";
// import Swal from "sweetalert2";

// const AdminNavbar = () => {
//   const [mobileMenu, setMobileMenu] = useState(false);
//   const [showProfileModal, setShowProfileModal] = useState(false);
//   const [showUpdateModal, setShowUpdateModal] = useState(false);
//   const [admin, setAdmin] = useState(null);
//   const [avatarFile, setAvatarFile] = useState(null);
//   const [theme, setTheme] = useState("light");
//   const navigate = useNavigate();

//   // Load admin info & theme from localStorage
//   useEffect(() => {
//     const data = localStorage.getItem("admin");
//     if (data) setAdmin(JSON.parse(data));

//     const savedTheme = localStorage.getItem("theme") || "light";
//     setTheme(savedTheme);
//     document.documentElement.classList.toggle("dark", savedTheme === "dark");
//   }, []);

//   // Toggle light/dark mode
//   const handleThemeToggle = () => {
//     Swal.fire({
//       title: "Change Theme?",
//       text: `Switch to ${theme === "light" ? "Dark" : "Light"} mode?`,
//       icon: "question",
//       showCancelButton: true,
//       confirmButtonText: "Yes",
//       background: theme === "light" ? "#fff" : "#1f2937",
//       color: theme === "light" ? "#000" : "#fff",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         const newTheme = theme === "light" ? "dark" : "light";
//         setTheme(newTheme);
//         localStorage.setItem("theme", newTheme);
//         document.documentElement.classList.toggle("dark", newTheme === "dark");
//         Swal.fire({
//           title: "Theme Changed!",
//           text: `Now using ${newTheme} mode.`,
//           icon: "success",
//           timer: 1500,
//           showConfirmButton: false,
//         });
//       }
//     });
//   };

//   // Logout
//   const handleLogout = () => {
//     Swal.fire({
//       title: "Logout?",
//       text: "You will be logged out and redirected.",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonText: "Yes, logout",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         localStorage.removeItem("admin");
//         navigate("/card2");
//         Swal.fire("Logged out!", "", "success");
//       }
//     });
//   };

//   // Handle update profile
//   const handleUpdateProfile = async (e) => {
//     e.preventDefault();
//     const form = e.target;

//     const formData = new FormData();
//     formData.append("name", form.name.value);
//     formData.append("email", form.email.value);
//     formData.append("phone", form.phone.value);
//     formData.append("address", form.address.value);
//     formData.append("city", form.city.value);
//     formData.append("password", form.password.value);
//     if (avatarFile) formData.append("avatar", avatarFile);

//     try {
//       const res = await fetch("http://localhost:5000/api/admin/update-profile", {
//         method: "POST",
//         body: formData,
//       });
//       const data = await res.json();

//       if (data.success) {
//         localStorage.setItem("admin", JSON.stringify(data.admin));
//         setAdmin(data.admin);
//         setShowUpdateModal(false);
//         Swal.fire("Updated!", "Your profile has been updated.", "success");
//       } else {
//         Swal.fire("Error", data.message, "error");
//       }
//     } catch (err) {
//       Swal.fire("Error", err.message, "error");
//     }
//   };

//   return (
//     <>
//       <header className="bg-white dark:bg-gray-900 shadow-sm sticky top-0 z-50">
//         <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between shadow-2xl">
//           <h1 className="text-2xl font-bold text-blue-700 dark:text-white">
//             Admin Panel
//           </h1>

//           {/* Desktop Nav */}
//           <nav className="hidden md:flex space-x-8 text-blue-700 dark:text-white font-medium items-center">
//             <Link to="dashboard" className="flex items-center gap-2 hover:text-green-600 font-bold">
//               <FaTachometerAlt /> Dashboard
//             </Link>
//             <Link to="Donations" className="flex items-center gap-2 hover:text-green-600 font-bold">
//               <FaDonate /> Donations
//             </Link>
//             <Link to="Requests" className="flex items-center gap-2 hover:text-green-600 font-bold">
//               <FaClipboardList /> Requests
//             </Link>
//             <Link to="NGOs" className="flex items-center gap-2 hover:text-green-600 font-bold">
//               <FaHandsHelping /> NGOs
//             </Link>
//             <Link to="Users" className="flex items-center gap-2 hover:text-green-600 font-bold">
//               <FaHandsHelping /> Users
//             </Link>

//             {/* Profile Avatar */}
//             <div
//               className="w-8 h-8 rounded-full overflow-hidden cursor-pointer border-2 border-transparent hover:border-blue-600"
//               onClick={() => setShowProfileModal(true)}
//             >
//               {admin?.avatar ? (
//                 <img
//                   src={`http://localhost:5000${admin.avatar}`}
//                   alt={admin.name}
//                   className="w-full h-full object-cover"
//                 />
//               ) : (
//                 <FaUserCircle className="w-full h-full text-gray-500 dark:text-gray-300" />
//               )}
//             </div>
//           </nav>

//           {/* Mobile Toggle */}
//           <div className="md:hidden">
//             <button onClick={() => setMobileMenu(!mobileMenu)}>
//               {mobileMenu ? <FaTimes size={21} className="text-blue-600" /> : <FaBars size={22} className="text-blue-600" />}
//             </button>
//           </div>
//         </div>

//         {/* Mobile Menu */}
//         {mobileMenu && (
//           <div className="md:hidden bg-white dark:bg-gray-900 shadow-2xl px-4 py-2 space-y-5 text-blue-700 dark:text-white font-bold">
//             <Link to="dashboard" className="flex items-center gap-2 w-full text-left hover:text-green-600">
//               <FaTachometerAlt /> Dashboard
//             </Link>
//             <Link to="donations" className="flex items-center gap-2 w-full text-left hover:text-green-600">
//               <FaDonate /> Donations
//             </Link>
//             <Link to="Requests" className="flex items-center gap-2 w-full text-left hover:text-green-600">
//               <FaClipboardList /> Requests
//             </Link>
//             <Link to="NGOs" className="flex items-center gap-2 w-full text-left hover:text-green-600">
//               <FaHandsHelping /> NGOs
//             </Link>
//             <Link to="Users" className="flex items-center gap-2 w-full text-left hover:text-green-600">
//               <FaHandsHelping /> Users
//             </Link>
//             <div
//               className="flex items-center gap-2 cursor-pointer"
//               onClick={() => setShowProfileModal(true)}
//             >
//               <div className="w-7 h-7 rounded-full overflow-hidden">
//                 {admin?.avatar ? (
//                   <img
//                     src={`http://localhost:5000${admin.avatar}`}
//                     alt={admin.name}
//                     className="w-full h-full object-cover"
//                   />
//                 ) : (
//                   <FaUserCircle className="w-full h-full text-gray-500 dark:text-gray-300" />
//                 )}
//               </div>
//               <span className="text-sm">{admin?.name || "My Account"}</span>
//             </div>
//           </div>
//         )}
//       </header>

//       {/* Profile Modal */}
//       {showProfileModal && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
//           <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl w-96 animate-fadeIn">
//             <div className="text-center mb-4">
//               <div className="w-20 h-20 mx-auto rounded-full flex items-center justify-center shadow-md overflow-hidden">
//                 {admin?.avatar ? (
//                   <img
//                     src={`http://localhost:5000${admin.avatar}`}
//                     alt={admin.name}
//                     className="w-full h-full object-cover"
//                   />
//                 ) : (
//                   <FaUserCircle className="w-10 h-10 text-gray-500 dark:text-gray-300" />
//                 )}
//               </div>
//               <h2 className="text-xl font-semibold mt-3 text-gray-800 dark:text-gray-100">{admin?.name || "Admin Name"}</h2>
//               <p className="text-sm text-gray-500 dark:text-gray-400">{admin?.email || "admin@example.com"}</p>
//             </div>

//             <hr className="mb-4 border-gray-300 dark:border-gray-600" />

//             <div className="space-y-2">
//               <button
//                 className="w-full px-4 py-2 flex items-center justify-center gap-2 bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800 transition"
//                 onClick={() => {
//                   setShowProfileModal(false);
//                   setShowUpdateModal(true);
//                 }}
//               >
//                 ✏ Update Profile
//               </button>

//               <button
//                 className="w-full px-4 py-2 flex items-center justify-center gap-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition"
//                 onClick={handleThemeToggle}
//               >
//                 <FaCog /> Settings
//               </button>

//               <button
//                 className="w-full px-4 py-2 flex items-center justify-center gap-2 bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300 rounded-lg hover:bg-red-200 dark:hover:bg-red-800 transition"
//                 onClick={handleLogout}
//               >
//                 <FaSignOutAlt /> Logout
//               </button>
//             </div>

//             <button
//               className="mt-4 w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:opacity-90 transition"
//               onClick={() => setShowProfileModal(false)}
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Update Profile Modal */}
//       {showUpdateModal && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
//           <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl w-96 animate-fadeIn">
//             <h2 className="text-xl font-bold mb-4 text-center text-gray-800 dark:text-gray-100">Update Profile</h2>
//             <form onSubmit={handleUpdateProfile} className="space-y-3">
//               <input type="text" name="name" defaultValue={admin?.name} placeholder="Enter Name" className="w-full border p-2 rounded" />
//               <input type="email" name="email" defaultValue={admin?.email} placeholder="Enter Email" className="w-full border p-2 rounded" />
//               <input type="text" name="phone" defaultValue={admin?.phone} placeholder="Enter Phone Number" className="w-full border p-2 rounded" />
//               <input type="text" name="address" defaultValue={admin?.address} placeholder="Enter Address" className="w-full border p-2 rounded" />
//               <input type="text" name="city" defaultValue={admin?.city} placeholder="Enter City / State" className="w-full border p-2 rounded" />
//               <input type="password" name="password" defaultValue={admin?.password} placeholder="Create Password" className="w-full border p-2 rounded" />

//               {/* Avatar Upload */}
//               <input type="file" name="avatar" accept="image/*" onChange={(e) => setAvatarFile(e.target.files[0])} className="w-full border p-2 rounded" />

//               <div className="flex justify-between mt-3">
//                 <button type="button" className="px-4 py-2 bg-gray-500 text-white rounded" onClick={() => setShowUpdateModal(false)}>Cancel</button>
//                 <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded">Save</button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       <main className="p-6">
//         <Outlet />
//       </main>
//     </>
//   );
// };

// export default AdminNavbar;

import React, { useState, useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import {
  FaUserCircle,
  FaBars,
  FaTimes,
  FaTachometerAlt,
  FaDonate,
  FaClipboardList,
  FaHandsHelping,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
import { MdDarkMode } from "react-icons/md";
import Swal from "sweetalert2";
import ProfileModal from "./ProfileModal";

const AdminNavbar = () => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [admin, setAdmin] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null);
  const [theme, setTheme] = useState("light");
  const [profileImage, setProfileImage] = useState(null);
  const navigate = useNavigate();

  // Load admin info & theme from localStorage
  useEffect(() => {
    const data = localStorage.getItem("admin");
    if (data) setAdmin(JSON.parse(data));

    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.classList.toggle("dark", savedTheme === "dark");

    const img = localStorage.getItem("profileImage");
    if (img) setProfileImage(img);
  }, []);

  // Toggle light/dark mode
  const handleThemeToggle = () => {
    Swal.fire({
      title: "Change Theme?",
      text: `Switch to ${theme === "light" ? "Dark" : "Light"} mode?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
      background: theme === "light" ? "#fff" : "#1f2937",
      color: theme === "light" ? "#000" : "#fff",
    }).then((result) => {
      if (result.isConfirmed) {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);
        document.documentElement.classList.toggle("dark", newTheme === "dark");
        Swal.fire({
          title: "Theme Changed!",
          text: `Now using ${newTheme} mode.`,
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    });
  };

  // Logout
  const handleLogout = () => {
    Swal.fire({
      title: "Logout?",
      text: "You will be logged out and redirected.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, logout",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("admin");
        navigate("/card2");
        Swal.fire("Logged out!", "", "success");
      }
    });
  };

  // Handle update profile
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    const form = e.target;

    const formData = new FormData();
    formData.append("name", form.name.value);
    formData.append("email", form.email.value);
    formData.append("phone", form.phone.value);
    formData.append("address", form.address.value);
    formData.append("city", form.city.value);
    if (avatarFile) formData.append("avatar", avatarFile);

    try {
      const res = await fetch("http://localhost:5000/api/admin/signup", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (data.success) {
        localStorage.setItem("admin", JSON.stringify(data.admin));
        setAdmin(data.admin);

        if (data.admin.avatar) {
          const fullUrl = `http://localhost:5000${data.admin.avatar}`;
          localStorage.setItem("profileImage", fullUrl);
          setProfileImage(fullUrl);
        }

        setShowUpdateModal(false);
        Swal.fire("Updated!", "Your profile has been updated.", "success");
      } else {
        Swal.fire("Error", data.message, "error");
      }
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    }
  };

  return (
    <>
      {/* Navbar */}
      <header className="bg-white dark:bg-gray-900 shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between shadow-2xl">
          <h1 className="text-2xl font-bold text-blue-700 dark:text-white">
            Admin Panel
          </h1>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-8 text-blue-700 dark:text-white font-medium items-center">
            <Link
              to="dashboard"
              className="flex items-center gap-2 hover:text-green-600 font-bold"
            >
              <FaTachometerAlt /> Dashboard
            </Link>
            <Link
              to="Donations"
              className="flex items-center gap-2 hover:text-green-600 font-bold"
            >
              <FaDonate /> Donations
            </Link>
            <Link
              to="Requests"
              className="flex items-center gap-2 hover:text-green-600 font-bold"
            >
              <FaClipboardList /> Requests
            </Link>
            <Link
              to="NGOs"
              className="flex items-center gap-2 hover:text-green-600 font-bold"
            >
              <FaHandsHelping /> NGOs
            </Link>
            <Link
              to="Users"
              className="flex items-center gap-2 hover:text-green-600 font-bold"
            >
              <FaHandsHelping /> Users
            </Link>

            {/* Profile Avatar */}
            <div
              className="w-8 h-8 rounded-full overflow-hidden cursor-pointer border-2 border-transparent hover:border-blue-600"
              onClick={() => setShowProfileModal(true)}
            >
              {profileImage ? (
                <img
                  src={profileImage}
                  alt={admin?.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <FaUserCircle className="w-full h-full text-gray-500 dark:text-gray-300" />
              )}
            </div>
          </nav>

          {/* Mobile Toggle */}
          <div className="md:hidden">
            <button onClick={() => setMobileMenu(true)}>
              <FaBars size={22} className="text-blue-600" />
            </button>
          </div>
        </div>
      </header>

      {/* Sidebar for Mobile */}
      {/* Sidebar for Mobile (RIGHT SIDE) */}
      <div
        className={`fixed top-0 right-0 h-full w-85 bg-white dark:bg-gray-900 shadow-xl z-50 transform transition-transform duration-300 
  ${mobileMenu ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
          <h2 className="text-lg font-bold text-gray-800 dark:text-gray-200">
            Account
          </h2>
          <button onClick={() => setMobileMenu(false)}>
            <FaTimes className="text-blue-700 text-xl" />
          </button>
        </div>

        {/* Profile Section */}
        <div className="flex items-center gap-3 px-4 py-3 border-b dark:border-gray-700">
          <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200">
            {profileImage ? (
              <img
                src={profileImage}
                alt="avatar"
                className="w-full h-full object-cover"
              />
            ) : (
              <FaUserCircle className="w-full h-full text-gray-500" />
            )}
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 dark:text-gray-200">
              {admin?.name || "Guest"}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {admin?.email}
            </p>
          </div>
        </div>

        {/* Links (with auto close) */}
        <nav className="flex flex-col gap-3 px-4 py-4 text-gray-700 dark:text-gray-200">
          <Link
            to="dashboard"
            onClick={() => setMobileMenu(false)}
            className="flex items-center gap-2 hover:text-green-600  font-bold"
          >
            <FaTachometerAlt /> Home
          </Link>
          <Link
            to="donations"
            onClick={() => setMobileMenu(false)}
            className="flex items-center gap-2 hover:text-green-600  font-bold"
          >
            <FaDonate /> Donate
          </Link>
          <Link
            to="requests"
            onClick={() => setMobileMenu(false)}
            className="flex items-center gap-2 hover:text-green-600  font-bold"
          >
            <FaClipboardList /> Request
          </Link>
          <Link
            to="NGOs"
            onClick={() => setMobileMenu(false)}
            className="flex items-center gap-2 hover:text-green-600 font-bold"
          >
            <FaHandsHelping /> NGO Partner
          </Link>
          <Link
            to="Users"
            className="flex items-center gap-2 hover:text-green-600 font-bold"
          >
            <FaHandsHelping /> Users
          </Link>
          <button
            onClick={() => {
              setShowProfileModal(true);
              setMobileMenu(false);
            }}
            className="flex items-center gap-2 hover:text-green-600 font-bold"
          >
            <FaUserCircle /> Profile
          </button>
          {/* <Link to="status" onClick={() => setMobileMenu(false)} className="flex items-center gap-2 hover:text-green-600">📊 Status</Link> */}
          <button
            onClick={() => {
              handleThemeToggle();
              setMobileMenu(false);
            }}
            className="flex items-center gap-2 hover:text-green-600 font-bold"
          >
            <MdDarkMode /> Dark Mode
          </button>
          <button
            onClick={() => {
              handleLogout();
              setMobileMenu(false);
            }}
            className="flex items-center gap-2 text-red-500 font-bold"
          >
            <FaSignOutAlt /> Logout
          </button>
        </nav>
      </div>

      {/* Overlay */}
      {mobileMenu && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setMobileMenu(false)}
        ></div>
      )}

      {/* Overlay */}
      {mobileMenu && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setMobileMenu(false)}
        ></div>
      )}

      {/* Profile Modal */}
      {showProfileModal && (
        <ProfileModal
          admin={admin}
          setShowProfileModal={setShowProfileModal}
          setShowUpdateModal={setShowUpdateModal}
          handleThemeToggle={handleThemeToggle}
          handleLogout={handleLogout}
          setProfileImage={setProfileImage}
        />
      )}

      {/* Update Profile Modal */}
      {showUpdateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl w-96 animate-fadeIn">
            <h2 className="text-xl font-bold mb-4 text-center text-gray-800 dark:text-gray-100">
              Update Profile
            </h2>
            <form onSubmit={handleUpdateProfile} className="space-y-3">
              <input
                type="text"
                name="name"
                defaultValue={admin?.name}
                placeholder="Enter Name"
                className="w-full border p-2 rounded"
              />
              <input
                type="email"
                name="email"
                defaultValue={admin?.email}
                placeholder="Enter Email"
                className="w-full border p-2 rounded"
              />
              <input
                type="text"
                name="phone"
                defaultValue={admin?.phone}
                placeholder="Enter Phone Number"
                className="w-full border p-2 rounded"
              />
              <input
                type="text"
                name="address"
                defaultValue={admin?.address}
                placeholder="Enter Address"
                className="w-full border p-2 rounded"
              />
              <input
                type="text"
                name="city"
                defaultValue={admin?.city}
                placeholder="Enter City / State"
                className="w-full border p-2 rounded"
              />
              <input
                type="password"
                name="password"
                defaultValue={admin?.password}
                placeholder="Create Password"
                className="w-full border p-2 rounded"
              />

              {/* Avatar Upload */}
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={(e) => setAvatarFile(e.target.files[0])}
                className="w-full border p-2 rounded"
              />

              <div className="flex justify-between mt-3">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-500 text-white rounded"
                  onClick={() => setShowUpdateModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <main className="p-6">
        <Outlet />
      </main>
    </>
  );
};

export default AdminNavbar;
