import mongoose from "mongoose";
const { Schema, model } = mongoose;

const BannerSchema = Schema(
  {
    image: {
      type: String,
      required: [true, "Please provide the image"],
    },
    headLine: {
      type: String,
      required: [true, "Please provide the headline"],
    },
    branch: {
      type: String,
      required: [true, "Please provide the branch"],
    },
  },
  { timestamps: true }
);

const Banner = model("Banner", BannerSchema);

export default Banner;