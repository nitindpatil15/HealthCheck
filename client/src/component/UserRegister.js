import React, { useState } from "react";
import doctor from "../Assets/img/lovepik-a-doctor-with-a-record-of-medical-records-png-image_400248450_wh1200.png";
import axios from "axios";
import { Link } from "react-router-dom";

const UserRegister = () => {
  const host = "http://localhost:5628/api/v1";
  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    fullName: "",
    age: "",
    password: "",
  });

  // Handle input change
  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${host}/user/register`, credentials, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.data;
    } catch (error) {
      console.error("Server Error:", error);
    }
  };

  return (
    <>
      <h1 className="text-3xl my-2 mt-24 text-center text-green-500 font-bold">
        User Registration
      </h1>
      <div className="w-full flex px-28 my-5">
        <img src={doctor} alt="doctor" className="bg-white" />
        <form onSubmit={handleRegister} className="w-[40rem] bg-blue-200 p-4">
          <div className="flex flex-col">
            <label className="text-2xl">Username:</label>
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
            <label className="text-2xl">Email:</label>
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
          <div className="flex flex-col">
            <label className="text-2xl">FullName:</label>
            <input
              type="text"
              className="p-2 border-2 border-black bg-blue-200 w-96 mx-auto rounded-lg"
              name="fullName"
              value={credentials.fullName}
              onChange={handleChange}
              required
            />
          </div>
          <br />
          <div className="flex flex-col">
            <label className="text-2xl">Age:</label>
            <input
              type="number"
              className="p-2 border-2 border-black bg-blue-200 w-96 mx-auto rounded-lg"
              name="age"
              value={credentials.age}
              onChange={handleChange}
              required
            />
          </div>
          <br />
          <div className="flex flex-col">
            <label className="text-2xl">Password:</label>
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
          <button
            type="submit"
            className="border-2 rounded-lg bg-indigo-500 p-2 w-28"
          >
            Submit
          </button>
          <div>Alerady have a Account? <Link to="/user/login" className="text-blue-600">Register Here</Link> </div>
        </form>
      </div>
    </>
  );
};

export default UserRegister;
