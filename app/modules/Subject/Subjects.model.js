import mongoose from "mongoose";
const { Schema, model } = mongoose;

const SubjectSchema = Schema(
  {
    SubjectCode: {
      type: String,
      required: [true, "Please provide the subject code"],
      unique: true, // Optional: Add this if subject codes should be unique per branch/globally
    },
    ClassName: {
      type: String,
      required: [true, "Please provide the class name"],
    },
    SubjectName: {
      type: String,
      required: [true, "Please provide the subject name"],
    },
    Marks: {
      type: Number,
      required: [true, "Please provide the marks"],
    },
    branch: {
      type: String,
      required: [true, "Please provide the branch"],
    },
  },
  { timestamps: true }
);

const Subject = model("Subject", SubjectSchema);

export default Subject;