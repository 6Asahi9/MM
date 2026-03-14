const express = require("express");
const router = express.Router();

const {
  getSales,
  getSaleById,
  // createSale,
  // updateSale,
  // deleteSale,
} = require("../controllers/salesbanner.controller");

const { authenticate } = require("../middleware/auth.middleware");

router.get("/", getSales);
router.get("/:id", getSaleById);
// router.post("/", authenticate, createSale);
// router.put("/:id", authenticate, updateSale);
// router.delete("/:id", authenticate, deleteSale);

module.exports = router;
