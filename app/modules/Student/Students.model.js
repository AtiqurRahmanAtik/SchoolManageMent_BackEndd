// File: app/modules/Student/Students.model.js

import mongoose from "mongoose";
const { Schema, model } = mongoose;

const StudentSchema = Schema(
  {
    studentName: {
      type: String,
      required: [true, "Please provide the student name"],
    },
    registrationNo: {
      type: String,
      required: [true, "Please provide the registration no"],
      unique: true,
    },
    studentClass: {
      type: String,
      required: [true, "Please provide the class"],
    },
    section: {
      type: String,
      required: [true, "Please provide the section"],
    },
    studentPhoto: {
      type: String,
      required: [true, "Please provide the student photo"],
    },
    mobileNo: {
      type: String,
      required: [true, "Please provide the student mobile number"],
    },
    dateOfAdmission: {
      type: Date,
      required: [true, "Please provide the date of admission"],
    },
    discountInFee: {
      type: Number,
      required: [true, "Please provide the discount in fee"],
    },
    dateOfBirth: {
      type: Date,
      required: [true, "Please provide the date of birth"],
    },
    studentBirthFormId: {
      type: String,
      required: [true, "Please provide the student birth form ID or NIC"],
    },
    gender: {
      type: String,
      required: [true, "Please provide the gender"],
    },
    previousSchool: {
      type: String,
      required: [true, "Please provide the previous school"],
    },
    religion: {
      type: String,
      required: [true, "Please provide the religion"],
    },
    bloodGroup: {
      type: String,
      required: [true, "Please provide the blood group"],
    },
    previousIdBoardRollNo: {
      type: String,
      required: [true, "Please provide the previous ID or Board Roll No"],
    },
    additionalNote: {
      type: String,
      required: [true, "Please provide an additional note (or N/A)"],
    },
    totalSiblings: {
      type: Number,
      required: [true, "Please provide the total number of siblings"],
    },
    address: {
      type: String,
      required: [true, "Please provide the address"],
    },
    fatherName: {
      type: String,
      required: [true, "Please provide the father's name"],
    },
    fatherNationalId: {
      type: String,
      required: [true, "Please provide the father's national ID"],
    },
    fatherOccupation: {
      type: String,
      required: [true, "Please provide the father's occupation"],
    },
    fatherEducation: {
      type: String,
      required: [true, "Please provide the father's education"],
    },
    fatherMobileNo: {
      type: String,
      required: [true, "Please provide the father's mobile number"],
    },
    fatherIncome: {
      type: Number,
      required: [true, "Please provide the father's income"],
    },
    motherName: {
      type: String,
      required: [true, "Please provide the mother's name"],
    },
    motherNationalId: {
      type: String,
      required: [true, "Please provide the mother's national ID"],
    },
    motherOccupation: {
      type: String,
      required: [true, "Please provide the mother's occupation"],
    },
    motherEducation: {
      type: String,
      required: [true, "Please provide the mother's education"],
    },
    motherMobileNo: {
      type: String,
      required: [true, "Please provide the mother's mobile number"],
    },
    motherIncome: {
      type: Number,
      required: [true, "Please provide the mother's income"],
    },
    branch: {
      type: String,
      required: [true, "Please provide the branch"],
    },
  },
  { timestamps: true }
);

const Student = model("Student", StudentSchema);

export default Student;