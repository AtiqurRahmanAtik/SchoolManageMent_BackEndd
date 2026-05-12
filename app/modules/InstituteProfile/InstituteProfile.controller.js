// src/app/modules/InstituteProfile/InstituteProfile.controller.js
import InstituteProfile from "./InstituteProfile.model.js";

export async function getAllInstituteProfiles(req, res) {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const [result, totalInstituteProfiles] = await Promise.all([
      InstituteProfile.find().skip(skip).limit(limit).sort({ createdAt: -1 }),
      InstituteProfile.countDocuments()
    ]);

    res.status(200).json({
      success: true,
      data: result,
      pagination: {
        totalItems: totalInstituteProfiles,
        totalPages: Math.ceil(totalInstituteProfiles / limit),
        currentPage: page,
        itemsPerPage: limit
      }
    });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

export async function getInstituteProfilesByBranch(req, res) {
  const branch = req.params.branch;
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const [result, totalInstituteProfiles] = await Promise.all([
      InstituteProfile.find({ branch }).skip(skip).limit(limit).sort({ createdAt: -1 }),
      InstituteProfile.countDocuments({ branch })
    ]);

    res.status(200).json({
      success: true,
      data: result,
      pagination: {
        totalItems: totalInstituteProfiles,
        totalPages: Math.ceil(totalInstituteProfiles / limit),
        currentPage: page,
        itemsPerPage: limit
      }
    });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

export async function getInstituteProfileById(req, res) {
  const id = req.params.id;
  try {
    const result = await InstituteProfile.findById(id);
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Institute Profile not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

export async function createInstituteProfile(req, res) {
  try {
    const instituteProfileData = req.body;
    const result = await InstituteProfile.create(instituteProfileData);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

export async function updateInstituteProfile(req, res) {
  const id = req.params.id;
  const instituteProfileData = req.body;
  try {
    const result = await InstituteProfile.findByIdAndUpdate(id, instituteProfileData, {
      new: true,
    });
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Institute Profile not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

export async function removeInstituteProfile(req, res) {
  const id = req.params.id;
  try {
    const result = await InstituteProfile.findByIdAndDelete(id);
    if (result) {
      res.status(200).json({ message: "Institute Profile deleted successfully" });
    } else {
      res.status(404).json({ message: "Institute Profile not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}