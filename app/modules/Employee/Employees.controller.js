import Employee from "./Employees.model.js";

export async function getAllEmployees(req, res) {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const [result, totalEmployees] = await Promise.all([
      Employee.find().skip(skip).limit(limit).sort({ createdAt: -1 }),
      Employee.countDocuments()
    ]);

    res.status(200).json({
      success: true,
      data: result,
      pagination: {
        totalItems: totalEmployees,
        totalPages: Math.ceil(totalEmployees / limit),
        currentPage: page,
        itemsPerPage: limit
      }
    });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

export async function getEmployeesByBranch(req, res) {
  const branch = req.params.branch;
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const [result, totalEmployees] = await Promise.all([
      Employee.find({ branch }).skip(skip).limit(limit).sort({ createdAt: -1 }),
      Employee.countDocuments({ branch }) 
    ]);

    res.status(200).json({
      success: true,
      data: result,
      pagination: {
        totalItems: totalEmployees,
        totalPages: Math.ceil(totalEmployees / limit),
        currentPage: page,
        itemsPerPage: limit
      }
    });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Get employee by ID
export async function getEmployeeById(req, res) {
  const id = req.params.id;
  try {
    const result = await Employee.findById(id);
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Employee not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Create a new employee
export async function createEmployee(req, res) {
  try {
    const employeeData = req.body;
    const result = await Employee.create(employeeData);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Update a employee by ID
export async function updateEmployee(req, res) {
  const id = req.params.id;
  const employeeData = req.body;
  try {
    const result = await Employee.findByIdAndUpdate(id, employeeData, {
      new: true,
    });
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Employee not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Remove a employee by ID
export async function removeEmployee(req, res) {
  const id = req.params.id;
  try {
    const result = await Employee.findByIdAndDelete(id);
    if (result) {
      res.status(200).json({ message: "Employee deleted successfully" });
    } else {
      res.status(404).json({ message: "Employee not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}