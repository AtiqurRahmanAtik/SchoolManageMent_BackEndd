import Grade from "../../modules/Grade/Grade.model.js"; // Standardizing to .model.js

// --- Create Grade ---
export const createGrade = async (req, res) => {
  try {
    const { gradeName, gradePoint, minMark, maxMark, remarks, branch } = req.body;

    if (Number(maxMark) < Number(minMark)) {
      return res.status(400).json({ 
        success: false, 
        message: "Maximum mark cannot be less than minimum mark" 
      });
    }

    const existingGrade = await Grade.findOne({ gradeName, branch });
    if (existingGrade) {
      return res.status(400).json({ success: false, message: "Grade name already exists in this branch" });
    }

    const newGrade = new Grade({
      gradeName,
      gradePoint,
      minMark,
      maxMark,
      remarks,
      branch,
    });

    await newGrade.save();
    res.status(201).json({ success: true, data: newGrade });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// --- Get All Grades ---
export const getAllGrades = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = "" } = req.query;

    const query = search 
      ? {
          $or: [
            { gradeName: { $regex: search, $options: "i" } },
            { remarks: { $regex: search, $options: "i" } },
          ],
        }
      : {};

    const totalItems = await Grade.countDocuments(query);
    const grades = await Grade.find(query)
      .sort({ minMark: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    res.status(200).json({
      success: true,
      data: grades,
      pagination: {
        totalItems,
        totalPages: Math.ceil(totalItems / limit),
        currentPage: parseInt(page),
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// --- Get Grades By Branch ---
export const getGradesByBranch = async (req, res) => {
  try {
    const { branch } = req.params;
    const { page = 1, limit = 10, search = "" } = req.query;

    const query = {
      branch: branch,
      ...(search && {
        $or: [
          { gradeName: { $regex: search, $options: "i" } },
          { remarks: { $regex: search, $options: "i" } },
        ],
      }),
    };

    const totalItems = await Grade.countDocuments(query);
    const grades = await Grade.find(query)
      .sort({ minMark: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    res.status(200).json({
      success: true,
      data: grades,
      pagination: {
        totalItems,
        totalPages: Math.ceil(totalItems / limit),
        currentPage: parseInt(page),
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// --- Get Single Grade By ID ---
export const getGradeById = async (req, res) => {
  try {
    const grade = await Grade.findById(req.params.id);
    if (!grade) {
      return res.status(404).json({ success: false, message: "Grade not found" });
    }
    res.status(200).json({ success: true, data: grade });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// --- Update Grade ---
export const updateGrade = async (req, res) => {
  try {
    const { gradeName, gradePoint, minMark, maxMark, remarks } = req.body;

    const updatedGrade = await Grade.findByIdAndUpdate(
      req.params.id,
      { gradeName, gradePoint, minMark, maxMark, remarks },
      { new: true, runValidators: true }
    );

    if (!updatedGrade) {
      return res.status(404).json({ success: false, message: "Grade not found" });
    }

    res.status(200).json({ success: true, data: updatedGrade });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// --- Remove Grade ---
export const removeGrade = async (req, res) => {
  try {
    const deletedGrade = await Grade.findByIdAndDelete(req.params.id);
    
    if (!deletedGrade) {
      return res.status(404).json({ success: false, message: "Grade not found" });
    }

    res.status(200).json({ success: true, message: "Grade deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};