import mongoose from "mongoose";
const { Schema, model } = mongoose;

const StudentAttendanceSchema = Schema(
  {
    studentName: {
      type: String,
      required: [true, "Please provide the student name"],
    },
    // Captures the text ID from your UI (e.g., "123565641")
    studentId: {
      type: String,
      required: [true, "Please provide the student ID"],
    },
    // --- NEW PROPERTY ADDED HERE ---
    registrationNo: {
      type: String,
      required: [true, "Please provide the registration number"], // Change to false if this is optional
    },
    // -------------------------------
    // Optional but highly recommended: Keep a link to the actual MongoDB document
    studentRefId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: false, 
    },
    date: {
      type: Date,
      required: [true, "Please provide the date"],
    },
    studentClass: {
      type: String,
      required: [true, "Please provide the class"],
    },
    section: {
      type: String,
      required: [true, "Please provide the section"],
    },
    // Replaced the three booleans with a single strict string
    attendanceStatus: {
      type: String,
      enum: ["Present", "Absent"],
      required: [true, "Please specify if Present or Absent"],
    },
    branch: {
      type: String,
      required: [true, "Please provide the branch"],
    },
  },
  { timestamps: true }
);

// --- ADDED SAFETY MEASURE ---
// This ensures the same student cannot have two different attendance records on the exact same date.
StudentAttendanceSchema.index({ studentId: 1, date: 1 }, { unique: true });

const StudentAttendance = model("StudentAttendance", StudentAttendanceSchema);

export default StudentAttendance;