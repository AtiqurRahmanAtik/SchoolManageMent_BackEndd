import Notice from "./Notice.model.js";

export async function getAllNotices(req, res) {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const [result, totalNotices] = await Promise.all([
      Notice.find().skip(skip).limit(limit).sort({ createdAt: -1 }),
      Notice.countDocuments()
    ]);

    res.status(200).json({
      success: true,
      data: result,
      pagination: {
        totalItems: totalNotices,
        totalPages: Math.ceil(totalNotices / limit),
        currentPage: page,
        itemsPerPage: limit
      }
    });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

export async function getNoticesByBranch(req, res) {
  const branch = req.params.branch;
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const [result, totalNotices] = await Promise.all([
      Notice.find({ branch }).skip(skip).limit(limit).sort({ createdAt: -1 }),
      Notice.countDocuments({ branch }) 
    ]);

    res.status(200).json({
      success: true,
      data: result,
      pagination: {
        totalItems: totalNotices,
        totalPages: Math.ceil(totalNotices / limit),
        currentPage: page,
        itemsPerPage: limit
      }
    });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

export async function getNoticeById(req, res) {
  const id = req.params.id;
  try {
    const result = await Notice.findById(id);
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Notice not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

export async function createNotice(req, res) {
  try {
    const noticeData = req.body;
    const result = await Notice.create(noticeData);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

export async function updateNotice(req, res) {
  const id = req.params.id;
  const noticeData = req.body;
  try {
    const result = await Notice.findByIdAndUpdate(id, noticeData, {
      new: true,
    });
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Notice not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

export async function removeNotice(req, res) {
  const id = req.params.id;
  try {
    const result = await Notice.findByIdAndDelete(id);
    if (result) {
      res.status(200).json({ message: "Notice deleted successfully" });
    } else {
      res.status(404).json({ message: "Notice not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}