import mongoose from "mongoose";

const { Schema, model } = mongoose;

const RecentNoticeSchema = Schema(
  {
    noticeName: {
      type: String,
      required: [true, "Please provide the notice name"],
    },
    noticeTitle: {
      type: String,
      required: [true, "Please provide the notice title"],
    },
    date: {
      type: String,
      required: [true, "Please provide the date"],
    },
    description: {
      type: String,
     
    },
    image: {
      type: String,
     
    },
    branch: {
      type: String,
      required: [true, "Please provide the branch"],
    },
  },
  { timestamps: true }
);

const RecentNotice = model("RecentNotice", RecentNoticeSchema);

export default RecentNotice;