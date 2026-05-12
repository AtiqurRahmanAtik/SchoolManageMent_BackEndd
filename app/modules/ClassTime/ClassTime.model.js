// File: ClassTime.model.js

import mongoose from "mongoose";
const { Schema, model } = mongoose;

const ClassTimeSchema = Schema(
  {
    classTime: {
      type: String,
      required: [true, "Please provide the class time"],
    },
    branch: {
      type: String,
      required: [true, "Please provide the branch"],
    },
  },
  { timestamps: true }
);

const ClassTime = model("ClassTime", ClassTimeSchema);

export default ClassTime;