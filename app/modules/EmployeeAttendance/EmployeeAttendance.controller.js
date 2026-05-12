import EmployeeAttendance from "./EmployeeAttendance.model.js";

export async function getAllEmployeeAttendances(req, res) {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // 1. Build the dynamic query object based on frontend filters
    const query = {};

    if (req.query.employeeRole) {
      query.employeeRole = req.query.employeeRole;
    }

    if (req.query.date) {
      // Assuming 'date' is stored as a standard Date object in MongoDB:
      // This creates a search range from the start of the day to the end of the day.
      const startOfDay = new Date(req.query.date);
      startOfDay.setUTCHours(0, 0, 0, 0);
      
      const endOfDay = new Date(req.query.date);
      endOfDay.setUTCHours(23, 59, 59, 999);
      
      query.date = { $gte: startOfDay, $lte: endOfDay };
      
      // NOTE: If you store dates in your DB strictly as strings like "YYYY-MM-DD", 
      // delete the 6 lines above and just use: query.date = req.query.date;
    }

    if (req.query.search) {
      query.$or = [
        { employeeName: { $regex: req.query.search, $options: "i" } },
        { employeeMobileNo: { $regex: req.query.search, $options: "i" } },
        { employeeRole: { $regex: req.query.search, $options: "i" } }
      ];
    }

    // 2. Pass the 'query' object into find() and countDocuments()
    const [result, totalEmployeeAttendances] = await Promise.all([
      EmployeeAttendance.find(query).skip(skip).limit(limit).sort({ createdAt: -1 }),
      EmployeeAttendance.countDocuments(query)
    ]);

    res.status(200).json({
      success: true,
      data: result,
      pagination: {
        totalItems: totalEmployeeAttendances,
        totalPages: Math.ceil(totalEmployeeAttendances / limit),
        currentPage: page,
        itemsPerPage: limit
      }
    });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

export async function getEmployeeAttendancesByBranch(req, res) {
  const branch = req.params.branch;
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // 1. Build the dynamic query object, automatically including the branch
    const query = { branch };

    if (req.query.employeeRole) {
      query.employeeRole = req.query.employeeRole;
    }

    if (req.query.date) {
      // Assuming 'date' is stored as a Date object
      const startOfDay = new Date(req.query.date);
      startOfDay.setUTCHours(0, 0, 0, 0);
      
      const endOfDay = new Date(req.query.date);
      endOfDay.setUTCHours(23, 59, 59, 999);
      
      query.date = { $gte: startOfDay, $lte: endOfDay };
      
      // NOTE: If you store dates strictly as strings, use: query.date = req.query.date;
    }

    if (req.query.search) {
      query.$or = [
        { employeeName: { $regex: req.query.search, $options: "i" } },
        { employeeMobileNo: { $regex: req.query.search, $options: "i" } },
        { employeeRole: { $regex: req.query.search, $options: "i" } }
      ];
    }

    // 2. Pass the 'query' object into find() and countDocuments()
    const [result, totalEmployeeAttendances] = await Promise.all([
      EmployeeAttendance.find(query).skip(skip).limit(limit).sort({ createdAt: -1 }),
      EmployeeAttendance.countDocuments(query) 
    ]);

    res.status(200).json({
      success: true,
      data: result,
      pagination: {
        totalItems: totalEmployeeAttendances,
        totalPages: Math.ceil(totalEmployeeAttendances / limit),
        currentPage: page,
        itemsPerPage: limit
      }
    });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Get employee attendance by ID
export async function getEmployeeAttendanceById(req, res) {
  const id = req.params.id;
  try {
    const result = await EmployeeAttendance.findById(id);
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "EmployeeAttendance not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Create a new employee attendance
// Create OR Update (Upsert) Employee Attendance
export async function createEmployeeAttendance(req, res) {
  try {
    const employeeAttendanceData = req.body;
    
    // UPSERT: If a record for this exact employee on this exact date exists, update it.
    // If it does not exist, create a new one. This safely handles multiple clicks/submissions.
    const result = await EmployeeAttendance.findOneAndUpdate(
      { 
        employeeId: employeeAttendanceData.employeeId, // Matches the specific employee
        date: employeeAttendanceData.date              // Matches the specific date
      },
      employeeAttendanceData,
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    // Using 200 OK because this action might be an update rather than a new creation
    res.status(200).json(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Update an employee attendance by ID
export async function updateEmployeeAttendance(req, res) {
  const id = req.params.id;
  const employeeAttendanceData = req.body;
  try {
    const result = await EmployeeAttendance.findByIdAndUpdate(id, employeeAttendanceData, {
      new: true,
    });
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "EmployeeAttendance not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Remove an employee attendance by ID
export async function removeEmployeeAttendance(req, res) {
  const id = req.params.id;
  try {
    const result = await EmployeeAttendance.findByIdAndDelete(id);
    if (result) {
      res.status(200).json({ message: "EmployeeAttendance deleted successfully" });
    } else {
      res.status(404).json({ message: "EmployeeAttendance not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}