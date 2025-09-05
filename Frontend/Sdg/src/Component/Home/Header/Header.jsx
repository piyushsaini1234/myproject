

import React from 'react';
import { motion } from 'framer-motion';

function Header() {
  return (
    <div>
          <div className="fixed top-0 left-0 w-full bg-blue-950 text-white p-4 z-50 shadow">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className='text-2xl font-bold text-center'
        >
          Sustainable Development Goals
        </motion.h1>
      </div>
    </div>
  );
}

export default Header;




// import React from 'react';

// const Navbar = () => {
//   return (
//     <nav className="bg-green-400 text-white px-6 py-4 shadow-md">
//       <div className="container mx-auto flex justify-between items-center">
//         <h1 className="text-xl font-bold">SDGs</h1>
//         <ul className="flex space-x-6 text-sm font-medium">
//           <li className="hover:underline cursor-pointer">Home</li>
//           <li className="hover:underline cursor-pointer">Goals</li>
//           <li className="hover:underline cursor-pointer">Contact</li>
//         </ul>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
