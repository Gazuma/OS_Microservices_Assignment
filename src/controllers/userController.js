const express = require('express');
const router = express.Router();
const Joi = require('joi');
const { createUser, getAllUsers, deleteUser } = require('../services/userService');

const userSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  role: Joi.string().valid('Admin', 'Editor', 'Viewer').required()
});

router.post('/', async (req, res) => {
  
});

router.get('/', async (req, res) => {
  
});

router.delete('/:id', async (req, res) => {
  
});

module.exports = router;