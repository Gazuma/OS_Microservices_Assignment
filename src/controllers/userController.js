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
  try {
    //console.log(req.body)
    const { error } = userSchema.validate(req.body);
    if (error) return res.status(400).send({ message: error.details[0].message });

    const user = await createUser(req.body);
    res.status(201).send(user);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const users = await getAllUsers(req.query.role);
    res.status(200).send(users);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await deleteUser(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(404).send({ message: err.message });
  }
});

module.exports = router;