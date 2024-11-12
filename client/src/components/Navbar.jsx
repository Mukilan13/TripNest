import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className="navbar h-[50px] bg-[#c1121f] flex justify-center text-white">
      <div className="nav-container w-full max-w-[1024px] flex items-center justify-between">
        <div className="logo">
          <Link to="/">
            <h1 className="text-3xl font-bold">TripNest.</h1>
          </Link>
        </div>
        {user ? (
          <h1 className="bg-white text-[#F5385D] font-semibold px-3 py-2 rounded-[20px]">{user.username}</h1>
        ) : (
          <div className="register-login flex items-center justify-center gap-4">
            <Link to="/login">
              <button className="text-[#F5385D] font-medium bg-[#f5cac3] px-2 py-1 rounded-[5px]">
                Register
              </button>
            </Link>
            <Link to="/login">
              <button className="text-[#F5385D] font-medium bg-[#f5cac3] px-2 py-1 rounded-[5px]">
                Login
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
