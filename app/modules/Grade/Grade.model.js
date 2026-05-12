import mongoose from "mongoose";
const { Schema, model } = mongoose;

const GradeSchema = new Schema(
  {
    gradeName: {
      type: String,
      required: [true, "Please provide the grade name (e.g., A+, A, B)"],
      trim: true,
    },
    gradePoint: {
      type: Number,
      required: [true, "Please provide the grade point (e.g., 5.00, 4.00)"],
    },
    minMark: {
      type: Number,
      required: [true, "Please provide the minimum mark for this grade"],
    },
    maxMark: {
      type: Number,
      required: [true, "Please provide the maximum mark for this grade"],
    },
    remarks: {
      type: String,
      required: [true, "Please provide remarks (e.g., Excellent, Good, Fail)"],
      trim: true,
    },
    branch: {
      type: String,
      required: [true, "Please provide the branch"],
      index: true,
    },
  },
  { 
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Compound Index: Prevents duplicate Grade Names within the same branch
GradeSchema.index({ gradeName: 1, branch: 1 }, { unique: true });

const Grade = model("Grade", GradeSchema);

export default Grade;