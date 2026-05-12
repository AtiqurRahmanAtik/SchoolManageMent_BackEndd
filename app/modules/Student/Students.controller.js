// File: app/modules/Student/Students.controller.js

import Student from "./Students.model.js";

export async function getAllStudents(req, res) {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || "";
    const skip = (page - 1) * limit;

    // Build search query
    const query = {};
    if (search) {
      query.$or = [
        { studentName: { $regex: search, $options: "i" } },
        { registrationNo: { $regex: search, $options: "i" } },
        { mobileNo: { $regex: search, $options: "i" } },
        { studentClass: { $regex: search, $options: "i" } }
      ];
    }

    const [result, totalStudents] = await Promise.all([
      Student.find(query).skip(skip).limit(limit).sort({ createdAt: -1 }),
      Student.countDocuments(query)
    ]);

    res.status(200).json({
      success: true,
      data: result,
      pagination: {
        totalItems: totalStudents,
        totalPages: Math.ceil(totalStudents / limit),
        currentPage: page,
        itemsPerPage: limit
      }
    });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

export async function getStudentsByBranch(req, res) {
  const branch = req.params.branch;
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || "";
    const skip = (page - 1) * limit;

    // Build search query matching the branch
    const query = { branch };
    if (search) {
      query.$or = [
        { studentName: { $regex: search, $options: "i" } },
        { registrationNo: { $regex: search, $options: "i" } },
        { mobileNo: { $regex: search, $options: "i" } },
        { studentClass: { $regex: search, $options: "i" } }
      ];
    }

    const [result, totalStudents] = await Promise.all([
      Student.find(query).skip(skip).limit(limit).sort({ createdAt: -1 }),
      Student.countDocuments(query) 
    ]);

    res.status(200).json({
      success: true,
      data: result,
      pagination: {
        totalItems: totalStudents,
        totalPages: Math.ceil(totalStudents / limit),
        currentPage: page,
        itemsPerPage: limit
      }
    });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Get student by ID
export async function getStudentById(req, res) {
  const id = req.params.id;
  try {
    const result = await Student.findById(id);
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Student not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Create a new student
export async function createStudent(req, res) {
  try {
    const studentData = req.body;
    const result = await Student.create(studentData);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Update a student by ID
export async function updateStudent(req, res) {
  const id = req.params.id;
  const studentData = req.body;
  try {
    const result = await Student.findByIdAndUpdate(id, studentData, {
      new: true,
    });
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Student not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Remove a student by ID
export async function removeStudent(req, res) {
  const id = req.params.id;
  try {
    const result = await Student.findByIdAndDelete(id);
    if (result) {
      res.status(200).json({ message: "Student deleted successfully" });
    } else {
      res.status(404).json({ message: "Student not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}