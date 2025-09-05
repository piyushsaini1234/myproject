// import React, { useEffect, useState } from "react";

// function FoodRequest() {
//   const [requests, setRequests] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const rowsPerPage = 3;

//   useEffect(() => {
//     fetch("http://localhost:5000/api/requestfood")
//       .then((res) => res.json())
//       .then((data) => setRequests(data))
//       .catch((err) => console.error("Error fetching data:", err));
//   }, []);

//   const filteredRequests = requests.filter((r) =>
//     [r.full_name, r.email, r.location_area, r.food_type]
//       .join(" ")
//       .toLowerCase()
//       .includes(searchTerm.toLowerCase())
//   );

//   const indexOfLast = currentPage * rowsPerPage;
//   const indexOfFirst = indexOfLast - rowsPerPage;
//   const currentRows = filteredRequests.slice(indexOfFirst, indexOfLast);
//   const totalPages = Math.ceil(filteredRequests.length / rowsPerPage);

//   return (
//     <div className="p-6 m-3 shadow rounded-xl bg-white">
//       <h2 className="text-2xl font-bold mb-4 text-orange-600">
//         Food Request Records
//       </h2>

//       {/* Search Input */}
//       <div className="flex justify-between items-center mb-4">
//         <input
//           type="text"
//           placeholder="Search by name, email, location..."
//           value={searchTerm}
//           onChange={(e) => {
//             setSearchTerm(e.target.value);
//             setCurrentPage(1);
//           }}
//            className="px-4 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-600 w-full max-w-xs"
//         />
//       </div>

//       {/* Table */}
//       <div className="overflow-x-auto">
//         <table className="min-w-full text-sm text-left border-collapse rounded-lg overflow-hidden">
//   <thead className="bg-yellow-100 text-gray-700 text-sm">
//     <tr>
//       {[
//         "Full Name", "Phone", "Email", "Location", "People", "Food Type",
//         "Preferred Time", "Urgency", "Genuine?", "Date", "Status"
//       ].map((head, idx) => (
//         <th key={idx} className="px-4 py-3 font-semibold">
//           {head}
//         </th>
//       ))}
//     </tr>
//   </thead>
//   <tbody className="divide-y divide-gray-200">
//     {currentRows.length > 0 ? (
//       currentRows.map((r, i) => (
//         <tr key={i} className="hover:bg-gray-50 text-gray-800 transition">
//           <td className="px-4 py-2">{r.full_name}</td>
//           <td className="px-4 py-2">{r.phone_number}</td>
//           <td className="px-4 py-2">{r.email}</td>
//           <td className="px-4 py-2">{r.location_area}</td>
//           <td className="px-4 py-2">{r.number_of_people}</td>
//           <td className="px-4 py-2">{r.food_type}</td>
//           <td className="px-4 py-2">{r.preferred_time}</td>
//           <td className="px-4 py-2">{r.urgency_level}</td>
//           <td className="px-4 py-2">
//             {r.is_genuine ? (
//               <span className="bg-green-100 text-green-600 px-2 py-1 rounded-full text-xs font-medium">
//                 Yes
//               </span>
//             ) : (
//               <span className="bg-red-100 text-red-600 px-2 py-1 rounded-full text-xs font-medium">
//                 No
//               </span>
//             )}
//           </td>
//           <td className="px-4 py-2">{r.request_date?.split("T")[0]}</td>
//           <td className="px-4 py-2">
//             {r.status === "Pending" && (
//               <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-xs font-medium">
//                 Pending
//               </span>
//             )}
//             {r.status === "In Progress" && (
//               <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">
//                 In Progress
//               </span>
//             )}
//             {r.status === "Completed" && (
//               <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
//                 Completed
//               </span>
//             )}
//           </td>
//         </tr>
//       ))
//     ) : (
//       <tr>
//         <td colSpan={11} className="text-center py-4 text-gray-500">
//           No matching records found.
//         </td>
//       </tr>
//     )}
//   </tbody>
// </table>

//         {/* Pagination Controls */}
//         <div className="flex justify-center items-center gap-4 mt-6 ">
//           <button
//             onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//             disabled={currentPage === 1}
//             className="px-4 py-1 border rounded hover:bg-gray-100 disabled:opacity-40"
//           >
//             Prev
//           </button>
//           <span className="font-medium">
//             Page {currentPage} of {totalPages}
//           </span>
//           <button
//             onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
//             disabled={currentPage === totalPages}
//             className="px-4 py-1 border rounded hover:bg-gray-100 disabled:opacity-40"
//           >
//             Next
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default FoodRequest;

import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

function RequestFood() {
  const [requestData, setRequestData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [updatingIndex, setUpdatingIndex] = useState(null);
  const rowsPerPage = 3;

  useEffect(() => {
    fetch("http://localhost:5000/api/Requestfood")
      .then((res) => res.json())
      .then((data) => setRequestData(data))
      .catch((err) => console.error("Error fetching request data:", err));
  }, []);

  const updateRequestStatus = async (index, newStatus) => {
    const item = requestData[index];
    setUpdatingIndex(index);

    try {
      const res = await fetch(
        `http://localhost:5000/api/request?id=${item.id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      if (res.ok) {
        const updated = [...requestData];
        updated[index].status = newStatus;
        setRequestData(updated);
        Swal.fire({
          icon: "success",
          title: "Status Updated",
          text: `Status changed to ${newStatus}`,
          timer: 1500,
          showConfirmButton: false,
        });
      } else {
        throw new Error("Backend failed");
      }
    } catch (error) {
      Swal.fire("Error", "Failed to update status", "error");
    } finally {
      setUpdatingIndex(null);
    }
  };

  const filteredData = requestData.filter((data) =>
    [data.full_name, data.location_area, data.food_type]
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const indexOfLast = currentPage * rowsPerPage;
  const indexOfFirst = indexOfLast - rowsPerPage;
  const currentRows = filteredData.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  const statusOptions = [
    { label: "Requested", icon: "📝" },
    { label: "Approved", icon: "✅" },
    { label: "Preparing", icon: "🍲" },
    { label: "Out for Delivery", icon: "🚚" },
    { label: "Delivered", icon: "📦" },
  ];

  return (
    <div className="p-6 m-3 bg-white rounded-2xl shadow-md border border-gray-200">
      <h2 className="text-2xl font-bold mb-4 text-indigo-700">
        Food Request Records
      </h2>

      {/* Search */}
      <div className="flex justify-start mb-4">
        <input
          type="text"
          placeholder="Search by name, location or food..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          className="px-4 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-400 w-full max-w-xs"
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
                "Location",
                "People",
                "Food Type",
                "Preferred Time",
                "Urgency",
                "Request Date",
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
      <tr key={data.id} className="hover:bg-gray-50 text-gray-800 transition">
        <td className="px-4 py-2">{data.id}</td>
        <td className="px-4 py-2">{data.full_name}</td>
        <td className="px-4 py-2">{data.phone_number}</td>
        <td className="px-4 py-2">{data.email}</td>
        <td className="px-4 py-2">{data.location_area}</td>
        <td className="px-4 py-2">{data.number_of_people}</td>
        <td className="px-4 py-2">{data.food_type}</td>
        <td className="px-4 py-2">{data.preferred_time}</td>
        <td className="px-4 py-2">{data.urgency_level}</td>
        <td className="px-4 py-2 whitespace-nowrap min-w-[160px]">
          {new Date(data.request_date).toLocaleString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          })}
        </td>
        <td className="px-4 py-2">
          <select
            value={data.status}
            onChange={(e) => updateRequestStatus(realIndex, e.target.value)}   // ✅ use realIndex
            disabled={updatingIndex === realIndex}
            className={`px-2 py-1 rounded text-sm ${
              updatingIndex === realIndex ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {statusOptions.map((option, i) => (
              <option key={i} value={option.label}>
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
          <span className="text-sm font-medium px-3 py-1 rounded border border-indigo-500 text-indigo-600 bg-indigo-50">
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

export default RequestFood;
