import mongoose from "mongoose";
const { Schema, model } = mongoose;

const EmployeeSchema = Schema(
  {
    employeeName: {
      type: String,
      required: [true, "Please provide the employee name"],
    },
    mobileNo: {
      type: String,
      required: [true, "Please provide the mobile no"],
    },
    employeeRole: {
      type: String,
      required: [true, "Please provide the employee role"],
    },
    photo: {
      type: String,
    },
    monthlySalary: {
      type: Number,
    },
    gender: {
      type: String,
    },
    fatherHusbandName: {
      type: String,
    },
    experience: {
      type: String,
    },
    nationalId: {
      type: String,
    },
    religion: {
      type: String,
    },
    emailAddress: {
      type: String,
    },
    education: {
      type: String,
    },
    bloodGroup: {
      type: String,
    },
    dateOfBirth: {
      type: Date,
    },
    address: {
      type: String,
    },
    branch: {
      type: String,
      required: [true, "Please provide the branch"],
    },
  },
  { timestamps: true }
);

const Employee = model("Employee", EmployeeSchema);

export default Employee;