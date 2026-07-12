import mongoose from "mongoose";

const sectionSchema = new mongoose.Schema(
  {
    name: String,
    present: Boolean,
    feedback: String,
  },
  { _id: false }
);

const resumeSchema = new mongoose.Schema(
  {
    fileName: { type: String, required: true },
    rawText: { type: String, required: true },
    jobDescription: { type: String, default: "" },

    overallScore: { type: Number, required: true }, // 0-100
    atsCompatibility: { type: Number, required: true }, // 0-100

    matchedKeywords: [{ type: String }],
    missingKeywords: [{ type: String }],

    sections: [sectionSchema],

    formattingIssues: [{ type: String }],
    strengths: [{ type: String }],
    improvements: [{ type: String }],

    summary: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Resume", resumeSchema);
