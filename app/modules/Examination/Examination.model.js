import mongoose from "mongoose";
const { Schema, model } = mongoose;
const ExaminationSchema = Schema(
  {
    examinationName: {
      type: String,
      required: [true, "Please provide the examination name"],
    },
    startDate: {
      type: Date,
      required: [true, "Please provide the start date"],
    },
    endDate: {
      type: Date,
      required: [true, "Please provide the end date"],
    },
    startTime: {
      type: String,
      required: [true, "Please provide the start time"],
    },
    endTime: {
      type: String,
      required: [true, "Please provide the end time"],
    },
    branch: {
      type: String,
      required: [true, "Please provide the branch"],
    },
  },
  { timestamps: true }
);

const Examination = model("Examination", ExaminationSchema);
export default Examination;