import mongoose from "mongoose";
const { Schema, model } = mongoose;

const OurActivitySchema = Schema(
  {
    image: {
      type: String,
      required: [true, "Please provide the image"],
    },
    activitiesName: {
      type: String,
      required: [true, "Please provide the activities name"],
    },
    description: {
      type: String,
      required: [true, "Please provide the description"],
    },
    branch: {
      type: String,
      required: [true, "Please provide the branch"],
    },
  },
  { timestamps: true }
);

const OurActivity = model("OurActivity", OurActivitySchema);

export default OurActivity;