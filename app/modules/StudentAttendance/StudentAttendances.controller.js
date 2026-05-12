import StudentAttendance from "./StudentAttendances.model.js";

// 1. Get All (with Query Filters & Search for your UI Search)
export async function getAllStudentAttendances(req, res) {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Build filter query dynamically from frontend URL parameters
    const filterQuery = {};
    
    // FIXED: Added studentName and registrationNo to the generic search feature
    if (req.query.search) {
      filterQuery.$or = [
        { studentClass: { $regex: req.query.search, $options: "i" } },
        { section: { $regex: req.query.search, $options: "i" } },
        { studentName: { $regex: req.query.search, $options: "i" } },
        { registrationNo: { $regex: req.query.search, $options: "i" } }
      ];
    }

    // Exact match filters
    if (req.query.date) filterQuery.date = req.query.date;
    if (req.query.studentClass) filterQuery.studentClass = req.query.studentClass;
    if (req.query.section) filterQuery.section = req.query.section;

    const [result, totalStudentAttendances] = await Promise.all([
      StudentAttendance.find(filterQuery).skip(skip).limit(limit).sort({ createdAt: -1 }),
      StudentAttendance.countDocuments(filterQuery)
    ]);

    res.status(200).json({
      success: true,
      data: result,
      pagination: {
        totalItems: totalStudentAttendances,
        totalPages: Math.ceil(totalStudentAttendances / limit),
        currentPage: page,
        itemsPerPage: limit
      }
    });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// 2. Get By Branch (also with Query Filters & Search)
export async function getStudentAttendancesByBranch(req, res) {
  const branch = req.params.branch;
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const filterQuery = { branch };

    // FIXED: Added studentName and registrationNo to the generic search feature
    if (req.query.search) {
      filterQuery.$or = [
        { studentClass: { $regex: req.query.search, $options: "i" } },
        { section: { $regex: req.query.search, $options: "i" } },
        { studentName: { $regex: req.query.search, $options: "i" } },
        { registrationNo: { $regex: req.query.search, $options: "i" } }
      ];
    }

    // Exact match filters
    if (req.query.date) filterQuery.date = req.query.date;
    if (req.query.studentClass) filterQuery.studentClass = req.query.studentClass;
    if (req.query.section) filterQuery.section = req.query.section;

    const [result, totalStudentAttendances] = await Promise.all([
      StudentAttendance.find(filterQuery).skip(skip).limit(limit).sort({ createdAt: -1 }),
      StudentAttendance.countDocuments(filterQuery) 
    ]);

    res.status(200).json({
      success: true,
      data: result,
      pagination: {
        totalItems: totalStudentAttendances,
        totalPages: Math.ceil(totalStudentAttendances / limit),
        currentPage: page,
        itemsPerPage: limit
      }
    });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// 3. Get By ID
export async function getStudentAttendanceById(req, res) {
  const id = req.params.id;
  try {
    const result = await StudentAttendance.findById(id);
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Student Attendance not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// 4. Create OR Update (Upsert) - Crucial for your UI's "Submit" buttons
export async function createStudentAttendance(req, res) {
  try {
    const studentAttendanceData = req.body;
    
    // UPSERT: If record for this exact student on this exact date exists, update it.
    // If it does not exist, create a new one. This safely handles multiple clicks.
    const result = await StudentAttendance.findOneAndUpdate(
      { 
        studentId: studentAttendanceData.studentId, 
        date: studentAttendanceData.date 
      },
      studentAttendanceData,
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    res.status(200).json(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// 5. Update Standard
export async function updateStudentAttendance(req, res) {
  const id = req.params.id;
  const studentAttendanceData = req.body;
  try {
    const result = await StudentAttendance.findByIdAndUpdate(id, studentAttendanceData, {
      new: true,
    });
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Student Attendance not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// 6. Delete
export async function removeStudentAttendance(req, res) {
  const id = req.params.id;
  try {
    const result = await StudentAttendance.findByIdAndDelete(id);
    if (result) {
      res.status(200).json({ message: "Student Attendance deleted successfully" });
    } else {
      res.status(404).json({ message: "Student Attendance not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}