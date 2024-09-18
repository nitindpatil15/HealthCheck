import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "material-icons/iconfont/material-icons.css";
import Cookies from "js-cookie";
import axios from "axios";
import { host } from "../constant";

const Navbar = () => {
  const navigate = useNavigate();
  const token = Cookies.get("accessToken");

  const handleonLogout = async () => {
    try {
      await axios.post(
        `${host}/user/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer${token}`,
          },
          withCredentials: true,
        }
      );
      alert("Logged Out Successfully!!");
      Cookies.remove("accessToken");
      navigate("/");
    } catch (error) {
      console.log(error, "Failed to Log Out!!");
    }
  };

  const loginnavigate =()=>{
    navigate("/user/login")
  }

  return (
    <>
      <div className="fixed top-0 right-0 left-0 z-50 bg-black border-b-2 flex justify-between px-4 py-2 items-center shadow-md">
        <div className="text-gray-400 md:ml-12 text-2xl flex items-center p-2">
          <Link to="/" className="md:ml-14  font-bold">
            HealthCare
          </Link>
          <Link to="/" className="ml-10 mt-1 text-lg">
            Home
          </Link>
        </div>
        <div className="flex items-center p-2">
          {Cookies.get("accessToken") ? (
            <button
              onClick={handleonLogout}
              className="block w-full text-left px-4 py-2 text-lg text-white hover:bg-black"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={loginnavigate}
              className="block w-full text-left px-4 py-2 text-lg text-white hover:bg-black"
            >
              Login
            </button>
          )}
        </div>
      </div>
      {/* Add a margin top equal to the height of the navbar */}
      <div style={{ marginTop: "64px" }}></div>
    </>
  );
};

export default Navbar;
