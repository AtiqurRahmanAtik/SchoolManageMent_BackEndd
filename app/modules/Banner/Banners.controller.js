import Banner from "./Banners.model.js";

export async function getAllBanners(req, res) {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const [result, totalBanners] = await Promise.all([
      Banner.find().skip(skip).limit(limit).sort({ createdAt: -1 }),
      Banner.countDocuments()
    ]);

    res.status(200).json({
      success: true,
      data: result,
      pagination: {
        totalItems: totalBanners,
        totalPages: Math.ceil(totalBanners / limit),
        currentPage: page,
        itemsPerPage: limit
      }
    });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

export async function getBannersByBranch(req, res) {
  const branch = req.params.branch;
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const [result, totalBanners] = await Promise.all([
      Banner.find({ branch }).skip(skip).limit(limit).sort({ createdAt: -1 }),
      Banner.countDocuments({ branch }) 
    ]);

    res.status(200).json({
      success: true,
      data: result,
      pagination: {
        totalItems: totalBanners,
        totalPages: Math.ceil(totalBanners / limit),
        currentPage: page,
        itemsPerPage: limit
      }
    });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Get banner by ID
export async function getBannerById(req, res) {
  const id = req.params.id;
  try {
    const result = await Banner.findById(id);
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Banner not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Create a new banner
export async function createBanner(req, res) {
  try {
    const bannerData = req.body;
    const result = await Banner.create(bannerData);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Update a banner by ID
export async function updateBanner(req, res) {
  const id = req.params.id;
  const bannerData = req.body;
  try {
    const result = await Banner.findByIdAndUpdate(id, bannerData, {
      new: true,
    });
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Banner not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Remove a banner by ID
export async function removeBanner(req, res) {
  const id = req.params.id;
  try {
    const result = await Banner.findByIdAndDelete(id);
    if (result) {
      res.status(200).json({ message: "Banner deleted successfully" });
    } else {
      res.status(404).json({ message: "Banner not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}