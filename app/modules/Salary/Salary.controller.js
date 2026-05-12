import Salary from "./Salary.model.js";

export async function getAllSalaries(req, res) {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const [result, totalSalaries] = await Promise.all([
      Salary.find().populate("employeeRole").skip(skip).limit(limit).sort({ createdAt: -1 }),
      Salary.countDocuments()
    ]);

    res.status(200).json({
      success: true,
      data: result,
      pagination: {
        totalItems: totalSalaries,
        totalPages: Math.ceil(totalSalaries / limit),
        currentPage: page,
        itemsPerPage: limit
      }
    });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

export async function getSalariesByBranch(req, res) {
  const branch = req.params.branch;
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const [result, totalSalaries] = await Promise.all([
      Salary.find({ branch }).populate("employeeRole").skip(skip).limit(limit).sort({ createdAt: -1 }),
      Salary.countDocuments({ branch }) 
    ]);

    res.status(200).json({
      success: true,
      data: result,
      pagination: {
        totalItems: totalSalaries,
        totalPages: Math.ceil(totalSalaries / limit),
        currentPage: page,
        itemsPerPage: limit
      }
    });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

export async function getSalaryById(req, res) {
  const id = req.params.id;
  try {
    const result = await Salary.findById(id).populate("employeeRole");
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Salary not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

export async function createSalary(req, res) {
  try {
    const salaryData = req.body;
    const result = await Salary.create(salaryData);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

export async function updateSalary(req, res) {
  const id = req.params.id;
  const salaryData = req.body;
  try {
    const result = await Salary.findByIdAndUpdate(id, salaryData, {
      new: true,
    });
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Salary not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

export async function removeSalary(req, res) {
  const id = req.params.id;
  try {
    const result = await Salary.findByIdAndDelete(id);
    if (result) {
      res.status(200).json({ message: "Salary deleted successfully" });
    } else {
      res.status(404).json({ message: "Salary not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}