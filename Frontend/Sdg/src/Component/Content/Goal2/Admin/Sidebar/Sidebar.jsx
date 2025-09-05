// import React, { useState } from "react";
// import {
//   FaBars,
//   FaTimes,
//   FaTachometerAlt,
//   FaDonate,
//   FaClipboardList,
//   FaHandsHelping,
//   FaUser,
//   FaCog,
//   FaSignOutAlt,
// } from "react-icons/fa";

// const AdminNavbar = () => {
//   const [mobileMenu, setMobileMenu] = useState(false);

//   return (
//     <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
//       <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
//         {/* Logo */}
//         <div className="text-2xl font-bold text-green-600">ZeroHunger</div>

//         {/* Desktop Menu */}
//         <div className="hidden md:flex gap-8 items-center text-blue-700 font-bold">
//           <button className="flex items-center gap-2 hover:text-green-600">
//             <FaTachometerAlt /> Dashboard
//           </button>
//           <button className="flex items-center gap-2 hover:text-green-600">
//             <FaDonate /> Donations
//           </button>
//           <button className="flex items-center gap-2 hover:text-green-600">
//             <FaClipboardList /> Requests
//           </button>
//           <button className="flex items-center gap-2 hover:text-green-600">
//             <FaHandsHelping /> Volunteers
//           </button>
//           <button className="flex items-center gap-2 hover:text-green-600">
//             <FaUser /> Profile
//           </button>
//           <button className="flex items-center gap-2 hover:text-green-600">
//             <FaCog /> Settings
//           </button>
//           <button className="flex items-center gap-2 text-red-600 hover:text-red-800">
//             <FaSignOutAlt /> Logout
//           </button>
//         </div>

//         {/* Mobile Toggle Button */}
//         <div className="md:hidden">
//           {mobileMenu ? (
//             <FaTimes
//               className="text-2xl text-green-600"
//               onClick={() => setMobileMenu(false)}
//             />
//           ) : (
//             <FaBars
//               className="text-2xl text-green-600"
//               onClick={() => setMobileMenu(true)}
//             />
//           )}
//         </div>
//       </div>

//       {/* Mobile Sliding Menu */}
//       <div
//         className={`md:hidden fixed top-16 left-0 w-4/5 h-full bg-white shadow-2xl px-6 py-8 space-y-5 text-blue-700 font-bold transition-transform duration-300 ease-in-out transform z-40 ${
//           mobileMenu ? "translate-x-0" : "-translate-x-full"
//         }`}
//       >
//         <button
//           className="flex items-center gap-2 hover:text-green-600"
//           onClick={() => setMobileMenu(false)}
//         >
//           <FaTachometerAlt /> Dashboard
//         </button>
//         <button
//           className="flex items-center gap-2 hover:text-green-600"
//           onClick={() => setMobileMenu(false)}
//         >
//           <FaDonate /> Donations
//         </button>
//         <button
//           className="flex items-center gap-2 hover:text-green-600"
//           onClick={() => setMobileMenu(false)}
//         >
//           <FaClipboardList /> Requests
//         </button>
//         <button
//           className="flex items-center gap-2 hover:text-green-600"
//           onClick={() => setMobileMenu(false)}
//         >
//           <FaHandsHelping /> Volunteers
//         </button>
//         <button
//           className="flex items-center gap-2 hover:text-green-600"
//           onClick={() => setMobileMenu(false)}
//         >
//           <FaUser /> Profile
//         </button>
//         <button
//           className="flex items-center gap-2 hover:text-green-600"
//           onClick={() => setMobileMenu(false)}
//         >
//           <FaCog /> Settings
//         </button>
//         <button
//           className="flex items-center gap-2 text-red-600 hover:text-red-800"
//           onClick={() => setMobileMenu(false)}
//         >
//           <FaSignOutAlt /> Logout
//         </button>
//       </div>
//     </nav>
//   );
// };

// export default AdminNavbar;
