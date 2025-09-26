

import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import DonateFoodForm from "./DonateFoodForm";
import RequestFoodForm from "./RequestFoodForm";

function Hero2() {
  const [donateOpen, setDonateOpen] = useState(false);
  const [requestOpen, setRequestOpen] = useState(false);

  // Check login before opening modal
  const handleDonateClick = () => {
    const token = localStorage.getItem("ngotoken");
    if (!token) {
      Swal.fire({
        icon: "warning",
        title: "Login Required",
        text: "Please login to donate food.",
      });
    } else {
      setDonateOpen(true);
    }
  };

  const handleRequestClick = () => {
    const token = localStorage.getItem("ngotoken");
    if (!token) {
      Swal.fire({
        icon: "warning",
        title: "Login Required",
        text: "Please login to request food.",
      });
    } else {
      setRequestOpen(true);
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section className="bg-yellow-400 py-16 px-6 text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">
          About Zero Hunger
        </h1>
        <ul className="text-gray-700 mb-6 space-y-2 text-2xl">
          <li>• What we do</li>
          <li>• How you can help</li>
        </ul>
        <div className="flex justify-center gap-3">
          <button
            onClick={handleDonateClick}
            className="bg-lime-600 text-white px-6 py-3 rounded-xl hover:bg-lime-700"
          >
            Donate Food
          </button>
          <button
            onClick={handleRequestClick}
            className="bg-orange-600 text-white px-6 py-3 rounded-xl hover:bg-orange-700"
          >
            Request Food
          </button>

           <button
            onClick={() => window.location.href = "http://localhost:5173/"}
            className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700"
          >
            Donate Money
          </button>
        </div>
      </section>

      {/* Donate Modal */}
      {donateOpen && (
        <DonateFoodForm closeModal={() => setDonateOpen(false)} />
      )}

      {/* Request Modal */}
      {requestOpen && (
        <RequestFoodForm closeModal={() => setRequestOpen(false)} />
      )}
    </>
  );
}

export default Hero2;
