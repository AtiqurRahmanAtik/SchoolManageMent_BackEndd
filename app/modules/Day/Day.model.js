// File: Day.model.js

import mongoose from "mongoose";
const { Schema, model } = mongoose;

const DaySchema = Schema(
  {
    dayName: {
      type: String,
      required: [true, "Please provide the day name"],
    },
    branch: {
      type: String,
      required: [true, "Please provide the branch"],
    },
  },
  { timestamps: true }
);

const Day = model("Day", DaySchema);

export default Day;