import Examination from "./Examination.model.js";

export async function getAllExaminations(req, res) {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const [result, totalExaminations] = await Promise.all([
      Examination.find().skip(skip).limit(limit).sort({ createdAt: -1 }),
      Examination.countDocuments()
    ]);

    res.status(200).json({
      success: true,
      data: result,
      pagination: {
        totalItems: totalExaminations,
        totalPages: Math.ceil(totalExaminations / limit),
        currentPage: page,
        itemsPerPage: limit
      }
    });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

export async function getExaminationsByBranch(req, res) {
  const branch = req.params.branch;
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const [result, totalExaminations] = await Promise.all([
      Examination.find({ branch }).skip(skip).limit(limit).sort({ createdAt: -1 }),
      Examination.countDocuments({ branch }) 
    ]);

    res.status(200).json({
      success: true,
      data: result,
      pagination: {
        totalItems: totalExaminations,
        totalPages: Math.ceil(totalExaminations / limit),
        currentPage: page,
        itemsPerPage: limit
      }
    });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Get examination by ID
export async function getExaminationById(req, res) {
  const id = req.params.id;
  try {
    const result = await Examination.findById(id);
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Examination not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Create a new examination
export async function createExamination(req, res) {
  try {
    const examinationData = req.body;
    const result = await Examination.create(examinationData);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Update a examination by ID
export async function updateExamination(req, res) {
  const id = req.params.id;
  const examinationData = req.body;
  try {
    const result = await Examination.findByIdAndUpdate(id, examinationData, {
      new: true,
    });
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Examination not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Remove a examination by ID
export async function removeExamination(req, res) {
  const id = req.params.id;
  try {
    const result = await Examination.findByIdAndDelete(id);
    if (result) {
      res.status(200).json({ message: "Examination deleted successfully" });
    } else {
      res.status(404).json({ message: "Examination not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}