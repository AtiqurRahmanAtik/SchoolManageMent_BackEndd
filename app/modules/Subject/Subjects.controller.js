import Subject from "./Subjects.model.js";

export async function getAllSubjects(req, res) {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const search = req.query.search || "";

    // Build search query
    let query = {};
    if (search) {
      query = {
        $or: [
          { SubjectName: { $regex: search, $options: "i" } },
          { ClassName: { $regex: search, $options: "i" } },
          { SubjectCode: { $regex: search, $options: "i" } },
        ],
      };
    }

    const [result, totalSubjects] = await Promise.all([
      Subject.find(query).skip(skip).limit(limit).sort({ createdAt: -1 }),
      Subject.countDocuments(query)
    ]);

    res.status(200).json({
      success: true,
      data: result,
      pagination: {
        totalItems: totalSubjects,
        totalPages: Math.ceil(totalSubjects / limit),
        currentPage: page,
        itemsPerPage: limit
      }
    });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

export async function getSubjectsByBranch(req, res) {
  const branch = req.params.branch;
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const search = req.query.search || "";

    // Build search query specific to the branch
    let query = { branch };
    if (search) {
      query.$or = [
        { SubjectName: { $regex: search, $options: "i" } },
        { ClassName: { $regex: search, $options: "i" } },
        { SubjectCode: { $regex: search, $options: "i" } },
      ];
    }

    const [result, totalSubjects] = await Promise.all([
      Subject.find(query).skip(skip).limit(limit).sort({ createdAt: -1 }),
      Subject.countDocuments(query) 
    ]);

    res.status(200).json({
      success: true,
      data: result,
      pagination: {
        totalItems: totalSubjects,
        totalPages: Math.ceil(totalSubjects / limit),
        currentPage: page,
        itemsPerPage: limit
      }
    });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Get subject by ID
export async function getSubjectById(req, res) {
  const id = req.params.id;
  try {
    const result = await Subject.findById(id);
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Subject not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Create a new subject
export async function createSubject(req, res) {
  try {
    const subjectData = req.body;
    const result = await Subject.create(subjectData);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Update a subject by ID
export async function updateSubject(req, res) {
  const id = req.params.id;
  const subjectData = req.body;
  try {
    const result = await Subject.findByIdAndUpdate(id, subjectData, {
      new: true,
    });
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Subject not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Remove a subject by ID
export async function removeSubject(req, res) {
  const id = req.params.id;
  try {
    const result = await Subject.findByIdAndDelete(id);
    if (result) {
      res.status(200).json({ message: "Subject deleted successfully" });
    } else {
      res.status(404).json({ message: "Subject not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}