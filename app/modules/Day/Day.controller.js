// File: Day.controller.js

import Day from "./Day.model.js";

export async function getAllDays(req, res) {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const [result, totalDays] = await Promise.all([
      Day.find().skip(skip).limit(limit).sort({ createdAt: -1 }),
      Day.countDocuments()
    ]);

    res.status(200).json({
      success: true,
      data: result,
      pagination: {
        totalItems: totalDays,
        totalPages: Math.ceil(totalDays / limit),
        currentPage: page,
        itemsPerPage: limit
      }
    });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

export async function getDaysByBranch(req, res) {
  const branch = req.params.branch;
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const [result, totalDays] = await Promise.all([
      Day.find({ branch }).skip(skip).limit(limit).sort({ createdAt: -1 }),
      Day.countDocuments({ branch }) 
    ]);

    res.status(200).json({
      success: true,
      data: result,
      pagination: {
        totalItems: totalDays,
        totalPages: Math.ceil(totalDays / limit),
        currentPage: page,
        itemsPerPage: limit
      }
    });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Get day by ID
export async function getDayById(req, res) {
  const id = req.params.id;
  try {
    const result = await Day.findById(id);
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Day not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Create a new day
export async function createDay(req, res) {
  try {
    const dayData = req.body;
    const result = await Day.create(dayData);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Update a day by ID
export async function updateDay(req, res) {
  const id = req.params.id;
  const dayData = req.body;
  try {
    const result = await Day.findByIdAndUpdate(id, dayData, {
      new: true,
    });
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Day not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Remove a day by ID
export async function removeDay(req, res) {
  const id = req.params.id;
  try {
    const result = await Day.findByIdAndDelete(id);
    if (result) {
      res.status(200).json({ message: "Day deleted successfully" });
    } else {
      res.status(404).json({ message: "Day not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}