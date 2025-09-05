// import React from 'react'
// import { BrowserRouter, Routes, Route } from 'react-router-dom'



// import Home from './Component/Home/Home'

// import Goal1 from './Component/Content/Goal1'
// import Goal2 from './Component/Content/Goal2/Navbar'
// import Goal3 from './Component/Content/Goal3'
// import Goal4 from './Component/Content/Goal4'
// import Goal5 from './Component/Content/Goal5'
// import Goal6 from './Component/Content/Goal6'
// import Goal7 from './Component/Content/Goal7'
// import Goal8 from './Component/Content/Goal8'
// import Goal9 from './Component/Content/Goal9'
// import Goal10 from './Component/Content/Goal10'
// import Goal11 from './Component/Content/Goal11'
// import Goal12 from './Component/Content/Goal12'
// import Goal13 from './Component/Content/Goal13'
// import Goal14 from './Component/Content/Goal14'
// import Goal15 from './Component/Content/Goal15'
// import Goal16 from './Component/Content/Goal16'
// import Goal17 from './Component/Content/Goal17'

// // import Navbar from './Component/Content/Goal2/navbar/Navbar'
// // import Hero from './Component/Content/Goal2/hero1/Hero'
// // import Hero2 from './Component/Content/Goal2/hero2/Hero2'
// // import Footer from './Component/Content/Goal2/Navbar/Footer/Footer'


// function App() {
//   return (
//     <div>

//       <BrowserRouter>
//            <Route path='/card1' element={<Goal1 />} />
//            {/* <Route path='/card2' element={<Goal2 />} />  */}
//            <Route path='/card3' element={<Goal3 />} />
//           <Route path='/card4' element={<Goal4 />} />
//           <Route path='/card5' element={<Goal5 />} />
//           <Route path='/card6' element={<Goal6 />} />
//           <Route path='/card7' element={<Goal7 />} />
//           <Route path='/card8' element={<Goal8 />} />
//           <Route path='/card9' element={<Goal9 />} />
//           <Route path='/card10' element={<Goal10 />} />
//           <Route path='/card11' element={<Goal11 />} />
//           <Route path='/card12' element={<Goal12 />} />
//           <Route path='/card13' element={<Goal13 />} />
//           <Route path='/card14' element={<Goal14 />} />
//           <Route path='/card15' element={<Goal15 />} />
//           <Route path='/card16' element={<Goal16 />} />
//           <Route path='/card17' element={<Goal7 />} /> 

//         <Routes>
//           <Route path='/' element={<Home />} />

//         </Routes>
//       </BrowserRouter>


//       {/* <Navbar/>
//       <Hero />
//       <Hero2 />
//       <Footer /> */}

//     </div>
//   )
// }

// export default App


import React from 'react';
import { BrowserRouter, Routes, Route,Navigate } from 'react-router-dom';


import Home from './Component/Home/Home'
import Goal1 from './Component/Content/Goal1'
import Goal2 from './Component/Content/Goal2/Goal2'

import LearnMore from './Component/Content/Goal2/LearnMore/LearnMore';
import NGoPartner from './Component/NGo Partner/NGoPartner';
import Admin from './Component/Content/Goal2/Admin/Admin';
import Dashboard from './Component/Content/Goal2/Admin/Dashboard/Dashboard';
import Donations from './Component/Content/Goal2/Admin/Donations/Donations';
import Requests from './component/content/Goal2/Admin/Requests/Requests';
import NGOs from './component/content/Goal2/Admin/NGOs/NGOs';
import Users from './Component/Content/Goal2/Admin/Users/Users';
function App() {
  return (<>
    <BrowserRouter>
      <Routes>
        <Route path='*' element={<Home />} />
        <Route path='/card1' element={<Goal1 />} />
        <Route path='/card2' element={<Goal2 />} />
        <Route path='/learnMore' element={<LearnMore />}/>
        <Route path='/NGoPartner' element={<NGoPartner/>}/>
        <Route path='/admin' element={<Admin />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path='dashboard' element={<Dashboard />} />
          <Route path='donations' element={<Donations />} />
          <Route path='Requests' element={<Requests/>}/>
          <Route path='NGOs' element={<NGOs/>}/>
          <Route path='users' element={<Users/>}/>
        </Route>
      </Routes>

    </BrowserRouter>
   
    </>
  );
}

export default App;
