// File: ClassRoutine.controller.js

import ClassRoutine from "./ClassRoutine.model.js";

export async function getAllClassRoutines(req, res) {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const [result, totalClassRoutines] = await Promise.all([
      ClassRoutine.find().skip(skip).limit(limit).sort({ createdAt: -1 }),
      ClassRoutine.countDocuments()
    ]);

    res.status(200).json({
      success: true,
      data: result,
      pagination: {
        totalItems: totalClassRoutines,
        totalPages: Math.ceil(totalClassRoutines / limit),
        currentPage: page,
        itemsPerPage: limit
      }
    });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

export async function getClassRoutinesByBranch(req, res) {
  const branch = req.params.branch;
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const [result, totalClassRoutines] = await Promise.all([
      ClassRoutine.find({ branch }).skip(skip).limit(limit).sort({ createdAt: -1 }),
      ClassRoutine.countDocuments({ branch }) 
    ]);

    res.status(200).json({
      success: true,
      data: result,
      pagination: {
        totalItems: totalClassRoutines,
        totalPages: Math.ceil(totalClassRoutines / limit),
        currentPage: page,
        itemsPerPage: limit
      }
    });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Get class routine by ID
export async function getClassRoutineById(req, res) {
  const id = req.params.id;
  try {
    const result = await ClassRoutine.findById(id);
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "ClassRoutine not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Create a new class routine
export async function createClassRoutine(req, res) {
  try {
    // The req.body will now automatically accept teacherId along with the other fields
    const classRoutineData = req.body;
    const result = await ClassRoutine.create(classRoutineData);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Update a class routine by ID
export async function updateClassRoutine(req, res) {
  const id = req.params.id;
  const classRoutineData = req.body;
  try {
    const result = await ClassRoutine.findByIdAndUpdate(id, classRoutineData, {
      new: true,
      runValidators: true, // Ensures mongoose validates the updated fields (like teacherId)
    });
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "ClassRoutine not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Remove a class routine by ID
export async function removeClassRoutine(req, res) {
  const id = req.params.id;
  try {
    const result = await ClassRoutine.findByIdAndDelete(id);
    if (result) {
      res.status(200).json({ message: "ClassRoutine deleted successfully" });
    } else {
      res.status(404).json({ message: "ClassRoutine not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}