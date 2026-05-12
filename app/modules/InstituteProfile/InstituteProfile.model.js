// src/app/modules/InstituteProfile/InstituteProfile.model.js
import mongoose from "mongoose";
const { Schema, model } = mongoose;

const InstituteProfileSchema = Schema(
  {
    instituteLogo: {
      type: String,
      required: [true, "Please provide the institute logo"],
    },
    nameOfInstitute: {
      type: String,
      required: [true, "Please provide the name of the institute"],
    },
    targetLine: {
      type: String,
      required: [true, "Please provide the target line"],
    },
    phoneNumber: {
      type: String,
      required: [true, "Please provide the phone number"],
    },
   
    address: {
      type: String,
      required: [true, "Please provide the address"],
    },
    branch: {
      type: String,
      required: [true, "Please provide the branch"],
    },
  },
  { timestamps: true }
);

const InstituteProfile = model("InstituteProfile", InstituteProfileSchema);

export default InstituteProfile;