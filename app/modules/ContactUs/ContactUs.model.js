import mongoose from "mongoose";

const { Schema, model } = mongoose;

const ContactUsSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide the name"],
    },
    email: {
      type: String,
      required: [true, "Please provide the email"],
    },
    subject: {
      type: String,
      required: [true, "Please provide the subject"],
    },
    message: {
      type: String,
      required: [true, "Please provide the message"],
    },
    branch: {
      type: String,
      required: [true, "Please provide the branch"],
    },
  },
  { timestamps: true }
);

const ContactUs = model("ContactUs", ContactUsSchema);

export default ContactUs;