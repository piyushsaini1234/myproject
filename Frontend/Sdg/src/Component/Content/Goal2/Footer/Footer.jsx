import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaGooglePlusG,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-yellow-100 text-gray-800 py-8 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        {/* About */}
        <div>
          <h3 className="text-xl font-semibold mb-2">About</h3>
          <p className="text-sm">
            Zero Hunger is a non-profit initiative dedicated to ending hunger
            and ensuring food for all.
          </p>
        </div>

        {/* Contact Us */}
        <div>
          <h3 className="text-xl font-semibold mb-2">Contact Us</h3>
          <p className="text-sm">Email: support@zerohunger.org</p>
          <p className="text-sm">Phone: +91-9876543210</p>
        </div>

        {/* Social Links with Animation */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Social Links</h3>
          <ul className="flex justify-center md:justify-start gap-4">
            {/* Facebook */}
            <li>
              <a
                href="#"
                className="relative w-8 h-8 rounded-full bg-white border-4 border-white flex items-center justify-center text-[30px] transition-transform duration-500 group overflow-hidden"
              >
                <FaFacebookF className="text-gray-800 z-10 group-hover:text-white transform transition-transform duration-500 group-hover:rotate-[360deg] w-5 h-5" />
                <span className="absolute inset-0 bg-[#3b5999] z-0 top-full group-hover:top-0 transition-all duration-500"></span>
              </a>
            </li>

            {/* Twitter */}
            <li>
              <a
                href="#"
                className="relative w-8 h-8 rounded-full bg-white border-4 border-white flex items-center justify-center text-[30px] transition-transform duration-500 group overflow-hidden"
              >
                <FaTwitter className="text-gray-800 z-10 group-hover:text-white transform transition-transform duration-500 group-hover:rotate-[360deg] w-5 h-5 " />
                <span className="absolute inset-0 bg-[#55acee] z-0 top-full group-hover:top-0 transition-all duration-500"></span>
              </a>
            </li>

            {/* LinkedIn */}
            <li>
              <a
                href="#"
                className="relative w-8 h-8 rounded-full bg-white border-4 border-white flex items-center justify-center text-[30px] transition-transform duration-500 group overflow-hidden"
              >
                <FaLinkedinIn className="text-gray-800 z-10 group-hover:text-white transform transition-transform duration-500 group-hover:rotate-[360deg] w-5 h-5 "/>
                <span className="absolute inset-0 bg-[#0077b5] z-0 top-full group-hover:top-0 transition-all duration-500"></span>
              </a>
            </li>

            {/* Google Plus */}
            <li>
              <a
                href="#"
                className="relative w-8 h-8 rounded-full bg-white border-4 border-white flex items-center justify-center text-[30px] transition-transform duration-500 group overflow-hidden"
              >
                <FaGooglePlusG className="text-gray-800 z-10 group-hover:text-white transform transition-transform duration-500 group-hover:rotate-[360deg] w-5 h-5 " />
                <span className="absolute inset-0 bg-[#dd4b39] z-0 top-full group-hover:top-0 transition-all duration-500"></span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-6 text-center text-sm">
        © 2025 Zero Hunger. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
