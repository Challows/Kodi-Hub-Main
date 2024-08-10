// routes/ticket.js

const express = require('express');
const router = express.Router();
const Ticket = require('../models/Tickets');

// Create a new ticket
router.post('/', async (req, res) => {
  try {
    const ticket = new Ticket(req.body);
    await ticket.save();
    res.status(201).send(ticket);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get all tickets for a specific property
router.get('/property/:propertyId', async (req, res) => {
  try {
    const tickets = await Ticket.find({ property: req.params.propertyId });
    res.status(200).send(tickets);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get a specific ticket by ID
router.get('/:id', async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) return res.status(404).send();
    res.status(200).send(ticket);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Update a ticket status by ID
router.patch('/:id', async (req, res) => {
  try {
    const ticket = await Ticket.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!ticket) return res.status(404).send();
    res.status(200).send(ticket);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete a ticket by ID
router.delete('/:id', async (req, res) => {
  try {
    const ticket = await Ticket.findByIdAndDelete(req.params.id);
    if (!ticket) return res.status(404).send();
    res.status(200).send(ticket);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;