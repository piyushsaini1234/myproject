// import React, { useEffect, useState } from "react";
// import {
//   Heart,
//   ClipboardList,
//   Settings,
//   Truck,
//   CheckCircle,
// } from "lucide-react";

// function DashboardCards() {
//   const [stats, setStats] = useState({
//     totalDonations: 0,
//     totalRequests: 0,
//     pendingRequests: 0,
//     completedRequests: 0,
//     activeNgos: 0,
//     settingsUpdates: 0,
//     donateApproved: 0,
//     donatePickedUp: 0,
//     donateCompleted: 0,
//     requestRequested: 0,
//     requestApproved: 0,
//     requestPreparing: 0,
//     requestOutForDelivery: 0,
//     requestDelivered: 0,
//   });

//   useEffect(() => {
//     fetch("http://localhost:5000/api/dashboard")
//       .then((res) => res.json())
//       .then((data) => setStats(data))
      
//       .catch((err) => console.error("Dashboard fetch error:", err));
//   }, []);

//   const cardData = [
//     {
//       title: "Total Food Donations",
//       count: stats.totalDonations,
//       icon: <Heart className="text-red-500 w-6 h-6" />,
//       bg: "bg-red-100",
//     },
//     {
//       title: "Donate Approved",
//       count: stats.donateApproved,
//       icon: <CheckCircle className="text-purple-500 w-6 h-6" />,
//       bg: "bg-purple-100",
//     },
//     {
//       title: "Donate Picked Up",
//       count: stats.donatePickedUp,
//       icon: <Truck className="text-orange-500 w-6 h-6" />,
//       bg: "bg-orange-100",
//     },
//     {
//       title: "Donate Completed",
//       count: stats.donateCompleted,
//       icon: <CheckCircle className="text-green-600 w-6 h-6" />,
//       bg: "bg-lime-100",
//     },
//     {
//       title: "Total Food Requests",
//       count: stats.totalRequests,
//       icon: <ClipboardList className="text-blue-500 w-6 h-6" />,
//       bg: "bg-blue-100",
//     },
    // {
    //   title: "Request - Requested",
    //   count: stats.requestRequested,
    //   icon: <ClipboardList className="text-gray-500 w-6 h-6" />,
    //   bg: "bg-gray-100",
    // },
    // {
    //   title: "Request - Approved",
    //   count: stats.requestApproved,
    //   icon: <CheckCircle className="text-purple-500 w-6 h-6" />,
    //   bg: "bg-purple-100",
    // },
    // {
    //   title: "Request - Preparing",
    //   count: stats.requestPreparing,
    //   icon: <Settings className="text-yellow-600 w-6 h-6" />,
    //   bg: "bg-yellow-100",
    // },
    // {
    //   title: "Request - Out for Delivery",
    //   count: stats.requestOutForDelivery,
    //   icon: <Truck className="text-orange-500 w-6 h-6" />,
    //   bg: "bg-orange-100",
    // },
    // {
    //   title: "Request - Delivered",
    //   count: stats.requestDelivered,
    //   icon: <CheckCircle className="text-green-500 w-6 h-6" />,
    //   bg: "bg-green-100",
    // },
  
//     // {
//     //   title: "Settings Updates",
//     //   count: stats.settingsUpdates,
//     //   icon: <Settings className="text-yellow-500 w-6 h-6" />,
//     //   bg: "bg-yellow-100",
//     // },
//   ];

//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
//       {cardData.map((card, index) => (
//         <div
//           key={index}
//           className={`rounded-2xl p-5 shadow-md ${card.bg} transition hover:scale-105`}
//         >
//           <div className="flex items-center justify-between">
//             <div className="text-lg font-semibold text-gray-800">
//               {card.title}
//             </div>
//             {card.icon}
//           </div>
//           <div className="mt-4 text-3xl font-bold text-gray-900">
//             {card.count}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default DashboardCards;


import React, { useEffect, useState } from "react";
import {
  Heart,
  ClipboardList,
  Settings,
  Truck,
  CheckCircle,
} from "lucide-react";

function DashboardCards() {
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
  });

  useEffect(() => {
    fetch("http://localhost:5000/api/dashboard")
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch((err) => console.error("Dashboard fetch error:", err));
  }, []);

  const cardData = [
    {
      title: "Total Food Donations",
      count: stats.totalDonations,
      icon: <Heart className="text-red-500 w-5 h-5" />,
      bg: "bg-red-100",
    },
    {
      title: "Donated",
      count: stats.donated,
      icon: <ClipboardList className="text-gray-600 w-5 h-5" />,
      bg: "bg-gray-100",
    },
    {
      title: "Donate Approved",
      count: stats.donateApproved,
      icon: <CheckCircle className="text-purple-500 w-5 h-5" />,
      bg: "bg-purple-100",
    },
    {
      title: "Donate Picked Up",
      count: stats.donatePickedup,
      icon: <Truck className="text-orange-500 w-5 h-5" />,
      bg: "bg-orange-100",
    },
    {
      title: "Donate Completed",
      count: stats.donateCompleted,
      icon: <CheckCircle className="text-green-600 w-5 h-5" />,
      bg: "bg-lime-100",
    },
    {
      title: "Total Food Requests",
      count: stats.totalRequests,
      icon: <ClipboardList className="text-blue-500 w-5 h-5" />,
      bg: "bg-blue-100",
    },
    {
      title: "Request - Requested",
      count: stats.requestRequested,
      icon: <ClipboardList className="text-gray-500 w-5 h-5" />,
      bg: "bg-gray-100",
    },
    {
      title: "Request - Approved",
      count: stats.requestApproved,
      icon: <CheckCircle className="text-purple-500 w-5 h-5" />,
      bg: "bg-purple-100",
    },
    {
      title: "Request - Preparing",
      count: stats.requestPreparing,
      icon: <Settings className="text-yellow-600 w-5 h-5" />,
      bg: "bg-yellow-100",
    },
    {
      title: "Request - Out for Delivery",
      count: stats.requestOutForDelivery,
      icon: <Truck className="text-orange-500 w-5 h-5" />,
      bg: "bg-orange-100",
    },
    {
      title: "Request - Delivered",
      count: stats.requestDelivered,
      icon: <CheckCircle className="text-green-500 w-5 h-5" />,
      bg: "bg-green-100",
    },
  ];

  return (
  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2 mt-3">
  {cardData.map((card, index) => (
    <div
      key={index}
      className={`h-28 flex flex-col justify-between rounded-xl p-3 shadow-sm ${card.bg} transition duration-200 hover:scale-105`}
    >
      <div className="flex items-center justify-between">
        <div className="text-sm font-medium text-gray-800">{card.title}</div>
        {card.icon}
      </div>
      <div className="text-xl font-bold text-gray-900">{card.count}</div>
    </div>
  ))}
</div>

  );
}

export default DashboardCards;
