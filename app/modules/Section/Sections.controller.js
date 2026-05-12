import Section from "./Sections.model.js";

export async function getAllSections(req, res) {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const [result, totalSections] = await Promise.all([
      Section.find().skip(skip).limit(limit).sort({ createdAt: -1 }),
      Section.countDocuments()
    ]);

    res.status(200).json({
      success: true,
      data: result,
      pagination: {
        totalItems: totalSections,
        totalPages: Math.ceil(totalSections / limit),
        currentPage: page,
        itemsPerPage: limit
      }
    });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

export async function getSectionsByBranch(req, res) {
  const branch = req.params.branch;
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const [result, totalSections] = await Promise.all([
      Section.find({ branch }).skip(skip).limit(limit).sort({ createdAt: -1 }),
      Section.countDocuments({ branch }) 
    ]);

    res.status(200).json({
      success: true,
      data: result,
      pagination: {
        totalItems: totalSections,
        totalPages: Math.ceil(totalSections / limit),
        currentPage: page,
        itemsPerPage: limit
      }
    });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}


// Get section by ID
export async function getSectionById(req, res) {
  const id = req.params.id;
  try {
    const result = await Section.findById(id);
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Section not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Create a new section
export async function createSection(req, res) {
  try {
    const sectionData = req.body;
    const result = await Section.create(sectionData);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Update a section by ID
export async function updateSection(req, res) {
  const id = req.params.id;
  const sectionData = req.body;
  try {
    const result = await Section.findByIdAndUpdate(id, sectionData, {
      new: true,
    });
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Section not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Remove a section by ID
export async function removeSection(req, res) {
  const id = req.params.id;
  try {
    const result = await Section.findByIdAndDelete(id);
    if (result) {
      res.status(200).json({ message: "Section deleted successfully" });
    } else {
      res.status(404).json({ message: "Section not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}