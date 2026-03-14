const Product = require("../models/product.model");

exports.getSales = async (req, res) => {
  try {
    const sales = await Product.find({ status: "sale" });
    res.json(sales);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getSaleById = async (req, res) => {
  try {
    const sale = await Product.findOne({
      _id: req.params.id,
      status: "sale",
    });

    if (!sale) {
      return res.status(404).json({ message: "Sale not found" });
    }

    res.json(sale);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createSale = async (req, res) => {
  try {
    const newSale = new Product({
      ...req.body,
      status: "sale",
    });

    await newSale.save();
    res.status(201).json(newSale);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateSale = async (req, res) => {
  try {
    const sale = await Product.findOne({
      _id: req.params.id,
      status: "sale",
    });

    if (!sale) {
      return res.status(404).json({ message: "Sale not found" });
    }

    Object.assign(sale, req.body, {
      updated_at: Date.now(),
      status: "sale",
    });

    await sale.save();

    res.json(sale);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteSale = async (req, res) => {
  try {
    const sale = await Product.findOne({
      _id: req.params.id,
      status: "sale",
    });

    if (!sale) {
      return res.status(404).json({ message: "Sale not found" });
    }

    await sale.deleteOne();

    res.json({ message: "Sale deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
