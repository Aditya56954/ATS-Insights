import express from "express";
import upload from "../middleware/upload.js";
import {
  analyzeResumeUpload,
  getResumes,
  getResumeById,
  deleteResume,
} from "../controllers/resumeController.js";

const router = express.Router();

router.post("/analyze", upload.single("resume"), analyzeResumeUpload);
router.get("/", getResumes);
router.get("/:id", getResumeById);
router.delete("/:id", deleteResume);

export default router;
