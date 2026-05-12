import mongoose from "mongoose";
const { Schema, model } = mongoose;

const ParentsReviewSchema = Schema(
  {
    parentsImage: {
      type: String,
      required: [true, "Please provide the parents image"],
    },
    parentsName: {
      type: String,
      required: [true, "Please provide the parents name"],
    },
    parentsReview: {
      type: String,
      required: [true, "Please provide the parents review"],
    },
    branch: {
      type: String,
      required: [true, "Please provide the branch"],
    },
  },
  { timestamps: true }
);

const ParentsReview = model("ParentsReview", ParentsReviewSchema);

export default ParentsReview;