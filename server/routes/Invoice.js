// routes/invoice.js

const express = require('express');
const router = express.Router();
const Invoice = require('../models/Invoice');

// Create a new invoice
router.post('/', async (req, res) => {
  try {
    const invoice = new Invoice(req.body);
    await invoice.save();
    res.status(201).send(invoice);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get all invoices for a specific tenant
router.get('/tenant/:tenantId', async (req, res) => {
  try {
    const invoices = await Invoice.find({ tenant: req.params.tenantId });
    res.status(200).send(invoices);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get a specific invoice by ID
router.get('/:id', async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id);
    if (!invoice) return res.status(404).send();
    res.status(200).send(invoice);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Update an invoice (e.g., mark as paid)
router.patch('/:id', async (req, res) => {
  try {
    const invoice = await Invoice.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!invoice) return res.status(404).send();
    res.status(200).send(invoice);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete an invoice by ID
router.delete('/:id', async (req, res) => {
  try {
    const invoice = await Invoice.findByIdAndDelete(req.params.id);
    if (!invoice) return res.status(404).send();
    res.status(200).send(invoice);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;