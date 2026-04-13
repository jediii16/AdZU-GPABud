import React from 'react'
import logo from "../assets/logo-real.png";
import logo1 from "../assets/logo11.png";
import logo2 from "../assets/logo-real-cropped.png";

const Header = () => {
  return (
    <div className="flex items-center justify-center ">
      <div className="flex items-center justify-center">
      {/* Logo */}
      <img src={logo2} alt="Logo" className="max-w-xl h-auto -mb-32 -mt-38"/>
      </div>
    </div>
  )
}

export default Header