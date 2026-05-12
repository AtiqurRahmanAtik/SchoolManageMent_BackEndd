import RecentNotice from "./RecentNotices.model.js";

export async function getAllRecentNotices(req, res) {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const [result, totalRecentNotices] = await Promise.all([
      RecentNotice.find().skip(skip).limit(limit).sort({ createdAt: -1 }),
      RecentNotice.countDocuments()
    ]);

    res.status(200).json({
      success: true,
      data: result,
      pagination: {
        totalItems: totalRecentNotices,
        totalPages: Math.ceil(totalRecentNotices / limit),
        currentPage: page,
        itemsPerPage: limit
      }
    });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

export async function getRecentNoticesByBranch(req, res) {
  const branch = req.params.branch;
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const [result, totalRecentNotices] = await Promise.all([
      RecentNotice.find({ branch }).skip(skip).limit(limit).sort({ createdAt: -1 }),
      RecentNotice.countDocuments({ branch }) 
    ]);

    res.status(200).json({
      success: true,
      data: result,
      pagination: {
        totalItems: totalRecentNotices,
        totalPages: Math.ceil(totalRecentNotices / limit),
        currentPage: page,
        itemsPerPage: limit
      }
    });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Get recent notice by ID
export async function getRecentNoticeById(req, res) {
  const id = req.params.id;
  try {
    const result = await RecentNotice.findById(id);
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Recent Notice not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Create a new recent notice
export async function createRecentNotice(req, res) {
  try {
    const noticeData = req.body;
    const result = await RecentNotice.create(noticeData);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Update a recent notice by ID
export async function updateRecentNotice(req, res) {
  const id = req.params.id;
  const noticeData = req.body;
  try {
    const result = await RecentNotice.findByIdAndUpdate(id, noticeData, {
      new: true,
    });
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Recent Notice not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Remove a recent notice by ID
export async function removeRecentNotice(req, res) {
  const id = req.params.id;
  try {
    const result = await RecentNotice.findByIdAndDelete(id);
    if (result) {
      res.status(200).json({ message: "Recent Notice deleted successfully" });
    } else {
      res.status(404).json({ message: "Recent Notice not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}