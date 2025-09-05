import React, { useEffect, useState } from "react";
import { format } from "date-fns";

const rowsPerPage = 3;

function AllNGOs() {
  const [ngoData, setNgoData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetch("http://localhost:5000/api/allngos")
      .then((res) => res.json())
      .then((data) => {
        setNgoData(data);
      })
      .catch((err) => {
        console.error("Failed to fetch NGO data", err);
      });
  }, []);

  const filteredData = ngoData.filter((ngo) =>
    `${ngo.ngo_name} ${ngo.email} ${ngo.address}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentData = filteredData.slice(startIndex, startIndex + rowsPerPage);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="max-w-7xl mx-auto mt-10 px-4">
      <div className="bg-white rounded-2xl shadow-md shadow-top border border-gray-200 p-6">
        <h2 className="text-2xl font-bold text-green-700 mb-4">
          Registered NGOs
        </h2>

        <input
          type="text"
          placeholder="Search by name, address or email..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-full max-w-xs mb-4 px-4 py-1 border border-gray-300 rounded-lg focus:outline-none shadow-sm"
        />

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-700">
            <thead className="bg-gray-100 text-gray-600 text-sm">
              <tr>
                <th className="py-2 px-4">Id</th>
                <th className="py-2 px-4">Name</th>
                <th className="py-2 px-4">Email</th>
                <th className="py-2 px-4">Phone</th>
                <th className="py-2 px-4">Address</th>
                <th className="py-2 px-4">City / State</th>
                <th className="py-2 px-4">Created At</th>
              </tr>
            </thead>
            <tbody>
              {currentData.length > 0 ? (
                currentData.map((ngo, index) => (
                  <tr
                    key={index}
                    className="border-t border-gray-200 hover:bg-gray-50 transition duration-150"
                  >
                    <td className="py-2 px-4">{startIndex + index + 1}</td>
                    <td className="py-2 px-4">{ngo.ngo_name}</td>
                    <td className="py-2 px-4">{ngo.email}</td>
                    <td className="py-2 px-4">{ngo.phone_number}</td>
                    <td className="py-2 px-4">{ngo.address}</td>
                    <td className="py-2 px-4">{ngo.city_state}</td>
                    <td className="py-2 px-4">
                      {format(new Date(ngo.created_at), "dd MMM yyyy, hh:mm a")}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center py-4 text-gray-500">
                    No NGOs found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-end mt-6 space-x-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-3 py-1 rounded-md border ${
              currentPage === 1
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "hover:bg-green-100 text-gray-700"
            }`}
          >
            Prev
          </button>

          <button
            className="px-3 py-1 border rounded-md bg-green-600 text-white"
            disabled
          >
            {currentPage}
          </button>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 rounded-md border ${
              currentPage === totalPages
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "hover:bg-green-100 text-gray-700"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default AllNGOs;
