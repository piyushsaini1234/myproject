// import React, { useState, useEffect } from "react";
// import Swal from "sweetalert2";

// function Hero2() {
//   const [donateOpen, setDonateOpen] = useState(false);
//   const [requestOpen, setRequestOpen] = useState(false);

//   // DonateFood state
//   const [Full_Name, setFull_Name] = useState("");
//   const [Phone_Number, setPhone_Number] = useState("");
//   const [Email, setEmail] = useState("");
//   const [Pickup_Address, setPickup_Address] = useState("");
//   const [Food_Type, setFood_Type] = useState("");
//   const [Item, setItem] = useState("");
//   const [Quantity, setQuantity] = useState("");
//   const [Pickup_Time, setPickup_Time] = useState("");
//   const [Date, setDate] = useState("");
//   // const [Image_Url, setImage_Url] = useState("");
//   const [Confirm_Fresh, setConfirm_Fresh] = useState(false);

//   // RequestFood state
//   const [RequestFull_Name, setRequestFull_Name] = useState("");
//   const [RequestPhone_Number, setRequestPhone_Number] = useState("");
//   const [RequestEmail, setRequestEmail] = useState("");
//   const [RequestLocation_Area, setRequestLocation_Area] = useState("");
//   const [RequestNumber_Of_People, setRequestNumber_Of_People] = useState("");
//   const [RequestFood_Type, setRequestFood_Type] = useState("");
//   const [RequestPreferred_Time, setRequestPreferred_Time] = useState("");
//   const [RequestUrgency_Level, setRequestUrgency_Level] = useState("");
//   const [RequestAdditional_Notes, setRequestAdditional_Notes] = useState("");
//   const [RequestDate, setRequestDate] = useState("");
//   const [Requestis_genuine, setRequestis_genuine] = useState(false);
//   // const [RequestDocument_Url, setRequestDocument_Url] = useState("");

//   useEffect(() => {
//     const token = localStorage.getItem("ngotoken");
//     if (!token) {
//       setDonateOpen(false);
//     }
//   }, [donateOpen]);
//   const handleDonateClick = () => {
//     const token = localStorage.getItem("ngotoken");
//     if (!token) {
//       Swal.fire({
//         icon: "warning",
//         title: "Login Required",
//         text: "Please login to donate food.",
//       });
//     } else {
//       setDonateOpen(true);
//     }
//   };
//   const handleRequestClick = () => {
//     const token = localStorage.getItem("ngotoken");
//     if (!token) {
//       Swal.fire({
//         icon: "warning",
//         title: "Login Required",
//         text: "Please login to Request food.",
//       });
//     } else {
//       setRequestOpen(true);
//     }
//   };

//   // DonateFood Submit
//   const DonateFood = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await fetch("http://localhost:5000/api/Donatefood", {
        
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           full_name: Full_Name,
//           phone_number: Phone_Number,
//           email: Email,
//           pickup_address: Pickup_Address,
//           food_description: Item,
//           food_type: Food_Type,
//           item: Item,
//           quantity: Quantity,
//           pickup_time: Pickup_Time,
//           date: Date,
//           confirm_fresh: Confirm_Fresh ? 1 : 0,
//           // image_url: "",
//         }),
//       });

//       const data = await res.json();

//       if (res.status === 201) {
//         Swal.fire("Success", "Thank you for donating food ❤️", "success");
//         // Reset
//         setFull_Name("");
//         setPhone_Number("");
//         setEmail("");
//         setPickup_Address("");
//         setFood_Type("");
//         setItem("");
//         setQuantity("");
//         setPickup_Time("");
//         setDate("");
//         // setImage_Url(null);
//         setConfirm_Fresh(false);
//         setDonateOpen(false);
//       } else {
//         Swal.fire("Error", data.message || "Donate food failed", "error");
//       }
//     } catch (err) {
//       Swal.fire("Error", "Please try again later.", "error");
//     }
//   };

//   // RequestFood Submit
//   const RequestFood = async (e) => {
//     e.preventDefault();
  

//     try {
//       const res = await fetch("http://localhost:5000/api/Requestfood", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           full_name: RequestFull_Name,
//           phone_number: RequestPhone_Number,
//           email: RequestEmail,
//           location_area: RequestLocation_Area,
//           number_of_people: RequestNumber_Of_People,
//           food_type: RequestFood_Type,
//           preferred_time: RequestPreferred_Time,
//           urgency_level: RequestUrgency_Level,
//           additional_notes: RequestAdditional_Notes,
//           request_date: RequestDate,
//           is_genuine: Requestis_genuine ? 1 : 0,
//         }),
//       });

//       const data = await res.json();

//       if (res.status === 201 || res.status === 200) {
//         Swal.fire("Success", "Thank you for requesting food ❤️", "success");
//         // Reset form
//         setRequestFull_Name("");
//         setRequestPhone_Number("");
//         setRequestEmail("");
//         setRequestLocation_Area("");
//         setRequestNumber_Of_People("");
//         setRequestFood_Type("");
//         setRequestPreferred_Time("");
//         setRequestUrgency_Level("");
//         setRequestAdditional_Notes("");
//         setRequestDate("");
//         setRequestis_genuine(false);
//         setRequestOpen(false);
//       } else if (res.status === 409) {
//         Swal.fire(
//           "Duplicate",
//           "You’ve already submitted a request for this date.",
//           "warning"
//         );
//       } else {
//         Swal.fire("Error", data.message || "Request failed", "error");
//       }
//     } catch (err) {
//       Swal.fire("Error", "Server error. Try again later.", "error");
//     }
//   };

//   return (
//     <>
//       {/* Hero Section */}
//       <section className="bg-yellow-400 py-16 px-6 text-center ">
//         <h1 className="text-4xl font-bold text-gray-800 mb-6">
//           About Zero Hunger
//         </h1>
//         <ul className="text-gray-700 mb-6 space-y-2 text-2xl">
//           <li>• What we do</li>
//           <li>• How you can help</li>
//         </ul>
//         <div className="flex justify-center space-x-4 gap-3 ">
//           <button
//             onClick={() => handleDonateClick()}
//             className="bg-lime-600 text-white px-6 py-3 rounded-xl hover:bg-lime-700 cursor-pointer"
//           >
//             Donate Food
//           </button>
//           <button
//             onClick={() => handleRequestClick()}
//             className="bg-orange-600 text-white px-6 py-3 rounded-xl hover:bg-orange-700 cursor-pointer"
//           >
//             Request Food
//           </button>
//         </div>
//       </section>

//       {/* Modal DonateFood */}
//       {donateOpen && (
        
//         <div className="fixed inset-0 mt-0 bg-opacity-30 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
//           <div className="bg-white rounded-2xl shadow-xl w-full max-w-screen-xl p-6 relative">
//             <button
//               onClick={() => setDonateOpen(false)}
//               className="absolute top-4 right-4 text-gray-500 text-2xl"
//             >
//               ×
//             </button>
//             <h2 className="text-3xl font-bold text-center text-green-700 mb-4">
//               Donate Food
//             </h2>
//             <form onSubmit={DonateFood} className="space-y-4">
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//                 <input
//                   value={Full_Name}
//                   onChange={(e) => setFull_Name(e.target.value)}
//                   className="border rounded-lg px-4 py-1 text-sm"
//                   placeholder="Full Name"
//                 />
//                 <input
//                   value={Phone_Number}
//                   onChange={(e) => setPhone_Number(e.target.value)}
//                   className="border rounded-lg px-4 py-1 text-sm"
//                   placeholder="Phone Number"
//                 />
//                 <input
//                   value={Email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   className="border rounded-lg px-4 py-1 text-sm"
//                   placeholder="Email (optional)"
//                 />
//                 <input
//                   value={Pickup_Address}
//                   onChange={(e) => setPickup_Address(e.target.value)}
//                   className="border rounded-lg px-4 py-1 text-sm"
//                   placeholder="Pickup Address"
//                 />

//                 <select
//                   value={Food_Type}
//                   onChange={(e) => setFood_Type(e.target.value)}
//                   className="border rounded-lg px-4 py-1 text-sm"
//                 >
//                   <option value="">Food Type</option>
//                   <option value="Cooked">Cooked</option>
//                   <option value="Packaged">Packaged</option>
//                   <option value="Uncooked">Uncooked</option>
//                 </select>

//                 <input
//                   value={Item}
//                   onChange={(e) => setItem(e.target.value)}
//                   className="border rounded-lg px-4 py-1 text-sm"
//                   placeholder=" Item like cooked Rice,Milk, raw vegetable Tamato "
//                 />

//                 <input
//                   value={Quantity}
//                   onChange={(e) => setQuantity(e.target.value)}
//                   className="border rounded-lg px-4 py-1 text-sm"
//                   placeholder="Quantity like 10 plates,  40 packs, 30 boxes"
//                 />
//                 <select
//                   value={Pickup_Time}
//                   onChange={(e) => setPickup_Time(e.target.value)}
//                   className="border rounded-lg px-4 py-1 text-sm"
//                 >
//                   <option value="">Pickup Time</option>
//                   <option>10:00 AM – 12:00 PM</option>
//                   <option>12:00 PM – 2:00 PM</option>
//                   <option>2:00 PM – 5:00 PM</option>
//                   <option>5:00 PM – 8:00 PM</option>
//                 </select>

//                 <input
//                   type="date"
//                   value={Date}
//                   onChange={(e) => setDate(e.target.value)}
//                   className="border rounded-lg px-4 py-1 text-sm"
//                   placeholder="Select date"
//                 />

//                 {/* <input
//                   type="file"
//                   onChange={(e) => setImage_Url(e.target.files[0])}
//                   className="  border rounded-lg px-4 py-1.5"
//                 /> */}
//               </div>

//               <div className="flex items-start gap-2 text-sm">
//                 <input
//                   type="checkbox"
//                   checked={Confirm_Fresh}
//                   onChange={(e) => setConfirm_Fresh(e.target.checked)}
//                 />
//                 <label className="text-sm">I confirm the food is fresh.</label>
//               </div>

//               <button
//                 type="submit"
//                 className="bg-lime-600 text-white font-semibold py-2 px-6 rounded-lg block mx-auto mt-4 "
//               >
//                 Submit Donation
//               </button>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* Modal RequestFood */}
//       {requestOpen && (
//         <div className="fixed inset-0 mt-0 bg-opacity-30 z-50 flex items-center justify-center p-4  bg-black/40 backdrop-blur-sm">
//           <div className="bg-white rounded-2xl shadow-xl w-full max-w-screen-xl p-6 relative">
//             <button
//               onClick={() => setRequestOpen(false)}
//               className="absolute top-4 right-4 text-gray-500 text-2xl"
//             >
//               ×
//             </button>
//             <h2 className="text-3xl font-bold text-center text-orange-600 mb-4">
//               Request Food
//             </h2>
//             <form onSubmit={RequestFood} className="space-y-4">
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//                 <input
//                   value={RequestFull_Name}
//                   onChange={(e) => setRequestFull_Name(e.target.value)}
//                   className="border rounded-lg px-4 py-1 text-sm"
//                   placeholder="Full Name"
//                 />
//                 <input
//                   value={RequestPhone_Number}
//                   onChange={(e) => setRequestPhone_Number(e.target.value)}
//                   className="border rounded-lg px-4 py-1 text-sm"
//                   placeholder="Phone Number"
//                 />
//                 <input
//                   value={RequestEmail}
//                   onChange={(e) => setRequestEmail(e.target.value)}
//                   className="border rounded-lg px-4 py-1 text-sm"
//                   placeholder="Email"
//                 />
//                 <input
//                   value={RequestLocation_Area}
//                   onChange={(e) => setRequestLocation_Area(e.target.value)}
//                   className="border rounded-lg px-4 py-1 text-sm"
//                   placeholder="Location / Area"
//                 />
//                 <input
//                   value={RequestNumber_Of_People}
//                   onChange={(e) => setRequestNumber_Of_People(e.target.value)}
//                   className="border rounded-lg px-4 py-1 text-sm"
//                   placeholder="Number of People"
//                 />
//                 <select
//                   value={RequestFood_Type}
//                   onChange={(e) => setRequestFood_Type(e.target.value)}
//                   className="border rounded-lg px-4 py-1 text-sm"
//                 >
//                   <option value="">Food Type</option>
//                   <option>Cooked</option>
//                   <option>Dry Ration</option>
//                   <option>Both</option>
//                 </select>
//                 <select
//                   value={RequestPreferred_Time}
//                   onChange={(e) => setRequestPreferred_Time(e.target.value)}
//                   className="border rounded-lg px-4 py-1 text-sm"
//                 >
//                   <option value="">Preferred Time</option>
//                   <option>Morning</option>
//                   <option>Afternoon</option>
//                   <option>Evening</option>
//                   <option>Any Time</option>
//                 </select>
//                 <select
//                   value={RequestUrgency_Level}
//                   onChange={(e) => setRequestUrgency_Level(e.target.value)}
//                   className="border rounded-lg px-4 py-1 text-sm"
//                 >
//                   <option value="">Urgency Level</option>
//                   <option>Immediate</option>
//                   <option>Within 24 hours</option>
//                   <option>Flexible</option>
//                 </select>
//                 <input
//                   type="date"
//                   value={RequestDate}
//                   onChange={(e) => setRequestDate(e.target.value)}
//                   className="border rounded-lg px-4 py-1 text-sm"
//                 />
//               </div>

//               <textarea
//                 value={RequestAdditional_Notes}
//                 onChange={(e) => setRequestAdditional_Notes(e.target.value)}
//                 placeholder="Additional Notes (optional)"
//                 className="border rounded-lg px-4 py-1 text-sm w-full"
//                 rows="1"
//               />

//               <div className="flex items-start gap-2 text-sm">
//                 <input
//                   type="checkbox"
//                   checked={Requestis_genuine}
//                   onChange={(e) => setRequestis_genuine(e.target.checked)}
//                 />
//                 <label>I confirm that this request is genuine.</label>
//               </div>

//               <button
//                 type="submit"
//                 className="bg-orange-600 text-white font-semibold py-2 px-6 rounded-lg block mx-auto mt-4"
//               >
//                 Submit Request
//               </button>
//             </form>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

// export default Hero2;

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
