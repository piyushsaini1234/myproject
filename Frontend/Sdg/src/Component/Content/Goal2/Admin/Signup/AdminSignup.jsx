import React, { useState } from "react";
import Swal from "sweetalert2";

function AdminSignupModal({ isOpen, onClose, onSwitchToLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [cityState, setCityState] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
  

    try {
      const res = await fetch("http://localhost:5000/api/AdminSignup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name,
          email,
          phone_number: phoneNumber,
          address,
          city_state: cityState,
          password,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        Swal.fire("Success", data.message || "Registration successful!", "success");
        onClose(); 
        onSwitchToLogin(); 
      } else {
        Swal.fire("Error", data.message || "Something went wrong", "error");
      }
    } catch (err) {
      Swal.fire("Error", "Server not responding", "error");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 bg-black/30 backdrop-blur-sm">
      <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md w-[90%] max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-1 right-2 text-gray-500 text-xl hover:text-red-500"
        >
          ×
        </button>
        <h2 className="text-lg sm:text-xl font-bold mb-3 text-center text-cyan-700">
          Admin Signup
        </h2>
        <form onSubmit={handleRegister} className="space-y-2">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-1.5 text-sm border rounded focus:ring-1 focus:ring-cyan-500"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-1.5 text-sm border rounded focus:ring-1 focus:ring-cyan-500"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              placeholder="Enter Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full px-3 py-1.5 text-sm border rounded focus:ring-1 focus:ring-cyan-500"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Address
            </label>
            <input
              type="text"
              placeholder="Enter Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full px-3 py-1.5 text-sm border rounded focus:ring-1 focus:ring-cyan-500"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              City / State
            </label>
            <input
              type="text"
              placeholder="Enter City / State"
              value={cityState}
              onChange={(e) => setCityState(e.target.value)}
              className="w-full px-3 py-1.5 text-sm border rounded focus:ring-1 focus:ring-cyan-500"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="Create Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-1.5 text-sm border rounded focus:ring-1 focus:ring-cyan-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-cyan-600 text-white py-1.5 rounded hover:bg-cyan-700 mt-2"
          >
            Register
          </button>
          <p className="text-center text-xs text-gray-600 mt-2">
            Already registered?{" "}
            <span
              className="cursor-pointer text-cyan-600 hover:underline"
              onClick={onSwitchToLogin}
              
            >
              Login
            </span>

  
          </p>
        </form>
        
      </div>
    </div>
  );
}

export default AdminSignupModal;