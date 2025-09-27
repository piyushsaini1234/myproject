// import React from 'react';
// import { BrowserRouter, Routes, Route,Navigate } from 'react-router-dom';


// import Home from './Component/Home/Home'
// import Goal1 from './Component/Content/Goal1'
// import Goal2 from './Component/Content/Goal2/Goal2'

// import LearnMore from './Component/Content/Goal2/LearnMore/LearnMore';
// import NGoPartner from './Component/NGo Partner/NGoPartner';
// import Admin from './Component/Content/Goal2/Admin/Admin';
// import Dashboard from './Component/Content/Goal2/Admin/Dashboard/Dashboard';
// import Donations from './Component/Content/Goal2/Admin/Donations/Donations';
// import Requests from './component/content/Goal2/Admin/Requests/Requests.jsx';
// import NGOs from './component/content/Goal2/Admin/NGOs/NGOs';
// import Users from './Component/Content/Goal2/Admin/Users/Users';
// function App() {
//   return (<>
//     <BrowserRouter>
//       <Routes>
//         <Route path='*' element={<Home />} />
//         <Route path='/card1' element={<Goal1 />} />
//         <Route path='/card2' element={<Goal2 />} />
//         <Route path='/learnMore' element={<LearnMore />}/>
//         <Route path='/NGoPartner' element={<NGoPartner/>}/>
//         <Route path='/admin' element={<Admin />}>
//           <Route index element={<Navigate to="dashboard" replace />} />
//           <Route path='dashboard' element={<Dashboard />} />
//           <Route path='donations' element={<Donations />} />
//           <Route path='requests' element={<Requests/>}/>
//           <Route path='nGOs' element={<NGOs/>}/>
//           <Route path='users' element={<Users/>}/>
//         </Route>
//       </Routes>

//     </BrowserRouter>
   
//     </>
//   );
// }

// export default App;

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Correct case-sensitive imports
import Home from './Component/Home/Home';
import Goal1 from './Component/Content/Goal1';
import Goal2 from './Component/Content/Goal2/Goal2';

import LearnMore from './Component/Content/Goal2/LearnMore/LearnMore';
import NGoPartner from './Component/NGoPartner/NGoPartner';
import Admin from './Component/Content/Goal2/Admin/Admin';
import Dashboard from './Component/Content/Goal2/Admin/Dashboard/Dashboard';
import Donations from './Component/Content/Goal2/Admin/Donations/Donations';
import Requests from './Component/Content/Goal2/Admin/Requests/Requests';
import NGOs from './Component/Content/Goal2/Admin/NGOs/NGOs';
import Users from './Component/Content/Goal2/Admin/Users/Users';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Home />} />
        <Route path="/card1" element={<Goal1 />} />
        <Route path="/card2" element={<Goal2 />} />
        <Route path="/learnMore" element={<LearnMore />} />
        <Route path="/NGoPartner" element={<NGoPartner />} />
        <Route path="/admin" element={<Admin />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="donations" element={<Donations />} />
          <Route path="requests" element={<Requests />} />
          <Route path="nGOs" element={<NGOs />} />
          <Route path="users" element={<Users />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
