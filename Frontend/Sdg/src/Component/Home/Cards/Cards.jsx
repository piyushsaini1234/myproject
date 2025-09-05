// import React from 'react'
// import { Link, useNavigate } from 'react-router-dom';

// import G1Img from '../../../assets/E-WEB-Goal-01.png';
// import G2Img from '../../../assets/E-WEB-Goal-02.png';
// import G3Img from '../../../assets/E-WEB-Goal-03.png';
// import G4Img from '../../../assets/E-WEB-Goal-04.png';
// import G5Img from '../../../assets/E-WEB-Goal-05.png';
// import G6Img from '../../../assets/E-WEB-Goal-06.png';
// import G7Img from '../../../assets/E-WEB-Goal-07.png';
// import G8Img from '../../../assets/E-WEB-Goal-08.png';
// import G9Img from '../../../assets/E-WEB-Goal-09.png';
// import G10Img from '../../../assets/E-WEB-Goal-10.png';
// import G11Img from '../../../assets/E-WEB-Goal-11.png';
// import G12Img from '../../../assets/E-WEB-Goal-12.png';
// import G13Img from '../../../assets/E-WEB-Goal-13.png';
// import G14Img from '../../../assets/E-WEB-Goal-14.png';
// import G15Img from '../../../assets/E-WEB-Goal-15.png';
// import G16Img from '../../../assets/E-WEB-Goal-16.png';
// import G17Img from '../../../assets/E-WEB-Goal-17.png';

// function Cards() {
//     return (
//         <div className="flex justify-center">
//             <div className="container p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 justify-items-center">

//                 {/* Card 1  */}
//                 <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center justify-center hover:shadow-xl transition duration-300 w-fit">
//                     <Link to='/card1'> <img src={G1Img} alt="" className='h-27 w-60 ' /></Link>
//                 </div>

//                 {/* Card 2  */}
//                 <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center justify-center hover:shadow-xl transition duration-300 w-fit">
//                     <Link to='/card2'> <img src={G2Img} alt="" className='h-27 w-60 ' /></Link>
//                 </div>

//                 {/* Card 3  */}
//                 <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center justify-center hover:shadow-xl transition duration-300 w-fit">
//                     <img src={G3Img} alt="" className='h-27 w-60 ' />
//                 </div>

//                 {/* Card 4  */}
//                 <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center justify-center hover:shadow-xl transition duration-300 w-fit">
//                     <img src={G4Img} alt="" className='h-27 w-60 ' />
//                 </div>

//                 {/* Card 5  */}
//                 <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center justify-center hover:shadow-xl transition duration-300 w-fit">
//                     <img src={G5Img} alt="" className='h-27 w-60 ' />
//                 </div>

//                 {/* Card 6  */}
//                 <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center justify-center hover:shadow-xl transition duration-300 w-fit">
//                     <img src={G6Img} alt="" className='h-27 w-60 ' />
//                 </div>

//                 {/* Card 7  */}
//                 <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center justify-center hover:shadow-xl transition duration-300 w-fit">
//                     <img src={G7Img} alt="" className='h-27 w-60 ' />
//                 </div>

//                 {/* Card 8  */}
//                 <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center justify-center hover:shadow-xl transition duration-300 w-fit">
//                     <img src={G8Img} alt="" className='h-27 w-60 ' />
//                 </div>

//                 {/* Card 9  */}
//                 <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center justify-center hover:shadow-xl transition duration-300 w-fit">
//                     <img src={G9Img} alt="" className='h-27 w-60 ' />
//                 </div>

//                 {/* Card 10  */}
//                 <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center justify-center hover:shadow-xl transition duration-300 w-fit">
//                     <img src={G10Img} alt="" className='h-27 w-60 ' />
//                 </div>

//                 {/* Card 11  */}
//                 <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center justify-center hover:shadow-xl transition duration-300 w-fit">
//                     <img src={G11Img} alt="" className='h-27 w-60 ' />
//                 </div>

//                 {/* Card 12  */}
//                 <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center justify-center hover:shadow-xl transition duration-300 w-fit">
//                     <img src={G12Img} alt="" className='h-27 w-60 ' />
//                 </div>
//                 {/* Card 13  */}
//                 <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center justify-center hover:shadow-xl transition duration-300 w-fit">
//                     <img src={G13Img} alt="" className='h-27 w-60 ' />
//                 </div>

//                 {/* Card 14  */}
//                 <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center justify-center hover:shadow-xl transition duration-300 w-fit">
//                     <img src={G14Img} alt="" className='h-27 w-60 ' />
//                 </div>

//                 {/* Card 15  */}
//                 <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center justify-center hover:shadow-xl transition duration-300 w-fit">
//                     <img src={G15Img} alt="" className='h-27 w-60 ' />
//                 </div>

//                 {/* Card 16  */}
//                 <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center justify-center hover:shadow-xl transition duration-300 w-fit">
//                     <img src={G16Img} alt="" className='h-27 w-60 ' />
//                 </div>

//                 {/* Card 17  */}
//                 <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center justify-center hover:shadow-xl transition duration-300 w-fit">
//                     <img src={G17Img} alt="" className='h-27 w-60 ' />
//                 </div>

//             </div>
//         </div>
//     )
// }

// export default Cards;





// import React from 'react';
// import G1 from '../../../assets/E-WEB-Goal-01.png';
// import G2 from '../../../assets/E-WEB-Goal-02.png';
// import G3 from '../../../assets/E-WEB-Goal-03.png';
// import G4 from '../../../assets/E-WEB-Goal-04.png';
// import G5 from '../../../assets/E-WEB-Goal-05.png';
// import G6 from '../../../assets/E-WEB-Goal-06.png';
// import G7 from '../../../assets/E-WEB-Goal-07.png';
// import G8 from '../../../assets/E-WEB-Goal-08.png';
// import G9 from '../../../assets/E-WEB-Goal-09.png';
// import G10 from '../../../assets/E-WEB-Goal-10.png';
// import G11 from '../../../assets/E-WEB-Goal-11.png';
// import G12 from '../../../assets/E-WEB-Goal-12.png';
// import G13 from '../../../assets/E-WEB-Goal-13.png';
// import G14 from '../../../assets/E-WEB-Goal-14.png';
// import G15 from '../../../assets/E-WEB-Goal-15.png';
// import G16 from '../../../assets/E-WEB-Goal-16.png';
// import G17 from '../../../assets/E-WEB-Goal-17.png';

// const goalImages = {
//   'Social Inclusion and Well-being': [G1, G2, G3, G4, G5, G10],
//   'Environmental Sustainability': [G6, G7, G13, G14, G15],
//   'Economic Growth and Infrastructure': [G8, G9, G11],
//   'Governance and Partnerships': [G16, G17],
//   'Food and Resource Management': [G2, G12],
// };

// const SdgPage = () => {
//   return (
//     <div className="bg-gray-50 min-h-screen py-10 px-4">
//       {Object.entries(goalImages).map(([category, images], index) => (
//         <div key={index} className="mb-12">
//           <h2 className="text-2xl font-bold text-green-700 mb-4">{category}</h2>
//           <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 justify-items-center">
//             {images.map((img, i) => (
//               <div
//                 key={i}
//                 className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition w-fit"
//               >
//                 <img src={img} alt={`Goal ${i + 1}`} className="h-28 w-48 object-contain" />
//               </div>
//             ))}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default SdgPage;

import React from "react";
import { Link } from "react-router-dom";

// Import images
import G1 from "../../../assets/E-WEB-Goal-01.png";
import G2 from "../../../assets/E-WEB-Goal-02.png";
import G3 from "../../../assets/E-WEB-Goal-03.png";
import G4 from "../../../assets/E-WEB-Goal-04.png";
import G5 from "../../../assets/E-WEB-Goal-05.png";
import G6 from "../../../assets/E-WEB-Goal-06.png";
import G7 from "../../../assets/E-WEB-Goal-07.png";
import G8 from "../../../assets/E-WEB-Goal-08.png";
import G9 from "../../../assets/E-WEB-Goal-09.png";
import G10 from "../../../assets/E-WEB-Goal-10.png";
import G11 from "../../../assets/E-WEB-Goal-11.png";
import G12 from "../../../assets/E-WEB-Goal-12.png";
import G13 from "../../../assets/E-WEB-Goal-13.png";
import G14 from "../../../assets/E-WEB-Goal-14.png";
import G15 from "../../../assets/E-WEB-Goal-15.png";
import G16 from "../../../assets/E-WEB-Goal-16.png";
import G17 from "../../../assets/E-WEB-Goal-17.png";

import social from "../../../assets/social.jpg";
import Environment from "../../../assets/Environment.jpg";
import Economic from "../../../assets/Economic.jpg";
import governance from "../../../assets/governance.png";
import food from "../../../assets/food.png";

const categories = [
  {
    name: "Social Inclusion and Well-being",
    goals: [G1, G3, G4, G5, G10],
    banner: social,
  },
  {
    name: "Environmental Sustainability",
    goals: [G6, G7, G13, G14, G15],
    banner: Environment,
  },
  {
    name: "Economic Growth and Infrastructure",
    goals: [G8, G9, G11],
    banner: Economic,
  },
  {
    name: "Governance and Partnerships",
    goals: [G16, G17],
    banner: governance,
  },
  {
    name: "Food and Resource Management",
    goals: [G2, G12],
    banner: food,
  },
];

const SdgPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 mt-10">
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((category, index) => (
          <div key={index} className="w-full h-[300px] perspective">
            <div className="relative w-full h-full transition-transform duration-700 transform-style-preserve-3d group hover:rotate-y-180">

              {/* Front */}
              <div className="absolute w-full h-full backface-hidden rounded-xl overflow-hidden shadow-md border bg-white">
                <div
                  className="h-full bg-cover bg-center relative"
                  style={{ backgroundImage: `url(${category.banner})` }}
                >
                  <div className="absolute top-0 w-full bg-black/50 text-white text-center text-lg font-bold py-2">
                    {category.name}
                  </div>
                </div>
              </div>

              {/* Back */}
              <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-white rounded-xl p-2 grid grid-cols-2 gap-2 shadow-md border overflow-hidden">
                {category.goals.map((img, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-md shadow-md overflow-hidden flex items-center justify-center"
                  >
                    {img === G1 && (
                       <Link to="/card1">
                      <img src={G1} alt="Goal 1" className="h-25 w-59" />
                      </Link>
                    )}
                    {img === G2 && (
                      <Link to="/card2">
                        <img src={G2} alt="Goal 2" className="h-71 w-60 cursor-pointer" />
                      </Link>
                    )}
                    {img === G3 && (
                      <Link to="/card3">
                      <img src={G3} alt="Goal 3" className="h-25 w-59 " />
                      </Link>
                    )}
                    {img === G4 && (
                      <img src={G4} alt="Goal 4" className="h-22 w-59" />
                    )}
                    {img === G5 && (
                      <img src={G5} alt="Goal 5" className="h-22 w-59" />
                    )}
                    {img === G6 && (
                      <img src={G6} alt="Goal 6" className="h-23 w-59" />
                    )}
                    {img === G7 && (
                      <img src={G7} alt="Goal 7" className="h-23 w-59" />
                    )}
                    {img === G8 && (
                      <img src={G8} alt="Goal 8" className="h-35 w-59" />
                    )}
                    {img === G9 && (
                      <img src={G9} alt="Goal 9" className="h-35 w-59" />
                    )}
                    {img === G10 && (
                      <img src={G10} alt="Goal 10" className="h-22 w-59" />
                    )}
                    {img === G11 && (
                      <img src={G11} alt="Goal 11" className="h-35 w-59" />
                    )}
                    {img === G12 && (
                      <img src={G12} alt="Goal 12" className="h-71 w-60 " />
                    )}
                    {img === G13 && (
                      <img src={G13} alt="Goal 13" className="h-22 w-59" />
                    )}
                    {img === G14 && (
                      <img src={G14} alt="Goal 14" className="h-22 w-59" />
                    )}
                    {img === G15 && (
                      <img src={G15} alt="Goal 15" className="h-22 w-59" />
                    )}
                    {img === G16 && (
                      <img src={G16} alt="Goal 16" className="h-71 w-60 " />
                    )}
                    {img === G17 && (
                      <img src={G17} alt="Goal 17" className="h-71 w-60 " />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SdgPage;
