// import React from "react";


// function NGoNavbar() {
//   return (
//     <nav className="bg-white shadow-md p-4 flex justify-between items-center h-18 ">



    
//     </nav>
//   );
// }

// export default NGoNavbar;


// NGoNavbar.jsx

import React, { useState, useEffect } from "react";
import { FaSignOutAlt, FaUserCircle } from "react-icons/fa";
import Swal from "sweetalert2";

function NGoNavbar() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const data = localStorage.getItem("ngouser");
    if (data) {
      setUser(JSON.parse(data));
    }
  }, []);

  const firstLetter = user?.name?.charAt(0).toUpperCase() || "N";

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, logout",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("ngotoken");
        localStorage.removeItem("ngouser");

        Swal.fire({
          title: "Logged out!",
          text: "You have been logged out successfully.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });

        setTimeout(() => {
          window.location.href = "/card2";
          
        }, 1600);
      }
    });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-md px-6 py-3 flex justify-between items-center z-50">
      <div className="text-2xl font-bold text-cyan-700 ml-7">NGO Panel</div>

      {user && (
        <div className="relative group">
          {/* Avatar Circle */}
          <div
            className="w-10 h-10 rounded-full bg-cyan-700 text-white flex items-center justify-center text-lg font-bold cursor-pointer"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            {firstLetter}
          </div>

          {/* Animated Dropdown */}
          <div
            className={`absolute right-0 w-56 bg-white border border-gray-200 rounded-md shadow-lg z-50 overflow-hidden transition-transform duration-700
            ${showDropdown ? "translate-y-0 opacity-100 visible" : "-translate-y-10 opacity-0 invisible"}`}
          >
            {/* Slide 1: Icon */}
            <div className="w-full h-24 bg-cyan-700 flex items-center justify-center">
              <FaUserCircle className="text-white text-[60px]" />
            </div>

            {/* Slide 2: Info */}
            <div className="p-4 text-sm text-gray-700">
              <div className="font-semibold">{user.name}</div>
              <div className="text-xs text-gray-500">{user.email}</div>
              <div className="text-xs text-gray-500">{user.citystate}</div>
              <div className="text-xs text-gray-500">{user.phone}</div>
              <div className="text-xs text-gray-500">{user.address}</div>

              <button
                onClick={handleLogout}
                className="mt-3 w-full flex items-center gap-2 text-red-600 hover:text-red-800 text-sm font-medium"
              >
                <FaSignOutAlt /> Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default NGoNavbar;




// import React from "react";
// import {
//   FaUserCircle,
//   FaEnvelope,
//   FaPhoneAlt,
//   FaMapMarkerAlt,
//   FaCity,
//   FaSignOutAlt,
// } from "react-icons/fa";
// import { Menu } from "@headlessui/react";

// function NGoNavbar({ user }) {
//   if (!user) return null;

//   const firstLetter = user.ngoName?.charAt(0).toUpperCase() || "N";

//   return (
//     <nav className="bg-white shadow-md p-4 flex justify-between items-center">
//       {/* Left: NGO Logo or Name */}
//       <div className="text-xl font-bold text-green-700">No One Hungry</div>

//       {/* Right: Profile Circle */}
//       <Menu as="div" className="relative inline-block text-left">
//         <Menu.Button className="focus:outline-none">
//           <div className="w-10 h-10 rounded-full bg-green-600 text-white flex items-center justify-center text-lg font-bold cursor-pointer">
//             {firstLetter}
//           </div>
//         </Menu.Button>

//         <Menu.Items className="absolute right-0 mt-2 w-64 origin-top-right bg-white border border-gray-200 rounded-md shadow-lg z-50">
//           <div className="p-4 space-y-3">
//             <div className="flex items-center gap-2 font-semibold text-gray-700">
//               <FaUserCircle className="text-green-600" /> {user.ngoName}
//             </div>
//             <div className="flex items-center gap-2 text-sm text-gray-600">
//               <FaEnvelope /> {user.email}
//             </div>
//             <div className="flex items-center gap-2 text-sm text-gray-600">
//               <FaPhoneAlt /> {user.phoneNumber}
//             </div>
//             <div className="flex items-center gap-2 text-sm text-gray-600">
//               <FaCity /> {user.cityState}
//             </div>
//             <div className="flex items-center gap-2 text-sm text-gray-600">
//               <FaMapMarkerAlt /> {user.address}
//             </div>
//             <hr className="my-2 border-gray-300" />
//             <button
//               onClick={() => alert("Logout")}
//               className="w-full flex items-center gap-2 text-red-600 hover:text-red-800 text-sm font-medium"
//             >
//               <FaSignOutAlt /> Logout
//             </button>
//           </div>
//         </Menu.Items>
//       </Menu>
//     </nav>
//   );
// }

// export default NGoNavbar;
