import mongoose from "mongoose";
const { Schema, model } = mongoose;

const SectionSchema = Schema(
  {
    sectionName: {
      type: String,
      required: [true, "Please provide the section name"],
    },
    // --- FIX APPLIED HERE ---
    // Added className so the DB actually saves the text name you passed from the frontend
    className: {
      type: String,
      required: [false, "Please provide the class name string"], 
    },
    // ------------------------
    branch: {
      type: String,
      required: [true, "Please provide the branch"],
    },
    // Captures the Class Dropdown Value (ObjectId)
    classId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
      required: [true, "Please provide the class ID"],
    },
  },
  { timestamps: true }
);

const Section = model("Section", SectionSchema);

export default Section;