import Teacher from "./Teachers.model.js";

export async function getAllTeachers(req, res) {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const [result, totalTeachers] = await Promise.all([
      Teacher.find().skip(skip).limit(limit).sort({ createdAt: -1 }),
      Teacher.countDocuments()
    ]);

    res.status(200).json({
      success: true,
      data: result,
      pagination: {
        totalItems: totalTeachers,
        totalPages: Math.ceil(totalTeachers / limit),
        currentPage: page,
        itemsPerPage: limit
      }
    });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

export async function getTeachersByBranch(req, res) {
  const branch = req.params.branch;
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const [result, totalTeachers] = await Promise.all([
      Teacher.find({ branch }).skip(skip).limit(limit).sort({ createdAt: -1 }),
      Teacher.countDocuments({ branch }) 
    ]);

    res.status(200).json({
      success: true,
      data: result,
      pagination: {
        totalItems: totalTeachers,
        totalPages: Math.ceil(totalTeachers / limit),
        currentPage: page,
        itemsPerPage: limit
      }
    });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Get teacher by ID
export async function getTeacherById(req, res) {
  const id = req.params.id;
  try {
    const result = await Teacher.findById(id);
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Teacher not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Create a new teacher
export async function createTeacher(req, res) {
  try {
    const teacherData = req.body;
    const result = await Teacher.create(teacherData);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Update a teacher by ID
export async function updateTeacher(req, res) {
  const id = req.params.id;
  const teacherData = req.body;
  try {
    const result = await Teacher.findByIdAndUpdate(id, teacherData, {
      new: true,
    });
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Teacher not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Remove a teacher by ID
export async function removeTeacher(req, res) {
  const id = req.params.id;
  try {
    const result = await Teacher.findByIdAndDelete(id);
    if (result) {
      res.status(200).json({ message: "Teacher deleted successfully" });
    } else {
      res.status(404).json({ message: "Teacher not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}