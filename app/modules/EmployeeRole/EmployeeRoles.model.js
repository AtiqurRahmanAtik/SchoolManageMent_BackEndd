import mongoose from "mongoose";
const { Schema, model } = mongoose;

const EmployeeRoleSchema = Schema(
  {
    roleName: {
      type: String,
      required: [true, "Please provide the role name"],
    },
   
    branch: {
      type: String,
      required: [true, "Please provide the branch"],
    },
  },
  { timestamps: true }
);

const EmployeeRole = model("EmployeeRole", EmployeeRoleSchema);

export default EmployeeRole;