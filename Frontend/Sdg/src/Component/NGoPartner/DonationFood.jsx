// import React, { useState, useEffect } from "react";

// export default function DonationFood() {
//   const [donationData, setDonationData] = useState([]);

//   useEffect(() => {
//     fetch("http://localhost:5000/api/DonateFood")
//       .then((res) => res.json())
//       .then((data) => {
//         setDonationData(data);
//       })
//       .catch((err) => console.error("Error fetching donations:", err));
//   }, []);

//   const toggleFresh = (index, value) => {
//     const updated = [...donationData];
//     updated[index].fresh = value;
//     setDonationData(updated);
//   };

//   const cycleStatus = (index) => {
//     const statuses = ["Pending", "In Progress", "Completed"];
//     const updated = [...donationData];
//     const current = updated[index].status || "Pending";
//     const next = statuses[(statuses.indexOf(current) + 1) % statuses.length];
//     updated[index].status = next;
//     setDonationData(updated);
//   };

//   return (
//     <div className="p-6 m-3 shadow rounded-lg">
//       <h2 className="text-2xl font-bold mb-4 text-green-700">
//         Food Donation Records
//       </h2>

//       <div className="overflow-x-auto">
//         <table className="min-w-full border border-gray-200 text-sm">
//           <thead className="bg-green-100 text-gray-700">
//             <tr>
//               <th className="p-3 border">Full Name</th>
//               <th className="p-3 border">Phone Number</th>
//               <th className="p-3 border">Email</th>
//               <th className="p-3 border">Pickup Address</th>
//               <th className="p-3 border">Food Type</th>
//               <th className="p-3 border">Item</th>
//               <th className="p-3 border">Quantity</th>
//               <th className="p-3 border">Pickup Time</th>
//               <th className="p-3 border">Date</th>
//               <th className="p-3 border">Fresh?</th>
//               <th className="p-3 border">Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {donationData.map((data, index) => (
//               <tr key={index} className="hover:bg-green-50">
//                 <td className="p-3 border">{data.full_name}</td>
//                 <td className="p-3 border">{data.phone_number}</td>
//                 <td className="p-3 border">{data.email}</td>
//                 <td className="p-3 border">{data.pickup_address}</td>
//                 <td className="p-3 border">{data.food_type}</td>
//                 <td className="p-3 border">{data.item}</td>
//                 <td className="p-3 border">{data.quantity}</td>
//                 <td className="p-3 border">{data.pickup_time}</td>
//                 <td className="p-3 border">{data.date}</td>
//                 <td className="p-3 border">
//                   <div className="flex gap-1">
//                     <button
//                       onClick={() => toggleFresh(index, true)}
//                       className={`px-3 py-1 text-xs rounded-full border ${
//                         data.confirm_fresh
//                           ? "bg-green-500 text-white"
//                           : "bg-gray-100 text-gray-700 hover:bg-green-100"
//                       }`}
//                     >
//                       Yes
//                     </button>
//                     <button
//                       onClick={() => toggleFresh(index, false)}
//                       className={`px-3 py-1 text-xs rounded-full border ${
//                         !data.confirm_fresh
//                           ? "bg-red-500 text-white"
//                           : "bg-gray-100 text-gray-700 hover:bg-red-100"
//                       }`}
//                     >
//                       No
//                     </button>
//                   </div>
//                 </td>
//                 <td className="p-3 border">
//                   <button
//                     onClick={() => cycleStatus(index)}
//                     className={`px-2 py-1 rounded-full text-xs font-medium ${
//                       data.status === "Completed"
//                         ? "bg-green-100 text-green-700"
//                         : data.status === "Pending"
//                         ? "bg-yellow-100 text-yellow-700"
//                         : "bg-blue-100 text-blue-700"
//                     }`}
//                   >
//                     {data.status || "Pending"}
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

function DonationFood() {
  const [donationData, setDonationData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 3;

  useEffect(() => {
    fetch("http://localhost:5000/api/DonateFood")
      .then((res) => res.json())
      .then((data) => setDonationData(data))
      .catch((err) => console.error("Error fetching donations:", err));
  }, []);

  const toggleFresh = async (index, value) => {
    const item = donationData[index];
    const res = await fetch(
      `http://localhost:5000/api/donate/update-fresh?id=${item.id}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ confirm_fresh: value }),
      }
    );
    if (res.ok) {
      const updated = [...donationData];
      updated[index].confirm_fresh = value;
      setDonationData(updated);
      Swal.fire({
        icon: "success",
        title: "Updated",
        text: `Freshness marked as ${value ? "Yes" : "No"}`,
        timer: 1500,
        showConfirmButton: false,
      });
    } else {
      Swal.fire("Error", "Could not update freshness", "error");
    }
  };

  const cycleStatus = async (index, newStatus) => {
    const item = donationData[index];
    const res = await fetch(`http://localhost:5000/api/donate?id=${item.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });

    if (res.ok) {
      const updated = [...donationData];
      updated[index].status = newStatus;
      setDonationData(updated);
      Swal.fire({
        icon: "success",
        title: "Status Updated",
        text: `Status changed to ${newStatus}`,
        timer: 1500,
        showConfirmButton: false,
      });
    } else {
      Swal.fire("Error", "Status update failed", "error");
    }
  };

  const statusOptions = [
    { label: "Donated", icon: "🧺" },
    { label: "Approved", icon: "✅" },
    { label: "Picked Up", icon: "🚚" },
    { label: "Completed", icon: "📦" },
  ];

  const filteredData = donationData.filter((data) =>
    [data.full_name, data.pickup_address, data.item]
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const indexOfLast = currentPage * rowsPerPage;
  const indexOfFirst = indexOfLast - rowsPerPage;
  const currentRows = filteredData.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  return (
    <div className="p-6 m-3 bg-white rounded-2xl shadow-md border border-gray-200">
      <h2 className="text-2xl font-bold mb-4 text-green-700">
        Food Donation Records
      </h2>

      {/* Search */}
      <div className="flex justify-start mb-4">
        <input
          type="text"
          placeholder="Search by name, address or item..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          className="px-4 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-400 w-full max-w-xs"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left border-collapse">
          <thead className="bg-gray-100 text-gray-700 text-sm">
            <tr>
              {[
                "Id",
                "Full Name",
                "Phone",
                "Email",
                "Pickup Address",
                "Food Type",
                "Item",
                "Quantity",
                "Pickup Time",
                "Date",
                "Fresh?",
                "Status",
              ].map((header, i) => (
                <th key={i} className="px-4 py-3 font-semibold">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {currentRows.map((data, index) => {
              const realIndex = indexOfFirst + index; 

              return (
                <tr
                  key={data.id}
                  className="hover:bg-gray-50 text-gray-800 transition"
                >
                  <td className="px-4 py-2">{data.id}</td>
                  <td className="px-4 py-2">{data.full_name}</td>
                  <td className="px-4 py-2">{data.phone_number}</td>
                  <td className="px-4 py-2">{data.email}</td>
                  <td className="px-4 py-2">{data.pickup_address}</td>
                  <td className="px-4 py-2">{data.food_type}</td>
                  <td className="px-4 py-2">{data.item}</td>
                  <td className="px-4 py-2">{data.quantity}</td>
                  <td className="px-4 py-2 whitespace-nowrap min-w-[160px]">
                    {data.pickup_time}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap min-w-[160px]">
                    {new Date(data.date).toLocaleString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  </td>

                  {/* Fresh Toggle */}
                  <td className="px-4 py-2">
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={data.confirm_fresh === 1}
                        onChange={(e) =>
                          toggleFresh(realIndex, e.target.checked ? 1 : 0)  // use realIndex
                        }
                        className="hidden peer"
                      />
                      <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-green-400 rounded-full peer dark:bg-gray-400 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500 relative"></div>
                      <span className="ml-2 text-sm text-gray-600">
                        {data.confirm_fresh ? "Yes" : "No"}
                      </span>
                    </label>
                  </td>

                  {/* Status */}
                  <td className="px-4 py-2">
                    <select
                      value={data.status}
                      onChange={(e) => cycleStatus(realIndex, e.target.value)} // 
                      use realIndex
                      className="px-3 py-1 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                    >
                      {statusOptions.map((option) => (
                        <option key={option.label} value={option.label}>
                          {option.icon} {option.label}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-center items-center gap-4 mt-6">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-1 text-sm rounded border border-gray-300 hover:bg-gray-100 disabled:opacity-50"
          >
            Prev
          </button>
          <span className="text-sm font-medium px-3 py-1 rounded border border-blue-500 text-blue-600 bg-blue-50">
            {currentPage}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-4 py-1 text-sm rounded border border-gray-300 hover:bg-gray-100 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default DonationFood;