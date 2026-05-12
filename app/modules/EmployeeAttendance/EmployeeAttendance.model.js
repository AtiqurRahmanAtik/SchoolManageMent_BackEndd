import mongoose from "mongoose";

const employeeAttendanceSchema = new mongoose.Schema(
  {
    employeeId: {
      type: mongoose.Schema.Types.ObjectId, // Assuming this references an Employee collection
      ref: "Employee",                      // Update this if your ref name is different
      required: true,
    },
    employeeName: {
      type: String,
      required: true,
    },
    employeeMobileNo: {
      type: String,
      required: false, // Optional, but needed for your search regex
    },
    employeeRole: {
      type: String,
      required: true,  // Needed for your role filter and search
    },
    branch: {
      type: String,
      required: true,  // Needed for getEmployeeAttendancesByBranch
    },
    date: {
      type: Date,
      required: true,  // Crucial for the Upsert and Date range filters
    },
    status: {
      type: String,
      enum: ["Present", "Absent"], // Customize these options as needed
      required: true,
     
    },
    
  },
  { 
    timestamps: true // CRITICAL: This automatically creates the 'createdAt' field used in your sort()
  }
);

// Create a compound index to make the Upsert (createEmployeeAttendance) faster and prevent duplicates
employeeAttendanceSchema.index({ employeeId: 1, date: 1 }, { unique: true });

const EmployeeAttendance = mongoose.model("EmployeeAttendance", employeeAttendanceSchema);

export default EmployeeAttendance;