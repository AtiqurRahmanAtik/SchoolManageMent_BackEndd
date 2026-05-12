import mongoose from "mongoose";
const { Schema, model } = mongoose;

const SalarySchema = Schema(
  {
    employeeRole: {
      type: Schema.Types.ObjectId,
      ref: "EmployeeRole",
      required: [true, "Please provide the employee role ID"],
    },

    employeeSalary: {
      type: Number,
      required: [true, "Please provide the employee salary"],
    },
    branch: {
      type: String,
      required: [true, "Please provide the branch"],
    },
  },
  { timestamps: true }
);

// Added index for branch performance
SalarySchema.index({ branch: 1 });

const Salary = model("Salary", SalarySchema);

export default Salary;