const express = require("express");
const router = express.Router();

const {
  getSalesBanners,
  getSalesBannerById,
  createSalesBanner,
  updateSalesBanner,
  deleteSalesBanner,
} = require("../controllers/salesbanner.controller");

const { authenticate } = require("../middleware/auth.middleware");

router.get("/", getSalesBanners);
router.get("/:id", getSalesBannerById);

module.exports = router;
