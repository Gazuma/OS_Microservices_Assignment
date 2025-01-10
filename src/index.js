const express = require('express');
const app = express();
const userRoutes = require('./controllers/userController');
const forge = require('node-forge');
const crypto = require('crypto');
const fs  = require('fs');
const path = require('path');
require('dotenv').config();



const attachKeys = (req, res, next) => {
    req.publicKey = process.env.PUBLIC_CLIENT;
    req.privateKey = process.env.PRIVATE_SERVER;
    next();
}

app.use(express.json());

app.use('/users',attachKeys, userRoutes);

const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
  modulusLength: 2048,
  publicKeyEncoding: {
    type: 'spki', // Subject Public Key Info (default for public keys)
    format: 'pem',
  },
  privateKeyEncoding: {
    type: 'pkcs8', // Private-Key Cryptography Standards #8
    format: 'pem',
  },
});

app.get('/establish', (req, res) => {
  res.status(200).send({ serverPublicKey: publicKey });
  });

 
app.listen(3000,()=>{
    console.log('Server is running on port 3000');
})

