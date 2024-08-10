// routes/unit.js

const express = require('express');
const router = express.Router();
const Unit = require('../models/Unit');

// Create a new unit
router.post('/', async (req, res) => {
  try {
    const unit = new Unit(req.body);
    await unit.save();
    res.status(201).send(unit);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get all units for a specific property
router.get('/property/:propertyId', async (req, res) => {
  try {
    const units = await Unit.find({ property: req.params.propertyId });
    res.status(200).send(units);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get a specific unit by ID
router.get('/:id', async (req, res) => {
  try {
    const unit = await Unit.findById(req.params.id);
    if (!unit) return res.status(404).send();
    res.status(200).send(unit);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Update a unit by ID
router.patch('/:id', async (req, res) => {
  try {
    const unit = await Unit.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!unit) return res.status(404).send();
    res.status(200).send(unit);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete a unit by ID
router.delete('/:id', async (req, res) => {
  try {
    const unit = await Unit.findByIdAndDelete(req.params.id);
    if (!unit) return res.status(404).send();
    res.status(200).send(unit);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;