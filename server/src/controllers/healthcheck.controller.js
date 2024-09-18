import Healthcheck from "../model/HealthCheck.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asynchandler } from "../utils/asynchandler.js";

export const AllHealthRecords = asynchandler(async (req, res) => {
  try {
    const allRecords = await Healthcheck.find({});
    return res
      .status(200)
      .json({ message: "Fetched All Records", data: allRecords });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

export const AddHealthRecords = asynchandler(async (req, res) => {
  try {
    const { Date,Patient_Name, Body_temperature, Blood_pressure, Heart_rate } = req.body;
    if (!Date ||!Patient_Name|| !Body_temperature || !Blood_pressure || !Heart_rate) {
      return res.status(401).json({ error: "All Fields are Required" });
    }
    const newRecord = await Healthcheck.create({
      Date,
      Patient_Name,
      Body_temperature,
      Blood_pressure,
      Heart_rate,
    });
    console.log("Added")
    return res
      .status(200)
      .json({ message: "Added Records", data: newRecord });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

export const getHealthRecordById = asynchandler(async (req, res) => {
  try {
    const { id } = req.params;
    
    const recordbyId = await Healthcheck.findById(
      id
    );
    return res
      .status(200)
      .json({ message: "Health Record by Id", data: recordbyId });
  } catch (error) {
    console.log(error.message)
    throw new ApiError(500,"Internal Server Error")
  }
});

export const UpdateHealthRecords = asynchandler(async (req, res) => {
  try {
    const { id } = req.params;
    const { Body_temperature, Blood_pressure, Heart_rate } = req.body;
    if (!Body_temperature || !Blood_pressure || !Heart_rate) {
      return res.status(401).json({ error: "All Fields are Required" });
    }
    const updateRecord = await Healthcheck.findByIdAndUpdate(
      id,
      {
        $set: {
          Body_temperature,
          Blood_pressure,
          Heart_rate,
        },
      },
      {
        new: true,
      }
    );
    return res
      .status(200)
      .json({ message: "Updated Records", data: updateRecord });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

export const DeleteHealthRecords = asynchandler(async (req, res) => {
  try {
    const { id } = req.params;
    
    const deleteRecord = await Healthcheck.findByIdAndDelete(
      id,
    );
    return res
      .status(200)
      .json({ message: "Deleted Records", data: deleteRecord });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});
