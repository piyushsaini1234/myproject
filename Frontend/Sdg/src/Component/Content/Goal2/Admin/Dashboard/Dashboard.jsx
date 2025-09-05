import React, { useEffect, useState } from "react";
import {
  Heart,
  ClipboardList,
  Settings,
  Truck,
  CheckCircle,
} from "lucide-react";

import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";

function Dashboard() {
  const [stats, setStats] = useState({
    totalDonations: 0,
    totalRequests: 0,
    donated: 0,
    donateApproved: 0,
    donatePickedup: 0,
    donateCompleted: 0,
    requestRequested: 0,
    requestApproved: 0,
    requestPreparing: 0,
    requestOutForDelivery: 0,
    requestDelivered: 0,
    totalNGOs: 0,
    totalUsers: 0,      
  });

  useEffect(() => {
    fetch("http://localhost:5000/api/dashboard")
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch((err) => console.error("Dashboard fetch error:", err));
  }, []);

  const cardData = [
    { title: "Total Food Donations", count: stats.totalDonations, icon: <Heart className="h-6 w-6" />, bg: "bg-red-100" },
    { title: "Donated", count: stats.donated, icon: <ClipboardList className="text-gray-600 h-6 w-6" />, bg: "bg-gray-100" },
    { title: "Donate Approved", count: stats.donateApproved, icon: <CheckCircle className="text-purple-500 h-6 w-6" />, bg: "bg-purple-100" },
    { title: "Donate Picked Up", count: stats.donatePickedup, icon: <Truck className="text-orange-500 h-6 w-6" />, bg: "bg-orange-100" },
    { title: "Donate Completed", count: stats.donateCompleted, icon: <CheckCircle className="text-green-600 h-6 w-6" />, bg: "bg-lime-100" },
    { title: "Total Food Requests", count: stats.totalRequests, icon: <ClipboardList className="text-blue-500 h-6 w-6" />, bg: "bg-blue-100" },
    { title: "Request - Requested", count: stats.requestRequested, icon: <ClipboardList className="text-gray-500 h-6 w-6" />, bg: "bg-gray-100" },
    { title: "Request - Approved", count: stats.requestApproved, icon: <CheckCircle className="text-purple-500  h-6 w-6" />, bg: "bg-purple-100" },
    { title: "Request - Preparing", count: stats.requestPreparing, icon: <Settings className="text-yellow-600  h-6 w-6" />, bg: "bg-yellow-100" },
    { title: "Request Out for Delivery", count: stats.requestOutForDelivery, icon: <Truck className="text-orange-500 h-6 w-6" />, bg: "bg-orange-100" },
    { title: "Request - Delivered", count: stats.requestDelivered, icon: <CheckCircle className="text-green-500 h-6 w-6 " />, bg: "bg-green-100" },
    { title: "Total NGOs", count: stats.totalNGOs, icon: <ClipboardList className="text-blue-500 h-6 w-6" />, bg: "bg-blue-100" },
    { title: "Total Users", count: stats.totalUsers, icon: <ClipboardList className="text-blue-500 h-6 w-6" />, bg: "bg-blue-200" },   
  ];

  const donationData = [
    { name: "Donated", value: stats.donated },
    { name: "Approved", value: stats.donateApproved },
    { name: "Picked Up", value: stats.donatePickedup },
    { name: "Completed", value: stats.donateCompleted },
  ];

  const requestData = [
    { name: "Requested", value: stats.requestRequested },
    { name: "Approved", value: stats.requestApproved },
    { name: "Preparing", value: stats.requestPreparing },
    { name: "Out for Delivery", value: stats.requestOutForDelivery },
    { name: "Delivered", value: stats.requestDelivered },
  ];

  return (
    <div className="p-2">
      {/* Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3">
        {cardData.map((card, index) => (
          <div
            key={index}
            className={`rounded-xl p-5 shadow-md ${card.bg} transition duration-300 hover:scale-105`}
          >
            <div className="flex items-center justify-between">
              <div className="text-sm font-semibold text-gray-800">{card.title}</div>
              {card.icon}
            </div>
            <div className="mt-2 text-base font-bold text-gray-900">
              {card.count}
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Donation Chart */}
        <div className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow transition-all">
          <h2 className="text-lg font-semibold mb-4">Donation Progress</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={donationData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="url(#donationGradient)" radius={[8, 18, 0, 0]} />
              <defs>
                <linearGradient id="donationGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.9} />
                  <stop offset="95%" stopColor="#818cf8" stopOpacity={0.7} />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Request Chart */}
        <div className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow-xl">
          <h2 className="text-lg font-semibold mb-4">Request Progress</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={requestData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Line dataKey="value" stroke="#10b981" strokeWidth={2} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
