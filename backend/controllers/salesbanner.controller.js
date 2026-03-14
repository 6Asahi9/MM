const SalesBanner = require("../models/salesbanner.models");

exports.getSalesBanners = async (req, res) => {
  try {
    const banners = await SalesBanner.find();
    res.json(banners);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getSalesBannerById = async (req, res) => {
  try {
    const banner = await SalesBanner.findById(req.params.id);
    if (!banner) return res.status(404).json({ message: "Banner not found" });
    res.json(banner);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createSalesBanner = async (req, res) => {
  try {
    const newBanner = new SalesBanner(req.body);
    await newBanner.save();
    res.status(201).json(newBanner);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateSalesBanner = async (req, res) => {
  try {
    const banner = await SalesBanner.findById(req.params.id);
    if (!banner) return res.status(404).json({ message: "Banner not found" });

    Object.assign(banner, req.body, { updated_at: Date.now() });
    await banner.save();

    res.json(banner);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteSalesBanner = async (req, res) => {
  try {
    const banner = await SalesBanner.findById(req.params.id);
    if (!banner) return res.status(404).json({ message: "Banner not found" });

    await banner.deleteOne();
    res.json({ message: "Banner deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
