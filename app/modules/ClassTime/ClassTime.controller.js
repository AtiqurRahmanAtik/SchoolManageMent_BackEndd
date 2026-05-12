// File: ClassTime.controller.js

import ClassTime from "./ClassTime.model.js";

export async function getAllClassTimes(req, res) {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const [result, totalClassTimes] = await Promise.all([
      ClassTime.find().skip(skip).limit(limit).sort({ createdAt: -1 }),
      ClassTime.countDocuments()
    ]);

    res.status(200).json({
      success: true,
      data: result,
      pagination: {
        totalItems: totalClassTimes,
        totalPages: Math.ceil(totalClassTimes / limit),
        currentPage: page,
        itemsPerPage: limit
      }
    });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

export async function getClassTimesByBranch(req, res) {
  const branch = req.params.branch;
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const [result, totalClassTimes] = await Promise.all([
      ClassTime.find({ branch }).skip(skip).limit(limit).sort({ createdAt: -1 }),
      ClassTime.countDocuments({ branch }) 
    ]);

    res.status(200).json({
      success: true,
      data: result,
      pagination: {
        totalItems: totalClassTimes,
        totalPages: Math.ceil(totalClassTimes / limit),
        currentPage: page,
        itemsPerPage: limit
      }
    });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Get class time by ID
export async function getClassTimeById(req, res) {
  const id = req.params.id;
  try {
    const result = await ClassTime.findById(id);
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "ClassTime not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Create a new class time
export async function createClassTime(req, res) {
  try {
    const classTimeData = req.body;
    const result = await ClassTime.create(classTimeData);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Update a class time by ID
export async function updateClassTime(req, res) {
  const id = req.params.id;
  const classTimeData = req.body;
  try {
    const result = await ClassTime.findByIdAndUpdate(id, classTimeData, {
      new: true,
    });
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "ClassTime not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Remove a class time by ID
export async function removeClassClassTime(req, res) {
  const id = req.params.id;
  try {
    const result = await ClassTime.findByIdAndDelete(id);
    if (result) {
      res.status(200).json({ message: "ClassTime deleted successfully" });
    } else {
      res.status(404).json({ message: "ClassTime not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}