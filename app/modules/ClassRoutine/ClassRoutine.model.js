// File: ClassRoutine.model.js

import mongoose from "mongoose";
const { Schema, model } = mongoose;

const ClassRoutineSchema = Schema(
  {
    className: {
      type: String,
      required: [true, "Please provide the class"],
    },
    day: {
      type: String,
      required: [true, "Please provide the day"],
    },
    time: {
      type: String,
      required: [true, "Please provide the time"],
    },
    subjectName: {
      type: String,
      required: [true, "Please provide the subject name"],
    },
    subjectCode: {
      type: String,
      required: [true, "Please provide the subject code"],
    },
    teacherId: {
      type: Schema.Types.ObjectId,
      ref: "Teacher",
      required: [true, "Please provide the teacher ID"],
    },
    teacherName: {
      type: String,
      required: [true, "Please provide the teacher name"],
    },
    branch: {
      type: String,
      required: [true, "Please provide the branch"],
    },
  },
  { timestamps: true }
);

const ClassRoutine = model("ClassRoutine", ClassRoutineSchema);

export default ClassRoutine;