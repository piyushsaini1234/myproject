import React, { useState } from "react";
import Swal from "sweetalert2";
import {
  CountrySelect,
  StateSelect,
  CitySelect,
} from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";

function DonateFoodForm({ closeModal }) {
  const [Full_Name, setFull_Name] = useState("");
  const [Phone_Number, setPhone_Number] = useState("");
  const [Aadhar_Number, setAadhar_Number] = useState("");
  const [Email, setEmail] = useState("");
  const [CountryVal, setCountryVal] = useState(null);
  const [StateVal, setStateVal] = useState(null);
  const [CityVal, setCityVal] = useState(null);
  const [Village, setVillage] = useState("");
  const [Food_Type, setFood_Type] = useState("");
  const [Item, setItem] = useState("");
  const [Quantity, setQuantity] = useState("");
  const [Pickup_Time, setPickup_Time] = useState("");
  const [Pickup_Date, setPickup_Date] = useState("");
  const [Confirm_Fresh, setConfirm_Fresh] = useState(false);

  const todayStr = new Date().toISOString().split("T")[0];

  // -------------------- FORM VALIDATION --------------------
  const validateForm = () => {
    if (!Full_Name || !/^[a-zA-Z\s]+$/.test(Full_Name)) {
      Swal.fire("Error", "Full Name is required and cannot contain numbers.", "error");
      return false;
    }

    if (!/^[6-9]\d{9}$/.test(Phone_Number)) {
      Swal.fire("Error", "Phone number must be 10 digits and start with 6, 7, 8, or 9.", "error");
      return false;
    }

    if (!/^[2-9]\d{11}$/.test(Aadhar_Number)) {
      Swal.fire("Error", "Aadhar number must be exactly 12 digits and start with 2-9.", "error");
      return false;
    }

    if (Email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(Email)) {
      Swal.fire("Error", "Invalid email format.", "error");
      return false;
    }

    if (!CountryVal || !StateVal || !CityVal) {
      Swal.fire("Error", "Please select Country, State, and City.", "error");
      return false;
    }

    if (!Village) {
      Swal.fire("Error", "Please enter a Village/Locality.", "error");
      return false;
    }

    if (!Food_Type) {
      Swal.fire("Error", "Please select a Food Type.", "error");
      return false;
    }

    if (!Item) {
      Swal.fire("Error", "Please enter the food Item.", "error");
      return false;
    }

    if (!Quantity || Number(Quantity) <= 0) {
      Swal.fire("Error", "Quantity must be a positive number.", "error");
      return false;
    }

    if (!Pickup_Time) {
      Swal.fire("Error", "Please select a Pickup Time.", "error");
      return false;
    }

    if (!Pickup_Date || Pickup_Date < todayStr) {
      Swal.fire("Error", "Pickup Date cannot be in the past.", "error");
      return false;
    }

    if (!Confirm_Fresh) {
      Swal.fire("Error", "Please confirm the food is fresh.", "error");
      return false;
    }

    return true;
  };

  // -------------------- SUBMIT FUNCTION --------------------
  const DonateFood = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const res = await fetch("http://localhost:5000/api/Donatefood", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: Full_Name,
          phone_number: Phone_Number,
          aadhar_number: Aadhar_Number,
          email: Email,
          pickup_address: `${CountryVal?.name}, ${StateVal?.name}, ${CityVal?.name}, ${Village}`,
          food_type: Food_Type,
          item: Item,
          quantity: Quantity,
          pickup_time: Pickup_Time,
          date: Pickup_Date,
          confirm_fresh: Confirm_Fresh ? 1 : 0,
        }),
      });

      const data = await res.json();
      console.log("Response:", res.status, data);

      if (res.status === 201 || res.status === 200) {
        Swal.fire("Success", "Thank you for donating food ❤️", "success");
        closeModal();
      } else if (res.status === 409) {
        Swal.fire("Duplicate", "You’ve already submitted a donate for this date.", "warning");
      } else {
        Swal.fire("Error", data.message || "Donate failed", "error");
      }
    } catch (err) {
      console.error("Error:", err);
      Swal.fire("Error", "Server error. Try again later.", "error");
    }
  };

  // -------------------- RENDER --------------------
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-screen-xl p-6 relative">
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-gray-500 text-2xl"
        >
          ×
        </button>

        <h2 className="text-3xl font-bold text-center text-green-700 mb-4">
          Donate Food
        </h2>

        <form
          onSubmit={DonateFood}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {/* Full Name */}
          <input
            value={Full_Name}
            onChange={(e) => setFull_Name(e.target.value.replace(/[0-9]/g, ""))}
            className="border rounded-lg px-4 py-1 text-sm"
            placeholder="Full Name"
          />

          {/* Phone Number */}
          <input
            value={Phone_Number}
            onChange={(e) => {
              const val = e.target.value.replace(/\D/g, "");
              if (val.length <= 10) setPhone_Number(val);
            }}
            maxLength={10}
            className="border rounded-lg px-4 py-1 text-sm"
            placeholder="Phone Number"
          />

          {/* Aadhaar */}
          <input
            value={Aadhar_Number}
            onChange={(e) => {
              const val = e.target.value.replace(/\D/g, "");
              if (val.length <= 12) setAadhar_Number(val);
            }}
            maxLength={12}
            className="border rounded-lg px-4 py-1 text-sm"
            placeholder="Aadhaar Number"
          />

          {/* Email */}
          <input
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
            className="border rounded-lg px-4 py-1 text-sm"
            placeholder="Email"
          />

          {/* Country, State, City */}
<CountrySelect
  value={CountryVal}
  onChange={setCountryVal}
  placeHolder="Select Country"
  className="border rounded-lg px-4 py-1 text-sm"
/>

<StateSelect
  countryid={CountryVal?.id}
  value={StateVal}
  onChange={setStateVal}
  placeHolder="Select State"
  className="border rounded-lg px-4 py-1 text-sm"
/>

<CitySelect
  countryid={CountryVal?.id}
  stateid={StateVal?.id}
  value={CityVal}
  onChange={setCityVal}
  placeHolder="Select City / District"
  className="border rounded-lg px-4 py-1 text-sm"
/>

          {/* Village */}
          <input
            value={Village}
            onChange={(e) => setVillage(e.target.value)}
            className="border rounded-lg px-4 py-1 text-sm"
            placeholder="Colony, House No., Village"
          />

          {/* Food Type */}
          <select
            value={Food_Type}
            onChange={(e) => setFood_Type(e.target.value)}
            className="border rounded-lg px-4 py-1 text-sm"
          >
            <option value="">Food Type</option>
            <option value="Cooked">Cooked</option>
            <option value="Packaged">Packaged</option>
            <option value="Uncooked">Uncooked</option>
          </select>

          {/* Item */}
          <input
            value={Item}
            onChange={(e) => setItem(e.target.value)}
            className="border rounded-lg px-4 py-1 text-sm"
            placeholder="Item like Rice, Milk, etc."
          />

          {/* Quantity (number only) */}
          <input
            type="number"
            value={Quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="border rounded-lg px-4 py-1 text-sm"
            placeholder="Quantity (e.g., 10)"
          />

          {/* Pickup Time */}
          <select
            value={Pickup_Time}
            onChange={(e) => setPickup_Time(e.target.value)}
            className="border rounded-lg px-4 py-1 text-sm"
          >
            <option value="">Pickup Time</option>
            <option>10:00 AM – 12:00 PM</option>
            <option>12:00 PM – 2:00 PM</option>
            <option>2:00 PM – 5:00 PM</option>
            <option>5:00 PM – 8:00 PM</option>
          </select>

          {/* Pickup Date */}
          <input
            type="date"
            min={todayStr}
            value={Pickup_Date}
            onChange={(e) => setPickup_Date(e.target.value)}
            className="border rounded-lg px-4 py-1 text-sm"
          />

          {/* Fresh Checkbox */}
          <div className="col-span-full flex items-start gap-2 text-sm">
            <input
              type="checkbox"
              checked={Confirm_Fresh}
              onChange={(e) => setConfirm_Fresh(e.target.checked)}
            />
            <label>I confirm the food is fresh.</label>
          </div>

          {/* Submit */}
          <div className="col-span-full flex justify-center mt-4">
            <button
              type="submit"
              className="bg-lime-600 text-white text-sm font-medium py-2 px-4 rounded-md hover:bg-lime-700 transition"
            >
              Submit Donation
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default DonateFoodForm;

