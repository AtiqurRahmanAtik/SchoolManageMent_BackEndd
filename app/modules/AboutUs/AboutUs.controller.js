import AboutUs from "./AboutUs.model.js";

export async function getAllAboutUs(req, res) {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const [result, totalAboutUs] = await Promise.all([
      AboutUs.find().skip(skip).limit(limit).sort({ createdAt: -1 }),
      AboutUs.countDocuments()
    ]);

    res.status(200).json({
      success: true,
      data: result,
      pagination: {
        totalItems: totalAboutUs,
        totalPages: Math.ceil(totalAboutUs / limit),
        currentPage: page,
        itemsPerPage: limit
      }
    });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

export async function getAboutUsByBranch(req, res) {
  const branch = req.params.branch;
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const [result, totalAboutUs] = await Promise.all([
      AboutUs.find({ branch }).skip(skip).limit(limit).sort({ createdAt: -1 }),
      AboutUs.countDocuments({ branch }) 
    ]);

    res.status(200).json({
      success: true,
      data: result,
      pagination: {
        totalItems: totalAboutUs,
        totalPages: Math.ceil(totalAboutUs / limit),
        currentPage: page,
        itemsPerPage: limit
      }
    });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Get about us by ID
export async function getAboutUsById(req, res) {
  const id = req.params.id;
  try {
    const result = await AboutUs.findById(id);
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "About Us not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Create a new about us
export async function createAboutUs(req, res) {
  try {
    const aboutUsData = req.body;
    const result = await AboutUs.create(aboutUsData);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Update an about us by ID
export async function updateAboutUs(req, res) {
  const id = req.params.id;
  const aboutUsData = req.body;
  try {
    const result = await AboutUs.findByIdAndUpdate(id, aboutUsData, {
      new: true,
    });
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "About Us not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Remove an about us by ID
export async function removeAboutUs(req, res) {
  const id = req.params.id;
  try {
    const result = await AboutUs.findByIdAndDelete(id);
    if (result) {
      res.status(200).json({ message: "About Us deleted successfully" });
    } else {
      res.status(404).json({ message: "About Us not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}