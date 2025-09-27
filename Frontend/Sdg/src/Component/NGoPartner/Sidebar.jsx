import { useState } from "react";
import {
  Home,
  Heart,
  ClipboardList,
  User,
  Settings,
  Menu,
  X,
} from "lucide-react";

import DashboardCards from "./DashboardCards.jsx";
import DonationFood from "./DonationFood.jsx";
import RequestFood from "./RequestFood.jsx";
import NGOProfile from "./NGOProfile.jsx";

export default function Sidebar() {
  const [view, setView] = useState("Dashboard");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false); 

  const menuItems = [
    { label: "Dashboard", icon: <Home size={22} /> },
    { label: "Donations Food", icon: <Heart size={22} /> },
    { label: "Request Food", icon: <ClipboardList size={22} /> },
    { label: "NGOProfile", icon: <User size={22} /> },
    { label: "Settings", icon: <Settings size={22} /> },
  ];

  return (
    <>
      {/* Mobile Toggle */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="text-cyan-700"
        >
          {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        onClick={() => setIsOpen(!isOpen)} 
        className={`fixed top-0 left-0 h-full bg-white shadow-xl z-40
        flex flex-col py-6 transition-all duration-300 ease-in-out
        ${isOpen ? "w-48" : "w-16"}
        ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 cursor-pointer`}
      >
        {/* Menu Items */}
        <div className="flex flex-col space-y-4 mt-12 px-2">
          {menuItems.map((item) => (
            <button
              key={item.label}
              onClick={() => {
                setView(item.label);
                setMobileMenuOpen(false);
              }}
              className={`flex items-center text-gray-700 hover:text-cyan-600 px-2 py-2 rounded-md transition-colors ${
                view === item.label ? "bg-cyan-50 text-cyan-700" : ""
              }`}
            >
              {item.icon}
              {isOpen && (
                <span className="ml-3 text-sm font-medium">
                  {item.label === "NGOProfile" ? "Profile" : item.label}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div
        className={`mt-12 p-4 transition-all duration-300 ${
          isOpen ? "md:ml-48" : "md:ml-16"
        }`}
      >
        {view === "Dashboard" && <DashboardCards />}
        {view === "Donations Food" && <DonationFood />}
        {view === "Request Food" && <RequestFood />}
        {view === "NGOProfile" && <NGOProfile />}
        {view === "Settings" && <div className="p-4">Settings Page</div>}
      </div>
    </>
  );
}
