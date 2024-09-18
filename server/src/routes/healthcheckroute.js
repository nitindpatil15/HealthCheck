import { Router } from "express";
import verifyJWT from "../middleware/auth.middleware.js";
import { AddHealthRecords, AllHealthRecords, DeleteHealthRecords, getHealthRecordById, UpdateHealthRecords } from "../controllers/healthcheck.controller.js";

const router = Router()

// POST /health-records: Create a new health record.
router.route("/health-records").post(verifyJWT,AddHealthRecords)

// GET /health-records: Retrieve a list of all health records.
router.route("/health-records").get(AllHealthRecords)

// GET /health-records/:id: Retrieve a specific health record by its ID.
router.route("/health-records/:id").get(getHealthRecordById)

// PUT /health-records/:id: Update a health record.
router.route("/health-records/:id").put(verifyJWT,UpdateHealthRecords)

// DELETE /health-records/:id: 
router.route("/health-records/:id").delete(verifyJWT,DeleteHealthRecords)



export default router