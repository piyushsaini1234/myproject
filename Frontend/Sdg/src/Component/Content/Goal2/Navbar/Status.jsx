import React, { useEffect, useState } from "react";

const stepsDonation = ["Donated", "Approved", "Picked Up", "Completed"];
const stepsRequest = [
  "Requested",
  "Approved",
  "Preparing",
  "Out for Delivery",
  "Delivered",
];

const StatusModal = ({ setShowStatusModal }) => {
  const [donations, setDonations] = useState([]);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError(" No token found, please login again.");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    fetch("http://localhost:5000/api/status", {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch status");
        return res.json();
      })
      .then((data) => {
        console.log("API Response:", data);
        setDonations(data.donations || []);
        setRequests(data.requests || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching status:", err);
        setError("Unable to fetch status. Please try again later.");
        setLoading(false);
      });
  }, []);

  const Step = ({ active, label }) => (
    <div className="flex flex-col items-center w-full">
      <div
        className={`w-6 h-6 flex items-center justify-center rounded-full border-2 ${
          active
            ? "bg-blue-600 border-blue-600 text-white"
            : "bg-gray-200 border-gray-400 text-gray-500"
        }`}
      >
        ✓
      </div>
      <span className="mt-2 text-xs text-gray-700">{label}</span>
    </div>
  );

  const isStepActive = (allSteps, currentStatus, idx) => {
    const currentIndex = allSteps.findIndex(
      (s) => s.toLowerCase() === currentStatus?.toLowerCase()
    );
    return currentIndex >= idx;
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleString();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white p-6 rounded-2xl shadow-xl w-[90%] max-w-lg overflow-y-auto max-h-[90vh]">
        <h2 className="text-xl font-semibold mb-6 text-center text-gray-800">
          📊 My Status Tracking
        </h2>

        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <>
            {/* Donation Tracking */}
            {donations.length > 0 ? (
              donations.map((donation) => (
                <div key={donation.id} className="mb-8">
                  <h3 className="text-lg font-semibold text-blue-600 mb-1">
                    🍲 Donation (ID: {donation.id})
                  </h3>
                  <p className="text-xs text-gray-500 mb-3">
                    Date: {formatDate(donation.date)}
                  </p>
                  <div className="flex items-center justify-between">
                    {stepsDonation.map((step, idx) => (
                      <React.Fragment key={step}>
                        <Step
                          label={step}
                          active={isStepActive(
                            stepsDonation,
                            donation.status,
                            idx
                          )}
                        />
                        {idx < stepsDonation.length - 1 && (
                          <div
                            className={`flex-1 h-1 ${
                              isStepActive(stepsDonation, donation.status, idx)
                                ? "bg-blue-600"
                                : "bg-gray-300"
                            }`}
                          ></div>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500 mb-6">No Donations Found</p>
            )}

            {/* Request Tracking */}
            {requests.length > 0 ? (
              requests.map((request) => (
                <div key={request.id} className="mb-8">
                  <h3 className="text-lg font-semibold text-green-600 mb-1">
                    🥗 Request (ID: {request.id})
                  </h3>
                  <p className="text-xs text-gray-500 mb-3">
                    Date: {formatDate(request.request_date)}
                  </p>
                  <div className="flex items-center justify-between">
                    {stepsRequest.map((step, idx) => (
                      <React.Fragment key={step}>
                        <Step
                          label={step}
                          active={isStepActive(
                            stepsRequest,
                            request.status,
                            idx
                          )}
                        />
                        {idx < stepsRequest.length - 1 && (
                          <div
                            className={`flex-1 h-1 ${
                              isStepActive(stepsRequest, request.status, idx)
                                ? "bg-blue-600"
                                : "bg-gray-300"
                            }`}
                          ></div>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">No Requests Found</p>
            )}
          </>
        )}

        {/* Close */}
        <button
          className="mt-4 w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:opacity-90 transition"
          onClick={() => setShowStatusModal(false)}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default StatusModal;
