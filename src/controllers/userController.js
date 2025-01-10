const express = require('express');
const router = express.Router();
const Joi = require('joi');
const forge = require('node-forge');
const crypto = require('crypto');
const path = require('path');
const fs = require('fs');
const { createUser, getAllUsers, deleteUser, decryptUser,
encryptUser, encryptText, splitData, rsaEncryptUser} = require('../services/userService');
const { type } = require('os');

const userSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  role: Joi.string().valid('Admin', 'Editor', 'Viewer').required()
});

//post rout to create a new user
/*
Working of the route:
  1. Decrypt the data using the server's private key.
  2. Validate the decrypted data.
  3. Create a new user.
  4. Send the created user.
*/
router.post('/', async (req, res) => {
  try {
   
    const encryptedData = req.body.data;
    const privateKey = process.env.PRIVATE_SERVER;
    const decryptedData = JSON.parse(crypto.privateDecrypt(privateKey, Buffer.from(encryptedData, 'base64')).toString());
    const{error} = userSchema.validate(decryptedData);
    if (error) return res.status(400).send({ message: error.details[0].message });
    const user = await createUser(decryptedData);
    res.status(201).send(user);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

//get route to get all users
/*
Working of the route:
  1. Get all users.
  2. Encrypt the users using the client's public key.
  3. Send the encrypted users.
*/
router.get('/', async (req, res) => {
  try {
    const users = await getAllUsers(req.query.role);
    const rsaSplittedData = rsaEncryptUser(users,req.publicKey);
    res.status(200).send(rsaSplittedData);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

//delete route to delete a user by id
/*
Working of the route:
  1. Delete the user by id.
  2. Send a 204 status code.
*/
router.delete('/:id', async (req, res) => {
  try {
    await deleteUser(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(404).send({ message: err.message });
  }
});




module.exports = router;