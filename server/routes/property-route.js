const express = require('express');
const auth = require('../middlewares/auth');
const Property = require('../models/property');
const router = express.Router();

// @route   POST api/properties
// @desc    Add a property
// @access  Private
router.post('/', auth, async (req, res) => {
  const { name, location, units } = req.body;

  try {
    const newProperty = new Property({
      name,
      location,
      units,
    });

    const property = await newProperty.save();
    res.json(property);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/properties
// @desc    Get all properties
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const properties = await Property.find();
    res.json(properties);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   DELETE api/properties/:id
// @desc    Delete a property
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ msg: 'Property not found' });
    }

    await property.remove();
    res.json({ msg: 'Property removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;