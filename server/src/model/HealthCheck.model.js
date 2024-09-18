import mongoose, { Schema } from "mongoose";

const HealthcheckSchema = new Schema(
    {
      Date: {
        type: Date,
        required: true,
      },
      Patient_Name:{
        type:String,
        required:true
      },
      Body_temperature: {
        type: String,
        required: true,
      },
      Blood_pressure: {
        type: String,
        required: true,
      },
      Heart_rate: {
        type: String,
        required: true,
      },
    },
    { timestamps: true }
  );

  const Healthcheck = mongoose.model("Healthcheck", HealthcheckSchema);
  export default Healthcheck;