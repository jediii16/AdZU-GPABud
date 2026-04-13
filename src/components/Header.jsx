import React from "react";
import logo from "../assets/logo-real.png";
import logo1 from "../assets/logo11.png";
import logo2 from "../assets/logo-real-cropped.png";

const Header = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="flex items-center justify-center">
        {/* Logo */}
        <img
          src={logo2}
          alt="Logo"
          className="w-full max-w-55 sm:max-w-xs md:max-w-md lg:max-w-xl h-auto -mt-12 -mb-10 sm:-mt-16 sm:-mb-14 md:-mt-24 md:-mb-24"
        />
      </div>
    </div>
  );
};

export default Header;
