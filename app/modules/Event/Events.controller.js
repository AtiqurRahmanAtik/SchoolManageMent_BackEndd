import Event from "./Events.model.js";

export async function getAllEvents(req, res) {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const [result, totalEvents] = await Promise.all([
      Event.find().skip(skip).limit(limit).sort({ createdAt: -1 }),
      Event.countDocuments()
    ]);

    res.status(200).json({
      success: true,
      data: result,
      pagination: {
        totalItems: totalEvents,
        totalPages: Math.ceil(totalEvents / limit),
        currentPage: page,
        itemsPerPage: limit
      }
    });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

export async function getEventsByBranch(req, res) {
  const branch = req.params.branch;
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const [result, totalEvents] = await Promise.all([
      Event.find({ branch }).skip(skip).limit(limit).sort({ createdAt: -1 }),
      Event.countDocuments({ branch }) 
    ]);

    res.status(200).json({
      success: true,
      data: result,
      pagination: {
        totalItems: totalEvents,
        totalPages: Math.ceil(totalEvents / limit),
        currentPage: page,
        itemsPerPage: limit
      }
    });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Get event by ID
export async function getEventById(req, res) {
  const id = req.params.id;
  try {
    const result = await Event.findById(id);
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Event not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Create a new event
export async function createEvent(req, res) {
  try {
    const eventData = req.body;
    const result = await Event.create(eventData);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Update an event by ID
export async function updateEvent(req, res) {
  const id = req.params.id;
  const eventData = req.body;
  try {
    const result = await Event.findByIdAndUpdate(id, eventData, {
      new: true,
    });
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Event not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Remove an event by ID
export async function removeEvent(req, res) {
  const id = req.params.id;
  try {
    const result = await Event.findByIdAndDelete(id);
    if (result) {
      res.status(200).json({ message: "Event deleted successfully" });
    } else {
      res.status(404).json({ message: "Event not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}