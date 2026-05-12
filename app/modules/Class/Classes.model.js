import mongoose from "mongoose";
const { Schema, model } = mongoose;

const ClassSchema = Schema(
  {
    className: {
      type: String,
      required: [true, "Please provide the class name"],
    },
    branch: {
      type: String,
      required: [true, "Please provide the branch"],
    },
  },
  { timestamps: true }
);

const ClassModel = model("Class", ClassSchema);

export default ClassModel;