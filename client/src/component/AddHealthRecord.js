import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie'
import { host } from "../constant";

const AddHealthRecord = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    Date: "",
    Patient_Name: "",
    Body_temperature: "",
    Blood_pressure: "",
    Heart_rate: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = Cookies.get("accessToken");
    try {
      const response = await axios.post(
        `${host}/healthcheck/health-records`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer${token}`,
          },
        }
      );

      setMessage("Health record added successfully!");
      // eslint-disable-next-line
      const data = await response.data;
      navigate("/")
    } catch (error) {
      setMessage("Error occurred while adding health record");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-xl md:text-3xl font-bold mb-6 text-center text-white mt-24">
        Add Health Record
      </h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="Date"
          >
            Date
          </label>
          <input
            type="date"
            name="Date"
            value={formData.Date}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="Patient_Name"
          >
            Patient Name
          </label>
          <input
            type="text"
            name="Patient_Name"
            value={formData.Patient_Name}
            onChange={handleChange}
            placeholder="John Doe"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="Body_temperature"
          >
            Body Temperature (°C)
          </label>
          <input
            type="number"
            name="Body_temperature"
            value={formData.Body_temperature}
            onChange={handleChange}
            placeholder="36.5"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="Blood_pressure"
          >
            Blood Pressure (mm Hg)
          </label>
          <input
            type="text"
            name="Blood_pressure"
            value={formData.Blood_pressure}
            onChange={handleChange}
            placeholder="120/80"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="Heart_rate"
          >
            Heart Rate (bpm)
          </label>
          <input
            type="number"
            name="Heart_rate"
            value={formData.Heart_rate}
            onChange={handleChange}
            placeholder="75"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit
          </button>
        </div>
      </form>
      {message && <p className="text-center text-red-500">{message}</p>}
    </div>
  );
};

export default AddHealthRecord;
