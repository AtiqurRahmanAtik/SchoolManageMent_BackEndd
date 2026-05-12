import mongoose from "mongoose";

const { Schema, model } = mongoose;

const AboutUsSchema = Schema(
  {
    headline: {
      type: String,
      required: [true, "Please provide the headline"],
    },
    description: {
      type: String,
      required: [true, "Please provide the description"],
    },
    image: {
      type: String,
      required: [true, "Please provide the image"],
    },
    branch: {
      type: String,
      required: [true, "Please provide the branch"],
    },
  },
  { timestamps: true }
);

const AboutUs = model("AboutUs", AboutUsSchema);

export default AboutUs;