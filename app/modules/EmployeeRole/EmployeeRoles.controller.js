import EmployeeRole from "./EmployeeRoles.model.js";

export async function getAllEmployeeRoles(req, res) {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const [result, totalEmployeeRoles] = await Promise.all([
      EmployeeRole.find().skip(skip).limit(limit).sort({ createdAt: -1 }),
      EmployeeRole.countDocuments()
    ]);

    res.status(200).json({
      success: true,
      data: result,
      pagination: {
        totalItems: totalEmployeeRoles,
        totalPages: Math.ceil(totalEmployeeRoles / limit),
        currentPage: page,
        itemsPerPage: limit
      }
    });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

export async function getEmployeeRolesByBranch(req, res) {
  const branch = req.params.branch;
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const [result, totalEmployeeRoles] = await Promise.all([
      EmployeeRole.find({ branch }).skip(skip).limit(limit).sort({ createdAt: -1 }),
      EmployeeRole.countDocuments({ branch }) 
    ]);

    res.status(200).json({
      success: true,
      data: result,
      pagination: {
        totalItems: totalEmployeeRoles,
        totalPages: Math.ceil(totalEmployeeRoles / limit),
        currentPage: page,
        itemsPerPage: limit
      }
    });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Get employee role by ID
export async function getEmployeeRoleById(req, res) {
  const id = req.params.id;
  try {
    const result = await EmployeeRole.findById(id);
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Employee Role not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Create a new employee role
export async function createEmployeeRole(req, res) {
  try {
    const employeeRoleData = req.body;
    const result = await EmployeeRole.create(employeeRoleData);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Update a employee role by ID
export async function updateEmployeeRole(req, res) {
  const id = req.params.id;
  const employeeRoleData = req.body;
  try {
    const result = await EmployeeRole.findByIdAndUpdate(id, employeeRoleData, {
      new: true,
    });
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Employee Role not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Remove a employee role by ID
export async function removeEmployeeRole(req, res) {
  const id = req.params.id;
  try {
    const result = await EmployeeRole.findByIdAndDelete(id);
    if (result) {
      res.status(200).json({ message: "Employee Role deleted successfully" });
    } else {
      res.status(404).json({ message: "Employee Role not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}