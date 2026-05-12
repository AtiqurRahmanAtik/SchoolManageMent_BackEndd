import mongoose from "mongoose";
const { Schema, model } = mongoose;

const NoticeSchema = Schema(
  {
    noticeDetails: {
      type: String,
      required: [true, "Please provide the notice details"],
    },
    imageUrl: {
      type: String,
      
    },
    branch: {
      type: String,
      required: [true, "Please provide the branch"],
    },
  },
  { timestamps: true }
);

const Notice = model("Notice", NoticeSchema);

export default Notice;