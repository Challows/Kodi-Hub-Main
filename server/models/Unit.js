const mongoose = require('mongoose');

const UnitSchema = new mongoose.Schema({
  property: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Property',
  },
  unitNumber: {
    type: String,
    required: true,
  },
  tenant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  rent: {
    type: Number,
    required: true,
  },
  occupied: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('Unit', UnitSchema);