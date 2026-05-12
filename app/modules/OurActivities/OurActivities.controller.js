import OurActivity from "./OurActivities.model.js";

export async function getAllOurActivities(req, res) {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const [result, totalOurActivities] = await Promise.all([
      OurActivity.find().skip(skip).limit(limit).sort({ createdAt: -1 }),
      OurActivity.countDocuments()
    ]);

    res.status(200).json({
      success: true,
      data: result,
      pagination: {
        totalItems: totalOurActivities,
        totalPages: Math.ceil(totalOurActivities / limit),
        currentPage: page,
        itemsPerPage: limit
      }
    });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

export async function getOurActivitiesByBranch(req, res) {
  const branch = req.params.branch;
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const [result, totalOurActivities] = await Promise.all([
      OurActivity.find({ branch }).skip(skip).limit(limit).sort({ createdAt: -1 }),
      OurActivity.countDocuments({ branch }) 
    ]);

    res.status(200).json({
      success: true,
      data: result,
      pagination: {
        totalItems: totalOurActivities,
        totalPages: Math.ceil(totalOurActivities / limit),
        currentPage: page,
        itemsPerPage: limit
      }
    });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Get our activity by ID
export async function getOurActivityById(req, res) {
  const id = req.params.id;
  try {
    const result = await OurActivity.findById(id);
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Our activity not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Create a new our activity
export async function createOurActivity(req, res) {
  try {
    const ourActivityData = req.body;
    const result = await OurActivity.create(ourActivityData);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Update an our activity by ID
export async function updateOurActivity(req, res) {
  const id = req.params.id;
  const ourActivityData = req.body;
  try {
    const result = await OurActivity.findByIdAndUpdate(id, ourActivityData, {
      new: true,
    });
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Our activity not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Remove an our activity by ID
export async function removeOurActivity(req, res) {
  const id = req.params.id;
  try {
    const result = await OurActivity.findByIdAndDelete(id);
    if (result) {
      res.status(200).json({ message: "Our activity deleted successfully" });
    } else {
      res.status(404).json({ message: "Our activity not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}