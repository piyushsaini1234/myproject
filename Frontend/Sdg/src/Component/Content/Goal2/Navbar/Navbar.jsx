// import React, { useState, useEffect } from "react";
// import { FiMenu } from "react-icons/fi";
// import Swal from "sweetalert2";
// import { Link } from "react-router-dom";
// import { FaUser, FaMoon } from "react-icons/fa";
// import { FiSettings, FiLogOut } from "react-icons/fi";

// import SignupModal from "../../../NGo Partner/Signup/SignupModal";
// import LoginModal from "../../../NGo Partner/Login/Loginmodal";
// import StatusModal from "./Status";
// // USER Modals
// import UserLoginModal from "../../../Content/Goal2/UserLogin/UserLoginModel";
// import UserSignupModal from "../../../Content/Goal2/UserSignup/UserSignupModel";

// // User Profile
// import UserProfileModal from "../../../Content/Goal2/Userprofile/UserProfile";

// // ADMIN Modals
// import AdminLoginModal from "../../../Content/Goal2/Admin/Login/AdminLogin";
// import AdminSignupModal from "../../../Content/Goal2/Admin/Signup/AdminSignup";

// function Navbar() {
//   const [state, setState] = useState({
//     menuOpen: false,
//     isScrolled: false,

//     // login status
//     isLoggedIn: false,
//     userInfo: null,

//     // NGO modals
//     showNGOSignup: false,
//     showNGOLogin: false,

//     // USER modals
//     showUserLogin: false,
//     showUserSignup: false,

//     // ADMIN modals
//     showAdminLogin: false,
//     showAdminSignup: false,

//     // UI
//     showMobileDropdown: false,
//     showUserProfileModal: false,
//   });

//   const {
//     menuOpen,
//     isScrolled,
//     isLoggedIn,
//     userInfo,

//     showNGOSignup,
//     showNGOLogin,

//     showUserLogin,
//     showUserSignup,

//     showAdminLogin,
//     showAdminSignup,

//     showMobileDropdown,
//     showUserProfileModal,
//   } = state;

//   // Load user from localStorage; add scroll listener
//   useEffect(() => {
//     const storedUser = localStorage.getItem("ngouser");
//     if (storedUser) {
//       setState((prev) => ({
//         ...prev,
//         isLoggedIn: true,
//         userInfo: JSON.parse(storedUser),
//       }));
//     }

//     const handleScroll = () => {
//       setState((prev) => ({ ...prev, isScrolled: window.scrollY > 50 }));
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   // -------- NGO handlers --------
//   const openNGOSignup = () =>
//     setState((p) => ({ ...p, showNGOSignup: true, showNGOLogin: false }));
//   const openNGOLogin = () =>
//     setState((p) => ({ ...p, showNGOLogin: true, showNGOSignup: false }));

//   // -------- USER handlers --------
//   const openUserLogin = () =>
//     setState((p) => ({ ...p, showUserLogin: true, showUserSignup: false }));
//   const openUserSignup = () =>
//     setState((p) => ({ ...p, showUserSignup: true, showUserLogin: false }));

//   // -------- ADMIN handlers --------
//   const openAdminLogin = () =>
//     setState((p) => ({ ...p, showAdminLogin: true, showAdminSignup: false }));
//   const openAdminSignup = () =>
//     setState((p) => ({ ...p, showAdminSignup: true, showAdminLogin: false }));

//   // -------- Close all modals --------
//   const closeAllModals = () =>
//     setState((p) => ({
//       ...p,
//       showNGOSignup: false,
//       showNGOLogin: false,
//       showUserLogin: false,
//       showUserSignup: false,
//       showAdminLogin: false,
//       showAdminSignup: false,
//       showUserProfileModal: false,
//     }));

//   // -------- Profile modal --------
//   const openUserProfileModal = () =>
//     setState((p) => ({ ...p, showUserProfileModal: true }));
//   const closeUserProfileModal = () =>
//     setState((p) => ({ ...p, showUserProfileModal: false }));

//   // -------- Mobile profile dropdown --------
//   const toggleMobileDropdown = () =>
//     setState((p) => ({ ...p, showMobileDropdown: !p.showMobileDropdown }));

//   // -------- Protected actions for User (Donate/Request) --------
//   const handleDonateOrRequest = () => {
//     if (!isLoggedIn) {
//       Swal.fire({
//         title: "Please Login",
//         text: "You need to log in or sign up to use this feature.",
//         icon: "info",
//         showCancelButton: true,
//         confirmButtonText: "Login",
//         cancelButtonText: "Signup",
//         customClass: {
//         backdrop: 'backdrop-blur-sm bg-black/20'
//       }
//       }).then((result) => {
//         if (result.isConfirmed) openUserLogin();
//         else if (result.dismiss === Swal.DismissReason.cancel) openUserSignup();
//       });
//     } else {
//       Swal.fire("Welcome", "You have access to this feature.", "success");
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("ngouser");
//     localStorage.removeItem("ngotoken");
//     setState((p) => ({
//       ...p,
//       isLoggedIn: false,
//       userInfo: null,
//       showMobileDropdown: false,
//     }));
//     Swal.fire("Logged Out", "You have been logged out.", "success");
//   };

//   return (
//     <>
//       <nav
//         className={`fixed w-full z-50 p-4 transition-all duration-300 ${
//           isScrolled ? "bg-white/80 shadow-md backdrop-blur-md" : "bg-transparent"
//         }`}
//       >
//         <div className="flex items-center justify-between">
//           {/* Logo */}
//           <div className={`text-xl font-bold ${isScrolled ? "text-black" : "text-white"}`}>
//             Zero Hunger
//           </div>

//           {/* Desktop Menu */}
//           <div className="hidden md:flex items-center gap-6 font-bold">
//             <Link
//               to="/card2"
//               className={`${isScrolled ? "text-black" : "text-white"} hover:text-cyan-800 underline`}
//             >
//               Home
//             </Link>

//             <button
//               onClick={handleDonateOrRequest}
//               className={`${isScrolled ? "text-black" : "text-white"} hover:text-cyan-800 underline`}
//             >
//               Donate
//             </button>

//             <button
//               onClick={handleDonateOrRequest}
//               className={`${isScrolled ? "text-black" : "text-white"} hover:text-cyan-800 underline`}
//             >
//               Request
//             </button>

//             {/* Admin Buttons (open modals) */}
//             <button
//               onClick={openAdminLogin}
//               className={`${isScrolled ? "text-black" : "text-white"} hover:text-cyan-800 underline`}
//             >
//               Admin
//             </button>

//             {/* NGO Partner */}
//             <button
//               onClick={openNGOLogin}
//               className={`${isScrolled ? "text-black" : "text-white"} hover:text-cyan-800 underline`}
//             >
//               NGO Partner
//             </button>

//             {/* Desktop Profile Dropdown */}
//             {isLoggedIn && userInfo && (
//               <div className="relative group cursor-pointer">
//                 <div className="w-9 h-9 rounded-full bg-pink-700 text-white flex items-center justify-center font-bold">
//                   {userInfo.name?.charAt(0)?.toUpperCase()}
//                 </div>
//                 <div className="absolute hidden group-hover:flex flex-col bg-white border rounded-lg right-0 mt-2 w-56 shadow-lg z-50 text-gray-700 text-sm p-2 space-y-2 transition-all duration-300">
//                   <div
//                     onClick={openUserProfileModal}
//                     className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 rounded cursor-pointer"
//                   >
//                     <FaUser className="text-lg" />
//                     <span className="font-medium">Profile</span>
//                   </div>
//                   <div className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 rounded cursor-pointer">
//                     <FiSettings className="text-lg" />
//                     <span className="font-medium">Settings</span>
//                   </div>
//                   <div className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 rounded cursor-pointer">
//                     <FaMoon className="text-lg" />
//                     <span className="font-medium">Dark Mode</span>
//                   </div>
//                   <div
//                     onClick={handleLogout}
//                     className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 rounded cursor-pointer text-red-600"
//                   >
//                     <FiLogOut className="text-lg text-red-600" />
//                     <span className="font-medium">Logout</span>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Mobile Menu Toggle */}
//           <button
//             className={`md:hidden text-2xl ${isScrolled ? "text-black" : "text-white"}`}
//             onClick={() => setState((p) => ({ ...p, menuOpen: !p.menuOpen }))}
//           >
//             <FiMenu />
//           </button>
//         </div>

//         {/* Mobile Menu */}
//         {menuOpen && (
//           <div
//             className={`md:hidden font-bold flex flex-col items-end mt-4 space-y-3   ${
//               isScrolled ? "text-black" : "text-white"
//             }`}
//           >
//             <Link to="/card2" className="hover:text-cyan-800 underline">
//               Home
//             </Link>

//             <button onClick={handleDonateOrRequest} className="hover:text-cyan-800 underline">
//               Donate
//             </button>

//             <button onClick={handleDonateOrRequest} className="hover:text-cyan-800 underline">
//               Request
//             </button>

//             <button onClick={openAdminLogin} className="hover:text-cyan-800 underline">
//               Admin
//             </button>
//             <button onClick={openNGOLogin} className="hover:text-cyan-800 underline">
//               NGO Partner
//             </button>

//             {/* Mobile Profile Avatar & Dropdown */}
//             {isLoggedIn && userInfo && (
//               <div className="mt-2">
//                 <div onClick={toggleMobileDropdown} className="flex items-center gap-2 cursor-pointer">
//                   <div className="w-8 h-8 rounded-full bg-cyan-600 text-white flex items-center justify-center font-bold">
//                     {userInfo.name?.charAt(0)?.toUpperCase()}
//                   </div>
//                   <span className="font-semibold text-cyan-800">{userInfo.name?.split(" ")?.[0]}</span>
//                 </div>

//                 {showMobileDropdown && (
//                   <div className="mt-2 flex flex-col bg-white rounded-lg shadow text-black text-sm">
//                     <div
//                       onClick={openUserProfileModal}
//                       className="px-4 py-2 border-b hover:bg-gray-100 cursor-pointer"
//                     >
//                       👤 Profile
//                     </div>
//                     <div className="px-4 py-2 border-b hover:bg-gray-100 cursor-pointer">⚙️ Settings</div>
//                     <div className="px-4 py-2 border-b hover:bg-gray-100 cursor-pointer">🌙 Dark Mode</div>
//                     <div onClick={openStatusModal} className="px-4 py-2 border-b hover:bg-gray-100 cursor-pointer">   Status</div>
//                     <div
//                       onClick={handleLogout}
//                       className="px-4 py-2 hover:bg-gray-100 text-red-600 cursor-pointer"
//                     >
//                       ↩️ Logout
//                     </div>
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>
//         )}
//       </nav>

//       {/* ---------- Modals ---------- */}

//       {/* NGO */}
//       {showNGOSignup && (
//         <SignupModal isOpen onClose={closeAllModals} onSwitchToLogin={openNGOLogin} />
//       )}
//       {showNGOLogin && (
//         <LoginModal isOpen onClose={closeAllModals} onSwitchToSignup={openNGOSignup} />
//       )}

//       {/* USER */}
//       {showUserLogin && (
//         <UserLoginModal isOpen onClose={closeAllModals} onSwitchToSignup={openUserSignup} />
//       )}
//       {showUserSignup && (
//         <UserSignupModal isOpen onClose={closeAllModals} onSwitchToLogin={openUserLogin} />
//       )}

//       {/* ADMIN */}
//       {showAdminLogin && (
//         <AdminLoginModal isOpen onClose={closeAllModals} onSwitchToSignup={openAdminSignup} />
//       )}
//       {showAdminSignup && (
//         <AdminSignupModal isOpen onClose={closeAllModals} onSwitchToLogin={openAdminLogin} />
//       )}

//       {/* PROFILE */}
//       {showUserProfileModal && userInfo && (
//         <UserProfileModal isOpen={showUserProfileModal} onClose={closeUserProfileModal} user={userInfo} />
//       )}
//     </>
//   );
// }

// export default Navbar;

import React, { useState, useEffect } from "react";
import { FiMenu, FiSettings, FiLogOut, FiX, FiBarChart2 } from "react-icons/fi";
import { FaUser, FaMoon, FaHome, FaHandHoldingHeart } from "react-icons/fa";
import { MdFoodBank } from "react-icons/md";
import { RiAdminLine } from "react-icons/ri";
import { GiLoveMystery } from "react-icons/gi";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

// NGO Modals
import SignupModal from "../../../NGoPartner/Signup/SignupModal";
import LoginModal from "../../../NGoPartner/Login/LoginModal";
import StatusModal from "./Status";

// USER Modals
import UserLoginModal from "../../../Content/Goal2/UserLogin/UserLoginModel";
import UserSignupModal from "../../../Content/Goal2/UserSignup/UserSignupModel";
import UserProfileModal from "../../../Content/Goal2/Userprofile/UserProfile";

// ADMIN Modals
import AdminLoginModal from "../../../Content/Goal2/Admin/Login/AdminLogin";
import AdminSignupModal from "../../../Content/Goal2/Admin/Signup/AdminSignup";

function Navbar() {
  const [state, setState] = useState({
    menuOpen: false,
    isScrolled: false,
    isLoggedIn: false,
    userInfo: null,

    // modals
    showNGOSignup: false,
    showNGOLogin: false,
    showUserLogin: false,
    showUserSignup: false,
    showAdminLogin: false,
    showAdminSignup: false,
    showUserProfileModal: false,
    showStatusModal: false,

    // profile dropdown modal
    showProfileDropdown: false,
  });

  const {
    menuOpen,
    isScrolled,
    isLoggedIn,
    userInfo,
    showNGOSignup,
    showNGOLogin,
    showUserLogin,
    showUserSignup,
    showAdminLogin,
    showAdminSignup,
    showUserProfileModal,
    showStatusModal,
    showProfileDropdown,
  } = state;

  // Load user from localStorage; add scroll listener
  useEffect(() => {
    const storedUser = localStorage.getItem("ngouser");
    if (storedUser) {
      setState((prev) => ({
        ...prev,
        isLoggedIn: true,
        userInfo: JSON.parse(storedUser),
      }));
    }

    const handleScroll = () => {
      setState((prev) => ({ ...prev, isScrolled: window.scrollY > 50 }));
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // -------- Handlers --------
  const openNGOSignup = () =>
    setState((p) => ({ ...p, showNGOSignup: true, showNGOLogin: false }));
  const openNGOLogin = () =>
    setState((p) => ({ ...p, showNGOLogin: true, showNGOSignup: false }));

  const openUserLogin = () =>
    setState((p) => ({ ...p, showUserLogin: true, showUserSignup: false }));
  const openUserSignup = () =>
    setState((p) => ({ ...p, showUserSignup: true, showUserLogin: false }));

  const openAdminLogin = () =>
    setState((p) => ({ ...p, showAdminLogin: true, showAdminSignup: false }));
  const openAdminSignup = () =>
    setState((p) => ({ ...p, showAdminSignup: true, showAdminLogin: false }));

  const closeAllModals = () =>
    setState((p) => ({
      ...p,
      showNGOSignup: false,
      showNGOLogin: false,
      showUserLogin: false,
      showUserSignup: false,
      showAdminLogin: false,
      showAdminSignup: false,
      showUserProfileModal: false,
      showStatusModal: false,
      showProfileDropdown: false,
    }));

  const openUserProfileModal = () =>
    setState((p) => ({ ...p, showUserProfileModal: true }));
  const closeUserProfileModal = () =>
    setState((p) => ({ ...p, showUserProfileModal: false }));

  const openStatusModal = () =>
    setState((p) => ({ ...p, showStatusModal: true }));
  const closeStatusModal = () =>
    setState((p) => ({ ...p, showStatusModal: false }));

  const toggleProfileDropdown = () =>
    setState((p) => ({ ...p, showProfileDropdown: !p.showProfileDropdown }));

  const handleDonateOrRequest = () => {
    if (!isLoggedIn) {
      Swal.fire({
        title: "Please Login",
        text: "You need to log in or sign up to use this feature.",
        icon: "info",
        showCancelButton: true,
        confirmButtonText: "Login",
        cancelButtonText: "Signup",
        customClass: { backdrop: "backdrop-blur-sm bg-black/20" },
      }).then((result) => {
        if (result.isConfirmed) openUserLogin();
        else if (result.dismiss === Swal.DismissReason.cancel) openUserSignup();
      });
    } else {
      Swal.fire("Welcome", "You have access to this feature.", "success");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("ngouser");
    localStorage.removeItem("ngotoken");
    setState((p) => ({
      ...p,
      isLoggedIn: false,
      userInfo: null,
      showProfileDropdown: false,
    }));
    Swal.fire("Logged Out", "You have been logged out.", "success");
     // window.location.reload()  //refresh
  };

  return (
    <>
      {/* Navbar */}
      <nav
        className={`fixed w-full z-50 p-4 transition-all duration-300 ${
          isScrolled
            ? "bg-white/80 shadow-md backdrop-blur-md"
            : "bg-transparent"
        }`}
      >
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div
            className={`text-xl font-bold ${
              isScrolled ? "text-black" : "text-white"
            }`}
          >
            Zero Hunger
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6 font-bold">
            <Link
              to="/card2"
              className={`${
                isScrolled ? "text-black" : "text-white"
              } hover:text-cyan-800 `}
            >
              Home
            </Link>

            <button
              onClick={handleDonateOrRequest}
              className={`${
                isScrolled ? "text-black" : "text-white"
              } hover:text-cyan-800 `}
            >
              Donate
            </button>

            <button
              onClick={handleDonateOrRequest}
              className={`${
                isScrolled ? "text-black" : "text-white"
              } hover:text-cyan-800 `}
            >
              Request
            </button>

            <button
              onClick={openAdminLogin}
              className={`${
                isScrolled ? "text-black" : "text-white"
              } hover:text-cyan-800 `}
            >
              Admin
            </button>

            <button
              onClick={openNGOLogin}
              className={`${
                isScrolled ? "text-black" : "text-white"
              } hover:text-cyan-800 `}
            >
              NGO Partner
            </button>

            {/* Profile Circle */}
            {isLoggedIn && userInfo && (
              <div className="relative">
                <div
                  onClick={toggleProfileDropdown}
                  className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-600 to-purple-600 
                             text-white flex items-center justify-center font-bold cursor-pointer
                             hover:scale-105 transition-transform"
                >
                  {userInfo.name?.charAt(0)?.toUpperCase()}
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className={`md:hidden text-2xl ${
              isScrolled ? "text-black" : "text-white"
            }`}
            onClick={() => setState((p) => ({ ...p, menuOpen: !p.menuOpen }))}
          >
            <FiMenu />
          </button>
        </div>
      </nav>

      {/* ---------------- Mobile Menu ---------------- */}
      {menuOpen && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-end z-50">
          <div className="bg-white w-80 h-full shadow-xl p-5 animate-fadeIn">
            {/* Header */}
            <div className="flex justify-between items-center border-b pb-3 mb-3">
              <h2 className="text-lg font-bold">Account</h2>
              <button
                onClick={() => setState((p) => ({ ...p, menuOpen: false }))}
                className="text-gray-500 hover:text-red-500 text-lg"
              >
                <FiX />
              </button>
            </div>

            {/* User Info */}
            {isLoggedIn && userInfo && (
              <div className="flex items-center gap-3 border-b pb-3 mb-3">
                <div
                  className="w-12 h-12 rounded-full bg-gradient-to-r from-pink-600 to-purple-600 
                          text-white flex items-center justify-center font-bold text-xl"
                >
                  {userInfo.name?.charAt(0)?.toUpperCase()}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">{userInfo.name}</h3>
                  <p className="text-sm text-gray-500">{userInfo.email}</p>
                </div>
              </div>
            )}

            {/* Navigation Options */}
            <div className="flex flex-col gap-2">
              <Link
                to="/card2"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 rounded-lg font-semibold"
              >
                <FaHome className="text-gray-600" /> Home
              </Link>

              <button
                onClick={() => {
                  handleDonateOrRequest();
                  setMenuOpen(false);
                }}
                className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 rounded-lg font-semibold"
              >
                <FaHandHoldingHeart className="text-gray-600" /> Donate
              </button>

              <button
                onClick={() => {
                  handleDonateOrRequest();
                  setMenuOpen(false);
                }}
                className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 rounded-lg font-semibold"
              >
                <MdFoodBank className="text-gray-600" /> Request
              </button>

              <button
                onClick={() => {
                  openAdminLogin();
                  setMenuOpen(false);
                }}
                className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 rounded-lg font-semibold"
              >
                <RiAdminLine className="text-gray-600" /> Admin
              </button>

              <button
                onClick={() => {
                  openNGOLogin();
                  setMenuOpen(false);
                }}
                className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 rounded-lg font-semibold"
              >
                <GiLoveMystery className="text-gray-600" /> NGO Partner
              </button>

              {/* Extra Options */}
              <button
                onClick={openUserProfileModal}
                className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 rounded-lg font-semibold"
              >
                <FaUser className="text-gray-600" />
                <span>Profile</span>
              </button>

              <button
                onClick={openStatusModal}
                className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 rounded-lg font-semibold"
              >
                <FiBarChart2 className="text-gray-600" />
                <span>Status</span>
              </button>

              <button className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 rounded-lg font-semibold">
                <FiSettings className="text-gray-600" />
                <span>Settings</span>
              </button>

              <button className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 rounded-lg font-semibold">
                <FaMoon className="text-gray-600" />
                <span>Dark Mode</span>
              </button>

              <button
                onClick={handleLogout}
                className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 rounded-lg text-red-600 font-semibold"
              >
                <FiLogOut className="text-red-600" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Profile Dropdown Modal (Desktop) */}
      {showProfileDropdown && userInfo && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-end z-50">
          <div className="bg-white w-80 h-full md:h-auto md:rounded-2xl md:mt-16 md:mr-4 shadow-xl p-5 animate-fadeIn">
            {/* Close on backdrop click */}
            <div className="flex justify-between items-center border-b pb-3 mb-3">
              <h2 className="text-lg font-bold">Account</h2>
              <button
                onClick={() =>
                  setState((p) => ({ ...p, showProfileDropdown: false }))
                }
                className="text-gray-500 hover:text-red-500 text-lg"
              >
                ✕
              </button>
            </div>

            {/* User Info */}
            <div className="flex items-center gap-3 border-b pb-3 mb-3">
              <div
                className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 
                              text-white flex items-center justify-center font-bold text-xl"
              >
                {userInfo.name?.charAt(0)?.toUpperCase()}
              </div>
              <div>
                <h3 className="font-bold text-gray-900">{userInfo.name}</h3>
                <p className="text-sm text-gray-500">{userInfo.email}</p>
              </div>
            </div>

            {/* Options */}
            <div className="flex flex-col gap-2">
              <button
                onClick={openUserProfileModal}
                className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 rounded-lg"
              >
                <FaUser className="text-gray-600" />
                <span>Profile</span>
              </button>

              <button
                onClick={openStatusModal}
                className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 rounded-lg"
              >
                📊 Status
              </button>

              <button className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 rounded-lg">
                <FiSettings className="text-gray-600" />
                <span>Settings</span>
              </button>

              <button className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 rounded-lg">
                <FaMoon className="text-gray-600" />
                <span>Dark Mode</span>
              </button>

              <button
                onClick={handleLogout}
                className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 rounded-lg text-red-600"
              >
                <FiLogOut className="text-red-600" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ---------- Modals ---------- */}

      {/* NGO */}
      {showNGOSignup && (
        <SignupModal
          isOpen
          onClose={closeAllModals}
          onSwitchToLogin={openNGOLogin}
        />
      )}
      {showNGOLogin && (
        <LoginModal
          isOpen
          onClose={closeAllModals}
          onSwitchToSignup={openNGOSignup}
        />
      )}

      {/* USER */}
      {showUserLogin && (
        <UserLoginModal
          isOpen
          onClose={closeAllModals}
          onSwitchToSignup={openUserSignup}
        />
      )}
      {showUserSignup && (
        <UserSignupModal
          isOpen
          onClose={closeAllModals}
          onSwitchToLogin={openUserLogin}
        />
      )}

      {/* ADMIN */}
      {showAdminLogin && (
        <AdminLoginModal
          isOpen
          onClose={closeAllModals}
          onSwitchToSignup={openAdminSignup}
        />
      )}
      {showAdminSignup && (
        <AdminSignupModal
          isOpen
          onClose={closeAllModals}
          onSwitchToLogin={openAdminLogin}
        />
      )}

      {/* PROFILE */}
      {showUserProfileModal && userInfo && (
        <UserProfileModal
          isOpen={showUserProfileModal}
          onClose={closeUserProfileModal}
          user={userInfo}
        />
      )}

      {/* STATUS */}
      {showStatusModal && (
        <StatusModal
          setShowStatusModal={closeStatusModal}
          donateStatus="Approved" // DB se aayega
          requestStatus="Preparing" // DB se aayega
        />
      )}
    </>
  );
}

export default Navbar;

