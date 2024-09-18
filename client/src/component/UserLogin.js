import React, { useState } from "react";
import doctor from "../Assets/img/lovepik-a-doctor-with-a-record-of-medical-records-png-image_400248450_wh1200.png";
import axios from "axios";
import Cookies from "js-cookie"
import { Link, useNavigate } from "react-router-dom";

const UserLogin = () => {
  const navigate = useNavigate()
  const host = "http://localhost:5628/api/v1";
  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    password: "",
  });

  // Handle input change
  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${host}/user/login`, credentials, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response.data)
      const {accessToken} = response.data
      Cookies.set('accessToken', accessToken);
      navigate("/")
      return await response.data;
    } catch (error) {
      console.error("Server Error:", error);
    }
  };

  return (
    <>
      <h1 className="text-3xl my-2 mt-24 text-center text-green-500 font-bold">
        User Login
      </h1>
      <div className="w-full flex px-28 my-5">
        <form onSubmit={handleLogin} className="w-[40rem] mx-auto bg-blue-200 p-20 rounded-br-3xl rounded-tl-3xl">
          <div className="flex flex-col">
            <label className="text-2xl font-bold">Username:</label>
            <input
              type="text"
              className="p-2 border-2 border-black bg-blue-200 w-96 mx-auto rounded-lg"
              name="username"
              value={credentials.username}
              onChange={handleChange}
              required
            />
            <br />
          </div>
          <div className="flex flex-col">
            <label className="text-2xl font-bold">Email:</label>
            <input
              type="email"
              className="p-2 border-2 border-black bg-blue-200 w-96 mx-auto rounded-lg"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              required
            />
            <br />
          </div>
          <br />
          <div className="flex flex-col">
            <label className="text-2xl font-bold">Password:</label>
            <input
              type="password"
              className="p-2 border-2 border-black bg-blue-200 w-96 mx-auto rounded-lg"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              required
            />
          </div>
          <br />
          <div className="w-[30rem]">
          <button
            type="submit"
            className="border-2 rounded-lg bg-indigo-500 p-2 w-40 font-bold"
          >
            Submit
          </button>
          <div>Don't have a Account? <Link to="/user/register" className="text-blue-600">Register Here</Link> </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default UserLogin;
