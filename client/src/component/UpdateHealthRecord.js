import React, { useState, useEffect } from "react";
import axios from "axios";
import { host } from "../constant";
import Cookies from "js-cookie"
import { useParams } from "react-router-dom";

const UpdateHealthRecord = () => {
  const { id } = useParams();
  const [bodyTemperature, setBodyTemperature] = useState("");
  const [bloodPressure, setBloodPressure] = useState("");
  const [heartRate, setHeartRate] = useState("");
  const [Patient_Name, setPatient_Name] = useState("");
  const [message, setMessage] = useState("");
  const token = Cookies.get("accessToken");

  useEffect(() => {
    const fetchRecord = async () => {
      try {
        const response = await axios.get(
          `${host}/healthcheck/health-records/${id}`,
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const { Body_temperature, Blood_pressure, Heart_rate, Patient_Name } =
          response.data.data;
        setBodyTemperature(Body_temperature);
        setBloodPressure(Blood_pressure);
        setHeartRate(Heart_rate);
        setPatient_Name(Patient_Name);
      } catch (error) {
        console.error("Error fetching the record:", error);
        setMessage("Failed to fetch record data.");
      }
    };

    fetchRecord();
  }, [id,token]);

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // eslint-disable-next-line
      const response = await axios.put(
        `${host}/healthcheck/health-records/${id}`,
        {
          Body_temperature: bodyTemperature,
          Blood_pressure: bloodPressure,
          Heart_rate: heartRate,
        },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer${token}`,
          },
        }
      );
      setMessage("Record updated successfully.");
    } catch (error) {
      setMessage("Failed to update the record. Please try again.");
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <h2 className="text-white text-xl md:text-3xl my-8">
        Update Health Record
      </h2>
      <div className="bg-white w-96 p-4 rounded-tl-3xl rounded-br-3xl">
        {message && <p className="text-xl font-medium">Alert: {message}</p>}
        <form onSubmit={handleSubmit} className="p-4">
          <div className="text-black text-2xl">
            Patient_Name :{" "}
            <span className="font-bold text-xl">{Patient_Name}</span>
          </div>
          <div className="p-4 flex flex-col">
            <label>Body Temperature:</label>
            <input
              className="border-2 border-black p-2 rounded-lg"
              type="number"
              value={bodyTemperature}
              onChange={(e) => setBodyTemperature(e.target.value)}
              required
            />
          </div>
          <div className="p-4 flex flex-col">
            <label>Blood Pressure:</label>
            <input
              className="border-2 border-black p-2 rounded-lg"
              type="text"
              value={bloodPressure}
              onChange={(e) => setBloodPressure(e.target.value)}
              required
            />
          </div>
          <div className="p-4 flex flex-col">
            <label>Heart Rate:</label>
            <input
              className="border-2 border-black p-2 rounded-lg"
              type="number"
              value={heartRate}
              onChange={(e) => setHeartRate(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-200 rounded-lg p-3"
          >
            Update Record
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateHealthRecord;
