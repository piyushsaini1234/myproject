import React, { useState } from "react";
import Swal from "sweetalert2";
import {
  CountrySelect,
  StateSelect,
  CitySelect,
} from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";

function RequestFoodForm({ closeModal }) {
  const [Full_Name, setFull_Name] = useState("");
  const [Phone_Number, setPhone_Number] = useState("");
  const [Aadhar_Number, setAadhar_Number] = useState("");
  const [Email, setEmail] = useState("");
  const [CountryVal, setCountryVal] = useState(null);
  const [StateVal, setStateVal] = useState(null);
  const [CityVal, setCityVal] = useState(null);
  const [FullAddress, setFullAddress] = useState(""); // House No, Village, Pincode
  const [Number_Of_People, setNumber_Of_People] = useState("");
  const [Food_Type, setFood_Type] = useState("");
  const [Preferred_Time, setPreferred_Time] = useState("");
  const [Urgency_Level, setUrgency_Level] = useState("");
  const [Additional_Notes, setAdditional_Notes] = useState("");
  const [RequestDate, setRequestDate] = useState("");
  const [is_genuine, setIs_genuine] = useState(false);

  const todayStr = new Date().toISOString().split("T")[0];

  // -------------------- FORM VALIDATION --------------------
  const validateForm = () => {
    if (!Full_Name || !/^[a-zA-Z\s]+$/.test(Full_Name)) {
      Swal.fire("Error", "Full Name is required and cannot contain numbers.", "error");
      return false;
    }

    if (!/^[6-9]\d{9}$/.test(Phone_Number)) {
      Swal.fire("Error", "Phone number must be 10 digits and start with 6,7,8,9.", "error");
      return false;
    }

    if (!/^[2-9]\d{11}$/.test(Aadhar_Number)) {
      Swal.fire("Error", "Aadhaar number must be 12 digits starting with 2-9.", "error");
      return false;
    }

    if (Email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(Email)) {
      Swal.fire("Error", "Invalid email format.", "error");
      return false;
    }

    if (!CountryVal || !StateVal || !CityVal || !FullAddress) {
      Swal.fire("Error", "Please complete your full address.", "error");
      return false;
    }

    if (!Number_Of_People || parseInt(Number_Of_People) <= 0) {
      Swal.fire("Error", "Number of People must be a positive number.", "error");
      return false;
    }

    if (!Food_Type) {
      Swal.fire("Error", "Please select a Food Type.", "error");
      return false;
    }

    if (!Preferred_Time) {
      Swal.fire("Error", "Please select a Preferred Time.", "error");
      return false;
    }

    if (!Urgency_Level) {
      Swal.fire("Error", "Please select an Urgency Level.", "error");
      return false;
    }

    if (!RequestDate) {
      Swal.fire("Error", "Please select a Request Date.", "error");
      return false;
    }

    const today = new Date();
    today.setHours(0,0,0,0);
    const selectedDate = new Date(RequestDate);
    if (selectedDate < today) {
      Swal.fire("Error", "Request Date cannot be in the past.", "error");
      return false;
    }

    if (!is_genuine) {
      Swal.fire("Error", "Please confirm this request is genuine.", "error");
      return false;
    }

    return true;
  };

  // -------------------- SUBMIT FUNCTION --------------------
  const RequestFood = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const location_area = `${FullAddress}, ${CityVal?.name}, ${StateVal?.name}, ${CountryVal?.name}`;

    try {
      const res = await fetch("http://localhost:5000/api/Requestfood", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: Full_Name,
          phone_number: Phone_Number,
          aadhar_number: Aadhar_Number,
          email: Email,
          location_area,
          number_of_people: Number_Of_People,
          food_type: Food_Type,
          preferred_time: Preferred_Time,
          urgency_level: Urgency_Level,
          additional_notes: Additional_Notes,
          request_date: RequestDate,
          is_genuine: is_genuine ? 1 : 0,
        }),
      });

      const data = await res.json();

      if (res.status === 201 || res.status === 200) {
        Swal.fire("Success", "Thank you for requesting food ❤️", "success");
        closeModal();
      } else if (res.status === 409) {
        Swal.fire("Duplicate", "You’ve already submitted a request for this date.", "warning");
      } else {
        Swal.fire("Error", data.message || "Request failed", "error");
      }
    } catch (err) {
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

        <h2 className="text-3xl font-bold text-center text-orange-600 mb-4">
          Request Food
        </h2>

        <form
          onSubmit={RequestFood}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
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
            placeholder="Email (optional)"
          />

          {/* Country / State / City */}
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

          {/* House No, Village, Pincode */}
          <input
            type="text"
            value={FullAddress}
            onChange={(e) => setFullAddress(e.target.value)}
            placeholder="House No, Village, Pincode"
            className="border rounded-lg px-4 py-1 text-sm col-span-full"
          />

          {/* Number of People */}
          <input
            value={Number_Of_People}
            onChange={(e) => setNumber_Of_People(e.target.value.replace(/\D/g, ""))}
            className="border rounded-lg px-4 py-1 text-sm"
            placeholder="Number of People"
          />

          {/* Food Type */}
          <select
            value={Food_Type}
            onChange={(e) => setFood_Type(e.target.value)}
            className="border rounded-lg px-4 py-1 text-sm"
          >
            <option value="">Food Type</option>
            <option>Cooked</option>
            <option>Dry Ration</option>
            <option>Both</option>
          </select>

          {/* Preferred Time */}
          <select
            value={Preferred_Time}
            onChange={(e) => setPreferred_Time(e.target.value)}
            className="border rounded-lg px-4 py-1 text-sm"
          >
            <option value="">Preferred Time</option>
            <option>Morning</option>
            <option>Afternoon</option>
            <option>Evening</option>
            <option>Any Time</option>
          </select>

          {/* Urgency Level */}
          <select
            value={Urgency_Level}
            onChange={(e) => setUrgency_Level(e.target.value)}
            className="border rounded-lg px-4 py-1 text-sm"
          >
            <option value="">Urgency Level</option>
            <option>Immediate</option>
            <option>Within 24 hours</option>
            <option>Flexible</option>
          </select>

          {/* Request Date */}
          <input
            type="date"
            min={todayStr}
            value={RequestDate}
            onChange={(e) => setRequestDate(e.target.value)}
            className="border rounded-lg px-4 py-1 text-sm"
          />

          {/* Notes */}
          <input
            type="text"
            value={Additional_Notes}
            onChange={(e) => setAdditional_Notes(e.target.value)}
            placeholder="Additional Notes (optional)"
            className="border rounded-lg px-4 py-1 text-sm "
          />

          {/* Genuine checkbox */}
          <div className="col-span-full flex items-start gap-2 text-sm">
            <input
              type="checkbox"
              checked={is_genuine}
              onChange={(e) => setIs_genuine(e.target.checked)}
            />
            <label>I confirm that this request is genuine.</label>
          </div>

          {/* Submit Button */}
          <div className="col-span-full flex justify-center mt-4">
            <button
              type="submit"
              className="bg-orange-600 text-white text-sm font-medium py-2 px-4 rounded-md hover:bg-orange-700 transition"
            >
              Submit Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RequestFoodForm;
