import ClassModel from "./Classes.model.js";

// Get all classes (Paginated)
export async function getAllClasses(req, res) {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const [result, totalClasses] = await Promise.all([
      ClassModel.find().skip(skip).limit(limit).sort({ createdAt: -1 }),
      ClassModel.countDocuments()
    ]);

    res.status(200).json({
      success: true,
      data: result,
      pagination: {
        totalItems: totalClasses,
        totalPages: Math.ceil(totalClasses / limit),
        currentPage: page,
        itemsPerPage: limit
      }
    });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Get classes by branch (Paginated)
export async function getClassesByBranch(req, res) {
  const branch = req.params.branch;
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const [result, totalClasses] = await Promise.all([
      ClassModel.find({ branch }).skip(skip).limit(limit).sort({ createdAt: -1 }),
      ClassModel.countDocuments({ branch }) 
    ]);

    res.status(200).json({
      success: true,
      data: result,
      pagination: {
        totalItems: totalClasses,
        totalPages: Math.ceil(totalClasses / limit),
        currentPage: page,
        itemsPerPage: limit
      }
    });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Get class by ID
export async function getClassById(req, res) {
  const id = req.params.id;
  try {
    const result = await ClassModel.findById(id);
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Class not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Create a new class
export async function createClass(req, res) {
  try {
    const classData = req.body;
    const result = await ClassModel.create(classData);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Update a class by ID
export async function updateClass(req, res) {
  const id = req.params.id;
  const classData = req.body;
  try {
    const result = await ClassModel.findByIdAndUpdate(id, classData, {
      new: true,
    });
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Class not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Remove a class by ID
export async function removeClass(req, res) {
  const id = req.params.id;
  try {
    const result = await ClassModel.findByIdAndDelete(id);
    if (result) {
      res.status(200).json({ message: "Class deleted successfully" });
    } else {
      res.status(404).json({ message: "Class not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}