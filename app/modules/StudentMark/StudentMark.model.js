import mongoose from "mongoose";
const { Schema, model } = mongoose;

const ExamResultSchema = new Schema({
  examType: {
    type: String,
    required: [true, "Exam type is required"], // e.g., "Class Test"
    trim: true,
  },
  subjectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subject",
    required: true,
  },
  subjectName: {
    type: String,
    required: [true, "Subject name is required"], // e.g., "Bangla (BAG-115)"
    trim: true,
  },
  mark: {
    type: Number,
    required: [true, "Mark is required"],
    min: 0,
    max: 100,
  },
  grade: {
    type: String,
    required: [true, "Grade is required"], // e.g., "A+"
    trim: true,
  },
  dateRecorded: {
    type: Date,
    default: Date.now,
  }
});

const StudentMarkSchema = new Schema(
  {
    // Primary Student Identification
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: [true, "Student ID is required"],
      unique: true, // One result document per student
    },
    studentName: {
      type: String,
      required: [true, "Student name is required"],
      trim: true,
    },
    studentImage: {
      type: String,
    },
    registrationNo: {
      type: String,
      required: [true, "Registration number is required"],
      trim: true,
    },
    studentClass: {
      type: String,
      required: [true, "Class is required"], // e.g., "Six"
    },
    section: {
      type: String,
      required: [true, "Section is required"], // e.g., "A"
    },
    branch: {
      type: String,
      required: [true, "Branch is required"],
      index: true,
    },
    // Array to store all exam marks
    results: [ExamResultSchema],
  },
  { 
    timestamps: true 
  }
);

// Optional: Indexing for fast lookups by Class and Section
StudentMarkSchema.index({ studentClass: 1, section: 1 });

const StudentMark = model("StudentMark", StudentMarkSchema);

export default StudentMark;