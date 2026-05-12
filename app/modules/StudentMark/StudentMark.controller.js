import StudentMark from "./StudentMark.model.js";

// Get all student documents (pagination remains similar)
export async function getAllStudentMarks(req, res) {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const [result, totalMarks] = await Promise.all([
      StudentMark.find().skip(skip).limit(limit).sort({ createdAt: -1 }),
      StudentMark.countDocuments()
    ]);

    res.status(200).json({
      success: true,
      data: result,
      pagination: {
        totalItems: totalMarks,
        totalPages: Math.ceil(totalMarks / limit),
        currentPage: page,
        itemsPerPage: limit
      }
    });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Get marks by branch
export async function getStudentMarksByBranch(req, res) {
  const branch = req.params.branch;
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const [result, totalMarks] = await Promise.all([
      StudentMark.find({ branch }).skip(skip).limit(limit).sort({ createdAt: -1 }),
      StudentMark.countDocuments({ branch }) 
    ]);

    res.status(200).json({
      success: true,
      data: result,
      pagination: {
        totalItems: totalMarks,
        totalPages: Math.ceil(totalMarks / limit),
        currentPage: page,
        itemsPerPage: limit
      }
    });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Get specific student result document by MongoDB _id
export async function getStudentMarkById(req, res) {
  const id = req.params.id;
  try {
    const result = await StudentMark.findById(id);
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Student record not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

/**
 * UPDATE: Create or Add Mark
 * This logic checks if the student record exists. 
 * If yes, it pushes the new mark to the results array.
 * If no, it creates a new document.
 */
export async function createStudentMark(req, res) {
  try {
    const { 
      studentId, studentName, registrationNo, studentClass, 
      section, branch, studentImage, examType, subjectId, 
      subjectName, mark, grade 
    } = req.body;

    const newResultEntry = { examType, subjectId, subjectName, mark, grade };

    const result = await StudentMark.findOneAndUpdate(
      { studentId: studentId },
      { 
        $set: { studentName, registrationNo, studentClass, section, branch, studentImage },
        $push: { results: newResultEntry } 
      },
      { upsert: true, new: true, runValidators: true }
    );

    res.status(201).json(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

/**
 * UPDATE: Update a specific mark inside the array
 * Expects the resultId (the _id of the object inside the array) 
 */
export async function updateStudentMark(req, res) {
  const { id } = req.params; // Document ID
  const { resultId, mark, grade } = req.body; // resultId is the ID of the specific entry in the array
  
  try {
    const result = await StudentMark.findOneAndUpdate(
      { _id: id, "results._id": resultId },
      { 
        $set: { 
          "results.$.mark": mark, 
          "results.$.grade": grade,
          "results.$.dateRecorded": Date.now() 
        } 
      },
      { new: true }
    );

    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Student or specific exam mark not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

/**
 * UPDATE: Remove a specific mark from the results array
 */
export async function removeStudentMark(req, res) {
  const { id } = req.params; // Document ID
  const { resultId } = req.body; // The ID of the specific mark to remove
  
  try {
    const result = await StudentMark.findByIdAndUpdate(
      id,
      { $pull: { results: { _id: resultId } } },
      { new: true }
    );

    if (result) {
      res.status(200).json({ message: "Specific mark removed successfully", data: result });
    } else {
      res.status(404).json({ message: "Student record not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}