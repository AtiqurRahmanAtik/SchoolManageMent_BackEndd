import mongoose from "mongoose";

const { Schema, model } = mongoose;

const BlogSchema = Schema(
  {
    image: {
      type: String,
      required: [true, "Please provide the image"],
    },
    blogWriter: {
      type: String,
      required: [true, "Please provide the blog writer"],
    },
    department: {
      type: String,
      required: [true, "Please provide the department"],
    },
    blogHeadline: {
      type: String,
      required: [true, "Please provide the blog headline"],
    },
    description: {
      type: String,
      required: [true, "Please provide the description"],
    },
    tag: {
      type: String,
      required: [true, "Please provide the tag"],
    },
    branch: {
      type: String,
      required: [true, "Please provide the branch"],
    },
  },
  { timestamps: true }
);

const Blog = model("Blog", BlogSchema);

export default Blog;