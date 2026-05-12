import mongoose from "mongoose";
const { Schema, model } = mongoose;

const TeacherSchema = Schema(
  {
    teacherName: {
      type: String,
      required: [true, "Please provide the teacher name"],
    },
    phoneNumber: {
      type: String,
      required: [true, "Please provide the phone number"],
    },
    email: {
      type: String,
      required: [true, "Please provide the email"],
    },
    teacherPhoto: {
      type: String,
      required: [true, "Please provide the teacher photo"],
    },
    subject: {
      type: String,
      required: [true, "Please provide the subject"],
    },
    branch: {
      type: String,
      required: [true, "Please provide the branch"],
    },
  },
  { timestamps: true }
);

const Teacher = model("Teacher", TeacherSchema);

export default Teacher;