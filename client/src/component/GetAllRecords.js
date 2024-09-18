import axios from "axios";
import React, { useEffect, useState } from "react";
import { host } from "../constant";
import Cookies from "js-cookie"
import { useNavigate } from "react-router-dom";

const GetAllRecords = () => {
  const navigate = useNavigate();
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filteredRecords, setFilteredRecords] = useState([]); // Filtered records state
  const [searchTerm, setSearchTerm] = useState(""); // State for search input
  const [heartRateFilter, setHeartRateFilter] = useState(""); // Filter for heart rate

  const token = Cookies.get("accessToken");

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await axios.get(`${host}/healthcheck/health-records`);
        const data = await response.data;

        if (response) {
          setRecords(data.data);
          setFilteredRecords(data.data);
          setLoading(false);
        } else {
          setError(data.error || "Failed to fetch records");
          setLoading(false);
        }
      } catch (err) {
        setError("Error occurred while fetching records");
        setLoading(false);
      }
    };

    fetchRecords();
  }, []);

  // Handle Search and Filtering
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    const filtered = records.filter((record) => {
      const recordDate = new Date(record.Date).toLocaleDateString();
      return recordDate.includes(value);
    });
    setFilteredRecords(filtered);
  };

  const handleHeartRateFilter = (e) => {
    const value = e.target.value;
    setHeartRateFilter(value);
    if (!value) {
      setFilteredRecords(records);
    }

    const filtered = records.filter(
      (record) => record.Heart_rate > parseInt(value)
    );
    setFilteredRecords(filtered);
  };

  const handledelete = async (id) => {
    if (!token) {
      navigate("/user/login");
    }
    const isConf = window.confirm(
      "Are you sure you want to delete this record?"
    );

    if (isConf) {
      try {
        await axios.delete(`${host}/healthcheck/health-records/${id}`, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer${token}`,
          },
        });
        alert("Record deleted successfully.");
        window.location.reload();
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

  const handleAddrecordbutton = () => {
    navigate(`/record/addrecord`);
  };

  const handlebyId = (id) => {
    navigate(`/record/getrecordbyid/${id}`);
  };

  if (loading) {
    return <p className="text-center text-gray-700">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="w-[70rem] mx-auto mt-10">
      <div className="flex justify-between items-center mb-4">
        {/* Search by Date */}
        <input
          type="search"
          name="search"
          id="searchrecord"
          placeholder="Search by Date (MM/DD/YYYY)"
          value={searchTerm}
          onChange={handleSearch}
          className="mt-16 p-4 w-[40rem] my-4 mx-auto rounded-lg"
        />
      </div>

      <div className="flex justify-between">
        <h1 className="text-xl md:text-3xl font-bold mb-6 text-center text-white">
          All Health Records{" "}
          {token?<button
            onClick={handleAddrecordbutton}
            className="rounded-lg bg-green-500 hover:bg-green-200 hover:text-black p-2 mx-2"
          >
            Add New Record
          </button>:<></>}
        </h1>
        <input
          type="number"
          name="heartRateFilter"
          id="heartRateFilter"
          placeholder="Heart Rate Above"
          value={heartRateFilter}
          onChange={handleHeartRateFilter}
          className="p-2 h-14 rounded-lg"
        />
      </div>

      <table className="min-w-full bg-white shadow-md rounded mb-6">
        <thead>
          <tr className="border-black border-2">
            <th className="py-2 px-8 border-2 border-black bg-green-400 text-center text-gray-600 font-bold">
              Date
            </th>
            <th className="py-2 px-6 border-2 border-black bg-green-400 text-center text-gray-600 font-bold">
              Patient Name
            </th>
            <th className="py-2 px-6 border-2 border-black bg-green-400 text-center text-gray-600 font-bold">
              Body Temperature
            </th>
            <th className="py-2 px-8 border-2 border-black bg-green-400 text-center text-gray-600 font-bold">
              Blood Pressure
            </th>
            <th className="py-2 px-8 border-2 border-black bg-green-400 text-center text-gray-600 font-bold">
              Heart Rate
            </th>
            {token ? (
              <th className="py-2 px-2 border-2 border-black bg-green-400 text-center text-gray-600 font-bold">
                Action
              </th>
            ) : (
              <></>
            )}
          </tr>
        </thead>
        <tbody>
          {filteredRecords.map((record) => (
            <tr key={record._id} className="hover:bg-gray-300 cursor-pointer">
              <td
                className="px-8 border-2 border-black text-center py-2"
                onClick={() => handlebyId(record._id)}
              >
                {new Date(record.Date).toLocaleDateString()}
              </td>
              <td
                className="px-8 border-2 border-black text-center py-2"
                onClick={() => handlebyId(record._id)}
              >
                {record.Patient_Name}
              </td>
              <td
                className="px-8 border-2 border-black text-center py-2"
                onClick={() => handlebyId(record._id)}
              >
                {record.Body_temperature} °C
              </td>
              <td
                className="px-8 border-2 border-black text-center py-2"
                onClick={() => handlebyId(record._id)}
              >
                {record.Blood_pressure} mm Hg
              </td>
              <td
                className="px-8 border-2 border-black text-center py-2"
                onClick={() => handlebyId(record._id)}
              >
                {record.Heart_rate} bpm
              </td>
              {token ? (
                <td className="border-b-2 px-8 border-black py-2 flex">
                  <button
                    onClick={() => handleupdatebutton(record._id)}
                    className="rounded-lg bg-green-500 hover:bg-green-200 p-2 mx-2"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handledelete(record._id)}
                    className="rounded-lg bg-red-500 hover:bg-red-200 p-2"
                  >
                    Delete
                  </button>
                </td>
              ) : (
                <></>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GetAllRecords;
