import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function LoginModal({ isOpen, onClose, onSwitchToSignup }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/ngopartner/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("ngotoken", data.token);
        localStorage.setItem("ngouser", JSON.stringify(data.user)); 
        Swal.fire("Success", data.message, "success");

        setTimeout(() => {
          onClose();
          navigate("/NGoPartner");
        }, 1600);
      } else {
        Swal.fire("Error", data.message, "error");
      }
    } catch (err) {
      Swal.fire("Error", "Server not responding", "error");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 bg-black/30 backdrop-blur-sm">
      <div className="bg-white p-4 rounded-xl shadow-md w-[90%] max-w-md relative">
        <button onClick={onClose} className="absolute top-1 right-2 text-xl text-gray-500">×</button>
        <h2 className="text-xl font-bold text-center text-cyan-700 mb-4">NGO Login</h2>

        <form onSubmit={handleLogin} className="space-y-3">
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Email" required className="w-full border rounded px-3 py-2" />

          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Password" required className="w-full border rounded px-3 py-2" />

          <button type="submit" className="w-full bg-cyan-600 text-white py-2 rounded hover:bg-cyan-700">
            Login
          </button>

          <p className="text-xs text-center">
            Don’t have an account?{" "}
            <span onClick={onSwitchToSignup} className="text-blue-600 cursor-pointer">Sign up</span>
          </p>
        </form>
      </div>
    </div>
  );
}
