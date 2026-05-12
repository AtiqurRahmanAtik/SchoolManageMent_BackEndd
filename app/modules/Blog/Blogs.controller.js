import Blog from "./Blogs.model.js";

export async function getAllBlogs(req, res) {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const [result, totalBlogs] = await Promise.all([
      Blog.find().skip(skip).limit(limit).sort({ createdAt: -1 }),
      Blog.countDocuments()
    ]);

    res.status(200).json({
      success: true,
      data: result,
      pagination: {
        totalItems: totalBlogs,
        totalPages: Math.ceil(totalBlogs / limit),
        currentPage: page,
        itemsPerPage: limit
      }
    });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

export async function getBlogsByBranch(req, res) {
  const branch = req.params.branch;
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const [result, totalBlogs] = await Promise.all([
      Blog.find({ branch }).skip(skip).limit(limit).sort({ createdAt: -1 }),
      Blog.countDocuments({ branch }) 
    ]);

    res.status(200).json({
      success: true,
      data: result,
      pagination: {
        totalItems: totalBlogs,
        totalPages: Math.ceil(totalBlogs / limit),
        currentPage: page,
        itemsPerPage: limit
      }
    });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Get blog by ID
export async function getBlogById(req, res) {
  const id = req.params.id;
  try {
    const result = await Blog.findById(id);
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Blog not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Create a new blog
export async function createBlog(req, res) {
  try {
    const blogData = req.body;
    const result = await Blog.create(blogData);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Update a blog by ID
export async function updateBlog(req, res) {
  const id = req.params.id;
  const blogData = req.body;
  try {
    const result = await Blog.findByIdAndUpdate(id, blogData, {
      new: true,
    });
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Blog not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Remove a blog by ID
export async function removeBlog(req, res) {
  const id = req.params.id;
  try {
    const result = await Blog.findByIdAndDelete(id);
    if (result) {
      res.status(200).json({ message: "Blog deleted successfully" });
    } else {
      res.status(404).json({ message: "Blog not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}