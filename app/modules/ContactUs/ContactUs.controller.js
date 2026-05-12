import ContactUs from "./ContactUs.model.js";

export async function getAllContactUs(req, res) {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const [result, totalContacts] = await Promise.all([
      ContactUs.find().skip(skip).limit(limit).sort({ createdAt: -1 }),
      ContactUs.countDocuments()
    ]);

    res.status(200).json({
      success: true,
      data: result,
      pagination: {
        totalItems: totalContacts,
        totalPages: Math.ceil(totalContacts / limit),
        currentPage: page,
        itemsPerPage: limit
      }
    });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

export async function getContactUsByBranch(req, res) {
  const branch = req.params.branch;
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const [result, totalContacts] = await Promise.all([
      ContactUs.find({ branch }).skip(skip).limit(limit).sort({ createdAt: -1 }),
      ContactUs.countDocuments({ branch }) 
    ]);

    res.status(200).json({
      success: true,
      data: result,
      pagination: {
        totalItems: totalContacts,
        totalPages: Math.ceil(totalContacts / limit),
        currentPage: page,
        itemsPerPage: limit
      }
    });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Get ContactUs by ID
export async function getContactUsById(req, res) {
  const id = req.params.id;
  try {
    const result = await ContactUs.findById(id);
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "ContactUs not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Create a new ContactUs
export async function createContactUs(req, res) {
  try {
    const contactData = req.body;
    const result = await ContactUs.create(contactData);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Update a ContactUs by ID
export async function updateContactUs(req, res) {
  const id = req.params.id;
  const contactData = req.body;
  try {
    const result = await ContactUs.findByIdAndUpdate(id, contactData, {
      new: true,
    });
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "ContactUs not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Remove a ContactUs by ID
export async function removeContactUs(req, res) {
  const id = req.params.id;
  try {
    const result = await ContactUs.findByIdAndDelete(id);
    if (result) {
      res.status(200).json({ message: "ContactUs deleted successfully" });
    } else {
      res.status(404).json({ message: "ContactUs not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}