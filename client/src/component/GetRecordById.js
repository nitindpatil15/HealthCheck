import React, { useState, useEffect } from "react";
import axios from "axios"; // Ensure you have axios installed
import { useNavigate, useParams } from "react-router-dom";
import { host, token } from "../constant";

const GetRecordById = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recordById, setRecordById] = useState(null);
  const [message, setMessage] = useState("");

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
        console.log(response.data.data);
        setRecordById(response.data.data);
      } catch (error) {
        console.error("Error fetching the recordById:", error);
        setMessage("Failed to fetch recordById data.");
      }
    };

    fetchRecord();
  }, [id]);

  const handledelete = async (id) => {
    if (!token) {
      navigate("/user/login");
    }
    const isConf = window.confirm(
      "Are you sure you want to delete this record?"
    );

    if (isConf) {
      try {
        // eslint-disable-next-line
        const removerecord = await axios.delete(
          `${host}/healthcheck/health-records/${id}`,
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        alert("Record deleted successfully.");
        navigate("/");
      } catch (error) {
        console.error("Error deleting the record:", error);
        alert("Failed to delete the record.");
      }
    } else {
      alert("Record deletion cancelled.");
    }
  };

  const handleupdatebutton = (id) => {
    navigate(`/record/updaterecord/${id}`);
  };

  if (message) {
    return <div>{message}</div>; // Message About Work
  }

  if (!recordById) {
    return <div>Loading...</div>; // Loading for  process
  }

  return (
    <>
      <h2 className="text-xl md:text-3xl text-white font-bold p-4 text-center">
        Health RecordById
      </h2>
      <div className="bg-blue-300 w-[40rem] flex flex-col justify-center  p-8 mx-auto text-justidy">
        <div className="ml-28">
          <p className="text-xl m-4">
            <strong>Name:</strong>{" "}
            <span className="underline">{recordById.Patient_Name}</span>
          </p>
          <p className="text-xl m-4">
            <strong>Body Temperature:</strong>{" "}
            <span className="">{recordById.Body_temperature} °C</span>
          </p>
          <p className="text-xl m-4">
            <strong>Blood Pressure:</strong>{" "}
            <span className="">{recordById.Blood_pressure} mmHg</span>
          </p>
          <p className="text-xl m-4">
            <strong>Heart Rate:</strong>{" "}
            <span className="">
              <span className=""></span>
              {recordById.Heart_rate} bpm
            </span>
          </p>
          <p className="text-xl m-4">
            <strong>Recorded Date:</strong>{" "}
            <span className="">{recordById.Date.split("T00:00:00.000Z")}</span>
          </p>
          <div>
            <button
              onClick={() => handleupdatebutton(recordById._id)}
              className="rounded-lg bg-green-500 hover:bg-green-200 p-2 mx-2"
            >
              Update
            </button>
            <button
              onClick={() => handledelete(recordById._id)}
              className="rounded-lg bg-red-500 hover:bg-red-200 p-2"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default GetRecordById;
