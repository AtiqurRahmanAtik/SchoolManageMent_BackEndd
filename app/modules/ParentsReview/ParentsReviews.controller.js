import ParentsReview from "./ParentsReviews.model.js";

export async function getAllParentsReviews(req, res) {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const [result, totalParentsReviews] = await Promise.all([
      ParentsReview.find().skip(skip).limit(limit).sort({ createdAt: -1 }),
      ParentsReview.countDocuments()
    ]);

    res.status(200).json({
      success: true,
      data: result,
      pagination: {
        totalItems: totalParentsReviews,
        totalPages: Math.ceil(totalParentsReviews / limit),
        currentPage: page,
        itemsPerPage: limit
      }
    });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

export async function getParentsReviewsByBranch(req, res) {
  const branch = req.params.branch;
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const [result, totalParentsReviews] = await Promise.all([
      ParentsReview.find({ branch }).skip(skip).limit(limit).sort({ createdAt: -1 }),
      ParentsReview.countDocuments({ branch }) 
    ]);

    res.status(200).json({
      success: true,
      data: result,
      pagination: {
        totalItems: totalParentsReviews,
        totalPages: Math.ceil(totalParentsReviews / limit),
        currentPage: page,
        itemsPerPage: limit
      }
    });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Get parents review by ID
export async function getParentsReviewById(req, res) {
  const id = req.params.id;
  try {
    const result = await ParentsReview.findById(id);
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Parents review not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Create a new parents review
export async function createParentsReview(req, res) {
  try {
    const parentsReviewData = req.body;
    const result = await ParentsReview.create(parentsReviewData);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Update a parents review by ID
export async function updateParentsReview(req, res) {
  const id = req.params.id;
  const parentsReviewData = req.body;
  try {
    const result = await ParentsReview.findByIdAndUpdate(id, parentsReviewData, {
      new: true,
    });
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Parents review not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Remove a parents review by ID
export async function removeParentsReview(req, res) {
  const id = req.params.id;
  try {
    const result = await ParentsReview.findByIdAndDelete(id);
    if (result) {
      res.status(200).json({ message: "Parents review deleted successfully" });
    } else {
      res.status(404).json({ message: "Parents review not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}